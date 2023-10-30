import { Box, Flex, Grid, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import Post from '../Post';

const GroupedPosts = ({ posts }) => {
  if (!posts?.length) {
    return null;
  }

  return (
    <SimpleGrid gap={6} columns={[1, 2, 3, 4]}>
      {posts?.map((data, index) => (
        <Post key={data?.name || index} data={data} />
      ))}
    </SimpleGrid>
  );
};

export default GroupedPosts;
