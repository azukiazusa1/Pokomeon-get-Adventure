<template>
  <div>
    ぽけもん{{ name }}
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        name: this.$route.params.name
      }
    }
  }
</script>