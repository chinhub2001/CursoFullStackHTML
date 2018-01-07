if(navigator.onLine){
    setTimeout(function(){
        $(".circulo").addClass("circulo-verde")
    }, 100);
}else{
    setTimeout(function(){
        $(".circulo").addClass("circulo-rojo")
    }, 100);
}
