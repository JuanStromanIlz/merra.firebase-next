import { Box, Container, Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import Slider from '../Slider';
import Post from '../Post';

const GroupedPosts = ({ posts, title }) => {
  if (!posts?.length) {
    return null;
  }

  return (
    <Flex px={6} py={4} gap={10} flexWrap={'wrap'}>
      {posts?.map((data, index) => (
        <Flex
          key={data?.name || index}
          flexGrow={1}
          flexShrink={1}
          flexBasis={{ base: '100%', md: '40%', lg: '30%' }}
          justifyContent={'center'}
        >
          <Post data={data} />
        </Flex>
      ))}
    </Flex>
  );
};

export default GroupedPosts;
