<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import "./styles/reset.css";
export default {
  name: "AnimalCross"
};
</script>
<style lang="scss">
.tooltip {
  &.popover {
    $color: #f9f9f9;
    background: #fff;

    .popover-inner {
      box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.16);
      color: black;
      background: #fff;
      border-radius: 5px;
      padding: 6px;
    }

    .popover-arrow {
      border-color: $color;
    }
  }
}
</style>
