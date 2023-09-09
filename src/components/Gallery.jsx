import React, { useRef, useState } from 'react';
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
  useDisclosure,
  SimpleGrid,
} from '@chakra-ui/react';
import File from './File';

const Gallery = ({ files }) => {
  const initialRef = useRef(null);
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
        <SimpleGrid columns={{ base: 2, md: 3 }} gap={3} alignItems={'center'}>
          {files?.map((data, index) => (
            <File
              data={data}
              key={index}
              cursor={'pointer'}
              // width={
              //   data?.isVideo ? ['100%', null, '60%'] : ['50%', null, '33%']
              // }
              onClick={() => openGallery(index)}
            />
          ))}
        </SimpleGrid>
      )}
      <Modal
        isOpen={isOpen}
        onClose={onToggle}
        size={'full'}
        motionPreset='scale'
        initialFocusRef={initialRef}
      >
        <ModalContent
          ref={initialRef}
          onKeyDown={keyPress}
          onTouchStart={touchStart}
          onTouchEnd={touchEnd}
          onTouchMove={touchMove}
          borderRadius={'none'}
          bg={'blackAlpha.800'}
          onClick={onToggle}
        >
          <ModalHeader>
            <ModalCloseButton size={'md'} />
          </ModalHeader>
          <ModalBody pos={'relative'} overflow={'hidden'}>
            {files?.map((file, index) => (
              <Fade in={index === galleryIndex} key={file?.name || index}>
                <Flex
                  pos={'absolute'}
                  inset={0}
                  justifyContent={'center'}
                  alignItems={'center'}
                  height={'100%'}
                  width={'100%'}
                  p={4}
                >
                  <File data={file} />
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
