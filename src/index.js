import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Cajero from './Cajero';
import Cocinero from './Cocinero'
import {auth, provider} from './components/burguerBase'



auth.onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    // var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    // var isAnonymous = user.isAnonymous;
    // var uid = user.uid;
    // var providerData = user.providerData;
    if(email === 'cocinero@gmail.com') {
    	ReactDOM.render(
		    <Cocinero auth={auth}/>
			,
		  	document.getElementById('root')
		);
    } else {
    	ReactDOM.render(
		    <Cajero cajeroName = {displayName}
		    perfil = {photoURL}/>
			,
		  	document.getElementById('root')
		);
    }
    salir();
    // ...
  } else {
    // User is signed out.
    ReactDOM.render(
	    <App />
		,
	  	document.getElementById('root')
	);
	iniciar('iniciar-cliente', 'input-iniciar')
	iniciar('iniciar-cocinero')
	iniciar('iniciar-cajero')
    // ...
  }
});


function ingresarCocinero(email, password) {
	auth.signInWithEmailAndPassword(email, password).catch(function(error) {
	  let boton = document.getElementById('iniciar-cocinero');
	  boton.children[0].classList.remove('oculto')
	  
	  
	  boton.children[3].textContent = '';
	  boton.classList.remove('btn')
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  console.log(error.code + ' = ' + errorMessage)
	  switch(errorCode){
	  	case 'auth/invalid-email':
	  		boton.children[3].textContent = 'El correo es inválido'
			boton.children[1].classList.add('b-r')
	  		break;
	  	case 'auth/wrong-password':
			boton.children[1].classList.add('b-r')
	  		boton.children[2].classList.add('b-r')
	  		boton.children[3].textContent = 'La contraseña es incorrecta o el usuario es inválido'
	  		break;

	  	case 'auth/user-not-found':
	  		boton.children[1].classList.add('b-r')
	  		boton.children[3].textContent = 'El usuario ingresado no forma parte de nuestros cocineros'
	  		break
	  	default:
	  		boton.children[0].classList.add('oculto')
		 	boton.classList.add('btn') 

	  }// ...
	});
}

function ingresarCajero() {
	// document.cookie = 'SameSite=None'
	// document.cookie = 'Secure'
	auth.signInWithRedirect(provider)
	window.onload = () => {
		console.log('hola')
		auth.getRedirectResult().then(function(result) {
			console.log(result)
		  if (result.credential) {
		    // This gives you a Google Access Token. You can use it to access the Google API.
		    // var token = result.credential.accessToken;
		    // ...
		  }
		  // The signed-in user info.
		  // var user = result.user;
		  
		  console.log(result)
		  // document.cookie = 'Secure'
		}).catch(function(error) {
			console.log(error)
		  // Handle Errors here.
		  // var errorCode = error.code;
		  // var errorMessage = error.message;
		  // // The email of the user's account used.
		  // var email = error.email;
		  // // The firebase.auth.AuthCredential type that was used.
		  // var credential = error.credential;
		  // ...
		});
	};
	
}

function iniciar(idButton, idInput) {
	let boton = document.getElementById(idButton);
	boton.addEventListener('click', (e)=> {
		if(idButton === 'iniciar-cliente') {
			let input = document.getElementById(idInput)
			if(input.value.length > 0 && e.target !== input) {
				ReactDOM.render(
				    <Cajero 
				    	cajeroName = {input.value}
				    />
					,
				  document.getElementById('root')
				);
				salir('unregister')
			} else if (input.value.length === 0 && e.target !== input) {
				boton.classList.remove('btn')
				boton.children[0].classList.remove('oculto')
				boton.children[1].classList.add('b-r')
				boton.children[2].classList.remove('oculto')
			}
		}else if (idButton === 'iniciar-cajero'){
			ingresarCajero()
		}else {
			if(e.target.type !== 'password' && e.target.type !== 'email'){
				let email = document.getElementById('email').value,
				password = document.getElementById('password').value;
				ingresarCocinero(email, password)
			}
		}			
	})
}

function salir(unregister) {

	document.getElementById('btn-salir').addEventListener('click', ()=> {
		if(unregister === 'unregister') {
			document.location.reload()
		}

		auth.signOut().then(function() {

		}).catch(function(error) {
	  		console.log('error')
		});	
	})
		
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
