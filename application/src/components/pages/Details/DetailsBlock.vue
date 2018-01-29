<template lang="html">
  <section class="l-details-container">
    <div class="l-details-body">
      <div class="md-details">
        <div class="md-details-info">{{lead.name}}</div>
        <div class="md-details-info">{{lead.date}}</div>
        <div class="md-details-info">{{lead.status}}</div>
        <div class="md-details-info">
          <v-text-field class="txt"
                        label="Enter your note"
                        color="blue accent-3">
          </v-text-field>
        </div>
        <div class="l-details-actions">
          <v-btn flat small color="yellow accent-1">
            <v-icon>mode_edit</v-icon>
          </v-btn>
          <v-btn flat small color="blue accent-3" @click.native="openHome('/')">
            <v-icon>home</v-icon>
          </v-btn>
          <v-btn flat small color="red lighten-1" @click.native="idiNaHooy()">
            <v-icon>delete_forever</v-icon>
          </v-btn>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
import router from '@/router'
export default {
  props: ['lead'],
  data () {
    return {
      vuegConfig: {
        forwardAnim: 'fadeInRight',   // Forward transition effect,the default is fadeInRight
        backAnim: 'fadeInLeft',       // Back transition effect,the default is fadeInLeft
        disable: false
      }
    }
  },
  methods: {
    openHome (redirect) {
      router.push(redirect)
    },
    idiNaHooy () {
      console.log('idiNaHooy')
    }
  }
}
</script>

<style lang="scss">
  @import "./../../../assets/styles";
  .l-details-body {
    display: flex;
    flex-direction: column;
    .md-details {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin: 15px 0;
      @media (min-width: 960px) {
        flex-direction: row;
        margin: 0;
      }
      .md-details-info {
        flex-basis: 20%;
        width: 100%;
        // height: 100%;
        min-height: 50px;
        background-color: $clients-color;
        border: 1px solid $border-color-input;
        padding: 0 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        &:first-of-type, &:nth-of-type(3) {
          text-transform: uppercase;
        }
        &:nth-of-type(2) {
          text-transform: capitalize;
        }
        @media (min-width: 601px) {
          justify-content: flex-start;
        }
      }
      .l-details-actions {
        flex-basis: 20%;
        display: flex;
        background-color: $clients-color;
        border: 1px solid $border-color-input;
        align-items: center;
        justify-content: center;
        .btn {
          min-width: 45px !important;
          margin: 0 5px !important;
        }
        .note {
          width: 100%;
          padding: 0 10px;
          .txt {
            width: 100%;
          }
        }
      }
    }
  }
</style>
