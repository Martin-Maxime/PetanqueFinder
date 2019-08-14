<template>
  <div class="google-map" :id="mapName"></div>
</template>

<script>
import { serverBus } from "../../../main.js";

export default {
  name: "GoogleMap",
  props: ["name"],
  data: function() {
    return {
      centerLocation: {
        lat: 48.864716,
        lng: 2.349014
      },
      mapName: this.name + "-map",
      markerCoordinates: {
        latitude: 48.864716,
        longitude: 2.349014
      },
      markerUrl: "../../../assets/imgs/petanque-icon.svg",
      gamesMarker: [
        {
          position: {
            latitude: 48.764716,
            longitude: 2.449014
          }
          // icon: this.markerUrl
        }
      ]
    };
  },

  methods: {
    initMap: function(geolocation) {
      const element = document.getElementById(this.mapName);
      const options = {
        zoom: 14,
        center: new google.maps.LatLng(geolocation.lat, geolocation.lng)
      };
      const map = new google.maps.Map(element, options);
      if (geolocation) {
        this.markerCoordinates.latitude = geolocation.lat;
        this.markerCoordinates.longitude = geolocation.lng;

        const position = new google.maps.LatLng(
          this.markerCoordinates.latitude,
          this.markerCoordinates.longitude
        );
        const marker = new google.maps.Marker({
          position,
          map
        });
      }
      this.gamesMarker.forEach(game => {
        new google.maps.Marker({
          map: map,
          position: new google.maps.LatLng(
            game.position.latitude,
            game.position.longitude
          ),
          icon: {
            url: "https://image.flaticon.com/icons/svg/188/188993.svg",
            scaledSize: new google.maps.Size(25, 25)
          }
        }).setMap(map);
      });
    }
  },

  created() {
    serverBus.$on("geoLocate", geolocation => {
      this.geolocation = geolocation;
      if (this.geolocation) {
        console.log(this.geolocation);
        this.initMap(this.geolocation);
      }
    });
  },

  mounted: function() {
    this.initMap(this.centerLocation);
  }
};
</script>

<style scoped>
.google-map {
  width: 800px;
  height: 600px;
  margin: 0 auto;
  background: gray;
}
</style>