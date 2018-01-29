import Axios from 'axios'
import router from '@/router'
import Authentication from '@/components/pages/Authentication'
const LeadFlowAPI = `http://${window.location.hostname}:3201`

export default {
  goToDetails (redirect, leadId) {
    // if (redirect) router.push({name: 'Details', params: {leadip}})
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
  saveNote  (leadId, leadBuffer, leadNote) {
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
  editNote (leadId, leadBuffer, leadNote) {
    this.edit = leadId
    console.log('edit', this.edit)
  }
}
