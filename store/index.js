import axios from 'axios'
import fetch from "isomorphic-unfetch"

const API = 'https://www.notion.so/api/v3/'
const PAGE_ID = '032ae845-419d-4a38-9365-307e62654799'
const TOKEN = "a1653cfaa74dc35ff0ea6ca46fc127ddc4033f0b74142c8eccbfccfdfbddb8f74b745e03660153f5b867aef180b3f0922e5826b3fa945d13a9d4a2513aa09a581ecf1ceb9a3edaf9a621e8067aa8"

const instance = axios.create({
  baseURL: 'https://www.notion.so/api/v3/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'cookie': `token_v2=${TOKEN}`,
    'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
    'accept-language': "en-US,en;q=0.9,fr-FR;q=0.8,fr;q=0.7"
  }
})


export const state = () => ({
  pages: [],
  caseStudies: [],
  articles: [],
  meta: {},
  blocks: {}
})


export const actions = {
  async nuxtServerInit({ dispatch, state }, { app }) {
    const data = await getNotionData()
    // console.log(data)
    state.blocks = data
    return data
  }
}


// async function getBlocks(obj) {
//   let promises = []
//   for (let block in obj) {
//     if (block.value.type === 'page') {
//       let b = await getPageChunk(block.value.id)
//     } else if (block.value.type === 'collection_view') {
//       let b = await getCollection(
//         block.value.id,
//         block.value.view_ids[0]
//       )
//     }
//     promises.push(b)
//   }
//
//   return Promise.all(promises).then(() => {
//     return promises
//   })
// }
//
// async function getPageChunk(id) {
//   const { data } = await instance.post('loadPageChunk', {
//     pageId: id,
//     chunkNumber: 0,
//     limit: 50,
//     verticalColumns: false,
//     cursor: {
//       stack: []
//     }
//   })
//
//   return data
// }
//
// async function getCollection(id, viewId) {
//   const { data } = await instance.post('queryCollection', {
//     collectionId: id,
//     collectionViewId: viewId,
//     limit: 70,
//     loadContentCover: false,
//     type: 'table'
//   })
//
//   return data
// }

// const PAGE_ID = "1a86e7f6-d6a5-4537-a2e5-15650c1888b8";

export default async function getNotionData() {
  const data = await loadPageChunk({ pageId: PAGE_ID });
  const blocks = values(data.recordMap.block);

  const sections = [];
  let meta = {};

  let currentSection = null;

  for (const block of blocks) {
    const value = block.value;

    if (
      value.type === "page" ||
      value.type === "header" ||
      value.type === "sub_header"
    ) {
      sections.push({ title: value.properties.title, children: [] });
      continue;
    }

    const section = sections[sections.length - 1];
    let list = null;

    if (value.type === "image") {
      list = null;
      const child = {
        type: "image",
        src: `/image.js?url=${encodeURIComponent(value.format.display_source)}`
      };
      section.children.push(child);
    } else if (value.type === "text") {
      list = null;
      if (value.properties) {
        section.children.push({
          type: "text",
          value: value.properties.title
        });
      }
    } else if (value.type === "bulleted_list") {
      if (list == null) {
        list = {
          type: "list",
          children: []
        };
        section.children.push(list);
      }
      list.children.push(value.properties.title);
    } else if (value.type === "collection_view") {
      const col = await queryCollection({
        collectionId: value.collection_id,
        collectionViewId: value.view_ids[0]
      });
      const table = {};
      const entries = values(col.recordMap.block).filter(
        block => block.value && block.value.parent_id === value.collection_id
      );
      for (const entry of entries) {
        const props = entry.value.properties;

        // I wonder what `Agd&` is? it seems to be a fixed property
        // name that refers to the value
        table[
          props.title[0][0]
            .toLowerCase()
            .trim()
            .replace(/[ -_]+/, "_")
        ] = props["Agd&"];
      }

      if (sections.length === 1) {
        meta = table;
      } else {
        section.children.push({
          type: "table",
          value: table
        });
      }
    } else {
      list = null;
      console.log("UNHANDLED", value);
    }
  }

  return { sections, meta };
}

async function rpc(fnName, body = {}) {
  const res = await fetch(`https://www.notion.so/api/v3/${fnName}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cookie": `token_v2=${TOKEN}`
    },
    body: JSON.stringify(body)
  });

  if (res.ok) {
    return res.json();
  } else {
    throw new Error(await getError(res));
  }
}

async function getError(res) {
  return `Notion API error (${res.status}) \n${getJSONHeaders(
    res
  )}\n ${await getBodyOrNull(res)}`;
}

function getJSONHeaders(res) {
  return JSON.stringify(res.headers.raw());
}

function getBodyOrNull(res) {
  try {
    return res.text();
  } catch (err) {
    return null;
  }
}

function queryCollection({
  collectionId,
  collectionViewId,
  loader = {},
  query = {}
}) {
  const {
    limit = 70,
    loadContentCover = true,
    type = "table",
    userLocale = "en",
    userTimeZone = "America/Los_Angeles"
  } = loader;

  const {
    aggregate = [
      {
        aggregation_type: "count",
        id: "count",
        property: "title",
        type: "title",
        view_type: "table"
      }
    ],
    filter = [],
    filter_operator = "and",
    sort = []
  } = query;

  return rpc("queryCollection", {
    collectionId,
    collectionViewId,
    loader: {
      limit,
      loadContentCover,
      type,
      userLocale,
      userTimeZone
    },
    query: {
      aggregate,
      filter,
      filter_operator,
      sort
    }
  });
}

function loadPageChunk({
  pageId,
  limit = 100,
  cursor = { stack: [] },
  chunkNumber = 0,
  verticalColumns = false
}) {
  return rpc("loadPageChunk", {
    pageId,
    limit,
    cursor,
    chunkNumber,
    verticalColumns
  });
}

function values(obj) {
  const vals = [];
  for (const key in obj) {
    vals.push(obj[key]);
  }
  return vals;
}
