<template>
  <div>
   <div>さいきんつかまえたポケモン</div>
   <div id="count">{{ count }}</div>
 </div>
</template>

<script>
import anime from 'animejs'
export default {
  data: function() {
    return {
      num: this.$store.state.count,
      count: 0
    }
  },
  mounted () {
    this.setCount(this.num);
  },
	methods: {
		setCount(val) {
      const obj = { n: this.count }
      anime({
        targets: obj,
        n: val,
        round: 1,
        duration: 500,
        easing: 'linear',
        update: () => {
          this.count = obj.n
        }
      })
    }
	},
}
</script>