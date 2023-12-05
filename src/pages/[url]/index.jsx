import React from 'react';
import { NextSeo } from 'next-seo';
import getSection from '../../actions/getSection';
import getDoc from '../../actions/getDoc';
import Gallery from '../../components/Gallery';
import TextParse from 'src/components/TextParse';
import Tags from 'src/components/Tags';
import PostNav from 'src/components/PostNav';
import Title from 'src/components/Title';
import { Box, Flex } from '@chakra-ui/layout';

const TitleView = ({ doc }) => {
  return (
    <Flex mx={'auto'} maxW={'1300px'} direction={'column'}>
      <NextSeo
        title={`${doc.title} | Merra Marie`}
        defaultTitle='Merra Marie'
      />
      <Flex direction={'column'} as={'header'} mb={[6, 12]} gap={6}>
        <Title>{doc.title}</Title>
        <PostNav doc={doc} />
      </Flex>
      <Box my={6}>
        <Gallery files={doc?.files} />
      </Box>
      <Box maxW={['100%', null, '80vw', '70%']}>
        <TextParse text={doc?.description} />
      </Box>
      <Tags tags={doc?.tags} />
    </Flex>
  );
};

export async function getStaticProps({ params }) {
  const { url } = params;
  const doc = await getDoc(url);

  if (!doc) {
    return {
      redirect: {
        destination: '/',
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
