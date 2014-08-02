jQuery(window).on("load", function() {
	"use strict";

	/* -----------------------------------------
	 FlexSlider Init
	 ----------------------------------------- */
	jQuery("#slider").flexslider({
		directionNav: false,
		controlnav: true,
		start: function(slider) {
			slider.removeClass('loading');
		}
	});

	jQuery(".room-slider").flexslider({
		prevText: '',
		nextText: '',
		directionNav: true,
		controlNav: false
	});

});

jQuery(document).ready(function($) {
	"use strict";

	/* -----------------------------------------
	 Main Navigation Init
	 ----------------------------------------- */
	$('ul.navigation').superfish({
		delay:       300,
		animation:   { opacity:'show', height:'show' },
		speed:       'fast',
		dropShadows: false
	});

	/* -----------------------------------------
	 Weather Code
	 ----------------------------------------- */
	var location = 'GRXX0044'; // Find the code of your location in the following link and change this value between the single quotes: http://edg3.co.uk/snippets/weather-location-codes/
	var unit = 'c';

	var wq = "SELECT * FROM weather.forecast WHERE location='" + location + "' AND u='" + unit + "'";
	var cb = Math.floor((new Date().getTime()) / 1200 / 1000);
	var wu = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(wq) + '&format=json&_nocache=' + cb;

	window['ywcb'] = function(data) {
		var info = data.query.results.channel.item.condition;
		var city = data.query.results.channel.location.city;
		var country = data.query.results.channel.location.country;
		$('.ywicon').addClass('wi-yw-' + info['code']);
		$('#ywloc').html(city + ", " + country);
		$('#ywtem').html(info.temp + '<span>' + '&deg;' + (unit.toUpperCase()) + '</span>');
	};

	$.ajax({
		url: wu,
		dataType: 'jsonp',
		cache: true,
		jsonpCallback: 'ywcb'
	});

	/* -----------------------------------------
	 Custom Select Boxes
	 ----------------------------------------- */
	var box = $(".dk");
	box.dropkick({
		theme: 'ci'
	});

	/* -----------------------------------------
	 Responsive videos
	 ----------------------------------------- */
	$(".video-wrap").fitVids();

	/* -----------------------------------------
	 Datepickers
	 ----------------------------------------- */
	// The datepickers must output the format yy/mm/dd
	// otherwise PHP's checkdate() fails.
	// Makes sure arrival date is not after departure date, and vice versa.
	$( ".datepicker[name='arrive']" ).datepicker({
		showOn: 'both',
		buttonText: '<i class="fa fa-calendar"></i>',
		dateFormat: 'yy/mm/dd',
		onSelect: function(dateText, dateObj){
			var minDate = new Date(dateObj.selectedYear, dateObj.selectedMonth, dateObj.selectedDay );
			minDate.setDate(minDate.getDate()+1);
			$( ".datepicker[name='depart']" ).datepicker("option", "minDate", minDate );
		}
	});

	$( ".datepicker[name='depart']" ).datepicker({
		showOn: 'both',
		buttonText: '<i class="fa fa-calendar"></i>',
		dateFormat: 'yy/mm/dd',
		onSelect: function(dateText, dateObj) {
			//var maxDate = new Date(dateText);
			var maxDate = new Date(dateObj.selectedYear, dateObj.selectedMonth, dateObj.selectedDay );
			maxDate.setDate(maxDate.getDate()-1);
			$( ".datepicker[name='arrive']" ).datepicker("option", "maxDate", maxDate );
		}
	});

	/* -----------------------------------------
	 Responsive Menus Init with jPanelMenu
	 ----------------------------------------- */
	$("#mobilemenu").mmenu();

	/* -----------------------------------------
	 Lightboxes
	 ----------------------------------------- */
	var $pp = $("a[data-rel^='prettyPhoto']");
	if ($pp.length) {
		$pp.prettyPhoto({
			show_title: false,
			hook: 'data-rel',
			social_tools: false,
			theme: 'pp_ignited',
			horizontal_padding: 20,
			opacity: 0.95,
			deeplinking: false
		});
	}

	/* -----------------------------------------
	 Map Init
	 ----------------------------------------- */
	if ( $("#map").length ) {
		map_init();
	}

});

function map_init() {
	'use strict';
	var myLatlng = new google.maps.LatLng(33.59,-80);
	var mapOptions = {
		zoom: 8,
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	var map = new google.maps.Map(document.getElementById('map'), mapOptions);

	var contentString = '<div id="content">Change it to whatever your want! <strong>HTML</strong> too!</div>';

	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});

	var marker = new google.maps.Marker({
		position: myLatlng,
		map: map,
		title: 'Hello'
	});
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map,marker);
	});
}