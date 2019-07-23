import { find } from 'lodash'
import axios from 'axios'

export const state = () => ({
  pages: [],
  caseStudies: {},
  caseStudyPosts: [],
  thoughts: {},
  thoughtsPosts: []
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

    let data

    if (process.env.USE_PROXY) {
      data = await app.$axios
          .get('/.netlify/functions/notion')
          .then(res => {
            console.log(res)
            return res.data
          })
          .catch(err => { console.log(err) })
    } else {
      data = axios.get('./netlify/functions/notion')
      .then(res => {
        console.log(res)
        return res.data
      })
      .catch(err => { console.log(err) })
    }

    const { collections } = data

    state.pages = find(collections, { title: 'Pages' }).items
    state.caseStudies = find(collections, { title: 'Case Studies' })
    state.caseStudyPosts = state.caseStudies.items
    state.thoughts = find(collections, { title: 'Thoughts' })
    state.thoughtsPosts = state.thoughts.items

    return data
  }
}
