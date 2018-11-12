<template>
  <div id="app">
    <CustomMap />
    <HelloWorld msg="Map Cli "/>

  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import CustomMap from './components/CustomMap.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
      CustomMap
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
