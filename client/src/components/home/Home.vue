<template>
  <div>
    <request-component></request-component>
    <search-game-component></search-game-component>
    <google-map-component name="example"></google-map-component>
  </div>
</template>

<script>
import RequestComponent from "@/components/request/Request.vue";
import SearchGame from "@/components/forms/search-game/SearchGame.vue";
import GoogleMap from "@/components/shared/map/map.vue";
export default {
  name: "HomeComponent",
  components: {
    "request-component": RequestComponent,
    "search-game-component": SearchGame,
    "google-map-component": GoogleMap
  }
};
</script>