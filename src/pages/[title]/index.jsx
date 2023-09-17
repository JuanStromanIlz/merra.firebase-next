import React from 'react';
import { Container } from '@chakra-ui/react';
import getSection from '../../actions/getSection';
import getDoc from '../../actions/getDoc';
import Gallery from '../../components/Gallery';
import TextParse from 'src/components/TextParse';
import Header from 'src/components/sections/Header';
import useFetch from 'src/hooks/useFetch';
import getRelatedDocs from 'src/actions/getRelatedDocs';
import GroupedPosts from 'src/components/sections/GroupedPosts';
import PostNav from 'src/components/PostNav';

const TitleView = ({ doc }) => {
  const { data } = useFetch(() => getRelatedDocs(doc));
  return (
    <>
      <Header doc={doc}>
        <PostNav doc={doc} />
      </Header>
      <Gallery files={doc?.files} />
      <Container maxW='6xl' px={6}>
        <TextParse>{doc?.description}</TextParse>
      </Container>
      <GroupedPosts posts={data} title={'relacionado'} />
    </>
  );
};

export async function getStaticProps({ params }) {
  const { title } = params;
  const doc = await getDoc(title);

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

  return {
    paths,
    fallback: 'blocking',
  };
}

export default TitleView;
