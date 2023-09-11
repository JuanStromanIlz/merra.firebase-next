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
    <Flex direction={'row'} gap={3} {...rest}>
      {tags.map((tag) => (
        <Text fontSize='md' fontWeight={'bold'} as={'span'} key={tag}>
          {tag}
        </Text>
      ))}
    </Flex>
  );
};

export default Tags;
