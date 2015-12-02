var app = angular.module("tuDoctor.calendar", []);

app.controller('calendarCtrl', ['$scope', 'Horarios_doctor', function($scope, Horarios_doctor){


	$scope.select_fecha = function(){
		var eventData;

			if ($scope.nombre_horario !== "") {
				eventData = {
					title: $scope.nombre_horario,
					start: $scope.inicio,
					end: $scope.fin
				};
				$('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
			}
			$('#calendar').fullCalendar('unselect');

			
			console.log('Inicio: '+$scope.inicio.format());
			console.log('Fin: '+$scope.fin.format());

			var inicio = $scope.inicio.format();
			var fin = $scope.fin.format();

			var horario = {
				nombre: $scope.nombre_horario,
				fecha_inicio: inicio,
				fecha_fin: fin,
				hora_inicio: $scope.hora_inicio,
				hora_fin: $scope.hora_fin
			};

			console.log(horario);

			// Horarios_doctor.$add(horario);

			$('#calendario').modal('hide');

	}

	var date = new Date();
			
		$('#calendar').fullCalendar({
			defaultView : "agendaWeek",
    		// axisFormat : "HH:mm",
    		agenda : "HH:mm",

		header: {
			left: 'prev',
			center: 'title',
			right: 'month,agendaWeek,agendaDay,next'
			// right: 'month,agendaWeek,agendaDay,next'
		},
		lang: 'es',
		editable: true,
		businessHours: true, // display business hours
		eventLimit: true, // allow "more" link when too many events
		selectable: true,
		selectHelper: true,
		// timezone: 'America/Bogota',

		select: function(start, end) {
			// var title = prompt('Event Title:');
			$('#calendario').modal('show');
			$scope.inicio = start;
			$scope.fin = end;
			// var title = 'Disponible: '+ start;
		},
		});
	
}]);


app.controller('calendarPublicCtrl', ['$scope', 'Eventos', function($scope, Eventos){

	// mapa
	var testconnection = navigator.onLine;
    if (testconnection) {
    	// alert('Navegador Online!');
        // google.maps.event.addDomListener(window, 'load', init);
            var myLatlng, mapOptions, mapElement, map, markerimage, marker, styleSs;

	        myLatlng = new google.maps.LatLng(4.6741146, -74.04834249999999);
	        mapOptions = {
	            zoom: 16,
	            panControl: false,
	            scrollwheel: false,
	            mapTypeControl: true,
	            center: myLatlng
	        };
	        mapElement = document.getElementById('map');
	        map = new google.maps.Map(mapElement, mapOptions);
	        
	        marker = new google.maps.Marker({
	            position: myLatlng,
	            map: map
	            
	        });
    }

    var f = new Date();
    var dia = f.getDay();
    if (dia < 10) {
    	dia = '0'+dia;
    }
    var fecha_actual = f.getFullYear() + "-" + (f.getMonth() +1) + '-' + dia + 'T'+ (f.getHours()-1)+':'+f.getMinutes()+":"+f.getSeconds();

    console.log('fecha_actual: ' + fecha_actual);

    // leo los parametros de comfiguracion de la base de datos
    var count = 0;
    var config = [];
    var fdb = Date();

    // traigo os datos del usuario que ingreso
     var user_doctor = new Firebase("https://tudoctor.firebaseio.com/eventos/");
     user_doctor.orderByChild("doctor_id").equalTo('-K2xFw_MDovcZZo4zISZ').on("child_added", function(snapshot) {
        config[count] = snapshot.val();
        // config[count].$id = snapshot.key();
        $scope.config = config.filter(Boolean);
        count++;

        // aquí filtro los eventos para mostrar solo las fechas validas
        for (var i = 0; i <= $scope.config[0].eventos.length - 1; i++) {
        	var fecha = $scope.config[0].eventos[i].start;
        	fdb = fecha;

        	console.log('FECHA: '+ fdb);

        	if (fdb < fecha_actual) {
        		console.log('es menor: ' + $scope.config[0].eventos[parseInt(i)].start);
        		$scope.config[0].eventos[i] = {
        			color: '#16a085',
	                start: '0000-00-00T00:00:00',
	                title: 'Vencido',
	                url: '#'
        		};
        	}
        }

        // console.log($scope.config[0].eventos);
    	
    	// calculo horario del doctor
		$('#calendar').fullCalendar({
		  header: {
			left: 'prev',
			center: 'title',
			right: 'month,next'
			// right: 'month,agendaWeek,agendaDay,next'
		  },
		  lang: 'es',
		  defaultView: 'month',
		  editable: false,
		  // businessHours: true, // display business hours
		  eventLimit: true, // allow "more" link when too many events

		  // slotMinutes: 30,
		  minTime : $scope.config[0].hora_inicio_labores+ ':00',
		  // maxTime : $scope.config[0].hora_fin_labores+ ':00',
		  firstDay : 1,
		  allDaySlot : false,
		  // weekends: false,
		  defaultEventMinutes : $scope.config[0].hora_inicio_labores, 
		  // dragOpacity: "0.5",
		  // unselectAuto: false,
		  // weekMode : false,
		  businessHours: {
		  	start: $scope.config[0].hora_inicio_labores,
		  	end: $scope.config[0].hora_fin_labores,
		  	dow: [1,2,3,4,5]
		  },
		  events: function(start, end, timezone, callback){
		  	callback($scope.config[0].eventos);
		  }
		});


    	
    });

	// console.log($scope.config[0].eventos);

}]);