var app = angular.module('tuDoctor.services', [])

// gestion de doctores
app.factory("Doctores", function($firebaseArray) {
  var doctores = new Firebase("https://tudoctor.firebaseio.com/doctores");
  return $firebaseArray(doctores);
});


// gestion de usuarios
app.factory("Usuarios", function($firebaseArray) {
  var usuarios = new Firebase("https://tudoctor.firebaseio.com/usuarios");
  return $firebaseArray(usuarios);
});


// gestion de horarios_doctor
app.factory("Horarios_doctor", function($firebaseArray) {
  var horarios_doctor = new Firebase("https://tudoctor.firebaseio.com/horarios_doctor");
  return $firebaseArray(horarios_doctor);
});


// configuración doctor
app.factory("getConfiguracion", function() {
  var ref = new Firebase('https://tudoctor.firebaseio.com/configuracion/-K3WImkLwUuWhw3crPzT');
  return ref;
});

// citas
app.factory('Citas',function($firebaseArray){
  var citas = new Firebase('https://tudoctor.firebaseio.com/citas');
  return $firebaseArray(citas);
})

// eventos
app.factory('Eventos', function($firebaseArray){
  var eventos = new Firebase('https://tudoctor.firebaseio.com/eventos');
  return $firebaseArray(eventos);
});

// app.factory('EventosUpdate', function(){
//   var eventos = new Firebase('https://tudoctor.firebaseio.com/eventos/-K3WImkLwUuWhw3crPzT');
//   return eventos;
// });

app.factory("Auth", function($firebaseAuth){

	var ref = new Firebase("https://tudoctor.firebaseio.com/");
	var auth = $firebaseAuth(ref);

	return auth;
});



//Servicio utilizado para consumir el API de google maps
app.factory('geolocation', function(){
  service = {};

  var originLatLon="";
  var destinyLatLon="";
  // var directionsService = null;
  // var directionsDisplay = null;

  service.buscar = function(){
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();

    var options = {
      // types: ['(geocode)'],
        componentRestrictions: {country: 'CO'}
    };

    var Origen = new google.maps.places.Autocomplete((document.getElementById('origen')),options);
    google.maps.event.addListener(Origen, 'place_changed', function() {
      var place = Origen.getPlace();
      console.log(place);
      originLatLon = place.geometry.location;
      console.log(originLatLon);
    });

    var Destino = new google.maps.places.Autocomplete((document.getElementById('destino')),options);
    google.maps.event.addListener(Destino, 'place_changed', function() {
      var place = Destino.getPlace();
      destinyLatLon = place.geometry.location;
      console.log(destinyLatLon);
    });
    return {origin:originLatLon, destination:destinyLatLon}
  }
  return service;
});

