import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import getRelatedDocs from 'src/actions/getRelatedDocs';
import useFetch from 'src/hooks/useFetch';
import Slider from './Slider';
import Post from './Post';

const RelatedPosts = ({ doc }) => {
  const { data, loading } = useFetch(() => getRelatedDocs(doc));

  if (!loading && !data?.length) {
    return null;
  }

  if (!data?.length) {
    return null;
  }

  return (
    <Flex py={6} direction={'column'}>
      <Text pl={6} pb={1} fontSize={'sm'} fontWeight={'bold'}>
        relacionado
      </Text>
      <Slider
        items={data}
        Component={({ item }) => <Post key={item.id} data={item} />}
        px={6}
      />
    </Flex>
  );
};

export default RelatedPosts;
