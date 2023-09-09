import React, { useState } from 'react';
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
  useDisclosure,
} from '@chakra-ui/react';
import File from './File';

const Gallery = ({ files }) => {
  const { isOpen, onToggle } = useDisclosure();
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [touch, setTouch] = useState({
    startPoint: 0,
    direction: true,
  });
  const openGallery = (index) => {
    setGalleryIndex(index);
    onToggle();
  };

  function prevImage() {
    setGalleryIndex((prev) => {
      if (prev === 0) {
        return prev;
      }
      return prev - 1;
    });
  }

  function nextImage() {
    setGalleryIndex((prev) => {
      let lastCard = prev + 1;
      if (lastCard === files.length) {
        return prev;
      }
      return prev + 1;
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

  return (
    <>
      {files?.length > 0 && (
        <Flex justify={'space-around'} wrap='wrap'>
          {files?.map((data, index) => (
            <File data={data} key={index} onClick={() => openGallery(index)} />
          ))}
        </Flex>
      )}
      <Modal
        isOpen={isOpen}
        onClose={onToggle}
        size={'full'}
        motionPreset='scale'
      >
        <ModalContent
          onKeyDown={keyPress}
          onTouchStart={touchStart}
          onTouchEnd={touchEnd}
          onTouchMove={touchMove}
          borderRadius={'none'}
          bg={'blackAlpha.800'}
        >
          <ModalHeader>
            <ModalCloseButton size={'md'} />
          </ModalHeader>
          <ModalBody pos={'relative'} overflow={'hidden'}>
            {files?.map(({ url, isVideo, name }, index) => (
              <Fade in={index === galleryIndex} key={index}>
                <Flex
                  pos={'absolute'}
                  inset={0}
                  justifyContent={'center'}
                  alignItems={'center'}
                  height={'100%'}
                  width={'100%'}
                  p={4}
                >
                  {!isVideo ? (
                    <Img
                      borderRadius={'md'}
                      src={url}
                      maxHeight={'100%'}
                      objectFit={'contain'}
                      alt={name}
                    />
                  ) : (
                    <Flex
                      maxHeight={'100%'}
                      borderRadius={'md'}
                      overflow={'hidden'}
                    >
                      <video src={url} controls />
                    </Flex>
                  )}
                </Flex>
              </Fade>
            ))}
          </ModalBody>
          <ModalFooter>
            <Flex width={'100%'} justifyContent={'center'}>
              <Flex>
                <Breadcrumb>
                  <BreadcrumbItem>
                    <Text>{galleryIndex + 1}</Text>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <Text>{files.length}</Text>
                  </BreadcrumbItem>
                </Breadcrumb>
              </Flex>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Gallery;
