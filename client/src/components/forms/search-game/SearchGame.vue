<template>
  <div id="app">
      <div class="left-side">
        Rechercher une partie autour de moi
        <button class="geoloc" v-on:click="geoLocate"></button>
      </div>
      <input id="autocomplete"
             placeholder="Enter your address"
             onFocus=""
             type="text"/>

             <table id="address">
              <tr>
                <td class="label">Street address</td>
                <td class="slimField"><input class="field" id="street_number" disabled="true"/></td>
                <td class="wideField" colspan="2"><input class="field" id="route" disabled="true"/></td>
              </tr>
              <tr>
                <td class="label">City</td>
                <td class="wideField" colspan="3"><input class="field" id="locality" disabled="true"/></td>
              </tr>
              <tr>
                <td class="label">State</td>
                <td class="slimField"><input class="field" id="administrative_area_level_1" disabled="true"/></td>
                <td class="label">Zip code</td>
                <td class="wideField"><input class="field" id="postal_code" disabled="true"/></td>
              </tr>
              <tr>
                <td class="label">Country</td>
                <td class="wideField" colspan="3"><input class="field" id="country" disabled="true"/></td>
              </tr>
            </table>
  </div>
</template>

<script>
export default {
  name: "SearchGame",

  methods: {
    geoLocate: function(event) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          var circle = new google.maps.Circle({
            center: geolocation,
            radius: position.coords.accuracy
          });
          autocomplete.setBounds(circle.getBounds());
        });
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

      autocomplete.addListener("place_changed", fillInAddress);
    }
    initAutocomplete();

    function fillInAddress() {
      let componentForm = {
        street_number: "short_name",
        route: "long_name",
        locality: "long_name",
        administrative_area_level_1: "short_name",
        country: "long_name",
        postal_code: "short_name"
      };

      // Get the place details from the autocomplete object.
      let place = autocomplete.getPlace();
      console.log("componentForm " + componentForm);
      let placeLat = place.geometry.location.lat();
      let placeLng = place.geometry.location.lng();
      console.log("Latitude " + placeLat + " && Longitude" + placeLng);
      for (var component in componentForm) {
        document.getElementById(component).value = "";
        document.getElementById(component).disabled = false;
      }

      // Get each component of the address from the place details,
      // and then fill-in the corresponding field on the form.
      for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
          var val = place.address_components[i][componentForm[addressType]];
          document.getElementById(addressType).value = val;
        }
      }
    }
  }
};
</script>