import matter from "gray-matter"
import { FrontMatter } from "../types/post"
import markdownToHtml from "./markdownToHtml"
import { getFileContents, getFileNames, getFrontMatter } from "./util"

const fileNames = getFileNames()

export function getSortedPostsData() {
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "")
    const frontMatter = getFrontMatter(fileName)
    return {
      slug,
      ...frontMatter,
    }
  })

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllSlugs() {
  const slugs = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "")
    return { params: { slug } }
  })

  return slugs
}

export async function getPostData(slug: string) {
  const fileContents = getFileContents(slug)
  const { data, content } = matter(fileContents)
  const contentHtml = await markdownToHtml(content)

  return {
    slug,
    contentHtml,
    ...(data as FrontMatter),
  }
}
