<template>
<div class="all">
  <el-container>
    <el-main>
    <el-row type="flex" justify="center">
      <el-col :xs="8" :sm="7" :md="4" :lg="4" >
        <p>Username</p>
      </el-col>
    </el-row>

    <el-row type="flex" justify="center">
      <el-col :xs="8" :sm="7" :md="5" :lg="5" >
        <el-input v-model="users.name" placeholder="请输入内容"></el-input>
      </el-col>
    </el-row>

    <el-row type="flex" justify="center">
      <el-col :xs="8" :sm="7" :md="4" :lg="4" >
        <p>Password</p>
      </el-col>
    </el-row>

    <el-row type="flex" justify="center">
      <el-col :xs="8" :sm="7" :md="5" :lg="5" >
         <el-input @click="submit" placeholder="请输入密码" v-model="users.password" show-password></el-input>
      </el-col>
    </el-row>

      <div class="login">
        <el-row>
          <el-col :xs="8" :sm="7" :md="4" :lg="4" :push="13">
            <el-button  @click="submit" size="medium">login</el-button>
          </el-col>
        </el-row>
      </div>

      <div class="reg">
        <el-row>
          <el-col :xs="8" :sm="7" :md="4" :lg="4" :push="11">
            <router-link to="/register">
              <el-button size="medium">sign up</el-button>
            </router-link>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</div>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue';
import Element from 'element-ui';
import api from '@/api';

Vue.use(Element, { size: 'small', zIndex: 3000 });


export default {
  name: 'login',
  data() {
    return {
      users: {
        name: '',
        password: '',
      },
      info: null
    };
  },

  methods: {
    async submit() {
      let resInfo = await api.post('/login', this.users)
      debugger
      console.log(resInfo)
      if (resInfo.data.code == 0) {
        this.$router.push('/choose');
      } else {
        this.$alert('用户或密码错误', {
          confirmButtonText: '确定',
        });
      }
    },
  },
};
</script>


<style scoped lang="scss">
  .all {
    margin-top: 10%;
  }
  .login {
    padding-top: 25px;
  }
  p {
    color: #909399;
  }
  .reg{
    margin-top: 5%;
  }
</style>
