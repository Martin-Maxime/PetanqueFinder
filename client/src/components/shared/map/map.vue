<template>
  <div class="google-map" :id="mapName"></div>
</template>

<script>
export default {
  name: "GoogleMap",
  props: ["name"],
  data: function() {
    return {
      mapName: this.name + "-map",
      markerCoordinates: [
        {
          latitude: 48.864716,
          longitude: 2.349014
        },
        {
          latitude: 49.864716,
          longitude: 1.349014
        },
        {
          latitude: 50.4998973,
          longitude: 3.349014
        }
      ]
    };
  },

  mounted: function() {
    const element = document.getElementById(this.mapName);
    const options = {
      zoom: 14,
      center: new google.maps.LatLng(48.864716, 2.349014)
    };
    const map = new google.maps.Map(element, options);
    this.markerCoordinates.forEach(coord => {
      const position = new google.maps.LatLng(coord.latitude, coord.longitude);
      const marker = new google.maps.Marker({
        position,
        map
      });
    });
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