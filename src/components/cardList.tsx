import { Date } from '@/components/date'
import { Preview } from '@/types/post'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import styles from './cardList.module.css'
import { LightText } from './lightText'

type Props = {
  previews: Preview[]
}

export const CardList: React.VFC<Props> = (p: Props) => {
  return (
    <div role="list" className={styles.cardList}>
      {p.previews.map((preview) => (
        <Card preview={preview} key={preview.link} />
      ))}
    </div>
  )
}

const Card: React.VFC<{ preview: Preview }> = ({ preview }) => {
  const {
    link,
    module: { meta },
  } = preview

  return (
    <Link href={link}>
      <a role="listitem" className={styles.card}>
        <div className={styles.imgWrapper}>
          <Image src={meta.image} alt={link} layout="fill" />
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.title}>{meta.title}</div>
          <LightText className={styles.marginTopAuto}>
            {meta.tags.map((tag) => (
              <Fragment key={tag}>
                <Link href="/tags/[tag]" as={`/tags/${tag}`}>
                  <a tabIndex={-1}>#{tag}</a>
                </Link>{' '}
              </Fragment>
            ))}
            <br />
            <Date date={meta.date} />
          </LightText>
        </div>
      </a>
    </Link>
  )
}
