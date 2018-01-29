<template>
  <div id="Inbox">
    <div v-for="item in inbox" class="l-details-body">
      <div class="md-details">
        <div class="md-details-info">{{item.type}}</div>
        <div class="md-details-info">{{item.date}}</div>
        <div  v-html="item.body" class="md-details-info"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Axios from 'axios'
import Authentication from '@/components/pages/Authentication'

const LeadFlowAPI = `http://${window.location.hostname}:3201`

export default {
  name: 'Inbox',
  data: () => ({
    inbox: ''
  }),
  mounted () {
    this.getDetails()
  },
  methods: {
    getDetails () {
      // console.log('THIS.$COOKIE.GET(\'USER_ID\')', this.$cookie.get('user_id'))
      // console.log('THIS', this)
      Axios.get(`${LeadFlowAPI}/api/v1/inbox`, {
        headers: {
          'Authorization': Authentication.getAuthenticationHeader(this)
        },
        params: {
          user_id: this.$cookie.get('user_id'),
          inbox_id: this.$route.query.inbox
        }
      }).then(
        ({data}) => (this.inbox = data),
        console.log('THIS.INBOX', this.inbox.length)
      ).catch(error => console.log(error))
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
