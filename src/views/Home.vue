<template>
  <div class="home">
    <div class="detail-modal" v-if="showModal">
      <div class="info-line">
        <span class="label">Name: </span>
        <span class="text">{{ curItem.Name }}</span>
      </div>
      <div class="info-line">
        <span class="label">Price: </span>
        <span class="text">{{ curItem.Price }}</span>
      </div>
      <div class="info-line">
        <span class="label">Location: </span>
        <span class="text">{{ curItem.Location }}</span>
      </div>
      <div class="info-line" v-if="curType == 0">
        <span class="label">Shadow size: </span>
        <span class="text">{{ curItem["Shadow size"] }}</span>
      </div>
      <div class="info-line">
        <span class="label">Time: </span>
        <span class="text">{{ curItem["Time"] }}</span>
      </div>
      <div class="info-line">
        <span class="label">Time: </span>
        <span class="text">{{ curItem["Time"] }}</span>
      </div>
      <div class="cal">
        <div
          class="cal-item"
          v-for="m in Month"
          :key="m"
          :class="{ check: curItem[m] }"
        >
          {{ m }}
        </div>
      </div>
      <div class="avatar">
        <img v-if="curItem.Image !== 'Unknown'" :src="curItem.Image" alt="" />
        <div class="unknow-avatar" v-else>Image Unknow</div>
      </div>
      <div class="close-btn" @click="showModal = false">Close Me</div>
    </div>
    <div class="tab-line">
      <div
        class="btn"
        :class="{ active: curHemi == 0 }"
        @click.stop="handleHemi(0)"
      >
        Northern Hemisphere
      </div>
      <div
        class="btn"
        :class="{ active: curHemi == 1 }"
        @click.stop="handleHemi(1)"
      >
        Southern Hemisphere
      </div>
    </div>
    <div class="tab-line">
      <div
        class="btn"
        :class="{ active: curType == 0 }"
        @click.stop="handleType(0)"
      >
        Fish
      </div>
      <div
        class="btn"
        :class="{ active: curType == 1 }"
        @click.stop="handleType(1)"
      >
        Bugs
      </div>
    </div>
    <div class="list-wrap">
      <div
        class="item-wrap"
        v-for="(item, idx) in listData"
        :key="item._id"
        @click="onItemClick(item)"
      >
        <div
          v-if="item.Image !== 'Unknown'"
          class="list-item "
          :style="{ 'background-image': `url(${item.Image})` }"
          :class="{ '-border': (idx + 1) % 5 == 0 }"
          :title="item.Name"
        ></div>
        <div
          v-else
          class="list-item -unknown"
          :class="{ '-border': (idx + 1) % 5 == 0 }"
          :title="item.Name"
        >
          ?
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import getData from "../apis";
const cacheData = [];
export default {
  name: "Home",
  components: {},
  data() {
    return {
      listData: [],
      curHemi: 0,
      curType: 0,
      showModal: false,
      curItem: {},
      Month: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ]
    };
  },
  watch: {
    curHemi() {
      this.fetchData();
    },
    curType() {
      this.fetchData();
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      const hashKey = `${this.curHemi}-${this.curType}`;
      if (cacheData[hashKey]) {
        this.listData = cacheData[hashKey];
        return;
      }
      let hemi = !!this.curHemi;
      let type = this.curType == 0 ? "fish" : "bug";
      getData(hemi, type).then(resp => {
        this.listData = resp;
        cacheData[hashKey] = resp;
      });
    },
    handleType(type) {
      this.curType = type;
    },
    handleHemi(hemi) {
      this.curHemi = hemi;
    },
    onItemClick(item) {
      this.showModal = true;
      this.curItem = item;
    }
  }
};
</script>
<style lang="scss">
.home {
  background: #b47157;
}
.list-wrap {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  overflow-x: hidden;
  justify-content: center;
  position: relative;
  .list-item {
    width: 18vw;
    height: 18vw;
    background-size: contain;
    position: relative;
    background-repeat: no-repeat;
    background-position: center;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    &:hover {
      box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.257);
    }
    &.-border {
      border-right: 1px solid #ccc;
    }
    &.-unknown {
      text-align: center;
      line-height: 18vw;
      color: #fff;
      font-size: 16px;
    }
  }
}
.tab-line {
  display: flex;
  position: relative;
  flex-direction: row;
  padding: 10px 16px;
  .btn {
    flex: 1;
    width: 50%;
    display: block;
    text-align: center;
    border: 1px solid #eeeceb;
    background: #828282;
    &:first-child {
      border-right: none;
    }
    &.active {
      background: #f05e1c;
    }
  }
}
.detail-modal {
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.16);
  z-index: 233;
  width: 70vw;
  font-size: 16px;
  padding: 12px 16px;
  border-radius: 12px;
  .info-line {
    display: flex;
    line-height: 24px;
    border-bottom: 1px dashed #000;
    flex-wrap: no-wrap;
    .label {
      color: #999;
      width: 110px;
      display: block;
    }
    .text {
      flex: 1;
      color: #333;
      word-break: break-word;
      white-space: pre-wrap;
    }
  }
  .cal {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    .cal-item {
      margin-top: 8px;
      // background: #cccccc;
      margin-right: 12px;
      padding: 10px;
      &.check {
        background: green;
        color: #fff;
      }
    }
  }
  .close-btn {
    padding: 8px 6px;
    display: inline-block;
    border: 1px solid #ececeb;
    background: #ececeb;
    position: absolute;
    right: 16px;
    bottom: 12px;
    &:active {
      border: 1px solid #ccc;
      background: #ccc;
    }
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
    img {
      width: 100%;
      height: 100%;
    }
    .unknow-avatar {
      height: 100px;
      padding-top: 30px;
      text-align: center;
      display: inline-block;
    }
  }
}
</style>
