import React, { useEffect } from "react";
import PageWrapper from "src/components/PageWrapper";
import Title from "src/components/Title";
import getSection from "src/actions/getSection";
import { PUBLICACIONES } from "src/services/foldersNames";
import { SimpleGrid, Box, Text } from "@chakra-ui/react";
import PublicationLink from "src/components/PublicationLink";

const Publicaciones = ({ folder }) => {
  return (
    <PageWrapper pageTitle="publicaciones">
      <Title as={"h2"} size={"4xl"} letterSpacing={"wider"} isTruncated my={12}>
        Publicaciones
      </Title>
      <SimpleGrid columns={1} spacing={6}>
        {folder.length > 0 ? (
          folder.map((item) => <PublicationLink key={item.id} data={item} />)
        ) : (
          <Box>
            <Text>¡Ups! no hay nada todavia.</Text>
          </Box>
        )}
      </SimpleGrid>
    </PageWrapper>
  );
};

export async function getStaticProps() {
  const folder = await getSection(PUBLICACIONES);

  return {
    props: {
      folder: [
        {
          title: "Intento escribir, a veces puedo",
          href: "/",
          keyWords: ["poesia"],
        },
        { title: "Recorte", href: "/" },
        {
          title: "Intento escribir, a veces puedo",
          href: "/",
          keyWords: ["poesia"],
        },
        { title: "Recorte", href: "/" },
        {
          title: "Intento escribir, a veces puedo",
          href: "/",
          keyWords: ["poesia"],
        },
        { title: "Recorte", href: "/" },
        {
          title: "Intento escribir, a veces puedo",
          href: "/",
          keyWords: ["poesia"],
        },
        { title: "Recorte", href: "/" },
      ],
    },
    revalidate: 10,
  };
}

export default Publicaciones;
