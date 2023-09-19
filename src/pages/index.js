import React from 'react';
import { Flex } from '@chakra-ui/react';
import getSection from 'src/actions/getSection';
import PostPreview from 'src/components/sections/PostPreview';

const Posts = ({ posts }) => {
  return (
    <Flex gap={6} direction={'column'}>
      {posts.map((data) => (
        <PostPreview key={data.title} doc={data} />
      ))}
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
