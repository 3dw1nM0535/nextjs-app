import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postDir = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // Get file names under posts/
  const fileNames = fs.readdirSync(postDir)
  const allPostsData = fileNames.map(fileName => {
    // Remote .md extension to get file id
    const id = fileName.replace(/\.md$/, '')

    // Read file as string
    const fullPath = path.join(postDir, fileName)
    const fileContent = fs.readFileSync(fullPath, 'utf8')
    
    // Parse post metadata
    const matterResult = matter(fileContent)

    // Join data with id
    return {
      id,
      ...matterResult.data,
    }
  })

  // Return sorted by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getPostIds() {
  const fileNames = fs.readdirSync(postDir)
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    }
  })
}

export async function getPostData(id: string) {
  const fullPath = path.join(postDir, `${id}.md`)
  const fileContent = fs.readFileSync(fullPath, 'utf8')

  // Parse post metadata section
  const matterResult = matter(fileContent)
  // Convert md into html

  const processedMd = await remark()
    .use(html)
    .process(matterResult.content)
  const htmlContent = processedMd.toString()

  return {
    id,
    htmlContent,
    ...matterResult.data,
  }
}
