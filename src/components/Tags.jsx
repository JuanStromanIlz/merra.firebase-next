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
      <Text as={'span'} fontSize={'sm'} fontWeight={'bold'}>
        tags:
      </Text>
      {tags.map((tag) => (
        <Text as={'span'} fontSize={'sm'} key={tag}>
          {tag}
        </Text>
      ))}
    </Flex>
  );
};

export default Tags;
