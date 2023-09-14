import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import Slider from '../Slider';
import Post from '../Post';

const GroupedPosts = ({ posts, title }) => {
  if (!posts?.length) {
    return null;
  }

  return (
    <Flex my={6} direction={'column'}>
      <Text pl={6} pb={1} fontSize={'sm'} fontWeight={'bold'}>
        {title}
      </Text>
      <Slider
        items={posts}
        gap={3}
        Component={({ item }) => <Post key={item.id} data={item} />}
        px={6}
      />
    </Flex>
  );
};

export default GroupedPosts;
