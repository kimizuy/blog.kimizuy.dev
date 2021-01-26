import { useImageOverlay } from '@/providers/imageOverlayProvider'
import { Components } from '@mdx-js/react'
import Image from 'next/image'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/vsDark'
import { Fragment } from 'react'
import styles from './mdxComponents.module.css'

const CodeBlock: React.VFC<{
  children: string
  className: string
}> = ({ children, className }) => {
  const splited = className.replace(/language-/, '').split(':')
  const language = splited[0] as Language
  const fileName = splited[splited.length - 1]

  return (
    <div className={styles.codeBlock}>
      <span className={styles.fileName}>{fileName}</span>
      <Highlight
        {...defaultProps}
        theme={theme}
        code={children.trim()}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} ${styles.pre}`} style={style}>
            {tokens.map((line, i) => (
              <div
                key={i}
                {...getLineProps({ line, key: i })}
                className={styles.line}
              >
                <span className={styles.lineNo}>{i + 1}</span>
                <span className={styles.lineContent}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}

export const MDXComponents: Components = {
  img: (props) => {
    const { updateSrc } = useImageOverlay()
    const src: string = props.src
    const srcName = src.split('/')[src.split('/').length - 1].split('.')[0]

    return (
      <div className={styles.imgWrapper}>
        <Image
          src={src}
          alt={srcName}
          // https://nextjs.org/docs/api-reference/next/image#layout
          layout="responsive"
          objectFit="contain"
          width={1170}
          height={658.125}
          className={styles.img}
          onClick={() => {
            updateSrc(props.src)
          }}
        />
      </div>
    )
  },
  pre: (props) => <Fragment {...props} />,
  code: CodeBlock,
  p: (props) => <p className={styles.p}>{props.children}</p>,
  h1: (props) => {
    return (
      <h1 id={props.children} className={`${styles.heading} ${styles.h1}`}>
        {props.children}
      </h1>
    )
  },
  h2: (props) => {
    return (
      <h2 id={props.children} className={`${styles.heading} ${styles.h2}`}>
        {props.children}
      </h2>
    )
  },
  h3: (props) => {
    return (
      <h3 id={props.children} className={`${styles.heading} ${styles.h3}`}>
        {props.children}
      </h3>
    )
  },
  ul: (props) => <ul className={styles.ul}>{props.children}</ul>,
  ol: (props) => <ol className={styles.ol}>{props.children}</ol>,
}
