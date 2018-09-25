<template>
  <div>
    <div>
      <b-head></b-head>
    </div>
    <div class="main">
      <div class="main_wrap">
        <router-view/>
      </div>
    </div>
    <div class="footer">
      <b-footer></b-footer>
    </div>
  </div>
</template>

<script>
import BHead from '@/components/BHead'
import BFooter from '@/components/BFooter'

export default {
  name: 'blogLayoute',
  components: {
    BHead,
    BFooter
  }
}
</script>

<style lang="scss" scoped>
.main {
  background: #f6f6f6;
}
.main_wrap {
  width: 1140px;
  margin: 0 auto;
  padding: 20px 0;
}
</style>
