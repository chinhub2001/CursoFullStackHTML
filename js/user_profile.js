function drawSelectedImage(e) {
    var ctx = document.getElementById('imageCanvas').getContext('2d');
    var url = URL.createObjectURL(e.files[0]);
    var img = new Image();
    img.onload = function() {
        ctx.drawImage(img, 0, 0, 200, 200);    
    }
    img.src = url;   
}
window.onload = function() {
	if (typeof(Storage) !== "undefined") {
		console.log("localStorage SÍ es soportado por este navegador :D")
		var formData = localStorage.getItem("formData");
		
		if(formData == null){
			console.log("no hay datos en localStorage!!!");
		}else{
			var data = JSON.parse(formData);
			document.getElementById("name").value = checkUndefined(data.name);
			document.getElementById("surname").value = checkUndefined(data.surname);
			document.getElementById("phone").value = checkUndefined(data.phone);
			document.getElementById("birthdate").value = checkUndefined(data.birthdate);
			document.getElementById("color").value = checkUndefined(data.color);
			document.getElementById("email").value = checkUndefined(data.email);
			document.getElementById("userheight").value = checkUndefined(data.userheight);
			document.getElementById("url").value = checkUndefined(data.url);
		}
		
	} else {
		console.log("localStorage no es soportado por este navegador :S")
	}
	
}
function saveFormDataInLocalStorage(){
	var formName = document.getElementById("name").value;
	var formSurname = document.getElementById("surname").value;
	var formPhone = document.getElementById("phone").value;
	var formBirthdate = document.getElementById("birthdate").value;
	var formColor = document.getElementById("color").value;
	var formEmail = document.getElementById("email").value;
	var formUserheight = document.getElementById("userheight").value;
	var formUrl = document.getElementById("url").value;
	
	if(formName == "" || formName.length < 10 || formName.length > 150){
		alert("El nombre no puede estar vacío y debe tener tamaño 10 - 150")
	}
	if(formSurname == "" || formSurname.length < 10 || formSurname.length > 150){
		alert("El apellido no puede estar vacío y debe tener tamaño 10 - 150")
	}
	var regexp = /[6|7|9][0-9]{8}$/g;
	if(formPhone != "" && !formPhone.match(regexp)){
		alert("El teléfono no tiene un formato correcto")
	}
	if(formBirthdate != "" 
		&& (
			new Date(formBirthdate) < new Date("1900-01-01") 
			|| new Date(formBirthdate) > new Date("2018-01-01")
		)){
		
		alert("La fecha de nacimiento de sale de los límites")
	}
	if( formEmail != "" && !validateEmail(formEmail) ){
		alert("email con formato incorrecto")
	}
	if( formUserheight != "" && (formUserheight < 1 || formUserheight > 3 )){
		alert("altura incorrecta")
	}
	if( formUrl != "" && !isValidURL(formUrl)){
		alert("url incorrecta")
	}
	
	var data = {
		name:formName, 
		surname:formSurname,
		phone:formPhone,
		birthdate: formBirthdate,
		color: formColor,
		email: formEmail,
		userheight: formUserheight,
		url: formUrl
		};
	if (typeof(Storage) !== "undefined") {
		localStorage.setItem("formData", JSON.stringify(data));
	}
}
function checkUndefined(value){
	if(value == undefined){
		return "";
	}
	return value;
}
function validateEmail(email) {
    var regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email.toLowerCase());
}
function isValidURL(str) {
  regexp = /^((http[s]?):\/\/)(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/;
  return regexp.test(str);
}
