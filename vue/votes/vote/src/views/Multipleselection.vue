<template>
  <div class="header">
    <el-container>
      <el-main>
        <div class="form">
          <el-form ref="form" label-width="73px">
          <el-form-item label="投票标题">
            <el-input v-model="voteInfo.title"></el-input>
          </el-form-item>
          <el-form-item label="补充描述">
            <el-input v-model="voteInfo.desc"></el-input>
          </el-form-item>

          <div v-for='(option,idx) of voteInfo.options' :key="idx + Math.random" class="change">
            <div class="ic" @click="voteInfo.options.splice(idx,1)">
              <i class="el-icon-remove" ></i>
            </div>
            <div class="deinput">
              <el-input v-model="voteInfo.options[idx]" placeholder="选项"></el-input>
            </div>
          </div>

          <div class="add" @click="voteInfo.options.push('')">
            <i class="el-icon-circle-plus"></i>
            <div class="addel">
              <el-button type="text" size="medium">文字按钮</el-button>
            </div>
          </div>

          <el-form-item label="截至日期">
            <el-col :span="12">
              <el-date-picker type="date" v-model="voteInfo.deadline" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col :span="12">
              <el-time-picker v-model="voteInfo.deadline2" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-form-item>

          <el-form-item label="匿名投票">
            <el-switch v-model="voteInfo.anonymous"></el-switch>
          </el-form-item>

          <el-form-item label="限制传播">
            <el-switch v-model="voteInfo.anonymous"></el-switch>
          </el-form-item>

          <el-form-item>
            <div class="done">
              <el-button type="primary" @click="onSubmit">完成</el-button>
            </div>
          </el-form-item>
          </el-form>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue';
import api from '@/api';
import Element from 'element-ui';

Vue.use(Element, { size: 'small', zIndex: 3000 });

export default {
  name: 'multi',
  data() {
    return {
      voteInfo: {
        title: '',
        des: '',
        options: ['', ''],
        deadline: '',
        anonymous: '0',
        propagation: '0',
        deadline2: '',
      },
    };
  },

  methods: {
    async onSubmit() {
      const reqinfo = await api.post('/create-vote', this.voteInfo);
      const id = reqinfo.data.id;
      this.$router.push({ name: 'votes', params: { id } });
    },
  },
};
</script>

<style scoped lang="scss">
.form {
  width: 400px;
}
.change {
  position: relative;
  top: -18px;
  width: 380px;
}
.ic {
  position: relative;
  top: 28px;
}
.deinput {
  position: relative;
  left: 25px;
}
.addel {
  display: inline;
  padding: 10px;
}
.done {
  position: relative;
  right: -100px;
}
</style>
