<template>
  <div class="requests">
    <h1>Liste des recherches de joueurs</h1>
    <div v-if="requests.length > 0" class="table-wrap">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Prénom</th>
            <th scope="col">Adresse</th>
            <th scope="col">Ville</th>
            <th scope="col">Code postal</th>
            <th scope="col">Nombre de joueur recherché</th>
            <th scope="col">Niveau</th>
            <th scope="col">Posté le</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="request in this.requests">

            <td>{{ request.city }}</td>
            <td>{{ request.postcode }}</td>
            <td>{{ request.nbPlayer }}</td>
            <td>{{ request.lvlPlayer }}</td>
            <td>{{ request.created_on }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      Personne ne recherche de joueurs.
    </div>
  </div>
</template>

<script>

import RequestsService from '@/services/RequestsService'
export default {
  name: 'RequestComponent',
  data () {
    return {
      requests: []
    }
  },
  methods: {
    async getRequests () {
      const response = await RequestsService.listRequests()
      console.log(response)
      this.requests = response.data.requests

    },
  },
  mounted () {
    this.getRequests()
  }
}
</script>