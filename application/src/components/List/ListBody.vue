<template lang="html">
  <v-card class="l-list-body"  style="position: relative">
    <v-card-title>
      <h1>
        {{leadsVisible ? 'Leads' : 'Clients'}}
      </h1>
      <v-spacer></v-spacer>
      <!-- <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search"
      ></v-text-field> -->
    </v-card-title>
    <v-data-table
      :leadsVisible="leadsVisible"
      :headers="headers"
      :items="data"
      :leads="leads"
      :search="search"
      :pagination.sync="pagination"
      :total-items="totalItems"
      :loading="loading"
      :rows-per-page-items="[10000]"
      must-sort
      expand
      no-data-text="Loading data..."
      class="elevation-1">
      <template slot="items" slot-scope="props">
        <td id="tName">{{ props.item.name }}</td>
        <td id="tArea" v-if="!leadsVisible" class="text-xs-right">{{ props.item.area }}</td>
        <td id="tCase" v-if="!leadsVisible" class="text-xs-right">{{ props.item.case }}</td>
        <td id="tDmail" class="text-xs-right">{{ leadsVisible ? props.item.date : props.item.email }}</td>
        <td id="tPhone" v-if="!leadsVisible" class="text-xs-right">
          {{ props.item.phone }}
        </td>
        <td id="tType" v-if="leadsVisible" class="text-xs-right">{{ props.item.type }}</td>
        <td id="tNote" v-if="leadsVisible" class="text-xs-right">
          <!-- <v-edit-dialog  lazy
                          large
                          class="white--text note"
                          v-for="item in clients"
                          :key="item._id"
                          xs12
                          v-if="item._id == props.item.client_id && props.item.note != null && props.item.note != ''">
                          {{ props.item.note }}
            <v-text-field slot="input"
                          label="Edit"
                          v-model="props.item.note"
                          single-line
                          counter>
            </v-text-field> -->
            <div class="white--text note" xs12 v-if="props.item.note != null && props.item.note != ''">
              <v-card color="cyan darken-2" class="white--text">
                <v-card-title primary-title>
                  <!-- <div class="headline">Unlimited music now</div> -->
                  <div>{{ props.item.note }}</div>
                </v-card-title>
                <!-- <v-card-actions>
                  <v-btn flat dark>Listen now</v-btn>
                </v-card-actions> -->
              </v-card>
              <!-- <v-chip class="white--text"
                      color="cyan darken-2">
                {{ props.item.note }}
              </v-chip> -->
            </div>
          </v-edit-dialog>
        </td>
        <td id="tNote" v-else class="text-xs-right">
          <div class="white--text note" xs12 v-if="props.item.note != null && props.item.note != ''">
            <v-card color="cyan darken-2" class="white--text">
              <v-card-title primary-title>
                <div>{{ props.item.note }}</div>
              </v-card-title>
            </v-card>
            <!-- <v-chip class="white--text"
                    color="cyan darken-2">
              {{ props.item.note }}
            </v-chip> -->
          </div>
          <div class="white--text note" v-for="item in leads" xs12 v-if="item.client_id == props.item._id && item.note != null && item.note != ''">
            <v-card color="cyan darken-2" class="white--text">
              <v-card-title primary-title>
                <div>{{ props.item.note }}</div>
              </v-card-title>
            </v-card>
            <!-- <v-chip class="white--text"
                    color="cyan darken-2">
              {{item.note}}
            </v-chip> -->
          </div>
        </td>
        <td id="tStatus" v-if="leadsVisible && props.item.status == 'Processing'" :class="['text-xs-center', 'yellow lighten-3']">{{ props.item.status }}</td>
        <td id="tStatus" v-else-if="leadsVisible && props.item.status == 'Negative'" :class="['text-xs-center', 'red lighten-3']">{{ props.item.status }}</td>
        <td id="tStatus" v-else-if="leadsVisible && props.item.status == 'Client'" :class="['text-xs-center', 'green accent-2']">{{ props.item.status }}</td>
        <td id="tStatus" v-else-if="leadsVisible" :class="['text-xs-center', 'blue-grey lighten-3']">{{ props.item.status }}</td>
        <td v-if="leadsVisible" id="tActions" :class="['text-xs-right', leadsVisible ? 'md-lead-actions' : 'md-client-actions']" style="position: relative">

            <!-- <v-btn v-if="leadsVisible && item.note != null && item.note != '' && item._id != edit"
                    small
                    fab
                    flat
                    color="yellow accent-1"
                    @click.native="editNote(item._id)">
              <v-icon>edit</v-icon>
            </v-btn>

            <v-btn v-if="leadsVisible && (item.note == null || item.note == '' || item._id === edit)"
                    small
                    fab
                    flat
                    color="green accent-1"
                    @click.native="saveNote(item._id, item.note, item.note)">
              <v-icon>save</v-icon>
            </v-btn> -->

            <!-- <v-btn flat fab small color="blue accent-3" @click.native="openDetails('/details',props.item._id)">
              <v-icon>visibility</v-icon>
            </v-btn> -->
            <!-- {{props.item._id}} -->
            <lead-details class="details"
                        :leads='leads'
                        :leadId="props.item._id"
                        absolute>
            </lead-details>

            <!-- <v-btn v-if="!leadsVisible" flat fab small color="red lighten-1" @click.native="delClient(props.item._id)">
              <v-icon>delete_forever</v-icon>
            </v-btn> -->

        </td>
      </template>
    </v-data-table>

    <!-- <new-client class="create"
                absolute
                v-if="!leadsVisible">
    </new-client> -->
    <new-client class="create-top"
                absolute
                v-if="!leadsVisible">
    </new-client>

  </v-card>
</template>

<script>
  import Axios from 'axios'
  import router from '@/router'
  import newClient from '@/components/forms/newClient'
  import leadDetails from '@/components/forms/leadDetails'
  import Authentication from '@/components/pages/Authentication'
  const LeadFlowAPI = `http://${window.location.hostname}:3201`
  export default {
    components: {
      'new-client': newClient,
      'lead-details': leadDetails
    },
    props: ['data', 'leads', 'clients', 'leadHeaders', 'clientHeaders', 'leadsVisible', 'noteTxt', 'headers'],
    data () {
      return {
        dialog: false,
        search: '',
        totalItems: 0,
        loading: true,
        items: [],
        current: 0,
        note: null,
        flag: null,
        edit: 0,
        pagination: {
          sortBy: 'datems',
          descending: true
        },
        cellColor: 'sraka'
      }
    },
    watch: {
      pagination: {
        handler () {
          this.getDataFromApi(this.leadsVisible)
            .then(data => {
              this.items = data.items
              this.totalItems = data.total
            })
        },
        deep: true
      }
    },
    mounted () {
      this.getDataFromApi(this.leadsVisible)
        .then(data => {
          this.items = data.items
          this.totalItems = data.total
        })
    },
    methods: {
      getDataFromApi (leadsVisible) {
        this.loading = true
        return new Promise((resolve, reject) => {
          const { sortBy, descending, page, rowsPerPage } = this.pagination

          let items = ''
          if (leadsVisible) {
            items = this.leads
          } else {
            items = this.clients
          }
          const total = items.length

          if (this.pagination.sortBy) {
            items = items.sort((a, b) => {
              const sortA = a[sortBy]
              const sortB = b[sortBy]

              if (descending) {
                if (sortA < sortB) return 1
                if (sortA > sortB) return -1
                return 0
              } else {
                if (sortA < sortB) return -1
                if (sortA > sortB) return 1
                return 0
              }
            })
          }

          if (rowsPerPage > 0) {
            items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage)
          }

          setTimeout(() => {
            this.loading = false
            resolve({
              items,
              total
            })
          }, 1000)
        })
      },
      openDetails (redirect, leadId) {
        if (redirect) router.push({ path: `${redirect}?lead=${leadId}` })
      },
      getTxt (buffer, note, result) {
        if (note == null && buffer != null) {
          result = buffer
        } else if (note != null) {
          result = note
        } else {
          result = null
        }
        return result
      },
      editNote (leadId, leadBuffer, leadNote) {
        this.edit = leadId
        console.log('edit', this.edit)
      },
      saveNote (leadId, leadBuffer, leadNote) {
        var temp = this.getTxt(leadBuffer, leadNote)
        if (temp != null && temp !== '') {
          console.log('temp', temp)
          this.edit = 0
          this.flag = 'saved'
          console.log('THIS.EDIT', this.edit)
          Axios.get(`${LeadFlowAPI}/api/v1/lead/note`, {
            headers: {
              'Authorization': Authentication.getAuthenticationHeader(this)
            },
            params: {
              user_id: this.$cookie.get('user_id'),
              lead_id: leadId,
              note: temp
            }
          })
        } else {
          console.log('Nothing to save!')
          this.edit = 0
        }
      },
      delClient (clientId) {
        Axios.get(`${LeadFlowAPI}/api/v1/client/del`, {
          headers: {
            'Authorization': Authentication.getAuthenticationHeader(this)
          },
          params: {
            user_id: this.$cookie.get('user_id'),
            _id: clientId
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .create-top {
    position: absolute;
    top: 0;
    right: 100px;
  }
  #tName {
    width: 15%;
  }
  #tArea { // client
    width: 10%;
  }
  #tCase { // client
    width: 10%;
  }
  #tDmail {
    width: 20%;
    font-size: 9px;
  }
  #tPhone { // client
    width: 10%;
  }
  #tType { // lead
    width: 5%;
  }
  #tNote {
    width: 25%;
  }
  #tStatus { // lead
    width: 10%;
  }
  #tActions { // lead
    width: 5%;
  }
</style>
