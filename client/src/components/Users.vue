<template>
  <div class="users">
    <h1>Liste des utilisateurs</h1>
    <div v-if="users.length > 0" class="table-wrap">
      <table>
        <tr v-for="user in users">
          <td>{{ user.username }}</td>
        </tr>
      </table>
    </div>
    <div v-else>
      Il n'y à pas d'utilisateurs<br /><br />
    </div>
  </div>
</template>

<script>

import UsersService from '@/services/UsersService'
export default {
  name: 'users',
  data () {
    return {
      users: []
    }
  },
  methods: {
    async getUsers () {
      const response = await UsersService.listUsers()
      this.users = response.data.users
    }
  },
  mounted () {
    this.getUsers()
  }
}
</script>