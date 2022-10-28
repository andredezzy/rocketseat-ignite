import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { getSession } from 'next-auth/react';
import * as prismicHelpers from '@prismicio/helpers';

import { createClient } from '../../services/prismic';

import styles from './post.module.scss';

interface PostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function Post({ post }: PostProps) {
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
            className={styles.postContent}
          /> 
        </article>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, params, previewData }) => {
  const session = await getSession({ req }) as any;
  const { slug } = params;

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: `/posts/preview/${slug}`,
        permanent: false,
      },
    };
  }

  const prismic = createClient({ previewData });

  const response = await prismic.getByUID('post', String(slug), {});

  const post = {
    slug,
    title: response.data.title,
    content: prismicHelpers.asHTML(response.data.content),
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
  }
}