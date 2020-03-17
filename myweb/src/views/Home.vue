<template>
  <div class="home">
    <div id="title" style="width 100%;height:80px;background-color: #FFFFFF;">
			<div style="	margin-right: auto; 	margin-left: auto; 	width:890px;">
				<div id="web_icon"></div>

				<p style="float: left;"> 69</p>
			</div>
		</div>
    
		<div style="margin:auto;width:900px;height:430px">
			<div id="mainbody" style="padding-top:10px;">
        
        <!-- 顶部滚动图片 -->
        <div class="topPic" style="background-color: #F6F6F6; margin-top: 10px;  float:top;  width:890px; margin-left: 5px;">
          <div style="height: 20px;" />
          <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in picTop" :key="item.index">
              <img class="carousel-pic" alt="蛤" :src="item.scr" />
            </el-carousel-item>
          </el-carousel>
				</div> 

        <!-- 主体 -->
				<div style="" >
          <!-- 留言本 -->
					<div class="message1" style="	float:left;	width:708px; margin-left: 5px; padding: 20px 0px 20px 0px;">
						<h1>留言本</h1>
						<div class="container" style="margin-bottom: 20px;">
							<ul class="list -group" :key='item.index' v-for='item in comments'>
								<li class="list-group-item">
                  <div style="height: 20px;">
                    <span style="float: left !important;text-align: left;" >{{ item.IP }} </span>
                    <span style="float: right !important;text-align: right;">{{ item.date }}</span>
                  </div>
                  <hr/>
                  <p style="text-align: left;">
                  {{ item.comments }}
                  </p>
                  </li>
							</ul>
              <!-- 条条 -->
              <el-pagination
                @current-change="handleCurrentChange"
                :current-Page="currentPage"
                layout="prev, pager, next"
                :total="lenghtComments"
                :hide-on-single-page="comments.length<11"
                style="padding-top: 10px;backgroud-color: ">
              </el-pagination> 

              <!-- 发表评论 -->
              <el-form :model="commentForm" :rules="rules"  ref="commentForm" class="" size="medium" @submit.native.prevent>
                <el-form-item prop="comments" class="">
                  <h1 style="margin-top: 20px;">发表评论</h1>
                  <el-input type="textarea"
                    v-model="commentForm.comment"
                    autocomplete="off"
                    maxlength="200"
                    show-word-limit
                    :rows="5"
                    spellcheck="false"
                    resize="none"
                    placeholder="请输入评论，不要发屁话">
                  </el-input>
                </el-form-item>
                <el-form-item >
                  <el-button type="primary"
                    @click="submitComment('commentForm')"
                    size="medium"
                    :disabled="disable"
                    style="float: right !important; margin-right: 20px; margin-top: 10px;">
                    发表
                  </el-button>
                </el-form-item>
              </el-form> 
						</div>
					</div>
          <!-- 右侧功能栏 -->
					<div class="message1" style="float:left; width:150px; margin-left:32px;">
            <div style="height: 200px;">公告</div>
            <div style="height: 200px;"></div>
					</div>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
import { pageComment } from "@/tools/app.js"
import { getComment,sendComment } from "@/api/comment.js";
// @ is an alias to /src
export default {
  name: "Home",   
  components: {},
  totelComments: {},
  data() {
    return {
      lenghtComments: 0,
      currentPage: 1,
      disable: false,
      number: 0,
      comments:0,
      picTop: [
        { scr: require("../assets/top/4.jpg") },
        { scr: require("../assets/top/1.jpg") },
        { scr: require("../assets/top/2.jpg") },
        { scr: require("../assets/top/3.jpg") }
      ],
      commentForm: {
        comment: this.comments,
      },      
      rules: {
        comments: [{ trigger: "blur" }],
      }
    }
  },
  beforeCreate() {},
  created() {},
  mounted() {   
    getComment().then(resolve =>{
      this.$nextTick(() =>{
        this.totelComments=resolve.data.data.reverse();
        this.lenghtComments=this.totelComments.length;
        this.comments=this.totelComments.slice(0,10);
      });
    })    
  },
  methods: {
    submitComment(formName) {
      if(this.commentForm.comment==="") {
        this.$message.error({
          message: '不能为空',
          center: true,
          showClose: true
        });
        return false;
      }else {
        this.disable=true;
        sendComment(this.commentForm.comment).then(resolve => {
          if(resolve.data.err_code!==0){
            this.$message.error({
              message: '糟了，服务器开小差了！',
              center: true,
              showClose: true
            });
          }else {
            this.$notify({
              title: '发表成功',
              message: '正在刷新页面',
              type: 'success'
            });
            setTimeout(function () {
              location. reload();
            },1000);
          }
        });
      };
    },
    handleCurrentChange(currentPage){
      
      if(currentPage<this.lenghtComments) {
        this.comments=this.totelComments.slice((currentPage-1)*10,currentPage*10);
      }else {
        this.comments=this.totelComments.slice((currentPage-1)*10,this.lenghtComments);
      }      
    }
  },
  props: {},
  watch: {}
};
</script>




<style lang="scss" scoped>
[v-cloak] {
	display: none;
}

.container {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

p {
	color: black;
	font-size: 20;
	text-align: center;
}


#web_icon {
	width: 54px;
	height: 54px;
	border-radius: 30px;
	background-image: url(../assets/logo.jpg);
	background-repeat: no-repeat;
	background-size: 66px;
	background-origin: auto;
	background-position: center;
	border: #000000 solid;
	display: inline-block;
	position: relative ; 
	left: 10px;
	top:10px;
	float: left;
}



#buttomm{
	background-color:orange; 
	float:top; 
	width:890px;
	height:100px;
	margin-top:16px;
	/* overflow: hidden; */
	clear: both;
}
#main{
	width: 300px;
	height: 200px;
  margin-top:20px;
  background-color: #3f16a0;
	background-color: #000000;
}


.btn-success {
  color: #fff;
  background-color: #5cb85c;
  border-color: #4cae4c;
}
.btn-success:hover {
  color: #fff;
  background-color: #449d44;
  border-color: #398439;
}
.btn-success:active,


.btn {
  display: inline-block;
  padding: 6px 12px;
  margin-top: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: normal;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
      touch-action: manipulation;
  cursor: pointer;						/* 设置光标 */
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;			/* 阻止用户选择 */
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
  /* float:right; */
  
}

a{
	text-decoration: none;
}


.list-group-item {
    position: relative;
    display: block;
    padding: 10px 15px;
    margin-bottom: -1px;
    background-color: #fff;
    border: 1px solid #ddd;
}




// needed

.home {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  background-repeat:no-repeat;
  background-color: #F6F6F6;
}

#mainbody{
	display: inline-block;
	float:left;  
	overflow: hidden;
  margin-bottom: 15px;
  width:1000px;
  margin-top:20px;
}
.topPic{
  border-radius: 2px;
  box-shadow: 0 -5px 16px rgba(26,26,26,.1);
  margin-bottom: 40px;
}
.message1{
	display: float;
	background-color: aliceblue;
	overflow: hidden;
	margin-bottom: 15px;
	border-radius: 2px;
	box-shadow: 0 -14px 16px rgba(26,26,26,.1);
}

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    // background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    // background-color: #d3dce6;
  }
  .carousel-pic {
    height: 100%;
  }
</style>
