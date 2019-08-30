<template>
  <div class="requests">
    <h1>Liste des recherches de joueurs</h1>
    <div v-if="requests.length > 0" class="table-wrap">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Adresse</th>
            <th scope="col">Ville</th>
            <th scope="col">Code postal</th>
            <th scope="col">Nombre joueurs</th>
            <th scope="col">Niveau joueurs</th>
            <th scope="col">Posté le</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="request in this.requests" v-bind:key="request.id">
            <td>{{ request.address.street }}</td>
            <td>{{ request.address.city }}</td>
            <td>{{ request.address.zip }}</td>
            <td>{{ request.nbPlayer }}</td>
            <td>{{ request.lvlPlayer }}</td>
            <td>{{ request.created_on }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>Personne ne recherche de joueurs.</div>
  </div>
</template>

<script>
import RequestsService from "@/services/RequestsService";
export default {
  name: "RequestComponent",
  data() {
    return {
      requests: []
    };
  },
  methods: {
    async getRequests() {
      const response = await RequestsService.listRequests();
      this.requests = response.data.requests;
      this.$store.commit("SET_REQUEST", this.requests);
    }
  },
  mounted() {
    this.getRequests();
    console.log(this.$store.getters.REQUESTS);
  }
};
</script>