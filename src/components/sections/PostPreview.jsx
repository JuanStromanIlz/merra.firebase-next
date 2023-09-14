import { Flex, Heading, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import File from '../File';
import Slider from '../Slider';

const PostPreview = ({ doc }) => {
  const { title = '', description, files = [{}] } = doc;
  const { url } = files[0] || {};

  return (
    <Flex
      mt={6}
      h={'80vh'}
      w={'100%'}
      backgroundImage={url}
      backgroundPosition={'center'}
      backgroundRepeat={'no-repeat'}
      backgroundSize={'cover'}
      direction='column'
      justifyContent={'space-between'}
    >
      <Flex direction={'column'}>
        <Heading as={'h2'} px={6} pt={6}>
          <Link as={NextLink} href={title}>
            {title}
          </Link>
        </Heading>
      </Flex>
      <Slider
        px={6}
        pb={6}
        items={files}
        Component={({ item }) => (
          <Flex height={'100%'} width={'100%'} justifyContent={'center'}>
            <File data={item} m={'auto'} />
          </Flex>
        )}
      />
    </Flex>
  );
};

export default PostPreview;
