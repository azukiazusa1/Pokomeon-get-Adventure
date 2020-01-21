<template>
  <div id="app">
    <nav>
      <ul>
        <li><router-link to="/">Top</router-link></li>
        <li><router-link to="/adventure">ポケモンをさがしにいく</router-link></li>
        <li><router-link to="/pokedex">ポケモンずかんをみる</router-link></li>
        <li><router-link to="/recentry-get">さいきんつかまえたポケモン</router-link></li>
      </ul>
    </nav>
    <router-view/>
  </div>
</template>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

ul {
  list-style: none;
  display: flex;
  justify-content: center;
}

li {
  padding: 20px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
