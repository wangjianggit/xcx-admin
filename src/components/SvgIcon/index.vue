<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"/>
    <!-- <img class="img" src="../../../static/2211.jpg" alt=""/> -->
  </svg>
  <!-- <img class="img" src="../../../static/2211.jpg" alt=""/> -->
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        console.log(this.className)
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1.4em;
  /* width: 20px;
  height: 20px; */
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.img {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
