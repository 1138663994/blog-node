<template>
  <div>
    <div>
      <div>本周计划</div>
      <div>最新文章</div>
    </div>
    <div>
      <div id="fullcalendar"></div>
    </div>
  </div>
</template>

<script>
import 'fullcalendar'
import moment from 'moment'
import 'fullcalendar/dist/locale/zh-cn.js'
window.moment = moment

export default {
  name: 'Home',
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
        eventLimit: true,
        dayClick: (date, allDay, jsEvent, view) => {
          console.log('date', date.format())
          console.log('allDay', allDay)
          console.log('jsEvent', jsEvent)
          console.log('view', view)
        }
      }
    }
  },
  mounted () {
    this.instance = $('#fullcalendar').fullCalendar(this.defaultOptions) // eslint-disable-line
  },
  methods: {
    dayClick (item) {
      console.log(item)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>

<style>
@import "fullcalendar/dist/fullcalendar.css";
#fullcalendar {
  padding: 40px;
  background-color: #fff;
}
</style>
