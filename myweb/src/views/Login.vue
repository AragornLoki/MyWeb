<template>
  <div id="login">
    <ul class="menu-tab">
      <li
        v-for="item in menuTab"
        :key="item.id"
        :class="{ current: item.current }"
        @click="togglemenu(item)"
      >
        {{ item.txt }}
      </li>
    </ul>
    <el-button>默认按钮</el-button>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      menuTab: [
        { txt: "登陆", current: true },
        { txt: "注册", current: false }
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {
    togglemenu(data) {
      this.menuTab.forEach(elem => {
        elem.current = false;
      });
      data.current = !data.current;
    }
  },
  props: {},
  watch: {}
};
</script>
<style lang="scss" scoped>
#login {
  background-color: #f6f6f6;
  height: 100vh;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 18px;
    color: black;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgb(0, 0, 0);
  }
}
</style>
