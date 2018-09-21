<template>
  <div>
    <div>
      <div>本周计划</div>
      <div>最新文章</div>
    </div>
    <div>
      <div id="fullcalendar"></div>
    </div>
    <div>
      <el-dialog
        title="今日记录"
        :visible.sync="dialogVisible"
        width="30%"
        >
        <span>这是一段信息</span>
        <textarea v-model="txtVal"></textarea>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="diaryHandle">确 定</el-button>
        </span>
      </el-dialog>
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
      dataList: [{
        title: 'sdld',
        start: '2018-09-09'
      }],
      dialogVisible: false,
      dateClick: '',
      txtVal: '',
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
        events: [],
        dayClick: (date, allDay, jsEvent, view) => {
          this.dateClick = date.format()
          this.dialogVisible = true
        }
      }
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    dayClick (item) {
      console.log(item)
    },
    diaryHandle (event) {
      console.log('event', event)
      let params = {
        content: this.txtVal,
        createTime: this.dateClick
      }
      this.$http.post('/diary/add', params).then(resp => {
        console.log('resp', resp.data)
        this.dialogVisible = false
        event.title = this.txtVal
      })
      console.log('params', params)
    },
    getList () {
      this.$http.post('/diary/list').then(resp => {
        console.log('diaryList', resp.data)
        let list = []
        resp.data.map(item => {
          list.push({
            title: item.content,
            start: item.createTime
          })
        })
        let options = Object.assign(this.defaultOptions, {
          events: list
        })
        $('#fullcalendar').fullCalendar(options) // eslint-disable-line
        // $('#calendar').fullCalendar('updateEvent', list) // eslint-disable-line
        // this.dataList = list
      })
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
