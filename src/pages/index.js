import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import getSection from 'src/actions/getSection';
import Post from 'src/components/Post';
import Title from 'src/components/Title';
import Header from 'src/components/sections/Header';
import Slider from 'src/components/Slider';

const Posts = ({ posts }) => {
  const first = posts[0] || {};
  return (
    <>
      <Header doc={first} />
      <Flex py={6} direction={'column'}>
        <Text>Relacionado</Text>
        <Slider
          gap={3}
          items={[...posts, ...posts]}
          Component={({ item }) => <Post key={item.id} data={item} />}
        />
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
