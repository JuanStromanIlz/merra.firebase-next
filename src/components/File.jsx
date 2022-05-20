import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Img,
  SimpleGrid,
  Stack,
  useDisclosure,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

const landscapeSet = (url) => {
  const img = new Image();
  img.src = file.url;
  img.onload = () =>
    landscapes.push({
      landscape: img.height < img.width,
      width: img.width,
      height: img.height,
    });
};

const File = ({ data, onClick }) => {
  const [landscape, setLandscape] = useState(false);
  const { url, name, isVideo } = data;

  const onLoad = ({ target: img }) => setLandscape(img.height < img.width);

  return !isVideo ? (
    <Center
      key={name}
      width={landscape ? { base: "100%" } : { base: "50%", md: "33%" }}
      p={3}
      cursor={"pointer"}
    >
      <Img
        src={url}
        alt={name}
        borderRadius={"md"}
        objectFit={"contain"}
        onLoad={onLoad}
        onClick={onClick}
        width={landscape && { base: "100%", md: "60%" }}
      />
    </Center>
  ) : (
    <Center key={name} p={3} width={"100%"}>
      <Box borderRadius={"md"} overflow={"hidden"}>
        <video controls src={url} width={"100%"} />
      </Box>
    </Center>
  );
};

export default File;
