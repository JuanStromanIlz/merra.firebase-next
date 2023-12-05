import React from 'react';
import { NextSeo } from 'next-seo';
import getSection from '../../actions/getSection';
import getDoc from '../../actions/getDoc';
import Gallery from '../../components/Gallery';
import TextParse from 'src/components/TextParse';
import Tags from 'src/components/Tags';
import PostNav from 'src/components/PostNav';
import FolderLayout from 'src/components/FolderLayout';

const TitleView = ({ doc }) => {
  return (
    <>
      <NextSeo
        title={`${doc.title} | Merra Marie`}
        defaultTitle='Merra Marie'
      />
      <FolderLayout title={doc?.title}>
        <PostNav doc={doc} />
        <Gallery files={doc?.files} />
        <TextParse text={doc?.description} />
        <Tags tags={doc?.tags} />
      </FolderLayout>
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
