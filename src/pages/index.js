import { Box } from '@chakra-ui/react';
import React from 'react';
import getSection from 'src/actions/getSection';
import Post from 'src/components/Post';
import GroupedPosts from 'src/components/sections/GroupedPosts';
import Header from 'src/components/sections/Header';
import PostPreview from 'src/components/sections/PostPreview';
import Program from 'src/components/sections/Program';

const Posts = ({ posts }) => {
  const first = posts[0] || {};
  const tags = posts.reduce((acc, { tags = [] }) => [...acc, ...tags], []);
  const filteredTags = [
    ...(new Set(
      tags.filter((tag) => tags.filter((t) => t === tag).length >= 3)
    ) || []),
  ];
  const groupedByTags = filteredTags.reduce(
    (acc, tag) => [
      ...acc,
      {
        title: tag,
        posts: posts.filter(({ tags = [] }) => tags.find((i) => i === tag)),
      },
    ],
    []
  );

  return (
    <>
      <PostPreview doc={first} />
      <Box mt={6} />
      {groupedByTags.map((group) => (
        <Program key={group.title} {...group} />
      ))}
    </>
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
