import React, { useContext } from "react";
import { Box, Flex, Link as ChakraLink, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { Admin } from "../contexts/AdminContext";
import {
  EDITORIAL,
  ARTWORK,
  COMERCIAL,
  FILMS,
  BLOG,
  PUBLICACIONES,
} from "../services/foldersNames";

const NavTag = ({ children, href, ...props }) => {
  return (
    <Link href={href} passHref>
      <ChakraLink
        borderRadius={"md"}
        display={"flex"}
        p={2}
        _hover={{
          textDecoration: "none",
          color: "red.500",
        }}
        _focus={{
          boxShadow: "none",
        }}
      >
        <Heading
          fontSize={"xs"}
          textTransform={"uppercase"}
          letterSpacing={"wide"}
          {...props}
        >
          {children}
        </Heading>
      </ChakraLink>
    </Link>
  );
};

const Navbar = ({ ...props }) => {
  const { user, signOut } = useContext(Admin);

  return (
    <Box
      position={{ base: "sticky", md: "inherit" }}
      top={0}
      width={"100%"}
      zIndex={"1024"}
      {...props}
    >
      <Flex
        direction={"row"}
        display={{ base: "none", md: "flex" }}
        justifyContent={"space-around"}
        alignItems={"center"}
      >
        <Box>
          <NavTag href={`/${EDITORIAL}`}>{EDITORIAL}</NavTag>
        </Box>
        <Box>
          <NavTag href={`/${ARTWORK}`}>{ARTWORK}</NavTag>
        </Box>
        <Box>
          <NavTag href={`/${COMERCIAL}`}>{COMERCIAL}</NavTag>
        </Box>
        <Box>
          <NavTag href={`/${FILMS}`}>{FILMS}</NavTag>
        </Box>
        <Box>
          <NavTag href={`/${BLOG}`}>{BLOG}</NavTag>
        </Box>
        <Box>
          <NavTag href={`/${PUBLICACIONES}`}>{PUBLICACIONES}</NavTag>
        </Box>
        <Box>
          <NavTag href={`/info`}>info</NavTag>
        </Box>
      </Flex>
      {/* mobile menu */}
    </Box>
  );
};

export default Navbar;
