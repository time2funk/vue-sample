<template>
  <v-app>
    <v-container id="logo">
      <v-layout row wrap>
        <v-flex xs12>
          <img src="./assets/logo.png"></img>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container id="content">
      <router-view/>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  mounted () {
    // console.log(this.$vuetify.breakpoint.width)
    // console.log(this.$vuetify.breakpoint.name)
  },
  computed: {
    imageHeight () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '220px'
        case 'sm': return '400px'
        case 'md': return '500px'
        case 'lg': return '600px'
        case 'xl': return '800px'
      }
    }
  }
}
</script>

<style lang="stylus">
  // @require './stylus/main'
</style>
<style lang="scss">
  @import './assets/styles';
  body {
    background: url('./assets/images/background.jpg') no-repeat center center fixed;
    background-size: cover;

    &:after {
      content: '';
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: $background-tint;
      opacity: .85;
      z-index: -1;
    }
    #vueg-background {
      visibility: hidden;
    }
    .application {
      &.theme--light {
        background: none;
      }

      .container {
        form {
          color: red;
        }
      }
    }
  }
  v-text-field {
    color: blue;
  }
  #logo,
  #{headings(1,6)} {
    text-align: center;
  }
  #logo {
    @media (max-width: 863px) {
      max-height: 200px;
    }
    img {
      max-width: 25%;
      margin: 0 auto;
    }
    @media (min-width: 864px) {
      max-height: 250px;
    }
  }
  #logo,
  #content {
    max-width: 100%;
    width: 100%;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #1b0930;
    margin-top: 40px;
  }
</style>
