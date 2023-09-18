import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import Slider from '../Slider';

const GroupedPosts = ({ posts, title }) => {
  if (!posts?.length) {
    return null;
  }

  return (
    <Flex direction={'column'} py={6}>
      <Heading mx={6} mb={4} fontSize='md' fontWeight={'bold'} as={'span'}>
        {title}
      </Heading>
      <Slider items={posts} gap={3} px={6} />
    </Flex>
  );
};

export default GroupedPosts;
