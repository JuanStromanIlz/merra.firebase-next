import React from 'react';
import { Flex } from '@chakra-ui/react';
import getSection from 'src/actions/getSection';
// import PostPreview from 'src/components/sections/PostPreview';
// import GroupedPosts from 'src/components/sections/GroupedPosts';

const Posts = ({ posts = [] }) => {
  console.log('🚀 ~ file: index.js:8 ~ Posts ~ posts:', posts);
  // const headerPost = posts.slice(0, 1)[0] || {};
  // const otherPosts = posts.slice(1) || [];

  return (
    <Flex direction={'column'} gap={6}>
      {/* <PostPreview doc={headerPost} />
      <GroupedPosts posts={otherPosts} /> */}
    </Flex>
  );
};

export async function getStaticProps() {
  const posts = await getSection();

  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
}

export default Posts;
