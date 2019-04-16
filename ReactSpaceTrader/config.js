import Firebase from 'firebase';  
let config = {  
    apiKey: "AIzaSyDRN2a07Mnpp1MIj8JVYummJ20VWER11xs",
    authDomain: "space-trader-web-94a64.firebaseapp.com",
    databaseURL: "https://space-trader-web-94a64.firebaseio.com",
    projectId: "space-trader-web-94a64",
    storageBucket: "",
    messagingSenderId: "593691553820"
};
let app = Firebase.initializeApp(config);  
export const db = app.database();  