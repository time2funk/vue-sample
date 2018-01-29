<template lang="html">
  <main class="l-home-page">
    <app-header :leadsVisible="leadsVisible" @unsetVisibleData="leadsVisible = false" @setVisibleData="leadsVisible = true" @toggleVisibleData="leadsVisible = !leadsVisible"></app-header>

    <div class="l-home">
      <list slot="list"
                  :leadsVisible="leadsVisible"
                  :headers="headers"
                  :leadHeaders="leadHeaders"
                  :clientHeaders="clientHeaders"
                  :leads="leads"
                  :clients="clients">
      </list>
    </div>
    <v-snackbar :timeout="timeout"
                id="snackbar"
                bottom="bottom"
                color="red lighten-1"
                v-model="snackbar">
      {{ message }}
    </v-snackbar>
  </main>
</template>

<script>
import Axios from 'axios'
import Authentication from '@/components/pages/Authentication'
import List from './../List/ListBlock'

const LeadFlowAPI = `http://${window.location.hostname}:3201`

export default {
  components: {
    'list': List
  },
  watch: {
    leadsVisible: {
      handler () {
        console.log(this.leadsVisible)
      },
      deep: true
    }
  },
  data () {
    return {
      leads: [],
      clients: [],
      headers: [],
      leadHeaders: [
        {
          text: 'Name',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        { text: 'Date', sortable: true, value: 'datems' },
        { text: 'Type', sortable: true, value: 'type' },
        { text: 'Note', sortable: false },
        { text: 'Status', value: 'status' },
        { text: 'Actions', sortable: false }
      ],
      clientHeaders: [
        {
          text: 'Name',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        { text: 'Practice Area', value: 'area', sortable: true },
        { text: 'Case', value: 'case', sortable: true },
        { text: 'E-mail', value: 'email' },
        { text: 'Phone', value: 'phone' },
        { text: 'Notes', sortable: false }
        // { text: 'Actions', sortable: false }
      ],
      leadsVisible: true,
      snackbar: false,
      timeout: 6000,
      message: ''
    }
  },
  mounted () {
    this.getAllLeads()
    this.getAllClients()
  },
  methods: {
    getAllClients () {
      Axios.get(`${LeadFlowAPI}/api/v1/client`, {
        headers: {
          'Authorization': Authentication.getAuthenticationHeader(this)
        },
        params: {
          user_id: this.$cookie.get('user_id')
        }
      }).then(({data}) => {
        // console.log(this.$cookie.get('user_id'))
        // console.log('THIS.CLIENTS', data)
        this.clients = this.dataParser(data, '_id', 'name', 'area', 'case', 'email', 'note', 'phone')
      }).catch(error => {
        this.snackbar = true
        this.message = error.message
      })
    },
    getAllLeads () {
      Axios.get(`${LeadFlowAPI}/api/v1/lead`, {
        headers: {
          'Authorization': Authentication.getAuthenticationHeader(this)
        },
        params: {
          user_id: this.$cookie.get('user_id')
        }
      }).then(({data}) => {
        // console.log(this.$cookie.get('user_id'))
        // console.log('THIS.LEADS', data)
        this.leads = this.dataParser(data, '_id', 'name', 'date', 'datems', 'type', 'status', 'message', 'note', 'client_id', 'inbox_id')
      }).catch(error => {
        this.snackbar = true
        this.message = error.message
      })
    },
    dataParser (targetedArray, ...options) {
      let parsedData = []
      targetedArray.forEach(item => {
        let parsedItem = {}
        options.forEach(option => (parsedItem[option] = item[option]))
        parsedData.push(parsedItem)
      })
      return parsedData
    }
  }
}
</script>

<style lang="scss">
  @import './../../assets/styles';

  .l-home {
    background-color: $background-color;
    margin: 25px auto;
    padding: 15px;
    min-width: 272px;
  }
</style>
