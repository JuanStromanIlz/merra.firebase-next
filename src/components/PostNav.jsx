import React from 'react';
import { Button, Flex } from '@chakra-ui/react';

const PostNav = () => {
  const copyText = () => {
    navigator.clipboard.writeText(window.location.toString());
  };

  return (
    <Flex
      borderBottomWidth={1}
      borderColor={'brand.500'}
      py={3}
      mb={12}
      flexDirection={'row'}
      gap={1}
    >
      <Button
        colorScheme='brand'
        variant='link'
        fontWeight={'bold'}
        ml={'auto'}
        onClick={copyText}
      >
        compartir
      </Button>
    </Flex>
  );
};

export default PostNav;
