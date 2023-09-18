import { Flex, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import getSection from 'src/actions/getSection';
import Post from 'src/components/Post';
import PostPreview from 'src/components/sections/PostPreview';

const Posts = ({ posts }) => {
  const first = posts.slice(0, 1)[0] || {};
  const restOfPosts = posts.slice(1, posts.length) || [];
  // const tags = posts.reduce((acc, { tags = [] }) => [...acc, ...tags], []);
  // const filteredTags = [
  //   ...(new Set(
  //     tags.filter((tag) => tags.filter((t) => t === tag).length >= 3)
  //   ) || []),
  // ];
  // const groupedByTags = filteredTags.reduce(
  //   (acc, tag) => [
  //     ...acc,
  //     {
  //       title: tag,
  //       posts: posts.filter(({ tags = [] }) => tags.find((i) => i === tag)),
  //     },
  //   ],
  //   []
  // );

  return (
    <Flex gap={6} direction={'column'}>
      <PostPreview doc={first} />
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} px={6} gap={6} mb={6}>
        {restOfPosts.map((data, index) => (
          <Post data={data} key={data?.title || index} />
        ))}
      </SimpleGrid>
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
