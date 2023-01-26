import Head from 'next/head'
import Link from 'next/link'

import utilStyles from '@/styles/utils.module.css'
import Layout, { siteTitle} from '@/components/layout'
import Date from '@/components/date'
import { getSortedPostsData } from '../lib/post'

export async function getStaticProps() {
  const allPosts = getSortedPostsData()
  return {
    props: {
      allPosts,
    },
  }
}

export default function Home({ allPosts }: any) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
        <section className={utilStyles.headingMd}>
          <p>Diary</p>
        </section>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Blog</h2>
          <ul className={utilStyles.list}>
            {allPosts.map(({ id, title, date }: any) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}>{title}</Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
            ))}
          </ul>
        </section>
      </Head>
    </Layout>
  )
}
