<template>
  <div>
    ぽけもん{{ id }}
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        id: this.$route.params.id
      }
    }
  }
</script>