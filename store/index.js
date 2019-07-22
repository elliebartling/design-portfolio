import { find } from 'lodash'

export const state = () => ({
  pages: [],
  caseStudies: {},
  caseStudyPosts: [],
  thoughts: [],
  // notion: {}
})

export const getters = {
  getPostByTitle: state => (collection, title) => {
    return find(state[collection], { title: title })
  },
  getPostBySlug: state => (collection, slug) => {
    return find(state[collection], { slug: slug })
  }
}

export const actions = {
  async nuxtServerInit({ dispatch, state }, { app }) {
    const { data } = await app.$axios.get('/.netlify/functions/data')
    const backup = (await app.$axios.get('/.netlify/functions/notion')).data
    // const backup = require('../content/cache_migrated.json')
    // state.notion = backup

    state.caseStudies = find(backup.collections, { title: 'Case Studies' })
    state.caseStudyPosts = state.caseStudies.items
    // state.caseStudies = data.caseStudies
    // state.thoughts = data.thoughts.filter(post => {
    //   post.meta.tags.Status === 'Published'
    // })
    state.thoughts = data.thoughts
    state.pages = data.pages

    return data
  }
}
