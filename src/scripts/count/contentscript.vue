
<template>
  <div class="demo-count">
    <div v-text="count"></div>
    <button @click="change" id="ignoreButton">录制</button>
  </div>
</template>

<script>
  import { MSG_COUNT_SHOW, MSG_COUNT_INCREMENT } from './msg';
  import { sendMessage } from '../../common/message';
  import initRecord from '../../common/source'
  import storage from '../../common/storage'
  export default {
    data() {
      return {
        count: 0,
        isRecord: false,
        actionPaths: []
      };
    },
    methods: {
      change() {
        const url = location.href;
        this.isRecord = !this.isRecord;
        if(!this.isRecord) {
          storage.set('test', this.actionPaths);
          this.actionPaths = []
        }
        sendMessage(MSG_COUNT_INCREMENT, (responseMsg) => {
          this.count = responseMsg.count;
          if (this.count >= 10) {
            this.isShow = false;
          }
        });
      }
    },
    async mounted() {
      let data = await storage.get('test');
      console.log('mounted', data)
      initRecord((content) => {
        if(this.isRecord && content.id !== 'ignoreButton') {
          this.actionPaths.push(content);
        }
        console.log(this.actionPaths);
      })
      sendMessage(MSG_COUNT_SHOW, (responseMsg) => {
        this.isShow = responseMsg.isShow;
      });
    }
  };
</script>

<style lang="less">
.demo-count {
  position: absolute;
  background: #fff;
  width: 200px;
  height: 200px;
  left: 50%;
  top: 50%;
  margin: -100px 0 0 -100px;
  border: 1px solid red;
  box-shadow: 0 2px 5px #999;
  font-size: 24px;
  text-align: center;
}
</style>
