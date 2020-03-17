<template>
  <div id="login">
    <div class="login-wrap">
      <!-- 登陆注册 -->
      <ul class="menu-tab">
        <li v-for="item in menuTab" :key="item.id" :class="{ current: item.current }" @click="togglemenu(item)" >{{ item.txt }}</li>
      </ul>
      <!-- 表单 -->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm" size="medium">
        
        <el-form-item prop="username" v-if = "model" class="item-form">
          <label>用户名</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        
        <el-form-item prop="pass" class="item-form">
          <label>密码</label>
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>
        
        <el-form-item prop="age" v-if = "model" class="item-form">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15"><el-input v-model.number="ruleForm.age" minlength="6" maxlength="6"></el-input></el-col>
            <el-col :span="9">
              <el-button type="success" size="medium" class="block">验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" size="medium" class="login-box block">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { verifyPas } from '@/api/login.js';
import { filterStr } from '@/tools/validate.js';
export default {
  name: "login",
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入验证码"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        // if (this.ruleForm.checkPass !== "") {
        //   this.$refs.ruleForm.validateField("checkPass");
        // }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        
        callback();
      }
    };
    return {
      menuTab: [
        { txt: "登陆(没用)", current: true },
        { txt: "登陆", current: false }
      ],
      model: true,
      //表中数据
      ruleForm: {
        username: "",
        pass: "",
        age: ""
      },      
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        pass: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }]
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    togglemenu(data) {
      if (data.current === false){
        
        this.ruleForm.username = "";
        this.ruleForm.pass = "";
        this.ruleForm.age = "";
      }
      this.menuTab.forEach(elem => {
        elem.current = false;
      });
      data.current = !data.current;
      
      if(data.txt === "登陆"){
        this.model = false;
      }else{
        this.model = true;
      }
    },
    submitForm(formName) {
      if(!this.model){
        this.$refs[formName].validate(valid => {
          if (valid) {
            verifyPas(this.ruleForm.pass);
         } else {
            console.log("error submit!!");
            return false;
          }
      });      
      }else alert("都说了没用");
    },
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // }
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
  position: absolute;
  left: 50%;
  top: 50%;
  transform:translate(-50%,-65%);
  width: 330px;
  margin: auto;
  padding: 20px;
  border-radius: 2px;
  box-shadow: 10px 0px 16px rgba(26,26,26,.1),
              0px 10px 16px rgba(26,26,26,.1);
  
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
    background-color: rgba(32, 69, 233, 0.1);
  }
}
.demo-ruleForm{
  .item-form{margin-bottom: 3px;}
  .block{
    display: block;
    width: 100%;
  }
  label{
    padding: 0;
    height: 28px;
    display: block;
    text-align: left;
    color: black;
    margin-top: 10px;
    //margin-bottom: 3px;
    font-size: 14px;
  }
  .login-box{
    margin-top: 15px;
  }
}
</style>
