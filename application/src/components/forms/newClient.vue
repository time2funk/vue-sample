<template>
  <v-flex class="create" absolute>
    <v-fab-transition>
      <v-dialog v-model="dialog" persistent max-width="680px">
        <v-btn
          absolute
          dark
          slot="activator"
          fab
          bottom
          left
          color="pink">
          <v-icon>add</v-icon>
        </v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">Add Client</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field label="Client name"
                                v-model="newClient.name"
                                required>
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field label="Email"
                                v-model="newClient.email">
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field label="Phone"
                                type="phone"
                                hint="must be unique for each client"
                                v-model="newClient.phone"
                                required
                                persistent-hintrequired>
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-select
                    label="Practice Area"
                    autocomplete
                    v-model="newClient.area"
                    required
                    :items="['Criminal', 'Family', 'Appeals', 'Civil']"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field label="Case Name"
                                v-model="newClient.case">
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Note"
                                multi-line
                                v-model="newClient.note">
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click.native="saveClient()">Save</v-btn>
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
  // props: ['newName', 'newEmail', 'newPhone', 'newPractice', 'newCaseName'],
  data () {
    return {
      dialog: false,
      newClient: {
        user_id: this.$cookie.get('user_id'),
        name: '',
        email: '',
        phone: '',
        practice: '',
        case: '',
        note: '',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': Authentication.getAuthenticationHeader(this)
        }
      }
    }
  },
  methods: {
    saveClient () {
      Axios.post(
        `${LeadFlowAPI}/api/v1/newclient`,
        this.newClient
      ).then(
        console.log(this.newClient.area),
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
    height: 0;
  }
</style>
