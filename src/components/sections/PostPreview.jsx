import { Box, Flex, Heading, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import File from '../File';
import Slider from '../Slider';
import Tags from '../Tags';

const PostPreview = ({ doc }) => {
  const { title = '', tags, description, files = [] } = doc;
  const images = files.filter(({ isVideo }) => !isVideo);
  const random = Math.floor(Math.random() * images.length);
  const { url } = images[random] || {};

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
      <Box
        position={'absolute'}
        inset={0}
        bgGradient={'linear(to-t, blackAlpha.300 100%, transparent 50%)'}
      />
      <Flex
        direction={'column'}
        px={6}
        pt={6}
        pb={12}
        position={'absolute'}
        inset={0}
      >
        <Tags tags={tags} />
        <Heading as={'h2'}>
          <Link as={NextLink} href={title}>
            {title}
          </Link>
        </Heading>
      </Flex>
      {images?.length > 2 && (
        <Slider
          mt={'auto'}
          px={6}
          pb={6}
          gap={6}
          items={images}
          Component={({ item }) => (
            <Flex height={'100%'} width={'100%'} justifyContent={'center'}>
              <File data={item} m={'auto'} />
            </Flex>
          )}
        />
      )}
    </Flex>
  );
};

export default PostPreview;
