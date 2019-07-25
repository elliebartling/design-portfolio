<template>
  <div id="home" class="">
    <section id="hero" class="container">
      <component
        v-for="(block, index) in blocks"
        class="home-block component-block mx-auto"
        :is="getBlockType(block)"
        :block="block"
        :key="index"
      ></component>
    </section>
    <CaseStudies />
    <!-- <Thoughts /> -->
    <footer id="footer">
      <div class="container">
        <div class="row">
          <component
            v-for="(block, index) in footerBlocks"
            class="footer-block component-block mx-auto"
            :is="getBlockType(block)"
            :block="block"
            :key="index"
          ></component>
        </div>
        <div class="row">
          <a :href="resume" class="mono">
            <span class="highlight-link">view resume</span>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import CaseStudies from '~/components/CaseStudies.vue'
import cheerio from 'cheerio'
import camelCase from 'lodash/camelCase'
import Brief from '@/components/Brief'
import MoreHighlights from '@/components/MoreHighlights'
import TextBlock from '@/components/blocks/Text'
import ImageBlock from '@/components/blocks/Image'
import SubHeaderBlock from '@/components/blocks/SubHeader'
import SubSubHeaderBlock from '@/components/blocks/SubHeader'
import HeaderBlock from '@/components/blocks/Header'
import QuoteBlock from '@/components/blocks/Quote'
import NumberedListBlock from '@/components/blocks/NumberedList'
import CalloutBlock from '@/components/blocks/Callout'
import InvisionBlock from '@/components/blocks/Invision'
import VideoBlock from '@/components/blocks/Video'
import ColumnListBlock from '@/components/blocks/ColumnList'
import Footer from '@/components/Footer'

export default {
  name: 'Home',
  data() {
    return {
      resume: 'https://www.dropbox.com/s/6dabc3mwczbh9io/ellenbartling.resume.pdf?dl=0'
    }
  },
  components: {
    Footer,
    CaseStudies,
    TextBlock,
    ImageBlock,
    SubHeaderBlock,
    SubSubHeaderBlock,
    HeaderBlock,
    QuoteBlock,
    NumberedListBlock,
    CalloutBlock,
    InvisionBlock,
    VideoBlock,
    ColumnListBlock
  },
  computed: {
    page() {
      return this.$store.getters.getPostBySlug('pages', 'home')
    },
    blocks() {
      return this.page ? this.page.blocks : []
    },
    footerBlocks() {
      const page = this.$store.getters.getPostBySlug('pages', 'footer')
      return page ? page.blocks : []
    }
  },
  methods: {
    getBlockType(block) {
      if (block) {
        return camelCase(block.type + 'Block')
      }
    }
  },
  mounted() {
    console.log(this.$store.state)
  }
}
</script>

<style lang="scss">
body, html {
  background: #FFF;
}

#home {
  margin-top: 40px;
  background: white;
}

section#hero {
  padding-top: 2rem;
  padding-bottom: 2rem;
  @media only screen and (min-width: 700px) {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }
}

#home #hero h1 {
  font-size: 3.5rem; // 36px
  line-height: 1.1;
}

#home .home-block {
  width: 90%;

  @media only screen and (min-width: 700px) {
    width: 60%;
    margin-left: 20%;
    h2 {
      font-size: 48px;
      margin-bottom: 1rem;
    }
  }
}

#home #hero .text.component-block {
  margin-bottom: 4rem;
}

#home .text.component-block {
  width: 90%;
  @media only screen and (min-width: 700px) {
    width: 55%;
  }
  font-family: 'IBM Plex Mono', monospace;
  font-size: 16px;
  margin-top: 0rem;
  margin-bottom: 1rem;
  line-height: 1.6;
}

#home #footer {
  background: #DCDCDC;
  padding-bottom: 4rem;
  padding-top: 4rem;

  .header h2 {
    margin-top: 0;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin: auto;
    padding: 5%;

    @media only screen and (min-width: 700px) {
      padding: 0px;
      width: 80%;
    }

    @media only screen and (min-width: 1200px) {
      width: 60%;
    }
  }

  .row {
    margin-bottom: 3rem;
  }

  .footer-block {
    width: 100%;
  }

  a.mono {
    color: black;
    font-weight: 800;
    display: inline;
    position: relative;
  }
}


.highlight-link {
  position: relative;
  z-index: 1;
  &:hover {
    &:before {
      max-height: 40px;
      transition: all 0.25s ease;
    }
  }
}

.highlight-link:before {
  background-color: #FFA0A0;
  max-height: 6px;
  height: 100%;
  display: block;
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  z-index: 0;
  opacity: 0.5;
  transition: all 0.25s ease;
}
</style>
