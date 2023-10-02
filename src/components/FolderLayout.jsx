import { Flex } from '@chakra-ui/react';
import React from 'react';
import Title from './Title';

const FolderLayout = ({ children, title }) => {
  return (
    <Flex direction={'column'} gap={6} p={3} pt={'56px'}>
      <Title>{title}</Title>
      {children}
    </Flex>
  );
};

export default FolderLayout;
