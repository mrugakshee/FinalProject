# Material Vue-Fire Template

 A basic Vue template that is integrated with Google's Material Design and Google's Firebase.  

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

## Firebase Setup

In order for your application to function properly, you will need to create a firebase application. Follow the installation guide and paste the initialization parameters in the src/firebase.js file

``` Javascript

const firebaseApp = Firebase.initializeApp({
  apiKey: "<YOUR API KEY>",
  authDomain: "<YOUR AUTH DOMAIN>",
  databaseURL: "<YOUR DATABASE URL>",
  projectId: "<PROJECT ID>",
  storageBucket: "<STORAGE BUCKET>",
  messagingSenderId: "<MESSAGE SENDER ID>"
})

```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
