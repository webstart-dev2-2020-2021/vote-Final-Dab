<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
      <router-link v-if="user.token" to="/vote">Vote</router-link>
    <router-link v-if="!user.token" to="/register">Register</router-link> |
      <router-link v-if="user.token" to="/logout"  @click.prevent="logout">Logout</router-link>
    <router-link v-if="!user.token" to="/login">Login</router-link>
  </div>
    <div v-if="msg.error" class="text-danger">
        {{ msg.error }}
    </div>
    <div v-if="msg.success" class="text-success">
        {{ msg.success }}
    </div>
  <router-view/>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
export default {
    data() {
        return {};
    },
    computed: {
        ...mapGetters([
            'user'
        ]),
        ...mapGetters([
            'msg'
        ])
    },
    methods: {
        ...mapActions([
            'logout'
        ])
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
