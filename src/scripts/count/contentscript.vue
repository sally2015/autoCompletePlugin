
<template>
  <div class="extension_layout">
        <Row>
            <Col span="8" push="8">
                <Button icon="ios-add" :type="isRecord ? 'error': 'primary'" @click="change" id="ignoreButton">{{isRecord ? '录制中' : '录制'}}</Button>
            </Col>
      </Row>
      <Row>
          <Col span="24">
            <Select v-model="selectedArr" style="width:100%" multiple>
                <Option v-for="(item, index) in keys" :value="item" :key="index">{{item}}</Option>
            </Select>       
          </Col>
      </Row>
      <Row>
            <Col span="8" push="2">
                <Button type="primary" @click="run">执行</Button>
            </Col>
            <Col span="8" push="6">
                <Button @click="del">删除</Button>
            </Col>
      </Row>
      <Modal
        :value="isShowModal"
        title="请填写此次录制id">
        <Input v-model="stroageName" placeholder="请填写此次录制id" style="width: 300px" />
        <div slot="footer">
            <Button type="primary" @click="ok">确认</Button>
            <Button @click="cancel">取消</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
  import { MSG_COUNT_SHOW, MSG_COUNT_INCREMENT } from './msg';
  import { sendMessage } from '../../common/message';
  import initRecord from '../../common/source'
  import storage from '../../common/storage'
  import Play from '../../common/play'
  export default {
    data() {
      return {
        actionPaths: [],
        list: [],
        keys: [],
        selectedArr: [],
        isRecord: false,
        isShowModal: false,
        stroageName: '',
        executor: null
      };
    },
    methods: {
        query() {
            let data = storage.get();
            this.list = data;
            this.keys = Object.keys(this.list);
        },
        change() {
            const url = location.href;
            this.isRecord = !this.isRecord;
            if(!this.isRecord) {
                this.isShowModal = true;
            }
        },
        ok() {
            if (!this.stroageName) {
                this.isShowModal = true;
                return this.$Message.error('请填写录制id');
            }
            storage.set(this.stroageName, this.actionPaths)
            this.query();
            this.reset();
        },
        cancel() {
            this.reset();
        },
        reset() {
            this.actionPaths = [];
            this.storageName = '';  
            this.isShowModal = false;
        },
        del() {
            storage.remove(this.selectedArr);
            this.selectedArr = [];
            this.query();
        },
        run() {
            let paths = [];
            this.selectedArr.forEach(selected => {
                paths = paths.concat(storage.get(selected));
            })
            this.executor.run(paths);
        }
    },
    mounted() {
        this.query();
        this.executor = new Play();
        initRecord((content) => {
            if(this.isRecord && (content.selector.indexOf('ignoreButton') === -1)) {
                this.actionPaths.push(content);
            }
        })
    }
  };
</script>
<style lang="less" scoped>
.extension_layout {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    background: #fff;
    width: 200px;
    padding: 20px;
    z-index: 10000;
  }
</style>
