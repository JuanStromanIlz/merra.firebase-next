import React, { useRef, useState } from 'react';
import {
  Flex,
  Modal,
  ModalContent,
  ModalBody,
  Fade,
  useDisclosure,
} from '@chakra-ui/react';
import File from './File';
import useTouchDirection from 'src/hooks/useTouchDirection';

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

  const itemSize = ({ isVideo, landscape }, index) => {
    const size = isVideo || landscape ? '100%' : '40%';
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
      <Flex gap={3} flexWrap={'wrap'}>
        {files?.map((data, index) => (
          <Flex
            key={data?.name || index}
            flexGrow={1}
            flexShrink={0}
            flexBasis={itemSize(data, index)}
            justifyContent={'center'}
            alignContent={'center'}
            alignItems={'center'}
          >
            <File
              data={data}
              cursor={'pointer'}
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
          bg={'whiteAlpha.100'}
          backdropFilter={'blur(20px)'}
          onClick={onToggle}
        >
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
                  p={3}
                >
                  <File data={file} />
                </Flex>
              </Fade>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Gallery;
