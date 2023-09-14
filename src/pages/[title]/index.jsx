import React, { useEffect, useState } from 'react';
import {
  Center,
  Flex,
  useDisclosure,
  Text,
  Box,
  Container,
  Link,
} from '@chakra-ui/react';
import getSection from '../../actions/getSection';
import getDoc from '../../actions/getDoc';
import Title from '../../components/Title';
import Gallery from '../../components/Gallery';
import TextParse from 'src/components/TextParse';
import TextLayout from 'src/components/TextLayout';
import RelatedPosts from 'src/components/RelatedPosts';
import Tags from 'src/components/Tags';
import PostNav from 'src/components/PostNav';

const TitleView = ({ doc }) => {
  return (
    <>
      <RelatedPosts doc={doc} />
      {/* <TextLayout>
        <Tags tags={doc?.tags} />
        <Title as={'h1'} size={'4xl'} letterSpacing={'wider'} mt={3}>
          {doc.title}
        </Title>
        <PostNav />
      </TextLayout>
      <Container maxW='6xl' px={3} mb={6}>
        <Gallery files={doc.files} />
      </Container>
      <TextLayout>
        <TextParse>{doc?.description}</TextParse>
        <RelatedPosts doc={doc} />
      </TextLayout> */}
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
