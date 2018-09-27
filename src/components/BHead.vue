<template>
  <div class="head">
    <div class="head_wrap">
      <h1 class="logo">
        <a href="javascript:;">个人博客</a>
      </h1>
      <div class="startList">
        <ul>
          <li>
            <router-link :to='{name: "blog-home"}' >网站首页</router-link>
          </li>
          <li>
            <a href="javascript:;">关于我</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BHead'
}
</script>

<style lang="scss" scoped>
  .head {
    height: 60px;
    background: rgba(0, 0, 0, 0.9);
    line-height: 60px;
    .head_wrap {
      width: 1140px;
      margin: 0 auto;
    }
    .logo {
      float: left;
      font-size: 22px;
      font-weight: bold;
      a {
        color: #00A7EB;
      }
    }
    .startList {
      float: left;
      margin-left: 40px;
      li {
        float: left;
        font-size: 16px;
        padding: 0 25px;
        a {
          color: #bdbdbd;
          &.active {
            color: #00A7EB;
          }
        }
      }
    }
  }
</style>
