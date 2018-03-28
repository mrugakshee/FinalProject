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
                <v-text-field label="First name" required v-model="editedItem.client_fname"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Last name" required v-model="editedItem.client_lname"></v-text-field>
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
                      required
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
                      required
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
          <v-btn color="blue darken-1" flat @click.native="save(); timerCard()" >Save</v-btn>
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
        <td class="text-xs-left">{{ props.item.client_fname }} {{ props.item.client_lname}}</td>
        <td class="text-xs-left">{{ props.item.visa_type }}</td>        
        <td class="text-xs-left">{{ props.item.country }}</td>
        <td class="justify-left layout px-0">
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

<!-- Timer card template -->
<br>
<br>
  <template>
  <v-layout >
    <v-flex xs12 sm6 offset-sm2>
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0"> {{Cname}} {{Lname}}</h3>
             <div class="text-xs-left"> Country: {{CountryName}} </div>
             <div class="text-xs-left"> Visa: {{VisaTypeName}}</div>
             <div> {{timeCard}} </div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
           <v-btn  large fab color="green">
            <v-icon>play_arrow</v-icon>
           </v-btn>
           <v-btn  large fab color="yellow">
            <v-icon>pause</v-icon>
           </v-btn>
           <v-btn  large fab color="red">
            <v-icon>stop</v-icon>
           </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

</v-app>
</template>

<script>


import firebase from 'firebase';
import { auth, db } from '../firebase';

var database = firebase.database();

var moment = require('moment');
moment().format();

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
      timerCardDiv: false,
      uid: '',
      username: '',
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
      },
      Cname () {
        return this.editedItem.client_fname
    },
      Lname () {
        return this.editedItem.client_lname
      },
      CountryName () {
        return this.editedItem.country
      },
      VisaTypeName () {
        return this.editedItem.visa_type        
      },
      timeCard () {
        return moment().format('MMMM Do YYYY, h:mm:ss a')
      },
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
      let t = this
      var user = firebase.auth().currentUser;
      if (user) {
        this.uid = user.uid;
        var useremail = user.email;
        console.log("this is ", this)
        db.ref(`users/${this.uid}`).on("value", function (snapshot) {
        console.log(snapshot.val())
        t.username = snapshot.val().name;
      
    })
      }
    },

    methods: {
      initialize () {
        this.items = []
        
        },
      
      //TODO edit client functionality needs to start working
      editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      },

      // TODO Delete functionality should not be there - what if user deletes clients to increase bonus?
      // Condition - can delete client only if time field not populated
      deleteItem (item) {
        const index = this.items.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
      },
      close () {
        this.editDialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        var user = firebase.auth().currentUser;
        var uid = user.uid;

        console.log("Adding New Client to database", this.editedItem.client_fname, this.editedItem.client_lname);        
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
          user: this.uid,
          username: this.username
        };

        // TODO error checking - existing client?
        // TODO validation of entered name

        // Get a key for a new Post.
        var newClientKey = database.ref().child('clients').push().key;
        // TODO Error checking for if key couldn't be created

        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        console.log(clientData)
        updates['/clients/' + newClientKey] = clientData;
        this.editDialog = false
        
        console.log("Below is value of variables")
        console.log(this.editedItem.client_fname, this.editedItem.client_lname, this.editedItem.visa_type, this.editedItem.country)
      

        return database.ref().update(updates);
        // TODO catch error and print it
      },
      
      timerCard () {
        console.log("timerCard() call success")
        this.timerCardDiv = true

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

Current Task: Once a client is added -
  - calls another function
  - opens in container div underneath seach box with details of client
  - Start session, End session, and Pause session buttons to the right
  - implement timer
  - dialog saying session has ended
    
-->