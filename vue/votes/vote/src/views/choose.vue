<template>
  <el-container>
    <el-main>
      <div class="single">
        <el-row type="flex" justify="center">
        <el-col :xs="8" :sm="7" :md="4" :lg="4" >
          <img src="../assets/image/icons.png" alt="">
        </el-col>
      </el-row>
     </div>

      <div class="singlebutton">
        <el-row>
          <el-col :xs="8" :sm="7" :md="4" :lg="4" :push="10">
            <router-link to="single">
              <el-button size="medium" @click="submits" :value="0" v-model="chooseInfo.Selection">单选投票</el-button>
            </router-link>
          </el-col>
        </el-row>
      </div>

      <div class="single">
        <el-row type="flex" justify="center">
        <el-col :xs="8" :sm="7" :md="4" :lg="4" >
          <img src="../assets/image/icons.png" alt="">
        </el-col>
      </el-row>
     </div>

      <div class="singlebutton">
        <el-row>
          <el-col :xs="8" :sm="7" :md="4" :lg="4" :push="10">
            <router-link to="Multipleselection">
              <el-button size="medium" @click="submitm" v-model="chooseInfo.Selection">多选投票</el-button>
            </router-link>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
  
</template>

<script>
import Vue from 'vue';
import Element from 'element-ui';
import api from '@/api';

Vue.use(Element, { size: 'small', zIndex: 3000 });

export default {
  name: 'choose',
  data() {
    return {
      chooseInfo: {
        Selection: '',
      },
    };
  },

  methods: {
    submits() {
      this.chooseInfo.Selection = '0';
    },
     submitm() {
      this.chooseInfo.Selection = '1';
    },
  },
};
</script>

<style scoped lang="scss">
  .single {
    margin-top: 10%;
  }
  .singlebutton {
    padding: 30px;
  }
</style>
