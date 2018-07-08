
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDLC0LMhOKHJiTKWl_1lQmWY0sYvyu2DSg",
    authDomain: "bass-e0ebc.firebaseapp.com",
    databaseURL: "https://bass-e0ebc.firebaseio.com",
    projectId: "bass-e0ebc",
    storageBucket: "bass-e0ebc.appspot.com",
    messagingSenderId: "367074606382"
};
firebase.initializeApp(config);

var db = firebase.database();


function showNameOfID(id,ref){
    db.ref('member').child(id).once('value').then(snap=>{
        let data = snap.val();
        ref.innerHTML =data.studentID+"  "+ data.preName + data.name +'  '+data.lastName+"   "+data.yearClass;
    })
    // console.log(id +'\n'+ref.id);
    
}

function getName(ref,ID) {
    firebase.database().ref("member/" + ID).once('value').then(function (snapshot) {
        a = snapshot.val();
        ref.innerHTML = a.preName+a.name+'   '+a.lastName +"  " + a.yearClass;
    });
}

function signOut(){
    firebase.auth().signOut()
}