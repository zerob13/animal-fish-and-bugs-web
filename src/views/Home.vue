<template>
  <div class="home">
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
      <div class="loading" v-if="isLoading && listData.length === 0">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div
        class="item-wrap"
        v-for="(item, idx) in listData"
        :key="item._id"
        @click="onItemClick(item)"
        :class="{
          '-check': item[curMonth]
        }"
      >
        <div
          v-if="item.Image !== 'Unknown'"
          class="list-item "
          :style="{ 'background-image': `url(${item.Image})` }"
          :class="{
            '-border': (idx + 1) % 5 == 0,
            '-bottom': idx > listData.length - 6
          }"
          :title="item.Name"
        ></div>
        <div
          v-else
          class="list-item -unknown"
          :class="{
            '-border': (idx + 1) % 5 == 0,
            '-bottom': idx > listData.length - 6
          }"
          :title="item.Name"
        >
          <!-- ? -->
          {{ item.Name }}
        </div>
      </div>
    </div>
    <div class="contact-info" v-show="!isLoading">
      <a
        target="_blank"
        href="https://github.com/zerob13/animal-fish-and-bugs-web/fork"
      >
        <img
          src="https://img.shields.io/github/forks/zerob13/animal-fish-and-bugs-web?label=Fork&style=social"
          alt="fork-me-on-github"
        />
      </a>
      <a
        target="_blank"
        href="https://github.com/zerob13/animal-fish-and-bugs-web"
      >
        <img
          src="https://img.shields.io/github/watchers/zerob13/animal-fish-and-bugs-web?label=watch&style=social"
          alt="watch-me-on-github"
        />
      </a>
      <a
        target="_blank"
        href="https://github.com/zerob13/animal-fish-and-bugs-web"
      >
        <img
          src="https://img.shields.io/github/stars/zerob13/animal-fish-and-bugs-web?style=social"
          alt="star-me-on-github"
        />
      </a>
      <a target="_blank" href="https://twitter.com/zerob13">
        <img
          src="https://img.shields.io/twitter/follow/zerob13?label=Follow"
          alt="fork-me-on-github"
        />
      </a>
    </div>
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
      <div class="avatar" :class="{ fish: curType == 0, bug: curType == 1 }">
        <img v-if="curItem.Image !== 'Unknown'" :src="curItem.Image" alt="" />
        <div class="unknow-avatar" v-else>Image Unknow</div>
      </div>
      <div class="close-btn" @click="showModal = false">Close Me</div>
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
      ],
      isLoading: false
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
  computed: {
    curMonth() {
      const n = new Date();
      return this.Month[n.getMonth()];
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.isLoading = true;
      const hashKey = `${this.curHemi}-${this.curType}`;
      this.listData = [];
      if (cacheData[hashKey]) {
        this.listData = cacheData[hashKey];
        this.isLoading = false;
        return;
      }
      let hemi = !!this.curHemi;
      let type = this.curType == 0 ? "fish" : "bug";
      getData(hemi, type)
        .then(resp => {
          this.listData = resp;
          cacheData[hashKey] = resp;
          this.isLoading = false;
        })
        .catch(e => {
          this.isLoading = false;
          console.log(e);
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
@import "../styles/loading.scss";
.home {
  background: #b47157;
  padding-bottom: 12px;
  min-height: 100%;
}
.list-wrap {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  overflow-x: hidden;
  justify-content: center;
  position: relative;
  transition: height 0.8s ease-in;
  .item-wrap {
    &.-check {
      background-color: #b1b479;
    }
  }
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
    &.-bottom {
      border-bottom: 1px solid #ccc;
    }
    &.-unknown {
      text-align: center;
      color: #fff;
      font-size: 14px;
      word-break: break-word;
      overflow: hidden;
    }
  }
}
.tab-line {
  display: flex;
  position: relative;
  flex-direction: row;
  padding: 0px 16px 10px;
  &:first-child {
    padding-top: 10px;
  }

  .btn {
    flex: 1;
    width: 50%;
    display: block;
    text-align: center;
    border: 1px solid #eeeceb;
    background: #828282;
    color: #eee;
    border-left: none;
    padding: 2px 4px;
    font-size: 14px;
    &:first-child {
      border-left: 1px solid #eeeceb;
      border-right: none;
    }
    &.active {
      background: #f05e1c;
    }
  }
}
.contact-info {
  display: flex;
  justify-content: space-around;
  margin-top: 12px;
}
// .loading {
//   display: block;
//   position: fixed;
//   left: 50%;
//   top: 50%;
//   transform: translate(-50%, -50%);
//   background: rgba(0, 0, 0, 0.15);
//   z-index: 233;
//   border-radius: 50%;
// }
.detail-modal {
  display: block;
  position: fixed;
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
    justify-content: space-evenly;
    .cal-item {
      margin-top: 8px;
      // background: #cccccc;
      width: 15vw;
      height: 44px;
      text-align: center;
      line-height: 44px;
      border: 1px dashed #000;
      box-sizing: border-box;
      &.check {
        background-color: #bec23f;
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
    width: 150px;
    text-align: center;
    height: 60px;
    display: block;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin-top: 12px;
    position: relative;
    overflow: hidden;
    z-index: 222;
    img {
      height: 100%;
      z-index: 223;
    }
    &.fish {
      &::after {
        background-image: url("../assets/waves.png");
        position: absolute;
        opacity: 0.6;
        content: " ";
        bottom: 0px;
        width: 300px;
        border-radius: 100%;
        transition: all 3s ease-out;
        border-radius: 15px;
        height: 60px;
        animation: water 5s infinite;
      }
    }
    &.bug {
      background-color: #bdd4e7;
      background-image: linear-gradient(315deg, #bdd4e7 0%, #8693ab 74%);
    }
    .unknow-avatar {
      height: 100px;
      padding-top: 20px;
      text-align: center;
      display: inline-block;
    }
  }
}
@keyframes water {
  0% {
    height: 60px;
    left: -120px;
    background-position: top right;
  }
  50% {
    height: 100px;
    left: 0px;
    background-position: top left;
  }
  100% {
    height: 60px;
    left: -120px;
    background-position: top right;
  }
}
</style>
