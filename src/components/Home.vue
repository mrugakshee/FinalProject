<template>
  <div id='home'>
    <h1>
      Choose your task:
    </h1>
    <div style="width:100%">
      <div style="float:left; width:15%"><button style="width:100%" type="button" v-on:click="seen = !seen">+ Add New Client</button> </div>
      <div style="float:right; width:85%"><input style="width:100%" v-model="search_name" type="text" placeholder="Enter name to search"></div>
      <table id="existing_client_list"> </table>
    </div>

    <!--the following div becomes visible one of the above divs come true-->
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

</template>



<script>
import firebase from 'firebase';
import { auth, db } from '../firebase';

var database = firebase.database();

export default {
  name: 'home',
  data() {
    return {
      seen: false,
      country: '',
      visa_type: '',
      client_fname: '',
      client_lname: '',
      search_name: '',
      results: '<li>'
    }
  },
  methods: {
    add_client: function() {
      console.log("Adding New Client to DB", this.client_fname, this.client_lname);
      if (this.country && this.visa_type) {
        // A client entry.
        var clientData = {
          client_fname: this.client_fname,
          client_lname: this.client_lname,
          visa_type: this.visa_type,
          country: this.country,
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
      } else {
        console.log("Please select Country and Visa Type");
      }
    }
  },
  watch: { 
   search_name: function(new_value, old_value) {
     firebase.database().ref('clients').orderByChild("client_fnames").endAt('\uf8ff').on("child_added", function(snapshot) {
       if(snapshot.val().client_fname){
         console.log(snapshot.key)
        //  console.log(snapshot.val().client_fname)
      //    var table = document.getElementsByTagName('existing_client_list')[0];
      //    snapshot.forEach(function(name){
      //      var tr = document.createElement('tr');
      //      var td = document.createElement('td');
      //      td.innerText = name.val() + "- "+ JSON.stringify(name.val());
      //      tr.appendChild(td);
      //      table.appendChild(tr);
      //    });
      }
     })
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


/* 

  
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
 */