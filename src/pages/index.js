import { Box } from '@chakra-ui/react';
import React from 'react';
import getSection from 'src/actions/getSection';
import Post from 'src/components/Post';
import GroupedPosts from 'src/components/sections/GroupedPosts';
import Header from 'src/components/sections/Header';
import PostPreview from 'src/components/sections/PostPreview';

const Posts = ({ posts }) => {
  const first = posts[0] || {};
  // const allTags = [
  //   ...(new Set(
  //     posts.reduce((acc, { tags = [] }) => [...acc, ...tags], []) || []
  //   ) || []),
  // ];
  // const groupedByTags = allTags.reduce(
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
    <>
      {posts.map((post) => (
        <>
          <PostPreview doc={post} />
        </>
      ))}
      {/* {groupedByTags.map((group) => (
        <GroupedPosts key={group.title} {...group} />
      ))} */}
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
