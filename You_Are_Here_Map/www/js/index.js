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
    receivedEvent: function(class) {
        var watchID = null;
       //sets the starting view to show when open the app
        $("#start-view").show();
        $("#map").hide();

        //add onclick event to button to show the map
        document.getElementById("showMap").addEventListener("click", ShowMap);        
        function ShowMap() {
            $("#map").show();   
            map._onResize();

            //start watching for changes to the device's location (if not started yet)
            if (watchID == null)
                watchID = navigator.geolocation.watchPosition(onSuccess, onError, {maximumAge: 3000, timeout: 30000, enableHighAccuracy: true });
        }

        //set the initial map center to Zurich
        var map = L.map('map').setView([47.3769, 8.5417], 14);
        
        //load the base map: OpenStreetMap
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
                
        var marker = L.marker([47.3769, 8.5417], {rotationAngle: 0});
		var testmarker = L.marker([47.28, 8.6], {rotationAngle: 0});
                
        var circle = L.circle([47.3769, 8.5417], {radius: 10});
        circle.addTo(map);
        
        
        
        // onSuccess Callback
        // This method accepts a Position object, which contains the current GPS coordinates
        function onSuccess (position) {
            //get the current location
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            var accuracy = position.coords.accuracy;
            var curlatlng = L.latLng(lat, lon);

            //vasiable for the icon
            var myIcon = L.icon({
                iconUrl: 'img/person.png',
                iconSize: [95, 95],
                iconAnchor: [45, 65],
                popupAnchor: [-40,-70],
            });
            L.marker([lat, lon], {icon: myIcon}).addTo(map)
			var distance = curlatlng.distanceTo ([47.2564, 8.6042]);
            if (distance < 1000) {
                testmarker.addTo(map)
					.bindPopup('Here is your next location!');
            }    
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
    }
};
