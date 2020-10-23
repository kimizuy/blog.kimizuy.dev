import fs from 'fs'
import { Feed } from 'feed'
import ReactDOMServer from 'react-dom/server'
import { dateSortDesc } from '@/lib/utils'
import { Meta } from '@/types/post'
import { MDXProvider } from '@mdx-js/react'

export type Preview = { link: string; module: { default: any; meta: Meta } }

const importAll = (r) => {
  return r.keys().map((fileName) => ({
    link: `/posts${fileName.substr(1).replace(/\/index\.mdx$/, '')}`,
    module: r(fileName),
  }))
}

const getAllPostPreviews = async (): Promise<Preview[]> => {
  return importAll(
    require.context('../src/pages/posts/', true, /\.mdx$/)
  ).sort((a, b) =>
    dateSortDesc(a.module.meta.date.published, b.module.meta.date.published)
  )
}

const generate = async () => {
  const previews = await getAllPostPreviews()

  const feed = new Feed({
    title: 'Blog – kimizuy',
    id: 'https://blog.kimizuy.dev',
    link: 'https://blog.kimizuy.dev',
    copyright: 'All rights reserved 2020, kimizuy',
    feedLinks: 'https://blog.kimizuy.dev/feed.xml',
  })

  previews.forEach(({ link, module: { default: Content, meta } }) => {
    feed.addItem({
      title: meta.title,
      id: link,
      link: `https://blog.kimizuy.dev${link}`,
      date: new Date(meta.date.published),
      description: ReactDOMServer.renderToStaticMarkup(<Content />),
    })
  })

  const rss = feed.rss2()

  fs.writeFileSync('./.next/static/feed.xml', rss)
}

generate()