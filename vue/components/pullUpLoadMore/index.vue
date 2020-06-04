<template>
  <div id="custom-scroll-container">
    <div
      ref="scroll-div"
      class="content"
      :hideLoading="loadingHandle"
      :style="`height: ${contentHeight}px;`"
      @change:hideLoading="hideLoading"
      @touchmove="touchmove"
      @touchstart="touchstart"
      @touchend="touchend"
      @touchcancel="touchend"
    >
      <slot />
    </div>
    <div
      id="loading-lower"
      ref="loading-view"
      class="loading-view external-loading-class"
    >
      <span>{{ loadingText }}</span>
      <div v-show="showLoading" class="loading" />
    </div>
  </div>
</template>
<script>
let touch = null; // 触摸起始位置
let touchDirection = null; // 触摸方向，vertical -> 纵向，horizontal -> 横向
let lowerLoading = { // 底部加载动画的元素相关信息
  instance: null, // 上拉动画的元素实例
  anchor: null, // 上拉动画的元素id
  direction: -1, // 方向，-1 表示上拉
};

let tempLock = false; // 锁，当在加载中时禁用上拉
let lock = false; // 锁，当在加载中时禁用上拉
let currentHeight = 0; // 当前拉动的高度
let reachMinHeight = false; // 为true表示此次拉动的达到最小高度，可以触发加载（刷新）事件
let loading = null; // 此次拉动的加载动画元素实例相关信息，上拉时等于lowerLoading
let rpx = 0.5; // px 与 rpx 换算比例，根据传入的 windowHeight动态计算
const loadingHeight = 60; // 显示加载动画时的高度
const loadingMaxHeight = 120; // 拉动的最大高度，currentHeight不可高于此高度
const loadingMinHeight = 30; // 拉动的最小高度，低于此高度不触发加载（刷新）事件

let canPullFresh = false;
let scrollDivlTop = 0;

export default {
  replace: true,
  props: {
    anchor: {
      type: String,
      required: true,
    },
    contentHeight: {
      type: Number,
      required: false,
      default: -1,
    },
    windowWidth: {
      type: Number,
      required: true,
    },
    hasMore: {
      type: Boolean,
      required: false,
      default: true,
    },
    loadingHandle: {
      type: Number,
      required: false,
      default: 0,
    },
    loadingText: {
      type: String,
      required: true,
      default: '正在加载',
    },
    showLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {};
  },
  watch: {
    loadingHandle() {
      this.hideLoading();
    },
    anchor() {
      this.$nextTick(() => {
        if (this.anchor) {
          tempLock.anchor.scrollTop = document.getElementById(this.anchor).offsetTop;
        }
      });
    },
  },
  mounted() {
    lock = false;
  },
  methods: {
    touchstart(e) {
      rpx = this.windowWidth / 750;
      touch = e.touches[0];
      lowerLoading = {
        instance: this.$refs['loading-view'],
        anchor: this.$refs['scroll-div'],
      };
      this.controlScroll();
    },
    touchmove(e) {
      const currentTouch = e.touches[0];
      let touchDeltaY = touch.clientY - currentTouch.clientY;
      if (!canPullFresh || touchDeltaY < 0) {
        const scrollTop = scrollDivlTop;
        this.$refs['scroll-div'].scrollTop = scrollTop + touchDeltaY;
        return;
      }
      touchDeltaY = Math.abs(touchDeltaY);
      if (touchDirection === null) {
        const touchDeltaX = Math.abs(touch.clientX - currentTouch.clientX);

        touchDirection = (touchDeltaY - touchDeltaX) > 3 ? 'vertical' : 'horizontal';
        return;
      }
      if (touchDirection === 'horizontal') {
        return;
      }

      if (!loading) {
        if (currentTouch.clientY >= touch.clientY) {
          return;
        }
        loading = lowerLoading;
      }

      if (lock || !this.hasMore && loading === lowerLoading) {
        return;
      }

      const height = (currentTouch.clientY - touch.clientY) * (-1);
      if (height < 0 || height > loadingMaxHeight * rpx) {
        return;
      }

      loading.instance.setAttribute('style', `height: ${height}px;`);

      currentHeight = height;
      if (!reachMinHeight) {
        reachMinHeight = currentHeight > loadingMinHeight * rpx;
      }
    },
    touchend() {
      if (!canPullFresh) {
        return;
      }
      if (loading && reachMinHeight) {
        loading.instance.setAttribute('style', `height: ${loadingHeight * rpx}px;transition: height ease-out 500ms;`);
        lock = loading;
        if (loading === lowerLoading) {
          this.$emit('scrollToLower');
        }
      } else if (loading) {
        loading.instance.setAttribute('style', 'height: 0; transition: height ease-out 500ms;');
      }
      loading = null;
      currentHeight = 0;
      reachMinHeight = false;
      touchDirection = null;
    },
    hideLoading() {
      if (lock) {
        lock.instance.setAttribute('style', 'height: 0; transition: height ease-out 500ms');
        tempLock = lock;
        lock = false;
      }
    },
    controlScroll() {
      const { scrollHeight, scrollTop, clientHeight } = this.$refs['scroll-div'];
      scrollDivlTop = scrollTop;
      if (scrollHeight <= scrollTop + clientHeight + 5) {
        canPullFresh = true;
      } else {
        canPullFresh = false;
      }
    },
  },
};
</script>
<style lang="less" scoped>
  #custom-scroll-container {
    width: 100%;
    height: 100%;
  
    .content {
      position: relative;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      overflow-x: hidden;
      height: 100%;
      width: 100%;
    }
  
    .loading-view {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      bottom: 0;
      width: 100%;
      height: 0;
      font-size: 22rpx;
      color: rgba(0, 0, 0, .7);
      background-color: #eee9f2;
      letter-spacing: 2rpx;
      overflow: hidden;
    }
  }
</style>
