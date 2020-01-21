<template>
  <div>
    <div>フィールド{{ id }}</div>
    <div><router-link to="/buttle/1">バトル</router-link></div>
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