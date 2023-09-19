import { Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import getSection from 'src/actions/getSection';
import File from 'src/components/File';
import Post from 'src/components/Post';
import Tags from 'src/components/Tags';
import PostPreview from 'src/components/sections/PostPreview';

const Posts = ({ posts }) => {
  const [dimensions, setDimensions] = useState([]);
  const first = posts.slice(0, 1)[0] || {};
  const restOfPosts = posts.slice(1, posts.length) || [];

  const isLandscape = (file) => {
    return file.isVideo || file.height < file.width;
  };

  const itemSize = ({ isVideo }, index) => {
    const size = isVideo || dimensions[index] ? '100%' : '40%';
    return size;
  };

  // const tags = posts.reduce((acc, { tags = [] }) => [...acc, ...tags], []);
  // const filteredTags = [
  //   ...(new Set(
  //     tags.filter((tag) => tags.filter((t) => t === tag).length >= 3)
  //   ) || []),
  // ];
  // const groupedByTags = filteredTags.reduce(
  //   (acc, tag) => [
  //     ...acc,
  //     {
  //       title: tag,
  //       posts: posts.filter(({ tags = [] }) => tags.find((i) => i === tag)),
  //     },
  //   ],
  //   []
  // );

  return (
    <Flex gap={6} direction={'column'}>
      <PostPreview doc={first} />
      <Flex px={6} py={4} gap={3} flexWrap={'wrap'}>
        {restOfPosts?.map((item, index) => {
          const { title = '', tags, files = [{}] } = item;
          const file = files[0] || {};
          return (
            <Flex
              key={item?.title || index}
              flexGrow={1}
              flexShrink={0}
              flexBasis={itemSize(file, index)}
              direction={'column'}
            >
              {/* <Text fontSize='md' as={'span'}>
              {title}
            </Text> */}
              <File
                data={file}
                cursor={'pointer'}
                onLoad={({ target: img }) =>
                  setDimensions((prev) => [...prev, isLandscape(img)])
                }
              />
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};

export async function getStaticProps() {
  const posts = await getSection();

  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
}

export default Posts;
