<template>
  <div>
    <nav class="navbar">
      <router-link to="/">Ellen Marie Bartling</router-link>
      <div class="social-icons">
        <a class="icon" href="https://github.com/elliebartling">
          <img src="@/assets/icons/github.svg" />
        </a>
        <a class="icon" href="mailto:ellenbartling@gmail.com">
          <img src="@/assets/icons/mail.svg" />
        </a>
      </div>
    </nav>
    <nuxt class="app" />
  </div>
</template>

<style lang="scss">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.navbar {
  padding: 15px;
  position: fixed;
  background-color: transparent;
  top: 0;
  width: 100%;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  a {
    color: black;
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 600;
    font-size: 14px;
  }

  .social-icons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .icon {
      margin-right: 18px;
    }
  }
}

.app {
  margin-top: 50px;
}
</style>
