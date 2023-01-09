function getLocation(){
   let ipValue = document.getElementById("search-box").value;
   fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_ra5bcJgbdzL4EYu0JIYSKsnqZdVFe&ipAddress=${ipValue}`)
   .then(function (response){
    if(!response.ok){
        throw new Error("Please provide valid IP address");
    }
    return response.json();
    })
    .then(function (data){
    setDetails(data);
    getMap(data);
    return data;
    })
    .catch(err => {
        alert(err);
        console.log(err);
    })
}


function getMap(data){
    document.getElementById("body-div").innerHTML = '<div id="map"></div>';  
    var map = L.map('map').setView([data.location.lat, data.location.lng], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19,attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);
    var greenIcon = L.icon({
        iconUrl: './assets/icon-location.svg',
        iconSize:     [40, 50], // size of the icon
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    var marker = L.marker([data.location.lat, data.location.lng],{icon : greenIcon}).addTo(map);
    marker.bindPopup("<b>This is your IP address location</b>").openPopup();
}

function setDetails(data){
    document.getElementById("ip-detail").innerHTML = `IP ADDRESS <br><h1> ${data.ip} </h1>`
    document.getElementById("location-detail").innerHTML = `LOCATION<br><h1> ${data.location.city} , ${data.location.country}  </h1>`
    document.getElementById("timezone-detail").innerHTML = `TIMEZONE <br><h1> UTC ${data.location.timezone} </h1>`
    document.getElementById("ips-detail").innerHTML = `ISP <br><h1> ${data.isp} </h1>`
}
