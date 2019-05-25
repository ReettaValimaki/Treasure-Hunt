/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var watchID = null;
       //sets the starting view to show when open the app
        $("#start-view").show();
        $("#map").hide();

        //add onclick event to button to show the map
		Forest = [
        [47.359932, 8.594484, "What is 1+1", "2"],
        [47.366705, 8.589935, "What is 1+2", "3"],
        [47.369728, 8.588691, "What is 1+3", "4"],
        [47.367868, 8.600793, "What is 1+4", "5"]
        ];

        Irchel = [
        [47.396519, 8.550110,"What is 1+1", "2"],
        [47.396577, 8.549080, "What is 1+2", "3"],
        [47.397507, 8.548179, "What is 1+3", "4"],
        [47.397274, 8.550239, "What is 1+4", "5"]
        ];

        Tourist = [
        [47.377720, 8.540604],
        [47.366167, 8.541312],
        [47.362926, 8.536463],
        [47.370084, 8.544306]
        ];

        Pub_crawl = [
        [47.374117, 8.544129],
        [47.376115, 8.538136],
        [47.376845, 8.529092],
        [47.377978, 8.527826]
        ];
		var trailmarkers;
		
		var buttonshow = 0;
		
		function buttonShow () {
		buttonshow = 1;	
        }

        //when popup submit is clicked	
        var w;
        submitFunc =function submitFunc() {
        w++;
        }
		
		//function buttonShow () {
		//buttonshow = 1;		
		//}
		//document.getElementById("Test").addEventListener("click",showMarker);	
		//Each button has a function to add the corresponding markers to the map
        document.getElementById("b1").addEventListener("click", ShowMapView);
		document.getElementById("Forest_trail").addEventListener("click", ForestTrail); 
            function ForestTrail() {
            $("#start-view").hide();
            $("#map").show(); 
			$("#trailList").hide();	
            $("#last-view").hide();
            map._onResize();
			trailmarkers = Forest;
			w = 0
			var startmarker = L.marker([trailmarkers[0][0], trailmarkers[0][1]]);
			startmarker.addTo(map)
			.bindPopup(markercontent[0])
				
            if (watchID == null)
             watchID = navigator.geolocation.watchPosition(onSuccess, onError, {maximumAge: 3000, timeout: 30000, enableHighAccuracy: true });
        }
		// Method 1 to add marker on Click
        var markercontent = $('<button class= "Test2" >"Click here for your next Location" </button>');
			markercontent.on('click', function(){
			L.marker([47.377978, 8.527826]).addTo(map)}
			);
		// Method 2 to add marker on click	
		$('#map').on('click', '.Test2', function() {
		w++	
		L.marker([47.376845, 8.529092]).addTo(map)
		.bindPopup('Hello'+w);
		;
		});	
		document.getElementById("Irchel").addEventListener("click", Ircheltrail); 
		function Ircheltrail() {
            $("#start-view").hide();
            $("#map").show();   
            $("#trailList").hide();
			$("#last-view").hide();
            map._onResize();
			trailmarkers = Irchel;
			var startmarker = L.marker([trailmarkers[0][0], trailmarkers[0][1]]);
			startmarker.addTo(map)
			.bindPopup('<button id="Test"> "Click here for your next location" </button><br>'
                +trailmarkers[w][2]
                +'<br><input type="text" name="answer">'
                +'<br><button onclick="submitFunc()">Submit</button>'
                +'<br> The correct answer is: '
                +trailmarkers[w][3]
                )	
            //if (watchID == null)
            watchID = navigator.geolocation.watchPosition(onSuccess, onError, {maximumAge: 3000, timeout: 30000, enableHighAccuracy: true });
        }

		document.getElementById("Tourist").addEventListener("click", ShowMapView); 	
        function ShowMapView() {
            $("#start-view").hide();
            $("#map").show(); 
			$("#trailList").hide();	
            $("#last-view").hide();
            map._onResize();
			trailmarkers= Tourist;
			w = 0;
			var startmarker = L.marker([trailmarkers[0][0], trailmarkers[0][1]]);
			startmarker.addTo(map)
			.bindPopup('<button id="Test"> "Click here for your next location" </button>');	
            watchID = navigator.geolocation.watchPosition(onSuccess, onError, {maximumAge: 3000, timeout: 30000, enableHighAccuracy: true });
        }
		document.getElementById("Pub_crawl").addEventListener("click", PubView); 	
		function PubView() {
            $("#start-view").hide();
            $("#map").show(); 
			$("#trailList").hide();	
            $("#last-view").hide();
            map._onResize();
			trailmarkers= Pub_crawl;
			var startmarker = L.marker([trailmarkers[0][0], trailmarkers[0][1]]);
			startmarker.addTo(map)
			.bindPopup('<button id="Test"> "Click here for your next location" </button>');	
            //if (watchID == null)
             watchID = navigator.geolocation.watchPosition(onSuccess, onError, {maximumAge: 3000, timeout: 30000, enableHighAccuracy: true });
        }
        //set the initial map center to Zurich
        var map = L.map('map').setView([47.3769, 8.5417], 14);
        
        //load the base map: OpenStreetMap
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
                
        var marker = L.marker([47.3769, 8.5417], {rotationAngle: 0});
                
        var circle = L.circle([47.3769, 8.5417], {radius: 10});
        circle.addTo(map);
		//var trailmarkers= [
		//[47.256335, 8.604447],
		//[47.256335, 8.605482],
		//[47.256335, 8.605800]
		//];
		
       
		//var startmarker = L.marker(trailmarkers[0]);
		//startmarker.addTo(map)
			//.bindPopup('<button id="Test"> "Click here for your next location" </button>');
        
        
        // onSuccess Callback
        // This method accepts a Position object, which contains the current GPS coordinates
        function onSuccess (position) {
            var lat = position.coords.latitude;
            //get the current location
            var lon = position.coords.longitude;
            var accuracy = position.coords.accuracy;
            var curlatlng = L.latLng(lat, lon);
			//document.getElementById("Test").addEventListener("click",showMarker);	
            //vasiable for the icon
            var myIcon = L.icon({
                iconUrl: 'img/person.png',
                iconSize: [95, 95],
                iconAnchor: [45, 65],
                popupAnchor: [-40,-70],
            });
            L.marker([lat, lon], {icon: myIcon}).addTo(map);
			
			var markercontent2 = $('<button class= "Test3" >"Click here for your next Location" </button>');
			markercontent.on('click', function(){
			w++	
			L.marker([47.377978, 8.527826]).addTo(map)}
			);
            function addMarkers(trailmarkers){
			//function for popup popping up with buttons
			for (var i = 0; i<trailmarkers.length; i++) {
                //current marker
			var tlon = trailmarkers[i][1];
			var tlat = trailmarkers[i][0];
                //next marker
			var nlon = trailmarkers[i+1][1];
			var nlat = trailmarkers [i+1][0];
			var markerLocation = new L.LatLng(tlat, tlon);
			var nextMarkerLocation = new L.LatLng(nlat, nlon);
			var nextmarker = new L.Marker(nextMarkerLocation);
			var distance = curlatlng.distanceTo(markerLocation);
			var markercontent2 = $('<button class= "Test3" >"Click here for your next Location" </button>' + w);
			markercontent2.on('click', function(){
			w++;
			addMarkers(trailmarkers);	
			L.marker([47.377978, 8.527826]).addTo(map)}
			);
            if (distance < 10000000 && w == i ) {
                nextmarker.addTo(map)
					.bindPopup(markercontent2[0]);}
            //document.getElementById("fff").addEventListener("click", buttonShow);
			//function buttonShow () {
			//buttonshow = 1;		
			}}
			addMarkers(trailmarkers);
				
           
          
                
            //set the map center and the marker to the current location, add a circle to represent the location accuracy
            map.panTo (curlatlng);            
            marker.setLatLng (curlatlng);
            //marker.getPopup().setContent('You are here!').openPopup();
            circle.setRadius (accuracy).setLatLng (curlatlng);   
        }

        // onError Callback receives a PositionError object
        function onError(error) {
            //alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
        }
        //watchPosition will run constantly to get the position if the device retrieves a new location 
        var watchID = navigator.geolocation.watchPosition(onSuccess, onError, {maximumAge: 3000, timeout: 30000, enableHighAccuracy: true });   
            //Add the "Back" button in the map view
        var backControl =  L.Control.extend({
            options: {
                position: 'bottomleft'
            },

            onAdd: function (map) {
                var container = L.DomUtil.create('button', 'ui-button ui-widget ui-corner-all');
                container.style.backgroundColor = 'white';     
                container.style.width = '60px';
                container.style.height = '30px';
                container.textContent = "Back";
                
                container.onclick = function(){
                  $("#start-view").show();
                  $("#map").hide();     
                  $("#trailList").hide();   
                  $("#last-view").hide();             
                  //stop watching for changes to the device's location
                  navigator.geolocation.clearWatch(watchID);
                  watchID = null;
                };

                return container;
            }
        });
        map.addControl(new backControl());
    }

};
