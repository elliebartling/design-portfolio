import axios from 'axios'
import _ from 'lodash'
const PAGE_ID = '032ae845-419d-4a38-9365-307e62654799'
const TOKEN = "a1653cfaa74dc35ff0ea6ca46fc127ddc4033f0b74142c8eccbfccfdfbddb8f74b745e03660153f5b867aef180b3f0922e5826b3fa945d13a9d4a2513aa09a581ecf1ceb9a3edaf9a621e8067aa8"

const instance = axios.create({
  baseURL: 'https://www.notion.so/api/v3/',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    'cookie': `token_v2=${TOKEN}`,
    'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
    'accept-language': "en-US,en;q=0.9,fr-FR;q=0.8,fr;q=0.7"
  }
})

export async function handler(pageId) {
  const { data } = await loadPageChunk(PAGE_ID)

  const blocks = data.recordMap.block
  const collection_views = data.recordMap.collection_view
  const collects = data.recordMap.collection

  let collections = await Promise.all(_(blocks)
      .filter(block => (block.value.type === 'collection_view'))
      .map(async block => {
        let data = block.value

        data.page_sort = collection_views[data.view_ids[0]].value.page_sort
        data.title = _.flatten(collects[data.collection_id].value.name)[0]
        data.items = await loadCollectionPages(data.page_sort)

        for (let item of data.items) {
          const { value } = item.meta || {}

          if (!_.isEmpty(value)) {
            item.title = _.flattenDeep(value.properties.title)[0]
            item.slug = _.kebabCase(item.title)
            item.id = value.id
            item.post_meta = value.properties

            // Format blocks to be more legible
            item.blocks = item.content.map(block => {
              if (block) {
                return {
                  type: block.value.type,
                  id: block.value.id,
                  parent_id: block.value.parent_id,
                  properties: block.value.properties,
                  format: block.value.format
                }
              }
            })

            item.content = null
          }
        }

        return data
      })
      .value())

  return {
    statusCode: 200,
    body: JSON.stringify({
      collections: collections
    })
  }
}


async function loadPageChunk(pageId) {
  return await instance.post('loadPageChunk', {
    pageId: pageId,
    chunkNumber: 0,
    limit: 100,
    verticalColumns: false,
    cursor: {
      stack: []
    }
  })
  .catch(err => {
    console.log(err)
    return err
  })
}

async function loadCollectionPages(collection) {
  let promises = []

  // Iterate through the collection items
  for (let id in collection) {

    // Fetch data about this item
    const { data } = await loadPageChunk(collection[id])
    const blocks = data.recordMap.block || {}

    // Filter out empty pages
    if (!_.isEmpty(blocks)) {
      const pageData = blocks[collection[id]]
      let content

      if (pageData && pageData.value.content) {
        content = pageData.value.content.map(block => {
          return data.recordMap.block[block]
        })
      } else {
        content = []
      }

      const page = {
        meta: pageData,
        content: content
      }

      promises.push(page)
    }
  }

  return Promise.all(promises).then(completed => {
    return completed
  })
}
