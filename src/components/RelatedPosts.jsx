import { Box, Flex, SimpleGrid, Skeleton } from '@chakra-ui/react';
import React from 'react';
import getRelatedDocs from 'src/actions/getRelatedDocs';
import useFetch from 'src/hooks/useFetch';
import Title from './Title';
import Item from './Post';

const RelatedPosts = ({ doc }) => {
  const { data, loading } = useFetch(() => getRelatedDocs(doc));

  if (!loading && !data?.length) {
    return null;
  }

  if (!data?.length) {
    return null;
  }

  return (
    <Flex direction={'column'}>
      <Title my={6} borderBottomWidth={1} borderColor={'brand.500'}>
        Relacionados
      </Title>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={3}>
        {data?.map((i) => (
          <Item data={i} key={i?.id} />
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default RelatedPosts;
