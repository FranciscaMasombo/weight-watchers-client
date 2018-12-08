<template>
  <div id="app">
    <b-navbar toggleable="md" variant="dark" type="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">Weight Watchers Group </b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/"><i class="fa fa-home" style="padding: 5px"> Home</i></b-nav-item>
          <b-nav-item to="/submissions"><i class="fa fa-plus" style="padding: 5px"> View Submissions</i></b-nav-item>
          <b-nav-item to="/add-submission"><i class="fa fa-plus" style="padding: 5px"> Add submission</i></b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/subs"><i class="fa fa-sign-in" style="padding: 5px"> Sign up </i></b-nav-item>
          <b-nav-item to="/logout"><i class="fa fa-sign-out" style="padding: 5px"> Logout </i></b-nav-item>
          <i class="fa fa-pied-piper-alt fa-1x" style="padding: 5px; color: white;"></i>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
