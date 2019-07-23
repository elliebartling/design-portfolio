import { find } from 'lodash'
import axios from 'axios'
import getNotionData from '@/functions/notion.js'

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
    try {
      const joke = await axios.get('http://api.icndb.com/jokes/random')
      console.log(joke)

      // const data = await app.$axios.$get('/.netlify/functions/notion')
      const data = await getNotionData()
      console.log(data)
      const { collections } = data

      state.pages = find(collections, { title: 'Pages' }).items
      state.caseStudies = find(collections, { title: 'Case Studies' })
      state.caseStudyPosts = state.caseStudies.items
      state.thoughts = find(collections, { title: 'Thoughts' })
      state.thoughtsPosts = state.thoughts.items

      return [joke, data]
    } catch (e) {
      console.log('Error', e)
    }
  }
}
