import React from 'react';
import { Flex } from '@chakra-ui/react';
import getSection from 'src/actions/getSection';
import GroupedPosts from 'src/components/sections/GroupedPosts';

const Posts = ({ posts = [] }) => {
  return (
    <Flex direction={'column'} gap={6}>
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
