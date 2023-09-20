import React from 'react';
import { Flex } from '@chakra-ui/react';
import getSection from 'src/actions/getSection';
import PostPreview from 'src/components/sections/PostPreview';
import GroupedPosts from 'src/components/sections/GroupedPosts';

const Posts = ({ posts }) => {
  return (
    <Flex gap={6} direction={'column'}>
      <PostPreview doc={posts[0]} />
      <GroupedPosts posts={posts} />
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
