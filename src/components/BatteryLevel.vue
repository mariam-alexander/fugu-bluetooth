<template>
  <div>
    <h2>Battery Level</h2>
    <button @click="getBatteryLevel">Get Battery Level</button>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: "BatteryLevel",
  data() {
    return {
      message: ""
    }
  },
  methods: {
    async getBatteryLevel() {
      try {
        this.message = 'Requesting Bluetooth Device...';
        console.log(this.message);

        const device = await navigator.bluetooth.requestDevice({
          // filters: [{services: ['battery_service']}],
          acceptAllDevices: true,
          optionalServices: ['battery_service']
        });

        this.message = 'Connecting to GATT Server...';
        console.log(this.message);
        const server = await device.gatt.connect();

        this.message = 'Getting Battery Service...';
        console.log(this.message);
        const service = await server.getPrimaryService('battery_service');

        this.message = 'Getting Battery Level Characteristic...';
        console.log(this.message);
        const characteristic = await service.getCharacteristic('battery_level');

        this.message = 'Reading Battery Level...';
        console.log(this.message);
        const value = await characteristic.readValue();

        this.message = '> Battery Level is ' + value.getUint8(0) + '%';
        console.log(this.message);
      } catch (error) {
        this.message = 'Argh! ' + error;
        console.log(this.message);
      }
    }
  }
}
</script>

<style scoped>

</style>