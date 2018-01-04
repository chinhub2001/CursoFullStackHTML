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
	localStorage.setItem("formData", JSON.stringify(data));
}
function checkUndefined(value){
	if(value == undefined){
		return "";
	}
	return value;
}
