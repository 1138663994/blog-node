<template>
  <div class="articles">
    <div class="hd">
      <div class="input">
        <el-input placeholder="请输入标题" v-model.trim="inputVal"></el-input>
      </div>
      <div class="input">
        <el-select v-model="category" placeholder="请选择文章分类" filterable >
          <el-option
            v-for="item in categoryList"
            :key="item._id"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>
      </div>
      <div class="input long">
        <el-date-picker
          v-model="timeVal"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions2">
        </el-date-picker>
      </div>
      <el-button @click='search'>搜索</el-button>
    </div>
    <div class="bd">
      <el-table
        :data="listData"
        v-loading.body='loadFlag'
        @sort-change="sortChange"
        style="width: 100%">
        <el-table-column
          prop="meta.createdAt"
          label="创建日期"
          sortable='column'
          >
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          >
        </el-table-column>
        <el-table-column
          prop="category.name"
          label="分类"
          >
        </el-table-column>
        <el-table-column
          prop="content"
          label="内容"
          >
        </el-table-column>
        <el-table-column
          label="是否公开"
          >
          <template slot-scope="scope">
            <span>{{scope.row.isOpen?'公开':'私密'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          >
          <template slot-scope="scope">
            <el-button type="primary"  @click="remove(scope.row)">删除</el-button>
            <el-button type="primary"  @click="edit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pages">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <div>
        <input type="text" v-model="dialogList.title" placeholder="请输入标题" />
      </div>
      <div>
        <textarea v-model="dialogList.content" cols="30" rows="10"></textarea>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifySure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      title: '',
      loadFlag: false,
      txtVal: '',
      listData: [],
      dialogVisible: false,
      dialogList: {
        title: '',
        content: ''
      },
      inputVal: '',
      categoryList: [],
      category: '',
      timeVal: '',
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      params: {
        pageIndex: 1,
        order: '',
        title: ''
      },
      total: 1,
      currentPage: 1
    }
  },
  mounted () {
    this.list()
    this.getCategoryList()
  },
  methods: {
    search () {
      this.params.title = this.inputVal
      console.log('params', this.params)
      this.list()
    },
    handleCurrentChange (i) {
      console.log(i)
    },
    handleSizeChange (i) {
      console.log(i)
    },
    sortChange ({ column, prop, order }) {
      let orders
      switch (order) {
        case 'descending':
          orders = 'desc'
          break
        case 'ascending':
          orders = 'asc'
          break
        default:
          orders = ''
      }
      this.params.order = orders
      this.list()
    },
    layout () {
      this.$http.post('/loginout').then(resp => {
      })
    },
    getCategoryList () {
      this.$http.post('/articleCategory/list').then(resp => {
        let data = resp.data
        this.categoryList = data
      })
    },
    list () {
      this.loadFlag = true
      let params = this.params
      this.$http.post('/article/list', params).then(resp => {
        this.listData = resp.data.rows
        console.log('resp', resp.data)
        this.loadFlag = false
      })
    },
    remove (item) {
      let params = {
        id: item._id
      }
      this.$http.post('/article/remove', params).then(resp => {
        console.log('remove', resp.data)
        this.list()
      })
    },
    edit (item) {
      this.dialogVisible = true
      this.dialogList = {
        title: item.title,
        content: item.content,
        id: item._id
      }
    },
    modifySure () {
      console.log('modify', this.dialogList)
      let params = this.dialogList
      this.$http.post('/article/edit', params).then(resp => {
        console.log('edit', resp.data)
        this.dialogVisible = false
        this.list()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 500px;
  height: 300px;
  position: relative;
}
.hd {
  background: #fff;
  padding: 20px;
  text-align: left;
  .input {
    width: 180px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 20px;
    &.long {
      width: 350px;
    }
  }
}
.bd {
  margin-top: 10px;
}
.pages {
  margin-top: 20px;
}
</style>

<style lang="scss">
.articles {
  .el-table th>.cell {
    text-align: center;
  }
}
</style>
