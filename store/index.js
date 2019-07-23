import { find } from 'lodash'
import axios from 'axios'
import { handler } from '@/functions/notion.js'

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
      const data = await handler().then(res => JSON.parse(res.body))
      const { collections } = data
      const pages = find(collections, { title: 'Pages' })

      state.pages = pages.items
      state.caseStudies = find(collections, { title: 'Case Studies' })
      state.caseStudyPosts = state.caseStudies.items
      state.thoughts = find(collections, { title: 'Thoughts' })
      state.thoughtsPosts = state.thoughts.items

      return data
    } catch (e) {
      console.log('Error', e)
    }
  }
}
