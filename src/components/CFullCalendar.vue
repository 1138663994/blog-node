<template>
  <div id="fullcalendar"></div>
</template>

<script>
import 'fullcalendar'
import 'fullcalendar/dist/locale/zh-cn.js'

export default {
  name: 'CFullcalendar',
  mounted () {
    let config = Object.assign({}, this.defaultOptions, this.options)
    this.instance = $('#fullcalendar').fullCalendar(config)
  },
  data () {
    return {
      instance: null,
      defaultOptions: {
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month'
        },
        buttonIcons: false, // show the prev/next text
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        eventLimit: true // allow "more" link when too many events
      }
    }
  },
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style>
@import "~fullcalendar/dist/fullcalendar.css";
#fullcalendar {
  padding: 40px;
  background-color: #fff;
}
</style>
