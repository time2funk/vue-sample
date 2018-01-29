<template>
  <v-flex class="create">
    <v-fab-transition>
      <v-dialog v-model="dialog" persistent max-width="680px">
        <v-btn
          dark
          slot="activator"
          small
          fab
          center
          color="blue">
          <v-icon>visibility</v-icon>
        </v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">Details - {{leadDetails.date}}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <div id="name">
                    {{leadDetails.name}}
                  </div>
                </v-flex>
                <v-flex xs12>
                  <div id="type">
                    From {{leadDetails.type}}
                  </div>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-select
                    label="Status"
                    autocomplete
                    v-model="leadDetails.status"
                    single-line
                    :select="leadDetails.status"
                    required
                    :items="['Unknown', 'Processing', 'Negative', 'Client']"
                  >{{leadDetails.status}}</v-select>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Note"
                                v-model="leadDetails.note"
                                multi-line
                                required>
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  Message
                  <div v-html="leadDetails.message" id="message"></div>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions id='buttons'>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click.native="saveLead()">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-fab-transition>
  </v-flex>
</template>
<script>
import Axios from 'axios'
import router from '@/router'
import Authentication from '@/components/pages/Authentication'

const LeadFlowAPI = `http://${window.location.hostname}:3201`
export default {
  props: ['leads', 'leadId', 'lead'],
  data () {
    return {
      dialog: false,
      leadDetails: {
        user_id: this.$cookie.get('user_id'),
        lead_id: '',
        name: '',
        date: '',
        type: '',
        status: '',
        note: '',
        message: '',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': Authentication.getAuthenticationHeader(this)
        }
      }
    }
  },
  mounted () {
    this.getDetails(this.leads, this.leadId)
  },
  methods: {
    getDetails (leads, leadId) {
      leads.forEach(item => {
        if (item._id === leadId) {
          this.leadDetails.lead_id = leadId
          this.leadDetails.name = item.name
          this.leadDetails.date = item.date
          this.leadDetails.type = item.type
          this.leadDetails.status = item.status
          this.leadDetails.note = item.note
          this.leadDetails.message = item.message
          // console.log('THIS.LEAD', this.lead)
        }
      })
      // console.log(leads)
      // console.log(leadId)
    },
    saveLead () {
      // Axios.post(
      //   `${LeadFlowAPI}/api/v1/savelead`,
      //   this.leadDetails
      // ).then(
      Axios.get(`${LeadFlowAPI}/api/v1/savelead`, {
        headers: {
          'Authorization': Authentication.getAuthenticationHeader(this)
        },
        params: {
          user_id: this.$cookie.get('user_id'),
          lead_id: this.leadDetails.lead_id,
          status: this.leadDetails.status,
          note: this.leadDetails.note,
          items: this.leadDetails.items
        }
      }).then(
        console.log(this.leadDetails.name),
        this.dialog = false,
        // this.$forceUpdate()
        router.go({
          path: '/',
          props: { leadsVisible: false },
          force: true
        })
      )
    }
  }
}
</script>
<style lang="scss" scoped>
  .create {
    // height: 0;
  }
  #message {
    padding: 0px;
    height: 300px;
    overflow-y: scroll;
  }
  #buttons {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
  #name {
    font-size: 20px;
    font-weight: bold;
  }
  #type {
    font-size: 10px;
  }
</style>
