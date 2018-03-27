<template>
<v-app>
  <div id='home'>
    <v-dialog v-model="editDialog" max-width="500px">
      
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="First name" v-model="editedItem.client_fname"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Last name" v-model="editedItem.client_lname"></v-text-field>
              </v-flex>
              <v-container fluid>
                <v-layout row wrap>
                  <v-flex xs6>
                <v-subheader>Visa Type</v-subheader>
                  </v-flex>
                  <v-flex xs6>
                    <v-select
                      :items = "visaList"
                      v-model="editedItem.visa_type"
                      single-line
                      auto
                      hide-details
                      label="Visa Type"
                      item-value="text"
                    ></v-select>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs6>
                <v-subheader>Country</v-subheader>
                  </v-flex>
                  <v-flex xs6>
                    <v-select
                      :items = "countryList"
                      v-model="editedItem.country"
                      single-line
                      auto
                      hide-details
                      label="Country"
                      item-value="text"
                    ></v-select>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card-title>
      <v-btn color="primary" dark @click.native.stop="editDialog = true" class="mb-2">Add New Client</v-btn>      
    <v-text-field
          append-icon="search"
          label="Search"
          single-line
          hide-details
          v-model="search"
        ></v-text-field>
    </v-card-title>
        
    <v-data-table
      :headers="headers"
      :items="items"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.client_fname }}</td>
        <td class="text-xs-right">{{ props.item.visa_type }}</td>        
        <td class="text-xs-right">{{ props.item.country }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</v-app>
</template>

<script>


import firebase from 'firebase';
import { auth, db } from '../firebase';

var database = firebase.database();

export default {
  name: 'home',
  data: () => ({
      country: '',
      countryList: ['Canada', 'Australia'],
      visa_type: '',
      visaList: ['Work', 'Study', 'Travel', 'Permanent'],
      client_fname: '',
      client_lname: '',
      search: '',
      editDialog: false,
      headers: [
          {
            text: 'Client Name',
            align: 'left',
            sortable: false,
            value: 'client_fname'
          },
          { text: 'Visa Type', value: 'visa_type' },
          { text: 'Coutry', value: 'country' },
          { text: 'Actions', value: 'name', sortable: false }        
        ],
        items: [],
        editedIndex: -1,
        editedItem: {
        client_fname: '',
        visa_type: '',
        country: ''
        },
        defaultItem: {
        client_fname: '',
        visa_type: '',
        country: ''
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Client' : 'Edit Client'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },

      search: function(new_value) {
      let t = this
      this.items = []
      console.log(new_value)
      if (new_value == '')
        return 
      firebase.database().ref('clients').orderByChild("client_fname").startAt(new_value).endAt('\uf8ff').on("child_added", function (snapshot) {
      
      if (snapshot.val().client_fname.startsWith(new_value))
        t.items.push(snapshot.val())
     })
    
    } 
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.items = []
        },
      // insert Firebase items above

      editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      },

      deleteItem (item) {
        const index = this.items.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        console.log("Adding New Client to DB", this.client_fname, this.client_lname);        
        if (this.editedIndex > -1) {
          Object.assign(this.items[this.editedIndex], this.editedItem)
        } else {
          this.items.push(this.editedItem)
        }   
          var clientData = {
          client_fname: this.editedItem.client_fname,
          client_lname: this.editedItem.client_lname,
          visa_type: this.editedItem.visa_type,
          country: this.editedItem.country,
        };

        // TODO error checking - existing client?
        // TODO validation of entered name

        // Get a key for a new Post.
        var newClientKey = firebase.database().ref().child('clients').push().key;
        // TODO Error checking for if key couldn't be created

        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates['/clients/' + newClientKey] = clientData;

        return database.ref().update(updates);
        // TODO catch error and print it

      }         
    }
  }
</script>

  

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}

#choose-client
{
  padding: 10%;
}

.client_type {
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    font-size: 12px;
    width: 100%;
    height: 30px;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.1) 2px 2px 5px;
    position: relative;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(222, 222, 222);
    border-image: initial;
    border-radius: 0px;
    overflow: hidden;
    font-family: "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif;
    box-sizing: border-box;
    display: block;
}

</style>


<!--

Current Task: Send to search bar correct infor
              Get query to output correct result in template
              Make sure options can be selected

  
    New Client: 
      - Full Name
      - Age
      - Country of Interest
      - Type of visa

    Existing Client: 
      - Full Name

        Buttons:
         - Start Time
         - End Time




         <div id="options">
    <div style="width:100%">
      <div style="float:left; width:15%"><button style="width:100%" type="button" v-on:click="seen = !seen">+ Add New Client</button> </div>
      <div style="float:right; width:85%"><input style="width:100%" v-model="search_name" type="text" placeholder="Enter name to search"></div>
    
    
    
    </div>

    <div v-if="seen == true">
      <v-form novalidate v-on:submit="add_client">
        First Name: <input type="text" v-model="client_fname" placeholder="First name"/><br>
        Last Name: <input type="text" v-model="client_lname" placeholder="Last name"/><br>
        Country of Interest: <select v-model="country">
          <option disabled value="">Please select one</option>
          <option>Canada</option>
          <option>Australia</option>
          <option>New Zealand</option>
        </select><br>
        Type of Visa: <select v-model="visa_type">
          <option disabled value="">Please select one</option>
          <option>Work Visa</option>
          <option>Student Visa</option>
          <option>Residence Visa</option>
          <option>Tourist Visa</option>
        </select><br>
        <button>Submit</button>
      </v-form>
    </div>
    </div>
 -->