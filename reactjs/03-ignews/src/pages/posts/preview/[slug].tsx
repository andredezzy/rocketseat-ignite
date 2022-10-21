import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { getSession, useSession } from 'next-auth/react';
import * as prismicHelpers from '@prismicio/helpers';

import { createClient } from '../../../services/prismic';

import styles from '../post.module.scss';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

interface PostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function PostPreview({ post }: PostPreviewProps) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if ((session as any)?.activeSubscription) {
      router.push(`/posts/${post.slug}`);
    }
  }, [post.slug, router, session]);
  
  return (
    <>
      <Head>
        <title>{`${post.title} | ig.news`}</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>

          <time>{post.updatedAt}</time>

          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className={`${styles.postContent} ${styles.previewContent}`}
          /> 

          <div className={styles.continueReading}>
            Wanna continue reading?
            <Link href={`/posts/${post.slug}`}>
              <a>Subscribe now 🤗</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = createClient();

  const response = await prismic.getByUID('post', String(slug), {});

  const post = {
    slug,
    title: response.data.title,
    content: prismicHelpers.asHTML(response.data.content.splice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  };

  return {
    props: {
      post,
    },
    revalidate: 60 * 30, // 30 minutes
  }
}