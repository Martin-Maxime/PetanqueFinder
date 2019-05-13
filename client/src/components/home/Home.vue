<template>
<div>
    <request-component></request-component>
    <search-game-component></search-game-component>
</div>
</template>

<script>
import RequestComponent from "@/components/request/Request.vue";
import SearchGame from "@/components/forms/search-game/SearchGame.vue";
export default {
  name: "HomeComponent",
  components: {
    "request-component": RequestComponent,
    "search-game-component": SearchGame
  }
};
</script>