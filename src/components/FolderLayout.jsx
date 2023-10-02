import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import Title from './Title';

const FolderLayout = ({ children, title }) => {
  return (
    <Flex direction={'column'} gap={6} pt={'56px'} px={3} pb={3}>
      <Box
        position={'fixed'}
        top={0}
        left={0}
        width={'100%'}
        height={'56px'}
        zIndex={1}
        bgGradient={'linear(to-b, gray.50 10%, transparent)'}
      />
      <Title position={'sticky'} top={'56px'}>
        {title}
      </Title>
      {children}
      <Box pt={'56px'} />
      <Box
        position={'fixed'}
        pointerEvents={'none'}
        bottom={0}
        left={0}
        width={'100%'}
        height={'56px'}
        zIndex={1}
        bgGradient={'linear(to-t, gray.50 10%, transparent)'}
      />
    </Flex>
  );
};

export default FolderLayout;
