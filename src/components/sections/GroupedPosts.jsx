import { Grid } from '@chakra-ui/react';
import React from 'react';
import Post from '../Post';

const GroupedPosts = ({ posts }) => {
  if (!posts?.length) {
    return null;
  }

  return (
    <Grid p={3} gap={6} templateColumns={['1fr', 'repeat(4, 1fr)']}>
      {posts?.map((data, index) => (
        <Post key={data?.name || index} data={data} />
      ))}
    </Grid>
  );
};

export default GroupedPosts;
