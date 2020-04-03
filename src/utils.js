const utils = {
  getLs() {
    if ("localStorage" in window) {
      const ls = window.localStorage;
      return ls;
    }
    return {
      setItem() {
        console.log("nothing");
      },
      getItem() {
        return null;
      }
    };
  },
  saveJson(key, data) {
    this.getLs().setItem(key, JSON.stringify(data));
  },
  getJson(key) {
    return JSON.parse(this.getLs().getItem(key));
  }
};
export default utils;
