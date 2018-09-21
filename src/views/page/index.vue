<template>
    <div>
        <p>{{msg}}</p>
        <button @click="add">add</button>
        <div>{{this.demo}}</div>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'page',
  data () {
    return {
      msg: 'this is demo2'
    }
  },
  mounted () {
    console.log('pagess', this.demo)
  },
  methods: {
    add () {
      console.log(1)
      console.log(this.$store)
      this.$store.dispatch('set_count', 12)
    }
  },
  computed: {
    ...mapState({
      demo (state) {
        console.log('state', state)
        return state.Page.demo
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  p {
    color: yellowgreen
  }
</style>
