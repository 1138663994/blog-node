<template>
  <div class="cmenu">
    <el-menu default-active="1" class="el-menu-vertical-demo" :collapse="isCollapse">
      <template v-for='(item, index) in dataList'>
        <!-- 有子节点 -->
        <template v-if='item.children' >
          <el-submenu :index="index + 1 + ''" :key="index">
            <template slot="title">
              <i class="icon" :class="item.meta.icon"></i>
              <span slot="title">{{item.meta.title}}</span>
            </template>
            <router-link
              v-for="(itm, idx) in item.children"
              :key="itm.name"
              :to="{name: itm.name}">
              <el-menu-item
                :index="index + '-' + (idx + 1)"
                :key="itm.name">
                <i class="icon" :class="itm.meta.icon"></i>
                <span slot="title">{{itm.meta.title}}</span>
              </el-menu-item>
            </router-link>
          </el-submenu>
        </template>
        <!-- 无子节点 -->
        <template v-else>
          <router-link :index="index + 1 + ''" :to="{name: item.name}" :key='index' class="router-link">
            <el-menu-item index="2">
              <i class="icon" :class="item.meta.icon"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import menuRoutes from '@/menuRoutes'
export default {
  name: 'CMenu',
  data () {
    return {
      dataList: menuRoutes,
      isCollapse: false
    }
  }
}
</script>

<style lang="scss" scoped>
.cmenu {
  width: 200px;
  text-align: left;
}
</style>
