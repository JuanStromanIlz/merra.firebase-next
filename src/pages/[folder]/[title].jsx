import React, { useState } from "react";
import { Center, Flex, useDisclosure, Text, Box } from "@chakra-ui/react";
import {
  EDITORIAL,
  ARTWORK,
  COMERCIAL,
  FILMS,
  BLOG,
  PUBLICACIONES,
} from "../../services/foldersNames";
import getSection from "../../actions/getSection";
import getDoc from "../../actions/getDoc";
import PageWrapper from "../../components/PageWrapper";
import Title from "../../components/Title";
import Gallery from "../../components/Gallery";
import File from "src/components/File";
import TextParse from "src/components/TextParse";

const TitleView = ({ doc }) => {
  const { isOpen, onToggle } = useDisclosure();
  const [galleryIndex, setGalleryIndex] = useState(0);
  const openGallery = (index) => {
    setGalleryIndex(index);
    onToggle();
  };

  return (
    <PageWrapper pageTitle={doc.title}>
      <Title as={"h1"} size={"4xl"} letterSpacing={"wider"} my={12}>
        {doc.title}
      </Title>
      {doc.files.length > 0 && (
        <Flex justify={"center"} wrap="wrap">
          {doc.files.map((data, index) => (
            <File data={data} key={index} onClick={() => openGallery(index)} />
          ))}
        </Flex>
      )}
      {doc.description.length && <TextParse>{doc.description}</TextParse>}
      {doc.keyWords?.length > 0 && (
        <Flex
          borderTopWidth={1}
          borderColor={"red.500"}
          pt={3}
          flexDirection={"column"}
        >
          <Title mb={5} mr={"auto"} fontSize={"xl"}>
            Tags
          </Title>
          <Flex>
            {doc.keyWords?.map((word) => (
              <Text key={word} mr={2} fontSize={"sm"}>
                {word}
              </Text>
            ))}
          </Flex>
        </Flex>
      )}
      <Gallery
        open={isOpen}
        files={doc.files}
        index={galleryIndex}
        onClose={onToggle}
      />
    </PageWrapper>
  );
};

export async function getStaticProps({ params }) {
  const { folder, title } = params;
  const doc = await getDoc(title, folder);

  if (!doc) {
    return {
      redirect: {
        destination: `/${folder}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      doc: { category: folder, ...doc },
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const sections = [EDITORIAL, ARTWORK, COMERCIAL, FILMS, BLOG, PUBLICACIONES];
  const paths = [];
  const docs = [];
  await Promise.all(
    sections.map(async (section) => {
      let data = await getSection(section);
      data.map((doc) => {
        docs.push({ folder: section, title: doc.title });
      });
    })
  );
  docs.map((doc) => {
    paths.push({ params: { ...doc } });
  });

  return {
    paths,
    fallback: "blocking",
  };
}

export default TitleView;
