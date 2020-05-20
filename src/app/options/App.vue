<template>
  <div class="mig__main">
    <side-bar></side-bar>
  </div>
</template>
<script>
import SideBar from './components/side-bar'

export default {
  components: { SideBar },
  data () {
    return {
      name: 'tom',
    }
  },
}
</script>
<style lang="less" scoped>
</style>