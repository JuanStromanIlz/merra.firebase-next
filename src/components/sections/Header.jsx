import { Flex, LinkOverlay } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import Title from '../Title';
import Tags from '../Tags';

const Header = ({ doc, children }) => {
  const { title = '', tags, files = [{}], url: titleUrl } = doc;
  const { url } = files[0] || {};

  return (
    <Flex
      minH={'80vh'}
      w={'100%'}
      backgroundImage={url}
      backgroundPosition={'center'}
      backgroundRepeat={'no-repeat'}
      backgroundSize={'cover'}
      direction='column'
      justifyContent={'space-between'}
      position={'relative'}
    >
      <Flex
        bgGradient={'linear(to-t, blackAlpha.300 40%, transparent 100%)'}
        direction='column'
        justifyContent={'flex-end'}
        flex={1}
        py={4}
        px={6}
      >
        <Tags tags={tags} />
        <LinkOverlay as={NextLink} href={titleUrl}>
          <Title as={'h1'} fontSize='4xl' cursor={'pointer'}>
            {title}
          </Title>
        </LinkOverlay>
        {children}
      </Flex>
    </Flex>
  );
};

export default Header;
