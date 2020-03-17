<template>
  <div id="login" >
    <div class="login-wrap">
      <!-- 登陆注册 -->
      <ul class="menu-tab">
        <li class= "current" >登录</li>
      </ul>
      <!-- 表单 -->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm" size="medium"  @submit.native.prevent @keyup.enter.native="submitForm('ruleForm')">
             
        <el-form-item prop="pass" class="item-form">
          <label>密码</label>
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off" maxlength="20" ></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button 
            type="primary"
            @click="submitForm('ruleForm')"
            size="medium"
            class="login-box block"
            :disabled="disable">
            登陆
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { verifyPas } from '@/api/login.js';
import { setToken,getToken } from '@/tools/app.js';
import { filterStr } from '@/tools/validate.js';
export default {
  name: "login",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        
        callback();
      }
    };
    return {
      disable: false,
      menuTab: "登陆",
      model: true,
      //表中数据
      ruleForm: {
        pass: "",
      },      
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            verifyPas(this.ruleForm.pass).then(resolve => {
              this.disable =true;
              this.$notify({
                title: '登陆成功',
                message: '',
                type: 'success'
              });
              var that=this;
              setTimeout(function () {
                setToken(resolve.data.token);
                that.$router.push({name: "Home"});
              },1500);
            }).catch(error => {
              if(error.response.status==400){
                this.disable =true;
                this.$message.error({
                  message: '密码错误',
                  center: true,
                  showClose: true
                });
                var that=this;
                setTimeout(function () {
                  that.disable = false;
                 },2000);  
              }
            });
          }else {
            this.disable =true;
            this.$message.error({
                message: '密码不能为空',
                center: true,
                showClose: true
            });
            var that=this;
            setTimeout(function () {
              that.disable = false;
            },2000);            
            return false;
          }
        });
      },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
