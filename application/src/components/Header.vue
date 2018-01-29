<template lang="html">
  <header class="l-header-container">
    <v-layout row wrap :class="leadsVisible ? 'l-leads-header' : 'l-clients-header'">
      <v-flex xs4 md2>
        <!-- <v-text-field v-model="search"
                      label="search"
                      append-icon="search"
                      :color="leadsVisible ? 'blue accent-3' : 'deep-purple lighten-2'">
        </v-text-field> -->
        <v-btn  block
                color="green lighten-3"
                @click="getLeads()">
                <!-- <v-icon>refresh</v-icon> -->
                Get Leads
        </v-btn>
      </v-flex>

      <v-flex xs4 offset-md1 md2>
        <v-btn  block
                :color="leadsVisible ? 'blue accent-3' : 'blue-grey lighten-3'"
                @click.native="$emit('setVisibleData')">
          Leads
        </v-btn>

      </v-flex>

      <v-flex xs4 md2>
        <v-btn  block
                :color="!leadsVisible ? 'blue accent-2' : 'blue-grey lighten-3'"
                @click.native="$emit('unsetVisibleData')">
          Clients
        </v-btn>
      </v-flex>

      <!-- <v-flex xs12 offset-md1 md1>
        <v-btn  block
                :color="leadsVisible ? 'blue accent-3' : 'deep-purple lighten-2'"
                @click.native="$emit('toggleVisibleData')">
                {{ leadsVisible ? "Leads" : "Clients" }}
        </v-btn>
      </v-flex> -->

      <!-- <v-flex xs12 offset-md1 sm3>
        <v-select label="Status"
                  :color="leadsVisible ? 'blue accent-3' : 'deep-purple lighten-2'"
                  v-model="status"
                  :items="statusItems"
                  single-line>
        </v-select>
      </v-flex> -->

      <v-flex xs12 offset-md4 md1>
        <v-btn block color="red lighten-1 white--text" @click.native="submitSignout()">Sign out</v-btn>
      </v-flex>
    </v-layout>
  </header>
</template>

<script>
import Axios from 'axios'
import router from '@/router'
import Authentication from '@/components/pages/Authentication'

const LeadFlowAPI = `http://${window.location.hostname}:3201`

export default {
  props: ['leadsVisible'],
  data () {
    return {
      search: '',
      status: '',
      statusItems: [
        'All', 'Unknown', 'Processing', 'Negative', 'Client'
      ]
    }
  },
  methods: {
    submitSignout () {
      Authentication.signout(this, '/login')
    },
    getLeads () {
      Axios.get(`${LeadFlowAPI}/api/v1/lead/fetch`, {
        headers: {
          'Authorization': Authentication.getAuthenticationHeader(this)
        },
        params: {
          user_id: this.$cookie.get('user_id')
        }
      }).then(
        router.go({
          path: '/',
          force: true
        })
      ).catch(error => console.log(error))
    }
  }
}
</script>

<style lang="scss">
  @import './../assets/styles';

  .l-header-container {
    background-color: $background-color;
    margin: 0 auto;
    padding: 0 15px;
    min-width: 272px;

    .l-leads-header {
      label, input, .icon, .input-group__selections__comma {
        color: #2979ff !important;
      }
    }

    .l-clients-header {
      label, input, .icon, .input-group__selections__comma {
        color: #ac70c9 !important;
      }
    }

    .input-ground__details {
      &:before {
        background-color: $border-color-input !important;
      }
    }

    .btn {
      // margin-top: 15px;
    }

    // @media (min-width: 601px) {
    //   .v-flex {
    //     width: 50%;
    //   }
    // }
  }
</style>
