import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import getSection from '../../actions/getSection';
import getDoc from '../../actions/getDoc';
import Gallery from '../../components/Gallery';
import TextParse from 'src/components/TextParse';
import Title from 'src/components/Title';
import Tags from 'src/components/Tags';
import PostNav from 'src/components/PostNav';
import FolderLayout from 'src/components/FolderLayout';

const TitleView = ({ doc }) => {
  return (
    <FolderLayout title={doc?.title}>
      <Tags tags={doc?.tags} />
      <PostNav doc={doc} />
      <Gallery files={doc?.files} />
      <TextParse>{doc?.description}</TextParse>
    </FolderLayout>
  );
};

export async function getStaticProps({ params }) {
  const { url } = params;
  const doc = await getDoc(url);

  if (!doc) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      doc,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const paths = [];
  const posts = await getSection();
  posts.map((doc) => {
    paths.push({ params: { ...doc } });
  });

  console.log(paths);

  return {
    paths,
    fallback: 'blocking',
  };
}

export default TitleView;
