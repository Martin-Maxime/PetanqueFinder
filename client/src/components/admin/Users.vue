<template>
  <div class="users">
    <h1>Liste des utilisateurs</h1>
    <div v-if="users.length > 0" class="table-wrap">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Prénom</th>
            <th scope="col">Nom</th>
            <th scope="col">email</th>
            <th scope="col">Ville</th>
            <th scope="col">Code postal</th>
            <th scope="col">Role utilisateur</th>
            <th scope="col">Facebook co</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in this.users" v-bind:key="user.id">
            <td>
              <img :src="user.picture" alt>
            </td>
            <td>{{ user.firstname }}</td>
            <td>{{ user.lastname }}</td>
            <td>{{ user.email}}</td>
            <td>{{ user.city}}</td>
            <td>{{ user.postcode}}</td>
            <td>{{ user.userRole}}</td>
            <td>
              <span v-if="user.facebookId">1</span>
              <span v-else>0</span>
            </td>
            <td>
              <button @click="deleteUser(user._id)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      Il n'y à pas d'utilisateurs
      <br>
      <br>
    </div>
  </div>
</template>

<script>
import UsersService from "@/services/UsersService";
export default {
  name: "users",
  data() {
    return {
      users: []
    };
  },
  methods: {
    async getUsers() {
      const response = await UsersService.listUsers();
      this.users = response.data.users;
    },
    async deleteUser(userid) {
      await UsersService.deleteUser(userid)
        .then(response => {
          for (var index in this.users) {
            if (this.users[index]._id === response.data.id) {
              this.users.splice(index, 1);
            }
          }
        })
        .catch(error => {
          console.log("error supr user");
        });
    }
  },
  mounted() {
    this.getUsers();
  }
};
</script>