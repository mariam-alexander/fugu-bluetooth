<template>
  <div><h1>🐡 Home page</h1>
    <Discover></Discover>
    <BatteryLevel></BatteryLevel>
  </div>
</template>

<script>
import Discover from "@/components/Discover";
import BatteryLevel from "@/components/BatteryLevel";

export default {
  name: "Home.vue",
  components: {
    BatteryLevel,
    Discover
  }
}
</script>

<style scoped>

</style>