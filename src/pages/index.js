import React from 'react';
import { Container, SimpleGrid } from '@chakra-ui/react';
import getSection from 'src/actions/getSection';
import Post from 'src/components/Post';
import Title from 'src/components/Title';

const Posts = ({ posts }) => {
  return (
    <Container maxW='6xl' px={3}>
      <Title as={'h2'} size={'4xl'} letterSpacing={'wider'} isTruncated my={12}>
        posts
      </Title>
      <SimpleGrid
        columns={{ base: 1, md: 3 }}
        spacing={6}
        alignItems={'center'}
      >
        {posts?.map((item) => (
          <Post key={item.id} data={item} href={`/${item.title}`} />
        ))}
      </SimpleGrid>
    </Container>
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
