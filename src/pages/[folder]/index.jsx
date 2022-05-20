import React from "react";
import { useRouter } from "next/router";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import {
  EDITORIAL,
  ARTWORK,
  COMERCIAL,
  FILMS,
  BLOG,
} from "../../services/foldersNames";
import getSection from "../../actions/getSection";
import Item from "../../components/Item";
import PageWrapper from "../../components/PageWrapper";
import Title from "../../components/Title";

const SectionView = ({ folder, headerInfo }) => {
  const router = useRouter();
  const { folder: folderParam } = router.query;

  return (
    <PageWrapper pageTitle={folderParam}>
      <Title as={"h2"} size={"4xl"} letterSpacing={"wider"} isTruncated my={12}>
        {folderParam}
      </Title>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {folder.length > 0 ? (
          folder.map((item) => (
            <Item
              key={item.id}
              data={{ category: folderParam, ...item }}
              href={`${folderParam}/${item.title}`}
            />
          ))
        ) : (
          <Box>
            <Text>¡Ups! no hay nada todavia.</Text>
          </Box>
        )}
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
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const sections = [EDITORIAL, ARTWORK, COMERCIAL, FILMS, BLOG];
  // Get the paths we want to pre-render based on sections
  const paths = sections.map((folder) => ({
    params: { folder: folder },
  }));

  return { paths, fallback: "blocking" };
}

export default SectionView;
