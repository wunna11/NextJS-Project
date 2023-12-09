// import { readdirSync } from 'node:fs';
// import path from 'path';
// import matter from 'gray-matter';

// const postsDirectory = path.join(process.cwd(), 'posts');

// export function getPostsFiles() {
//   return readdirSync(postsDirectory);
// }

export async function getFeaturedPosts(posts) {
  return posts.filter((post) => post.isFeatured);
}

export async function getAllPostsById(posts) {
  return posts.map((post) => {
    return {
      params: {
        slug: post.slug,
      },
    };
  });
}

export async function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;
  const postData = await fetch(`${APP_URL}/${slug}`);
  return {
    props: {
      postData,
    },
  };
}
