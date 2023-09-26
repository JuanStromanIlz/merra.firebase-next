import {
  Flex,
  LinkOverlay,
  Box,
  Heading,
  AspectRatio,
  GridItem,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import File from './File';
import Tags from './Tags';

const Post = ({ data }) => {
  const { title = '', tags, files = [{}], url } = data;
  const withPreview = files.length > 3;

  const media = (files) => {
    if (!withPreview) {
      const file = files[0] || {};
      return (
        <AspectRatio ratio={4 / 5} width={'100%'} py={2}>
          <File data={file} controls={false} />
        </AspectRatio>
      );
    }
    return (
      <Flex
        // pt={2}
        // display={'inline-flex'}
        height={'50vh'}
        gap={3}
        overflow={'scroll'}
        sx={{
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {files.map((f, index) => (
          <File key={f?.name || index} data={f} controls={false} />
        ))}
      </Flex>
    );
  };

  return (
    <GridItem
      as={'article'}
      position={'relative'}
      colSpan={[1, withPreview ? 4 : 1]}
    >
      <LinkOverlay as={NextLink} href={url}>
        <Box>
          <Flex
            direction={'column'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Heading
              as={'h3'}
              fontWeight={'normal'}
              fontSize={'xl'}
              lineHeight={'120%'}
            >
              {title}
            </Heading>
            <Tags tags={tags} />
          </Flex>
          {media(files)}
        </Box>
      </LinkOverlay>
    </GridItem>
  );
};

export default Post;
