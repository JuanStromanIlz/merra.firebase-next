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
  Grid,
  GridItem,
} from '@chakra-ui/react';
import File from './File';
import useTouchDirection from 'src/hooks/useTouchDirection';

const isLandscape = (file) => {
  return file.isVideo || file.height < file.width;
};

const Gallery = ({ files }) => {
  const initialRef = useRef(null);
  const [dimensions, setDimensions] = useState([]);
  const { isOpen, onToggle } = useDisclosure();
  const [galleryIndex, setGalleryIndex] = useState(0);
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

  const { onTouchStart, onTouchEnd, onTouchMove } = useTouchDirection(
    prevImage,
    nextImage
  );

  const itemSize = ({ isVideo }, index) => {
    const size = isVideo || dimensions[index] ? '100%' : '40%';
    return size;
  };

  /* Keys */
  function keyPress(e) {
    if (e.keyCode === 39 || e.keyCode === 40) {
      nextImage();
    }
    if (e.keyCode === 37 || e.keyCode === 38) {
      prevImage();
    }
  }

  if (!files?.length) {
    return null;
  }

  return (
    <>
      <Flex px={6} py={4} gap={3} flexWrap={'wrap'}>
        {files?.map((data, index) => (
          <Flex
            key={data?.name || index}
            flexGrow={1}
            flexShrink={0}
            flexBasis={itemSize(data, index)}
            justifyContent={'center'}
            alignContent={'flex-start'}
            alignItems={'flex-start'}
          >
            <File
              data={data}
              cursor={'pointer'}
              onLoad={({ target: img }) =>
                setDimensions((prev) => [...prev, isLandscape(img)])
              }
              onClick={() => openGallery(index)}
            />
          </Flex>
        ))}
      </Flex>
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
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTouchMove={onTouchMove}
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
