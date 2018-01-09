if (!navigator.geolocation){
    $('.location-info-map').html('<div class="location-info-content">Geolocation is not supported by your browser</div>')
}

function getActualPosition(){
//            navigator.geolocation.getCurrentPosition(
//             function(position) {
//                        console.log("getCurrentPosition",position.coords.latitude,position.coords.longitude);
//                 initMap(position.coords.latitude,position.coords.longitude)
//             });
    navigator.geolocation.watchPosition(
        function(position) {
            console.log("watchPosition",position.coords.latitude,position.coords.longitude);
            initMap(position.coords.latitude, position.coords.longitude)
        });
}





/**Iniciamos el mapa **/

function initMap(lat, lng) {
    var initialPosition ={lat:lat, lng: lng };

    /**Establecemos el ZOOM con las coordenadas **/
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: initialPosition
    });

    /**Añadimos el market de la posición actual **/
    var marker = new google.maps.Marker({
        position: initialPosition,
        map: map
    });

    /**Añadimos información de la localización **/
    $('.location-info-map').html('<div class="location-info-content">' +
        'Latitud: ' + lat + '<br>Longitud' + lng +
        '</div>');

    var latlng = new google.maps.LatLng(lat, lng);
    var geocoder = new google.maps.Geocoder();

    /**Añadimos la dirección y la comunidad actual **/
    geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
                $('.location-info-map').append('<div class="location-info-content">' +
                    'Calle: ' + results[0].formatted_address +
                    '</div>');
                for (var i=0; i<results[0].address_components.length; i++) {
                    for (var b=0;b<results[0].address_components[i].types.length;b++) {

                        if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                            //this is the object you are looking for
                            city= results[0].address_components[i];
                            break;
                        }
                    }
                }
                $('.location-info-map').append('<div class="location-info-content">' +
                    'Comunidad: ' + city.short_name + " " + city.long_name +
                    '</div>');

            } else {
                $('.location-info-map').html('<div class="location-info-content">' +
                    'No se han encontrado resultados'+
                    '</div>');
            }
        } else {
            $('.location-info-map').html('<div class="location-info-content">' +
                'Ha Fallado la geolocalización'+
                '</div>');
        }
    });

}