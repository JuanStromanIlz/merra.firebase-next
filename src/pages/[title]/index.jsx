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
import File from 'src/components/File';
import TextParse from 'src/components/TextParse';
import TextLayout from 'src/components/TextLayout';
import RelatedPosts from 'src/components/FolderForm/RelatedPosts';

const TitleView = ({ doc }) => {
  const { isOpen, onToggle } = useDisclosure();
  const [galleryIndex, setGalleryIndex] = useState(0);
  const openGallery = (index) => {
    setGalleryIndex(index);
    onToggle();
  };

  return (
    <>
      <TextLayout>
        <Title as={'h1'} size={'4xl'} letterSpacing={'wider'} my={12}>
          {doc.title}
        </Title>
        <Flex
          borderBottomWidth={1}
          borderColor={'brand.500'}
          pb={3}
          px={3}
          flexDirection={'row'}
          gap={3}
          mb={12}
        >
          {doc.tags?.map((word) => (
            <Box key={word}>
              <Link>{word}</Link>
            </Box>
          ))}
        </Flex>
      </TextLayout>
      <Container maxW='6xl' px={3}>
        {doc.files.length > 0 && (
          <Flex justify={'space-around'} wrap='wrap'>
            {doc.files.map((data, index) => (
              <File
                data={data}
                key={index}
                onClick={() => openGallery(index)}
              />
            ))}
          </Flex>
        )}
      </Container>
      <TextLayout>
        <TextParse>{doc?.description}</TextParse>
        <RelatedPosts doc={doc} />
      </TextLayout>
      <Gallery
        open={isOpen}
        files={doc.files}
        index={galleryIndex}
        onClose={onToggle}
      />
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
