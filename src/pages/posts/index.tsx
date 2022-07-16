import { GetStaticProps } from 'next';
import Head from 'next/head';
import { RichText } from 'prismic-dom';
import { createClient } from '../../services/prismic';
import styles from './styles.module.scss';

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};

interface PostsProps {
  posts: Post[];
}

const Posts = ({ posts }: PostsProps) => {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.postList}>
          {posts.map((post) => (
            <a href='#' key={post.slug}>
              <time>{post.updatedAt}</time>
              <strong>{post.title}</strong>
              <p>{post.excerpt}</p>
            </a>
          ))}
        </div>
      </main>
    </>
  );
};

export default Posts;

export const getStaticProps: GetStaticProps = async () => {
  const prismic = createClient();

  const posts = await prismic.getAllByType('post');

  const parsedPosts = posts.map((post) => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt:
        post.data.content.find((content: any) => content.type === 'paragraph')
          ?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        'en-US',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }
      ),
    };
  });

  console.log(posts);

  return {
    props: {
      posts: parsedPosts,
    },
  };
};
