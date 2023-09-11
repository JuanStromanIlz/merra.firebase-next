import React from 'react';
import { Container, SimpleGrid } from '@chakra-ui/react';
import getSection from 'src/actions/getSection';
import Post from 'src/components/Post';
import Title from 'src/components/Title';
import Header from 'src/components/sections/Header';

const Posts = ({ posts }) => {
  const first = posts[0] || {};
  return (
    <>
      <Header doc={first} />
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 4 }}
        spacing={3}
        p={3}
        alignItems={'center'}
      >
        {posts?.map((item, index) =>
          index === 0 ? null : <Post key={item.id} data={item} />
        )}
      </SimpleGrid>
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
