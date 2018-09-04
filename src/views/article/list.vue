<template>
  <div class="articles">
    <!-- <div>
      <input type="text" v-model="title" placeholder="请输入标题" />
    </div>
    <div>
      <textarea v-model="txtVal" cols="30" rows="10"></textarea>
    </div>
    <div>
      <el-button type="primary"  @click="add()">添加</el-button>
      <el-button type="primary"  @click="list()">列表</el-button>
      <el-button type="primary"  @click="layout()">退出</el-button>
    </div> -->
    <div>
      <el-table
        :data="listData"
        style="width: 100%">
        <el-table-column
          prop="meta.createdAt"
          label="创建日期"
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
    layout () {
      this.$http.post('/loginout').then(resp => {
      })
    },
    list () {
      this.$http.post('/article/list').then(resp => {
        this.listData = resp.data
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
</style>

<style lang="scss">
.articles {
  .el-table th>.cell {
    text-align: center;
  }
}
</style>
