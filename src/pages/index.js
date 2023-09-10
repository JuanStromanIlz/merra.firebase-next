import React from 'react';
import { Container, SimpleGrid } from '@chakra-ui/react';
import getSection from 'src/actions/getSection';
import Post from 'src/components/Post';
import Title from 'src/components/Title';

const Posts = ({ posts }) => {
  return (
    <>
      <Title as={'h2'} size={'4xl'} letterSpacing={'wider'} isTruncated my={12}>
        posts
      </Title>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={6}
        alignItems={'center'}
      >
        {posts?.map((item) => (
          <Post key={item.id} data={item} href={`/${item.title}`} />
        ))}
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
