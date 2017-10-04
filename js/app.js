//Google Maps API Javascript
var map;
var markers = [];

//Knockout JS Javascript and connection to the Google Maps API
var initialMarkers = [
{
	position: {lat: 41.917393, lng: -87.644555},
	title: 'Home'
},
{
	position: {lat: 41.914000, lng: -87.644555},
	title: 'Not Home'
}
]

var ListItem = function(data, identification) {
	this.position = ko.observable(data.position);
	this.title = ko.observable(data.title);
	this.id = identification;
}

//Isnt run until into page is loaded on API callback to initMap()
var ViewModel = function(){
	var self = this;
	this.list = ko.observableArray([]);
	var i = 1;

	var infoWindow = new google.maps.InfoWindow();
	
	initialMarkers.forEach(function(newMarker){
		self.list.push(new ListItem(newMarker, i++));
		var marker = new google.maps.Marker({
			map: map,
            position: newMarker.position,
            title: newMarker.title,
            animation: google.maps.Animation.DROP,
          });
		markers.push(marker);

		marker.addListener('click', function(){
			populateInfoWindow(this, infoWindow);
		});

	});

	this.selectMarker = function(selMarker){
		//Markers mapped to the list by ID so subtract 1
		populateInfoWindow(markers[selMarker.id-1], infoWindow);	
	};
}

//Run on maps API callback
function initMap(){

	//Initialize the map
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 41.921438, lng: -87.651304},
		zoom: 14
	});
	//Apply bindings now after the intiMap has been run on API callback
	ko.applyBindings(new ViewModel());
}

//Make the info window
function populateInfoWindow(marker, infowindow) {

	//Open it if it is not open
	if (infowindow.marker != marker){
		infowindow.marker = marker;
		infowindow.setContent('<div>' + marker.title + '</div>');
		infowindow.open(map, marker);
		infowindow.addListener('closeclick', function(){
			infowindow.marker = null;
		});
	}
	//Close it if it is already open
	else{
		infowindow.marker = null;
		infowindow.close();
	}


}
