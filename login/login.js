var config = {
	apiKey: "AIzaSyDLC0LMhOKHJiTKWl_1lQmWY0sYvyu2DSg",
	authDomain: "bass-e0ebc.firebaseapp.com",
	databaseURL: "https://bass-e0ebc.firebaseio.com",
	projectId: "bass-e0ebc",
	storageBucket: "bass-e0ebc.appspot.com",
	messagingSenderId: "367074606382"
};
firebase.initializeApp(config);
//////////////////////////////////////////////////////////


let rect = document.getElementById("rect");
let email = document.getElementById("email");
let pass = document.getElementById("pass");
let loginBT = document.getElementById("loginBT");


/////////////////////firebase///////////////////////////


function login() {
	const promise = firebase.auth().signInWithEmailAndPassword(email.value, pass.value);
	promise.catch(e => console.log(e.message));
};
function logout(){
	firebase.auth().signOut();
}

loginBT.addEventListener('click', e => {
	login();
} )

firebase.auth().onAuthStateChanged(firebaseUser => {
	if (firebaseUser){
		console.log(firebaseUser);
		window.location="/";
	}
	else
		console.log("not login");
})


////////////////////////////////////////////////////////
function handle1() {
	rect.setAttribute("class", "rect2");
}

function handle2() {
	rect.setAttribute("class", "rect1");
}

//For codepen header!!!
setTimeout(() => {
	pass.focus();
}, 500);

setTimeout(() => {
	email.focus();
}, 1500);
