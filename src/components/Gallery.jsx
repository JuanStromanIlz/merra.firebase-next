import React, { useState, useEffect } from "react";
import {
  Flex,
  Modal,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  Fade,
  Img,
} from "@chakra-ui/react";

const Gallery = ({ open, files, index, onClose }) => {
  const [galleryData, setGalleryData] = useState({
    items: [],
    index: 0,
  });
  const [touch, setTouch] = useState({
    startPoint: 0,
    direction: true,
  });

  function prevImage() {
    setGalleryData((prev) => {
      if (prev.index === 0) {
        return { ...prev };
      }
      return {
        items: prev.items,
        index: prev.index - 1,
      };
    });
  }

  function nextImage() {
    setGalleryData((prev) => {
      let lastCard = prev.index + 1;
      if (lastCard === prev.items.length) {
        return { ...prev };
      }
      return {
        items: prev.items,
        index: prev.index + 1,
      };
    });
  }

  /* Touch */
  function touchStart(e) {
    setTouch((prev) => {
      return {
        startPoint: e.changedTouches[0].clientX,
        direction: prev.direction,
      };
    });
  }
  function touchMove(e) {
    setTouch((prev) => {
      return {
        startPoint: prev.startPoint,
        direction: e.changedTouches[0].clientX < prev.startPoint,
      };
    });
  }
  function touchEnd() {
    if (!touch.direction) {
      return prevImage();
    }
    nextImage();
  }

  /* Keys */
  function keyPress(e) {
    if (e.keyCode === 39 || e.keyCode === 40) {
      nextImage();
    }
    if (e.keyCode === 37 || e.keyCode === 38) {
      prevImage();
    }
  }

  useEffect(() => {
    if (open) {
      setGalleryData({
        items: files,
        index: index,
      });
    }
  }, [open, files, index]);

  return (
    <Modal isOpen={open} onClose={onClose} size={"full"} motionPreset="scale">
      <ModalContent
        onKeyDown={keyPress}
        onTouchStart={touchStart}
        onTouchEnd={touchEnd}
        onTouchMove={touchMove}
        borderRadius={"none"}
        bg={"blackAlpha.800"}
      >
        <ModalHeader>
          <ModalCloseButton size={"md"} />
        </ModalHeader>
        <ModalBody pos={"relative"} overflow={"hidden"}>
          {galleryData.items.map(({ url, isVideo, name }, index) => (
            <Fade in={index === galleryData.index} key={index}>
              <Flex
                pos={"absolute"}
                inset={0}
                justifyContent={"center"}
                alignItems={"center"}
                height={"100%"}
                width={"100%"}
                p={4}
              >
                {!isVideo ? (
                  <Img
                    borderRadius={"md"}
                    src={url}
                    maxHeight={"100%"}
                    objectFit={"contain"}
                    alt={name}
                  />
                ) : (
                  <Flex
                    maxHeight={"100%"}
                    borderRadius={"md"}
                    overflow={"hidden"}
                  >
                    <video src={url} controls />
                  </Flex>
                )}
              </Flex>
            </Fade>
          ))}
        </ModalBody>
        <ModalFooter>
          <Flex width={"100%"} justifyContent={"center"}>
            <Flex>
              <Breadcrumb>
                <BreadcrumbItem>
                  <Text>{galleryData.index + 1}</Text>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <Text>{galleryData.items.length}</Text>
                </BreadcrumbItem>
              </Breadcrumb>
            </Flex>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Gallery;
