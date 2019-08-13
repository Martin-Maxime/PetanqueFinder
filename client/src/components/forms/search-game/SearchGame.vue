<template>
  <div id="app">
    <div class="left-side">
      <div class="form">
        <input id="autocomplete" placeholder="Enter your address" onFocus type="text">
        <button class="geoloc" v-on:click="geoLocate">Géo localisation</button>
      </div>
    </div>
  </div>
</template>

<script>
import { serverBus } from "../../../main.js";

export default {
  name: "SearchGame",
  props: ["geolocation"],
  methods: {
    geoLocate: function(event) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          let geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          let circle = new google.maps.Circle({
            center: geolocation,
            radius: position.coords.accuracy
          });
          serverBus.$emit("geoLocate", geolocation);
        });
      } else {
        console.log("Le service de géolocalisation n'est pas disponible");
      }
    }
  },

  mounted: function() {
    let placeSearch, autocomplete;

    function initAutocomplete() {
      // Create the autocomplete object, restricting the search predictions to
      // geographical location types.
      autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("autocomplete"),
        { types: ["geocode"] }
      );

      // Avoid paying for data that you don't need by restricting the set of
      // place fields that are returned to just the address components.
      autocomplete.setFields("address_components");

      autocomplete.addListener("place_changed", searchAdress);
    }
    initAutocomplete();

    function searchAdress() {
      let place = autocomplete.getPlace();
      let placeCoordinates = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      serverBus.$emit("geoLocate", placeCoordinates);
    }
  }
};
</script>