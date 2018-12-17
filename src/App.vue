<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">Weight Watchers Group </b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/"> Home </b-nav-item>
          <b-nav-item to="/submissions"> View Members </b-nav-item>
          <b-nav-item to="/add-submission"> Register a new member </b-nav-item>
          <b-nav-item to="/add"> Register a new member </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              type="text"
              placeholder="Search"
            />
            <b-button size="sm" class="my-2 my-sm-0" type="submit"
              >Search</b-button
            >
          </b-nav-form>
          <b-nav-item-dropdown text="Admin" right>
            <b-dropdown-item to="/login"
              ><i class=" fa fa-sign-in " style="padding: 5px">
                LOGIN
              </i></b-dropdown-item
            >
            <b-dropdown-item to="/logout"
              ><i class=" fa fa-sign-out " style="padding: 5px">
                LOGOUT
              </i></b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: auto;
}
.VueTables__sortable {
  cursor: pointer;
}
</style>
