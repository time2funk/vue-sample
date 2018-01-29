<template lang="html">
  <section class="l-list-container">
    <list-body  slot="list-body"
                :leadsVisible="leadsVisible"
                :headers="leadsVisible ? leadHeaders : clientHeaders"
                :data="leadsVisible ? leads : clients"
                :leads="leads"
                :clients="clients">
    </list-body>
    <!-- <list-header slot="lead-list-header"
                :leadsVisible="leadsVisible"
                :headers="leadsVisible ? leadHeaders : clientHeaders"
                :data="leadsVisible ? leads : clients"
                :leads="leads"
                :clients="clients">
    </list-header> -->
  </section>
</template>

<script>
import ListHeader from '@/components/List/ListHeader'
import ListBody from '@/components/List/ListBody'
export default {
  components: {
    'list-header': ListHeader,
    'list-body': ListBody
  },
  props: ['data', 'leads', 'clients', 'leadHeaders', 'clientHeaders', 'leadsVisible', 'noteTxt'],
  data () {
    return {
      headers: [],
      vuegConfig: {
        forwardAnim: 'fadeInUp',   // Forward transition effect,the default is fadeInRight
        backAnim: 'fadeInLeft',       // Back transition effect,the default is fadeInLeft
        disable: false
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
  @import "./../../assets/styles";
  @import "./../../assets/partials/list";
</style>
