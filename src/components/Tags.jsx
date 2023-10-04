import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Flex,
  Icon,
  Text,
} from '@chakra-ui/react';

const Tags = ({ tags = [], ...rest }) => {
  if (!tags?.length) {
    return null;
  }
  return (
    <Flex
      direction={'row'}
      flexWrap={'wrap'}
      justifyContent={'center'}
      gap={1}
      {...rest}
    >
      <Text as={'span'} fontSize={'md'} fontWeight={'bold'} color='brand.500'>
        tags:
      </Text>
      {tags.map((tag) => (
        <Text as={'span'} fontSize={'md'} key={tag}>
          {tag}
        </Text>
      ))}
    </Flex>
  );
};

export default Tags;
