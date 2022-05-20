import React, { useContext } from "react";
import {
  Box,
  Flex,
  Link as ChakraLink,
  Heading,
  Img,
  Center,
  Modal,
  ModalContent,
  useDisclosure,
  ModalBody,
} from "@chakra-ui/react";
import Link from "next/link";
import { Admin } from "../contexts/AdminContext";
import * as FOLDERS from "../services/foldersNames";

const NavTag = ({ children, href, ...props }) => {
  return (
    <Link href={href} passHref>
      <ChakraLink
        _focus={{
          boxShadow: "none",
        }}
      >
        <Heading
          fontSize={"sm"}
          textTransform={"capitalize"}
          letterSpacing={"wide"}
          {...props}
        >
          {children}
        </Heading>
      </ChakraLink>
    </Link>
  );
};

const NavTagMobile = ({ children, href, ...props }) => {
  return (
    <Link href={href} passHref>
      <ChakraLink
        _hover={{
          textDecoration: "none",
        }}
        _focus={{
          boxShadow: "none",
        }}
      >
        <Heading
          as={"h2"}
          textTransform={"capitalize"}
          fontSize={"5xl"}
          letterSpacing={"wider"}
          textAlign={"center"}
          sx={{
            "-webkit-text-stroke": "1.5px #d22d2d",
          }}
          color={"transparent"}
          {...props}
        >
          {children}
        </Heading>
      </ChakraLink>
    </Link>
  );
};

const Navbar = ({ ...props }) => {
  const { isOpen, onToggle } = useDisclosure(false);
  const { user, signOut } = useContext(Admin);

  return (
    <Box position={"sticky"} top={0} width={"100%"} zIndex={"1024"} {...props}>
      <Flex
        direction={"row"}
        display={{ base: "none", md: "flex" }}
        justifyContent={"space-between"}
        alignItems={"center"}
        pt={6}
      >
        {Object.values(FOLDERS).map((i, index) => (
          <NavTag key={`${i}-${index}`} href={`/${i}`}>
            {i}
          </NavTag>
        ))}
      </Flex>
      <Flex
        display={{ base: "flex", md: "none" }}
        justifyContent={"center"}
        alignItems={"center"}
        position={"sticky"}
        top={0}
        width={"100%"}
        zIndex={"1024"}
        pt={6}
      >
        <Img src="/heart.svg" w={"48px"} onClick={onToggle} />
        <Modal
          isOpen={isOpen}
          onClose={onToggle}
          size={"full"}
          motionPreset="scale"
        >
          <ModalContent bg={"blackAlpha.800"} height={"100%"}>
            <ModalBody justifyContent={"center"}>
              <Flex
                position={"absolute"}
                top={0}
                left={0}
                right={0}
                justifyContent="center"
                pt={6}
              >
                <Img src="/heart.svg" w={"48px"} onClick={onToggle} />
              </Flex>
              <Flex
                direction={"column"}
                justifyContent={"center"}
                alignContent={"center"}
                height={"100%"}
                margin={"auto"}
              >
                {Object.values(FOLDERS).map((i, index) => (
                  <NavTagMobile key={`${i}-${index}`} href={`/${i}`}>
                    {i}
                  </NavTagMobile>
                ))}
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
    </Box>
  );
};

export default Navbar;
