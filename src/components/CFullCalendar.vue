<template>
  <div id="fullcalendar"></div>
</template>

<script>
import 'fullcalendar'
import moment from 'moment'
import 'fullcalendar/dist/locale/zh-cn.js'
window.moment = moment

export default {
  name: 'CFullcalendar',
  mounted () {
    this.instance = $('#fullcalendar').fullCalendar(_.extend(this.defaultOptions, this.options))
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
