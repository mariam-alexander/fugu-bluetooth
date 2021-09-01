<template>
  <div>
    <h2>Discover bluetooth devices</h2>
    <button @click="onButtonClick">Discover</button>
    <p>{{ message }}</p>
    <ul v-if="device"><li>
      <b>Name:</b> {{ device.name}}
    </li>
    <li>
      <b>Id:</b> {{device.id}}
    </li>
      <li>
        <b>Connected:</b> {{device.gatt.connected}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Discover",
  data(){
    return {
      message: "",
      device: null
    };
  },
  methods: {
    async onButtonClick() {
      console.log("Button Clicked");
      const availability = await navigator.bluetooth.getAvailability();
      if(availability) {
        this.message = "Bluetooth support available in this device"
      } else {
        this.message = "Bluetooth is not supported"
      }
      let options = {};
      options.acceptAllDevices = true;

      console.log('Requesting Bluetooth Device...');
      console.log('with ' + JSON.stringify(options));
      navigator.bluetooth.requestDevice(options)
          .then(device => {
            this.device = device;
            console.log('> Name:             ' + device.name);
            console.log('> Id:               ' + device.id);
            console.log('> Connected:        ' + device.gatt.connected);
          })
          .catch(error => {
            console.log('Argh! ' + error);
          });

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