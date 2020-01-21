<template>
  <div id="about">
    <button @click="isShown = !isShown">表示の切り替え</button>
    <transition>
      <p v-show="isShown">Hello, World!</p>
    </transition>
  </div>
</template>

<script>
export default {
  name:'about',
  data: function() {
    return {
      isShown: false
    }
  }
}
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 500ms ease-out;
}

.v-enter {
  opacity: 0;
}

.v-enter-to {
  opacity: 1;
}

.v-leave {
  opacity: 1;
}

.v-leave-to {
  opacity: 0;
}
</style>