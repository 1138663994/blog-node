<template>
  <div class="artivcle-add">
    <div>
      <input type="text" v-model="title" placeholder="请输入标题" />
    </div>
    <div>
      <textarea v-model="txtVal" cols="30" rows="10"></textarea>
    </div>
    <div>
      <el-button type="primary"  @click="add()">添加</el-button>
      <el-button type="primary"  @click="list()">列表</el-button>
      <el-button type="primary"  @click="layout()">退出</el-button>
    </div>
    <div>
      <el-table
        :data="listData"
        style="width: 100%">
        <el-table-column
          prop="meta.createdAt"
          label="创建日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="content"
          label="内容"
          width="180">
        </el-table-column>
         <el-table-column
          label="操作"
          width="180">
          <template slot-scope="scope">
            <el-button type="primary"  @click="remove(scope.row)">删除</el-button>
            <el-button type="primary"  @click="edit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
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
      txtVal: '',
      listData: [],
      dialogVisible: false,
      dialogList: {
        title: '',
        content: ''
      }
    }
  },
  mounted () {
    this.list()
  },
  methods: {
    add () {
      console.log(this.txtVal)
      let params = {
        title: this.title,
        content: this.txtVal
      }
      this.$http.post('/blog/article/add', params).then(resp => {
        this.list()
      })
    },
    layout () {
      this.$http.post('/blog/loginout').then(resp => {
      })
    },
    list () {
      this.$http.post('/blog/article/list').then(resp => {
        this.listData = resp.data
      })
    },
    remove (item) {
      let params = {
        id: item._id
      }
      this.$http.post('/blog/article/remove', params).then(resp => {
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
      this.$http.post('/blog/article/edit', params).then(resp => {
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
</style>
