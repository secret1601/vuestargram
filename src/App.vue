<template>
  <div class="header">
    <ul class="header-button-left">
      <li>Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="step == 1" @click="step++">Next</li>
      <li v-if="step == 2" @click="publish">발행</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <h4>안녕!!!!!! {{name}}</h4>
  <button @click="이름변경">이름변경하기</button>
  <h3>내 나이는 {{$store.state.age}}이지롱 ㅎㅎ!!</h3>
  <button @click="나이변경(1)">나이더먹어라빔!</button>

  <p>{{ $store.state.more }}</p>
  <button @click="$store.dispatch('getData')">더보기 버튼이지롱</button>

  <Container @write="newWrite = $event" :이미지="이미지" :step="step" :InstaData="InstaData" />

  <button @click="more()">더보기</button>

  <div class="footer">
    <ul class="footer-button-plus">
      <input @change="upload" type="file" id="file" class="inputfile" />
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>

</template>

<script>
  import Container from './components/ContainerLead.vue'
  import InstaData from './assets/insta'
  import axios from 'axios'
  import { mapMutations, mapState } from 'vuex'

  export default {

    name: 'App',
    data() {
      return {
        InstaData,
        count: 0,
        step: 0,
        이미지: '',
        newWrite: '',
        choiceFilter: '',
        카운터 : 0
      }
    },
    mounted() {
      this.emitter.on('filterName', (item) => {
        this.choiceFilter = item;
      });
    },

    components: {
      Container: Container,
    },
    
    computed: {
      ...mapState(['name', 'age', 'likes']),
      ...mapState({ 작명: 'name', })
    },

    methods: {
      ...mapMutations(['이름변경','나이변경','likeAdd','setMore']),

      more() {
        axios.get(`https://codingapple1.github.io/vue/more${this.count}.json`)
          .then((res) => {

            this.InstaData.push(res.data);
            this.count++;

            if (this.count >= 2) {
              this.count = 0;
              alert('마지막 데이터입니다. (데이터가 없을 시 반복되도록 작성했습니다)');
            }

          })
      },

      upload(e) {
        let file = e.target.files;
        console.log(file[0].type);
        let url = URL.createObjectURL(file[0]);
        this.이미지 = url;
        this.step++;
      },

      publish() {
        let str = this.choiceFilter;
        str = str.replace("\"", "");
        console.log(str);

        let newInstaData = {
          name: "Kim Hyun",
          userImage: "https://placeimg.com/100/100/arch",
          postImage: this.이미지,
          likes: 36,
          date: "May 15",
          liked: false,
          content: this.newWrite,
          filter: str
        };

        this.InstaData.unshift(newInstaData)
        this.step = 0;
      },

    }
  }
</script>

<style>
  @import url('style.css');

  body {
    margin: 0;
  }

  ul {
    padding: 5px;
    list-style-type: none;
  }

  .logo {
    width: 22px;
    margin: auto;
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 13px;
  }

  .header {
    width: 100%;
    height: 40px;
    background-color: white;
    padding-bottom: 8px;
    position: sticky;
    top: 0;
  }

  .header-button-left {
    color: skyblue;
    float: left;
    width: 50px;
    padding-left: 20px;
    cursor: pointer;
    margin-top: 10px;
  }

  .header-button-right {
    color: skyblue;
    float: right;
    width: 50px;
    cursor: pointer;
    margin-top: 10px;
  }

  .footer {
    width: 100%;
    position: sticky;
    bottom: 0;
    padding-bottom: 10px;
    background-color: white;
  }

  .footer-button-plus {
    width: 80px;
    margin: auto;
    text-align: center;
    cursor: pointer;
    font-size: 24px;
    padding-top: 12px;
  }

  .sample-box {
    width: 100%;
    height: 600px;
    background-color: bisque;
  }

  .inputfile {
    display: none;
  }

  .input-plus {
    cursor: pointer;
  }

  #app {
    box-sizing: border-box;
    font-family: "consolas";
    margin-top: 60px;
    width: 100%;
    max-width: 460px;
    margin: auto;
    position: relative;
    border-right: 1px solid #eee;
    border-left: 1px solid #eee;
  }
</style>