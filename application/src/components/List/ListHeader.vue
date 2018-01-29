<template lang="html">
  <div>
    <header class="l-list-header">
      <div  class="md-list-header white--text"
            v-if="headers != null"
            v-for="(header, index) in headers" :key="header.key">
        {{ header,leadsVisible }}
      </div>
    </header>
    <section class="l-list-body">
      <div class="md-list" v-if="data != null" v-for="(item, index) in data">

        <div :class="leadsVisible ? 'md-lead-info black--text' : 'md-client-info black--text'"
            v-for="info in item"
            v-if="info != item._id && info != item.note && info != item.client_id">
            {{ info }}
        </div>

        <div v-if="leadsVisible" class="md-lead-info black--text note-cell">

          <v-flex v-if="edit != 0 && item._id === edit"  class="note-div">

            <v-text-field v-if="item.note != null && item.note != ''" class="note"
                          label="Edit your note"
                          v-model="item.note"
                          :placeholder="item.note"
                          required
                          color="blue accent-3">
            </v-text-field>
            <v-text-field v-else class="note"
                          label="Enter your note"
                          v-model="item.note"
                          required
                          color="blue accent-3">
            </v-text-field>
          </v-flex>

          <div v-else-if="item.note != null && item.note != ''" class="note-cur">{{ item.note }}</div>

          <div v-else class="note-div">
            <v-text-field class="note"
                          label="Enter your note"
                          v-model="item.note"
                          required
                          color="blue accent-3">
            </v-text-field>
          </div>

        </div>

        <div v-else-if="leads != null" class="md-client-info black--text notes">
          <div class="white--text note" v-for="lead in leads" xs12 v-if="lead.client_id == item._id && lead.note != null && lead.note != ''">
            <v-card color="cyan darken-2" class="white--text">
              <v-container fluid grid-list-lg>
                {{lead.note}}
              </v-container>
            </v-card>
          </div>
        </div>

        <div :class="leadsVisible ? 'md-lead-actions' : 'md-client-actions'">

          <v-btn v-if="leadsVisible && item.note != null && item.note != '' && item._id != edit"
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
          </v-btn>

          <v-btn flat fab small color="blue accent-3" @click.native="openDetails('/details',item._id)">
            <v-icon>visibility</v-icon>
          </v-btn>

          <v-btn flat fab small color="red lighten-1" @click.native="deleteNote(item._id)">
            <v-icon>delete_forever</v-icon>
          </v-btn>

        </div>

        <!-- <div v-if="item._id == '5a035c8a7782404703006b8b'" class="debug left">
          1 - {{flag}}<br>
          2 - {{item.note}}<br>
          3 - {{edit}}
        </div>
        <div v-if="item._id == '5a035ca97782404703006b8c'" class="debug right">
          1 - {{flag}}<br>
          2 - {{item.note}}<br>
          3 - {{edit}}
        </div> -->

      </div>
    </section>
  </div>
</template>

<script>
  import List from '@/components/List'
  export default {
    props: ['data', 'leads', 'clients', 'leadHeaders', 'clientHeaders', 'leadsVisible', 'headers'],
    data () {
      return {
        edit: 0
      }
    },
    methods: {
      openDetails (redirect, leadId) {
        List.goToDetails(redirect, leadId)
      },
      editNote (leadId, leadBuffer, leadNote) {
        List.editNote(leadId, leadBuffer, leadNote)
      },
      saveNote (leadId, leadBuffer, leadNote) {
        List.saveNote(leadId, leadBuffer, leadNote)
      },
      deleteNote (leadId) {
        List.deleteNote(leadId)
      }
    }
  }
</script>

<style lang="scss">
  @import './../../assets/styles';

  .l-list-header {
    display: none;
    width: 100%;

    @media (min-width: 864px) {
      margin: 25px 0 0;
      display: flex;
    }

    .md-list-header {
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
    }
  }
</style>
