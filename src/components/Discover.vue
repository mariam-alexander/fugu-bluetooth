<template>
  <div>
    <h2>Discover bluetooth devices</h2>
    <button @click="onButtonClick">Discover</button>
    <p>{{ message }}</p>
    <ul v-if="device">
      <li>
        <b>Name:</b> {{ device.name }}
      </li>
      <li>
        <b>Id:</b> {{ device.id }}
      </li>
      <li>
        <b>Connected:</b> {{ device.gatt.connected }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Discover",
  data() {
    return {
      message: "",
      device: null
    };
  },
  methods: {
    async onButtonClick() {
      console.log("Button Clicked");
      const availability = await navigator.bluetooth.getAvailability();
      if (availability) {
        this.message = "Bluetooth support available in this device"
      } else {
        this.message = "Bluetooth is not supported"
      }
      const options = {
        acceptAllDevices: true
      };

      console.log('Requesting Bluetooth Device...');
      console.log('with ' + JSON.stringify(options));
      try {
        const device = await navigator.bluetooth.requestDevice(options)
        this.device = device;
        const server =  await device.gatt.connect();
        const service = await server.getPrimaryServices();
        this.message = service;
      } catch(error){
        this.message = 'Argh! ' + error;
      }

    }
  }
}
</script>

<style scoped>
ul {
  margin: 0 auto;
  width: 600px;
  text-align: left;
}
</style>