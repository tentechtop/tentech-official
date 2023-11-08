<template>
  <div  class="test-human-container" ref="dragDiv" :class="{'ok-bg':confirmSuccess}">
    <div class="drag_bg"></div>
    <div class="drag_text">{{confirmWords}}</div>
    <div class="handler handler_bg" style="position: absolute;top: 0;left: 0;" @mousedown="mouseDownFn($event)" ref="moveDiv" :class="{'handler_ok_bg':confirmSuccess}" ></div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      beginClientX: 0,           /*距离屏幕左端距离*/
      mouseMoveState: false,     /*触发拖动状态  判断*/
      maxWidth: '',               /*拖动最大宽度，依据滑块宽度算出来的*/
      confirmWords: '向右拖动滑块验证',   /*滑块文字*/
      confirmSuccess: false           /*验证成功判断*/
    }
  },
  methods: {
    mouseDownFn:function (e) {
      if(!this.confirmSuccess){
        e.preventDefault && e.preventDefault();   //阻止文字选中等 浏览器默认事件
        this.mouseMoveState = true;
        this.beginClientX = e.clientX;
      }
    },
    successFunction(){
      this.confirmSuccess = true;
      this.confirmWords = '验证通过';
      if(window.addEventListener){
        document.getElementsByTagName('html')[0].removeEventListener('mousemove',this.mouseMoveFn);
        document.getElementsByTagName('html')[0].removeEventListener('mouseup',this.moseUpFn);
      }else {
        document.getElementsByTagName('html')[0].removeEventListener('mouseup',()=>{});
      }
      document.getElementsByClassName('drag_text')[0].style.color = '#fff';
      document.getElementsByClassName('handler')[0].style.left = this.maxWidth + 'px';
      document.getElementsByClassName('drag_bg')[0].style.width = this.maxWidth + 'px';
      this.$emit('success-event', { message: 'true' });
      setTimeout(()=>{
        this.maxWidth = this.$refs.dragDiv.clientWidth - this.$refs.moveDiv.clientWidth;
        this.beginClientX=0
        this.mouseMoveState=false
        this.confirmWords='向右拖动滑块验证'
        this.confirmSuccess=false
        document.getElementsByClassName('drag_text')[0].style.color = '#706e6e';
        document.getElementsByClassName('handler')[0].style.left = 0 + 'px';
        document.getElementsByClassName('drag_bg')[0].style.width = 0 + 'px';
        document.getElementsByTagName('html')[0].addEventListener('mousemove',this.mouseMoveFn);
        document.getElementsByTagName('html')[0].addEventListener('mouseup',this.moseUpFn)
        this.$emit('time-out', { message: 'false' });
      },60000)//设置为1分钟过期
    },
    mouseMoveFn(e){
      if(this.mouseMoveState){
        let width = e.clientX - this.beginClientX;
        console.log("距离",width)
        if(width>0 && width<=this.maxWidth){
          document.getElementsByClassName('handler')[0].style.left = width + 'px';
          document.getElementsByClassName('drag_bg')[0].style.width = width + 'px';
        }else if(width>this.maxWidth){
          this.successFunction();
        }
      }
    },
    moseUpFn(e){
      this.mouseMoveState = false;
      var width = e.clientX - this.beginClientX;
      if(width<this.maxWidth){
        document.getElementsByClassName('handler')[0].style.left = 0 + 'px';
        document.getElementsByClassName('drag_bg')[0].style.width = 0 + 'px';
      }
    }
  },
  mounted(){
    this.maxWidth = this.$refs.dragDiv.clientWidth - this.$refs.moveDiv.clientWidth;
    console.log("maxWidth",this.maxWidth)
    document.getElementsByTagName('html')[0].addEventListener('mousemove',this.mouseMoveFn);
    document.getElementsByTagName('html')[0].addEventListener('mouseup',this.moseUpFn)
  },

}
</script>

<style scoped>
.test-human-container{
  margin-top: 48px;
  border-radius: 5px;
  width: 100%;
  height: 44px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: rgba(178, 175, 175, 0.15);
  outline: 1px solid rgba(0,0,0,0.15);
  overflow: hidden; /* 保证内容在容器内部显示 */
  color: rgba(20, 20, 20, 0.55);
  position: relative; /* 添加这一行 */
}
.ok-bg{
  background-color: #fff;
  color: #fff;
}
.drag_text{
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
  text-align: center;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  -o-user-select:none;
  -ms-user-select:none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.handler{
  z-index: 2;
  border-radius: 5px;
  cursor: move;
  width: 44px;
  height: 44px;
  background-color: white;
  border: 1px solid rgba(0,0,0,0.15);
  user-select: none; /* 禁止文字被选中 */
}
.handler_bg{
  background: #fff url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==") no-repeat center;
}

.handler_ok_bg{
  height: 100%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  background: #fff url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDlBRDI3NjVGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDlBRDI3NjRGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphNWEzMWNhMC1hYmViLTQxNWEtYTEwZS04Y2U5NzRlN2Q4YTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+k+sHwwAAASZJREFUeNpi/P//PwMyKD8uZw+kUoDYEYgloMIvgHg/EM/ptHx0EFk9I8wAoEZ+IDUPiIMY8IN1QJwENOgj3ACo5gNAbMBAHLgAxA4gQ5igAnNJ0MwAVTsX7IKyY7L2UNuJAf+AmAmJ78AEDTBiwGYg5gbifCSxFCZoaBMCy4A4GOjnH0D6DpK4IxNSVIHAfSDOAeLraJrjgJp/AwPbHMhejiQnwYRmUzNQ4VQgDQqXK0ia/0I17wJiPmQNTNBEAgMlQIWiQA2vgWw7QppBekGxsAjIiEUSBNnsBDWEAY9mEFgMMgBk00E0iZtA7AHEctDQ58MRuA6wlLgGFMoMpIG1QFeGwAIxGZo8GUhIysmwQGSAZgwHaEZhICIzOaBkJkqyM0CAAQDGx279Jf50AAAAAABJRU5ErkJggg==") no-repeat center;
}
.drag_bg{
  background-color: #7ac23c;
  height: 44px;
  width: 0px;
  border-radius: 4px 0 0 4px;
}
</style>
