/*
 * fil: js.js
 * purpose: introdction to jQuery
 */
console.log('file: js/js.js loaded');

// OpenWeatherMap
const token = "a896f5b19cbdb829ab047fc8d8a09d33";
const aarhus = "https://api.openweathermap.org/data/2.5/weather?q=Aarhus,DK&appid=" +
    token +
    "&units=metric";

$(document).ready(function () {

    // Frontpage video autoplay
    var vid = document.getElementById("video");
    vid.autoplay = true;
    vid.load();

    // Kort
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2VsaW5laG9sc3QiLCJhIjoiY2tmcWtmM2U5MWJvMDJxczV2N2ZucTRqdSJ9.JnbQ_KvOXp5jeg7wAskMWA';
        var monument = [10.2019210, 56.1531550];
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/celineholst/ckfxs4mye0jcd19lgxcmfxlqe',
            center: monument,
            zoom: 16
        });

        // Laver popup
        var popup = new mapboxgl.Popup({
            offset: 25
        }).setText(
            'Øl-Festival 2020 afholdes i Ridehuset'
        );

        // LAvet et DOM element for markeren
        var el = document.createElement('div');
        el.id = 'marker';

        // Laver markeren
        new mapboxgl.Marker(el)
            .setLngLat(monument)
            // Tilføjer popup effect til marker
            .setPopup(popup)
            .addTo(map);
        
        // Controlpanel til navigation
        map.addControl(new mapboxgl.NavigationControl());
    
    // Vejret
    fetch(aarhus).then(response => {
        return response.json();
    }).then(data => {

        // JSON data 
        console.log(data);
        
        $('#result').append(
            '<div class="weatherInfo">' +
            '<p> Temperaturen er: '+
            data.main.temp +
            ' grader  </p>' +
            ' <p> Lufttrykket er: ' +
            data.main.pressure +
            ' Mbar  </p>' +
            ' <p> Det føles som om: ' +
            data.main.feels_like +
            ' grader  </p>' +
            '<figure><img src="http://openweathermap.org/img/w/' +
            data.weather[0].icon +
            '.png" alt="The weather : ' +
            data.weather[0].main +
            '"></figure>' +
            '</div>');

    }).catch(err => {
        console.log('There was an error ...');
    });

});
