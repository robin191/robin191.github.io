<template>
  <el-container>
    <el-main>
      <el-row type="flex" justify="center">
        <el-col :xs="8" :sm="7" :md="5" :lg="5" >
          <h1>{{ vote.info.title }}</h1>
          <h3>{{ vote.info.desc }}</h3>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center">
        <el-col :xs="8" :sm="7" :md="5" :lg="5" >
          <ul class="options">
            <li v-for="(option, idx) in vote.options" :key="idx" @click="voteup(option.id)">
              <p>{{option.content}}</p>
              <span>{{ summary[option.id].length }}票</span>
              <el-progress :percentage="Math.ceil(ratioSummary[option.id]  * 100)"></el-progress>
            </li>
          </ul>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import Vue from 'vue';
import api from '@/api';
import Element from 'element-ui';
import _ from 'lodash';
import io from 'socket.io-client'

Vue.use(Element, { size: 'small', zIndex: 3000 });

export default {
  name: 'votes',
  watch: {
    $route(to, from) {
      this.init();
    },
  },
  async mounted() {
    this.init();
  },
  data() {
    return {
      vote: {
        info: {},
        options: [],
        voteups: [],
      },

    };
  },
  computed: {
    summary() {
      const obj = _.mapValues(_.keyBy(this.vote.options, 'id'), () => []);
      return {
        ...obj,
        ... _.groupBy(_.flattenDeep(this.vote.voteups), 'optionid')
        // ... _.unionBy(_.flattenDeep(this.vote.voteups), 'uesrid')//一个人的投票信息'userid'
        
      };
    },
    ratioSummary() {
      return _.mapValues(this.summary, (voteups, voteid) => {
        if (voteups.length == 0) {
          return 0
        }
        return voteups.length / this.vote.voteups.length
      })
    },
  },
    methods: {
      async init() {
        var id = this.$route.params.id
        var request = await api.get('/votes/' + id)
          var data = request.data
          console.log(data)
          this.vote = data
          this.vote.voteups = _.uniqBy(this.vote.voteups, 'userid')//一个用户的所有投票信息
          //以下为实时更新的逻辑

          this.socket = io.connect('http://localhost:3006')
          this.socket.emit('select room', id)
          this.socket.on('new vote', data => {
            this.vote.voteups = this.vote.voteups.filter(it => it.userid != data.userid)
            this.vote.voteups.push(data)
          })
    },

      async voteup(optionid) {
        var voteupsinfo = await api.post('/voteup', {
          optionid,
          voteid:this.vote.info.id,
          userid:this.vote.info.userid,
          deadline:this.vote.info.deadline2,
          singleSelection:this.vote.info.singleSelection,
        })
        var votedata = voteupsinfo.data
        console.log(votedata)
        this.vote.voteups = votedata
      }
    }
};
</script>
  