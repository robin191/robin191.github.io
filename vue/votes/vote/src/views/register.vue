<template>
<!-- eslint-disable max-len -->
<div class="all">
  <el-container>
    <el-main>
      <div class="reg">
        <el-row>
          <el-col :xs="8" :sm="7" :md="4" :lg="4" :push="14">
            <p>sign up</p>
          </el-col>
        </el-row>
      </div>

      <el-row type="flex" justify="center">
        <el-col :xs="8" :sm="7" :md="4" :lg="6" >
          <el-input v-model="infoUser.name" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
      <div class="password">
        <el-row type="flex" justify="center">
          <el-col :xs="8" :sm="7" :md="4" :lg="6" >
            <el-input @click="submit" placeholder="请输入密码" v-model="infoUser.password" show-password></el-input>
          </el-col>
        </el-row>
      </div>

        <div class="login">
          <el-row>
            <el-col :xs="8" :sm="7" :md="4" :lg="6" :push="14">
              <el-button type="text" @click="submit" size="medium">login</el-button>
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
      infoUser: {
        name: '',
        password: '',
      },
    };
  },

  methods: {
    async submit() {
      const resInfo = await api.post('/register', this.infoUser);
      if (resInfo.data.code === -1) {
        this.$alert('用户已存在', {
          confirmButtonText: '确定',
        });
      } else {
        this.$router.push('/choose');
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
    margin-top: 10%;
  }
  .password {
    padding-top: 10px;
  }
</style>
