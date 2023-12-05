import React from 'react';
import { Flex } from '@chakra-ui/react';
import getSection from 'src/actions/getSection';
import GroupedPosts from 'src/components/sections/GroupedPosts';
import { NextSeo } from 'next-seo';

const Posts = ({ posts = [] }) => {
  return (
    <>
      <NextSeo title='Merra Marie' defaultTitle='Merra Marie' />
      <Flex direction={'column'} gap={6}>
        <GroupedPosts posts={posts} />
      </Flex>
    </>
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
