
<template>
<div id="ignoreArea">
    <div class="toggle-button" @click="toggleLayout">{{layoutShow ? '收起' : '展开'}}</div>
    <div class="extension_layout" v-show="layoutShow">
        <Row class="mb-20">
            <Col span="8" push="8">
                <Button icon="ios-add" :type="isRecord ? 'error': 'primary'" @click="change">{{isRecord ? '录制中' : '录制'}}</Button>
            </Col>
        </Row>
        <Row class="mb-20">
            <Col span="24">
                <Select v-model="selectedArr" style="width:100%" multiple>
                    <Option v-for="(item, index) in keys" :value="item" :key="index">{{item}}</Option>
                </Select>       
            </Col>
        </Row>
        <Row class="mb-20">
            <Col span="8" push="2">
                <Button type="primary" @click="run">执行</Button>
            </Col>
            <Col span="8" push="6">
                <Button @click="del">删除</Button>
            </Col>
        </Row>
        <Modal
            :value="isShowModal"
            @on-cancel="cancel"
            title="请填写此次录制id">
            <Input v-model="stroageName" placeholder="请填写此次录制id" style="width: 300px" />
            <div slot="footer">
                <Button type="primary" @click="ok">确认</Button>
                <Button @click="cancel">取消</Button>
            </div>
        </Modal>
    </div>
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
        executor: null,
        layoutShow: false,
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
            storage.set(this.stroageName, this.actionPaths);
            this.query();
            this.reset();
            this.$Message.success('录制成功')
        },
        cancel() {
            this.reset();
        },
        reset() {
            this.actionPaths = [];
            this.stroageName = '';  
            this.isShowModal = false;
        },
        del() {
            storage.remove(this.selectedArr);
            this.selectedArr = [];
            this.query();
            this.$Message.success('删除成功')
        },
        run() {
            let paths = [];
            this.selectedArr.forEach(selected => {
                paths = paths.concat(storage.get(selected));
            })
            this.executor.run(paths);
        },
        toggleLayout() {
            this.layoutShow = !this.layoutShow
        }
    },
    mounted() {
        this.query();
        this.executor = new Play();
        initRecord((content) => {
            if(this.isRecord && (content.selector.indexOf('ignoreArea') === -1)) {
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
    box-shadow: 2px 2px 2px rgba(0,0,0,0.2);
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.toggle-button{
    width: 50px;
    z-index: 10001;
    position: fixed;
    left: 0;
    top: 0;
    background: #ccc;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
}
.mb-20{
    margin-bottom: 20px;
}
</style>
