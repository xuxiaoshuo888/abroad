<template>
  <div id="app">
    <navigation></navigation>
    <router-view/>
    <footer class="footer" v-show="!$route.meta.foo">©&nbsp;2018&nbsp;sibe</footer>
  </div>
</template>

<style lang="scss">

</style>

<script>
  import Navigation from "./components/Navigation";
  export default {
    components: {Navigation}
  }
</script>