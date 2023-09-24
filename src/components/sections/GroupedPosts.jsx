import { Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import Post from '../Post';

const GroupedPosts = ({ posts }) => {
  if (!posts?.length) {
    return null;
  }

  return (
    <Grid p={4} gap={4} templateColumns={['1fr', 'repeat(4, 1fr)']}>
      {posts?.map((data, index) => (
        <GridItem width={'100%'} key={data?.name || index}>
          <Post data={data} />
        </GridItem>
      ))}
    </Grid>
  );
};

export default GroupedPosts;
