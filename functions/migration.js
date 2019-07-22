const path = require('path')
const fs = require('fs')
const _ = require('lodash')

export async function handler() {
  const data = require('../content/cache.json')

  // const blocks = data.recordMap.block
  // const collection_views = data.recordMap.collection_view
  // const collects = data.recordMap.collection

  let collections = _(data.collections)
    .map(collection => {
      // let content = collection.content

      for (let item of collection.items) {
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
                properties: block.value.properties
              }
            }
          })
        }
      }

      return collection
    })
    .value()

    fs.writeFileSync('../content/cache_migrated.json', JSON.stringify(
      collections
    ))

  // let collections = await Promise.all(_(blocks)
  //     .filter(block => (block.value.type === 'collection_view'))
  //     .map(async block => {
  //       let data = block.value
  //
  //       data.page_sort = collection_views[data.view_ids[0]].value.page_sort
  //       data.title = _.flatten(collects[data.collection_id].value.name)[0]
  //       // data.items = await loadCollectionPages(data.page_sort)
  //
  //       for (let item of data.items) {
  //         const { value } = item.meta || {}
  //
  //         if (!_.isEmpty(value)) {
  //           item.title = _.flattenDeep(value.properties.title)[0]
  //           item.slug = _.kebabCase(item.title)
  //           item.id = value.id
  //           item.post_meta = value.properties
  //
  //           // Format blocks to be more legible
  //           item.blocks = item.content.map(block => {
  //             if (block) {
  //               return {
  //                 type: block.value.type,
  //                 id: block.value.id,
  //                 parent_id: block.value.parent_id,
  //                 properties: block.value.properties
  //               }
  //             }
  //           })
  //         }
  //       }
  //
  //       return data
  //     })
  //     .value())

  return {
    statusCode: 200,
    body: JSON.stringify({
      collections: collections
    })
  }
}
