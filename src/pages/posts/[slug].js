import PostContent from '@/components/posts/post-detail/post-content';
import { APP_URL } from '@/lib/network';
import { Fragment } from 'react';

function PostDetailPage(props) {
  return <PostContent post={props.post} />;
}

export default PostDetailPage;

export async function getStaticPaths() {
  const allPosts = await fetch(APP_URL);
  const data = await allPosts.json();
  const res = data.posts;

  return {
    paths: res.map((item) => ({ params: { slug: item.slug } })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  const postData = await fetch(`${APP_URL}/posts/${slug}`);
  const data = await postData.json();
  return {
    props: {
      post: data.post,
    },
    revalidate: 600,
  };
}
