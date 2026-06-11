import { User } from "../model/user.model.js";
import { Location } from "../model/location.model.js";

var radius;
var userCircle;
var userMarker;
var isUserMapPopup = false;

var map = L.map("map").setView([52.2297, 21.0122], 13);

var greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

map.locate({ watch: true, setView: true, maxZoom: 16 }); //// TROCHĘ TO DZIWNE TAK RANDOMOWO ODPALONE W SRODKU KODU, POWINNO BYC ODPALONE NA STRONIE!?!?1?

//
////                                TEN CAŁY SETUP L.TILE ITD. POWINIEN BYĆ JAKOŚ NORMALNIE W FUNKCJI ODPALANY A NIE TAKO W SERWISIE
//
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a>',
}).addTo(map);

////////////////////////////////////////////////////////////////////

let pointsOfInterest = [];

fetch("./data/POI.JSON")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((place) => {
      place.visited = false;
      place.marker = L.marker([place.lat, place.lng])
        .addTo(map)
        .bindPopup(`<b>${place.name}</b><br>${place.info}`);

      if (isLocationVisited(place)) {
        place.marker.setIcon(greenIcon);
        place.marker
          .setPopupContent(`<b>${place.name}</b><br>Status: Odwiedzone! ✅`);
      }

      pointsOfInterest.push(place);
    });
  })
  .catch((error) => console.error("Błąd ładowania JSON:", error));

///////////////////////////////////////////////////////////////////////////////////////////////

function isLocationVisited(place) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const currentUser = localStorage.getItem("currentUser");
  const user = users.find((u) => u.email === currentUser);

  if (!user || !user.locations) {
    return false;
  }

  return user.locations.some(
    (loc) =>
      loc.name === place.name ||
      (loc.lat === place.lat && loc.lng === place.lng),
  );
}

function onLocationError(e) {
  e.message;
}
map.on("locationerror", onLocationError);

function onLocationFound(e) {
  radius = 70; //(e.accuracy > 100) ? 100 : (e.accuracy < 50) ? 50 : e.accuracy;

  if (userMarker) {
    map.removeLayer(userMarker);
  }

  if (userCircle) {
    map.removeLayer(userCircle);
  }

  if (!isUserMapPopup) {
    userMarker = L.marker(e.latlng)
      .addTo(map)
      .bindPopup("Jesteś w promieniu " + radius + " metrów od tego punktu")
      .openPopup();
    isUserMapPopup = true;
  } else {
    userMarker = L.marker(e.latlng).addTo(map);
  }

  userCircle = L.circle(e.latlng, radius).addTo(map);

  console.log("Meep");
}

map.on("locationfound", onLocationFound);

map.on("locationfound", function (e) {
  const userLatLng = e.latlng;
  const proximityRadius = 70;

  ////                  TODO:
  ////                          ZOPTYMALIZOWAĆ SZUKANIE, TAK ABY BRAŁO POD UWAGĘ TYLKO TE LOKACJE
  ////                          KTÓRE SĄ REALISTYCZNIE MOŻLIWE DO ODWIEDZENIA.

  pointsOfInterest.forEach((p) => {
    const dist = userLatLng.distanceTo([p.lat, p.lng]);

    ////                TODO:   TECHNICZNIE RZECZ BIORĄC POWINNO W TYM IF SPRAWDZAĆ CZY USER MA TO ODKRYTE, ALE MEH
    if (dist < proximityRadius && p.visited === false) {
      p.visited = true;

      p.marker.setIcon(greenIcon);
      p.marker
        .setPopupContent(`<b>${p.name}</b><br>Status: Odwiedzone! ✅`)
        .openPopup();

      console.log(`Odkryłeś nowe miejsce: ${p.name}!`);
      addLocationToUser(p.name, p.lat, p.lng, p.info);
    }
  });
});

//Debug
//#region Debug

function onMapClick(e) {
  console.log("Kliknięto w: " + e.latlng.lat + ", " + e.latlng.lng);
}

map.on("click", onMapClick);

//#endregion

function addLocationToUser(locName, lat, lng, info) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const currentUser = localStorage.getItem("currentUser");
  const user = users.find((u) => u.email === currentUser);

  if (user) {
    const newLoc = new Location(locName, lat, lng, info);
    if (!user.locations) user.locations = [];

    const isDuplicate = user.locations.some(
      (loc) => loc.name === locName || (loc.lat === lat && loc.lng === lng),
    );

    if (isDuplicate) {
      //alert("Ta lokacja została już wcześniej odwiedzona!");
      return;
    }

    user.locations.push(newLoc);

    localStorage.setItem("users", JSON.stringify(users));
    alert(`Dodano nową lokację: "` + locName + `" do Twojej listy!`);
  } else {
    alert("Musisz być zalogowany, aby zapisywać lokacje.");
  }
}
