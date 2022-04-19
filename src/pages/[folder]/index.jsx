import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { SimpleGrid, Heading, Stack } from "@chakra-ui/react";
import {
  EDITORIAL,
  ARTWORK,
  COMERCIAL,
  FILMS,
  BLOG,
  PUBLICACIONES,
} from "../../services/foldersNames";
import getSection from "../../actions/getSection";
import Item from "../../components/Item";
import StickyTitle from "../../components/StickyTitle";
import Navbar from "../../components/Navbar";
import PageWrapper from "../../components/PageWrapper";

const SectionView = ({ folder, headerInfo }) => {
  const router = useRouter();
  const { folder: folderParam } = router.query;
  useEffect(() => {
    console.log(folder);
  }, [folder]);

  return (
    <PageWrapper>
      <Navbar />
      {/* <StickyTitle>{folderParam}</StickyTitle> */}
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
        {folder.map((item) => (
          <Item
            key={item.id}
            data={{ category: folderParam, ...item }}
            href={`${folderParam}/${item.title}`}
          />
        ))}
      </SimpleGrid>
    </PageWrapper>
  );
};

export async function getStaticProps({ params }) {
  const folder = await getSection(params.folder);

  return {
    props: {
      folder,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const sections = [EDITORIAL, ARTWORK, COMERCIAL, FILMS, BLOG, PUBLICACIONES];
  // Get the paths we want to pre-render based on sections
  const paths = sections.map((folder) => ({
    params: { folder: folder },
  }));

  return { paths, fallback: "blocking" };
}

export default SectionView;
