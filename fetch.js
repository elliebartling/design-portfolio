const axios = require('axios')
const dotenv = require('dotenv')

dotenv.config()

const { TOKEN, NOTION_ID } = process.env



var instance = axios.create({
  baseURL: 'https://www.notion.so/api/v3/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'cookie': `token_v2=${TOKEN}`,
    'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
    'accept-language': "en-US,en;q=0.9,fr-FR;q=0.8,fr;q=0.7"
  }
})

const data = instance.post('loadPageChunk', {
  pageId: "032ae845-419d-4a38-9365-307e62654799",
  chunkNumber: 0,
  limit: 50,
  verticalColumns: false,
  cursor: {
    stack: []
  }
}).then(async (res) => {
  const data = res.data.recordMap
  const blocks = data.block
  const collections = data.collection

  let blockData = await goGetBlocks(blocks)
  console.log(blockData)
  // const blockData = await Promise.all(promises).then((result) => ({ result }))

  // console.log(blockData)
  // console.log(data)
})


async function goGetBlocks(obj) {
  let promises = []
  for (let block in obj) {
    const b = await getPageChunk(block)
    promises.push(b)
    // console.log(b)
  }

  return Promise.all(promises).then(() => {
    return promises
  })
}

async function getPageChunk(id) {
  const { data } = await instance.post('loadPageChunk', {
    pageId: id,
    chunkNumber: 0,
    limit: 50,
    verticalColumns: false,
    cursor: {
      stack: []
    }
  })

  return data
}
