import AllPosts from '@/components/posts/all-posts';
import { APP_URL } from '@/lib/network';
import Head from 'next/head';

const { Fragment } = require('react');

function AllPostsPage(props) {
  const DUMMY_POSTS = [
    {
      slug: 'p1',
      title: 'NextJS 1',
      image: 'next-js.png',
      excerpt:
        'Laravel is a web application framework with expressive, elegant syntax. A web framework provides a structure and starting point for creating your application, allowing you to focus on creating something amazing while we sweat the details.',
      date: '2022-02-10',
    },

    {
      slug: 'p2',
      title: 'NextJS 2',
      image: 'next-js.png',
      excerpt:
        'Laravel is a web application framework with expressive, elegant syntax. A web framework provides a structure and starting point for creating your application, allowing you to focus on creating something amazing while we sweat the details.',
      date: '2022-02-10',
    },

    {
      slug: 'p3',
      title: 'NextJS 3',
      image: 'next-js.png',
      excerpt:
        'Laravel is a web application framework with expressive, elegant syntax. A web framework provides a structure and starting point for creating your application, allowing you to focus on creating something amazing while we sweat the details.',
      date: '2022-02-10',
    },
  ];

  return (
    <Fragment>
      <Head>
        <title>All Posts</title>
        <meta
          name="description"
          content="content='A list of all programming-related tutorials and posts!'"
        />
      </Head>
      <AllPosts posts={props.posts} />
    </Fragment>
  );
}

export default AllPostsPage;

export async function getStaticProps() {
  const data = await fetch(APP_URL);
  const jsonData = await data.json();
  const allPosts = jsonData.posts;

  return {
    props: {
      posts: allPosts,
    },
  };
}
