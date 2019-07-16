<template>
  <div id="home" class="container is-fluid">
    <nav id="nav" class="container">
      <div class="social-icons">
        <img src="@/assets/icons/github.svg" />
        <img src="@/assets/icons/instagram.svg" />
        <img src="@/assets/icons/mail.svg" />
        <img src="@/assets/icons/medium.svg" />
      </div>
    </nav>
    <section id="hero" class="container">
      <div class="columns">
        <div class="column is-6 is-offset-2">
          <h1 class="title is-spaced">
            Hello, I'm Ellen. <br/>
            I'm an experience designer & <br/>
            engineer in Austin, TX.
          </h1>
          <p class="subtitle mono">
            I’m a systems-thinker by training and a generalist at heart. I help brands use human-centered design & technology to solve big problems and tell great stories.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>

<style lang="scss">
body, html {
  background: #E1E1E1;
}

#home {
  margin-top: 40px;
  background: white;
}

section#hero {
  padding-top: 10rem;
  padding-bottom: 10rem;
}

.subtitle {
  font-size: 14px;
  margin-top: 1rem;
  line-height: 1.4;
}


nav.container {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
}
.social-icons {
  padding-top: 2rem;
  display: block;
  img {
    margin-right: 12px;
  }
}

</style>
