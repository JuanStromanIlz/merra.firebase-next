import React from 'react';
import { Container } from '@chakra-ui/react';
import getSection from '../../actions/getSection';
import getDoc from '../../actions/getDoc';
import Gallery from '../../components/Gallery';
import TextParse from 'src/components/TextParse';
import Header from 'src/components/sections/Header';
import PostNav from 'src/components/PostNav';

const TitleView = ({ doc }) => {
  return (
    <>
      <Header doc={doc}>
        <PostNav doc={doc} />
      </Header>
      <Gallery files={doc?.files} />
      <Container maxW='6xl' px={6} pb={4}>
        <TextParse>{doc?.description}</TextParse>
      </Container>
    </>
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
