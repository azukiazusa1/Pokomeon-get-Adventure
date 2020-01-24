<template>
  <div>
   <div>さいきんつかまえたポケモン</div>
   <div>{{ count }}</div>
 </div>
</template>

<script>
export default {
	computed: {
		count() {
			return this.$store.state.count
		}
	}
}
</script>