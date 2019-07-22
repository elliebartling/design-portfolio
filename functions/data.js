const path  = require('path')
const csv   = require('csv-parser')
const fs    = require('fs')
const _     = require('lodash')
const cheerio = require('cheerio')


export async function handler() {
  const pages = getFilesFromFolder('./content/latest/Pages')
  const caseStudies = getFilesFromFolder('./content/latest/Case Studies')
  const thoughts = getFilesFromFolder('./content/latest/Thoughts')

  const caseStudiesData = formatData('/work/', caseStudies)
  const thoughtsData = formatData('/thoughts/', thoughts)
  const pagesData = formatData('/', pages)

  return {
    statusCode: 200,
    body: JSON.stringify({
      caseStudies: caseStudiesData,
      thoughts: thoughtsData,
      pages: pagesData
    })
  }
}


const isFile = fileName => {
  return fs.lstatSync(fileName).isFile()
}


const getMetaFromTable = (table) => {
  let $ = cheerio.load(table)
  let meta = {}

  $('tr').each((row, elem) => {
    let value
    let property = $('th', elem).text()
    let classes = $(elem).attr('class')

    if (classes.includes('text')) {
      value = $('td', elem).text()
    } else if (classes.includes('file')) {
      value = $('a', elem).attr('href')
    } else if (classes.includes('multi')) {
      value = $('.selected-value', elem).toArray().map(x => ($(x).text()))
    } else {
      value = null
    }

    meta[property] = value
  })

  return meta
}

const getFilesFromFolder = (folder) => {
  const folderPath = path.resolve(folder)
  const files = fs.readdirSync(folderPath).map(fileName => {
    return path.join(folderPath, fileName)
  }).filter(isFile)

  return files
}


const formatData = (base, array) => {
  const data = array.map(post => {
    const html = fs.readFileSync(post, 'utf8')
    const $ = cheerio.load(html)

    const meta = getMetaFromTable(cheerio.html($('table.properties')))
    $('table.properties').remove()
    const body = $('body').html()
    const title = $('title').text()
    const slug = base + _.kebabCase(title)

    return {
      body: body,
      title: title,
      meta: meta,
      slug: slug
    }
  })

  return data
}
