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
        
        //set the initial map center to Zurich
        
        var map = L.map('map').setView([47.3769, 8.5417], 14);
        
        //load the base map: OpenStreetMap
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
		
		var greenIcon = L.icon({ iconUrl: 'icon.png',iconSize: [40,40], // size of the icon
		 
		iconAnchor: [20, 20], // point of the icon which will correspond to marker's location 
		 
		popupAnchor: [-20, -20] // point from which the popup should open relative to the iconAnchor 
		})
		;
                
        
        var marker = L.marker([47.3769, 8.5417], {icon: greenIcon});
        marker.addTo(map)
            .bindPopup('You are here!');
                
        var circle = L.circle([47.3769, 8.5417], {radius: 10});
        circle.addTo(map);
		
		
		
		
        
		var trailmarkers= [
		[47.256335, 8.604447],
		[47.256335, 8.605482],
		[47.256335, 8.605800]
		];
		
		var startmarker = L.marker(trailmarkers[0]);
		startmarker.addTo(map)
			.bindPopup('Your trail starts here!');
		
		
		
		
			

  
		
        
        // onSuccess Callback
        // This method accepts a Position object, which contains the current GPS coordinates
        function onSuccess (position) {
            //get the current location
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            var accuracy = position.coords.accuracy;
			var accuracy_rounded = Math.round(accuracy * 100) / 100;
			var lat_rounded = Math.round(lat*10000)/10000;
			var lon_rounded = Math.round(lon*10000)/10000;
            var curlatlng = L.latLng(lat, lon);
            
            //set the map center and the marker to the current location, add a circle to represent the location accuracy
            map.panTo (curlatlng);            
            marker.setLatLng (curlatlng);
            marker.getPopup().setContent('You are here! Your coordinates are: Latitude: ' + lat_rounded + ', Longitude: ' + lon_rounded + '. The accuracy of this measurement is ' + accuracy_rounded + ' meters.').openPopup();
            circle.setRadius (accuracy).setLatLng (curlatlng);   
            
            //if the current locaton is within 100 meters of Y25, vibrate the device
			for (var i = 0; i<trailmarkers.length; i++) {
			var tlon = trailmarkers[i][1];
			var tlat = trailmarkers[i][0];
			var nlon = trailmarkers[i+1][1];
			var nlat = trailmarkers [i+1][0];
			var markerLocation = new L.LatLng(tlat, tlon);
			var nextMarkerLocation = new L.LatLng(nlat, nlon);
			var nextmarker = new L.Marker(nextMarkerLocation);
			var distance = curlatlng.distanceTo(markerLocation);
            if (distance < 10000) {
                nextmarker.addTo(map)
					.bindPopup('Here is your next location!' + nextMarkerLocation);}
           
					
                //different vibrating patterns
                //navigator.vibrate([1000, 1000, 2000, 1000, 3000]);
                
                //InAppBrowser
                //var ref = cordova.InAppBrowser.open('http://apache.org', '_self', 'location=yes');
            }
        }

        // onError Callback receives a PositionError object
        function onError(error) {
            //alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
        }
        
        //getCurrentPosition will only get the positon once. watchPosition will run constantly to get the position if the device retrieves a new location 
        //navigator.geolocation.getCurrentPosition(onSuccess, onError, {maximumAge: 3000, timeout: 30000, enableHighAccuracy: true });
        var watchID = navigator.geolocation.watchPosition(onSuccess, onError, {maximumAge: 3000, timeout: 30000, enableHighAccuracy: true });
        
        
        
        //the following part use compass the get the orientation of the device, and rotate the marker accordingly
        //remove the above "/*" and the next * / to use this part
        function onSuccessCompass(heading) {
            //roate the marker according to the orientation of the device
            marker.setRotationAngle (heading.magneticHeading);
        }

        function onErrorCompass(error) {
            //alert('CompassError: ' + error.code);
        }
        //get the orientation of the device, in every 3s
        navigator.compass.watchHeading(onSuccessCompass, onErrorCompass, {frequency: 3000});
        
              
        
     
    }
};
