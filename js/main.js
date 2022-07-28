const buttonCounter = {
  template: '<div><span>count: </span>{{ count }} <br><button v-on:click="countUp">Up</button> <button v-on:click="countDown">Down</button><br><br><button v-on:click="countReset">Reset</button></div>',
  data: () => ({
    count: 0
  }),
  methods: {
    countUp: function(event) {
      this.count++
    },
    countDown: function(event) {
      this.count--
    },
    countReset: function(event) {
      this.count = 0
    }
  }
}


const app = Vue.createApp({
  data: () => ({
    isLarge: true,
    textFontWeight: true,
    golfs: null,
    golfsKeyword: '',
    searchGolfMessage: '',
    scoreList: {
      score1 : 0,
      score2 : 0,
      score3 : 0,
      score4 : 0,
      score5 : 0,
      score6 : 0,
      score7 : 0,
      score8 : 0,
      score9 : 0,
      score10 : 0,
      score11 : 0,
      score12 : 0,
      score13 : 0,
      score14 : 0,
      score15 : 0,
      score16 : 0,
      score17 : 0,
      score18 : 0,
    },
    sumScore: 0,
  }),
  components: {
    'button-counter': buttonCounter,
  },
  watch: {
    golfsKeyword: function(newKeyword, oldKeyword) {
      this.message = 'Waiting for you to stop typing...'
      this.debouncedGetAnswer()
    },
    scoreList: {
      handler: function (new_value, old_value) {
        this.sumScore = parseInt(this.scoreList['score1']) + parseInt(this.scoreList['score2']) + parseInt(this.scoreList['score3']) + parseInt(this.scoreList['score4']) + parseInt(this.scoreList['score5']) + parseInt(this.scoreList['score6']) + parseInt(this.scoreList['score7']) + parseInt(this.scoreList['score8']) + parseInt(this.scoreList['score9'])
         + parseInt(this.scoreList['score10']) + parseInt(this.scoreList['score11']) + parseInt(this.scoreList['score12']) + parseInt(this.scoreList['score13']) + parseInt(this.scoreList['score14']) + parseInt(this.scoreList['score15']) + parseInt(this.scoreList['score16']) + parseInt(this.scoreList['score17']) + parseInt(this.scoreList['score18'])
      },
      deep: true
    }
  },
  mounted: function() {
    this.debouncedGetAnswer = _.debounce(this.getgolfs, 1000)  // lodashのdebounceメソッドを利用し、指定時間内に同メソッドが実行されることを防ぐ。（キーワード入力の度にapiを叩くのを防ぐ。）
  },
  methods: {
    getgolfs: function() {
      if(this.golfsKeyword === '') {
        console.log('空文字')
        this.golfs = null
        return
      }
      this.searchGolfMessage = 'Loading...'
      const vm = this
      const APP_ID = RAKUTENID
      const params = { applicationId: APP_ID, keyword: this.golfsKeyword }
      axios.get('https://app.rakuten.co.jp/services/api/Gora/GoraGolfCourseSearch/20170623', { params })
           .then(function(response) {
            vm.golfs = response.data['Items']
            console.log(response.data['Items'])
           })
           .catch(function(error) {
            vm.searchGolfMessage = 'Error' + error
           })
           .finally(function() {
            vm.searchGolfMessage = ''
           })
    }
  }
})

app.mount('#app')
