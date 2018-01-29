<template>
  <main class="l-details-page">
    <app-header></app-header>
    <header class="l-details-header">
      <div class="md-details-header white--text">User</div>
      <div class="md-details-header white--text">Date</div>
      <div class="md-details-header white--text">Note</div>
      <div class="md-details-header white--text">Status</div>
      <div class="md-details-header actions white--text">Actions</div>
    </header>
    <div class="l-details">
      <details-block :lead="lead"/>
    </div>
  </main>
</template>

<script>
import Axios from 'axios'
import Authentication from '@/components/pages/Authentication'

const LeadFlowAPI = `http://${window.location.hostname}:3201`

export default {
  data () {
    return {
      lead: ''
    }
  },
  mounted () {
    this.getDetails()
  },
  methods: {
    getDetails () {
      console.log('THIS.$COOKIE.GET(\'USER_ID\')', this.$cookie.get('user_id'))
      Axios.get(`${LeadFlowAPI}/api/v1/lead/details`, {
        headers: {
          'Authorization': Authentication.getAuthenticationHeader(this)
        },
        params: {
          user_id: this.$cookie.get('user_id'),
          lead_id: this.$route.query.lead
        }
      }).then(({data}) => (this.lead = data))
    }
  }
}
</script>

<style lang="scss">
  @import './../../../assets/styles';
  .l-details-header {
    display: none;
    width: 100%;

    @media (min-width: 864px) {
      margin: 25px 0 0;
      display: flex;
    }

    .md-details-header {
      width: 100%;
      background-color: $background-color;
      border: 1px solid $border-color-input;
      padding: 0 15px;
      display: flex;
      height: 45px;
      align-items: center;
      justify-content: center;
      font-size: 22px;

      @media (min-width: 601px) {
        justify-content: flex-start;
      }

      &.actions {
        .md-details-info {
          flex-basis: 20%;
        }
      }
    }
  }
</style>
