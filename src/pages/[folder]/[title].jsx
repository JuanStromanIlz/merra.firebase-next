import React, { useEffect } from "react";
import { Button, Heading, Stack, useDisclosure } from "@chakra-ui/react";
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
import Navbar from "../../components/Navbar";
import StickyTitle from "../../components/StickyTitle";
import Title from "../../components/Title";
import Gallery from "../../components/Gallery";

const TitleView = ({ doc }) => {
  const { isOpen, onToggle } = useDisclosure();

  useEffect(() => {
    console.log(doc);
  }, [doc]);

  return (
    <PageWrapper>
      <Navbar />
      <Title size={"4xl"}>{doc.title}</Title>
      <Button onClick={onToggle} colorScheme={"red"} width={"fit-content"}>
        gallery test
      </Button>
      <Gallery open={isOpen} files={doc.files} index={0} onClose={onToggle} />
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
