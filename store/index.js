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

    const { data } = await axios.get('/.netlify/functions/notion')
    const { collections } = data

    state.pages = find(collections, { title: 'Pages' }).items
    state.caseStudies = find(collections, { title: 'Case Studies' })
    state.caseStudyPosts = state.caseStudies.items
    state.thoughts = find(collections, { title: 'Thoughts' })
    state.thoughtsPosts = state.thoughts.items

    return Promise.all(data)
  }
}
