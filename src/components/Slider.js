import React, { useRef } from 'react';
import useSliding from 'src/hooks/useSliding';
import { Box, Button, Flex, useDimensions } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const Slider = ({ items, Component = Box }) => {
  const elementRef = useRef(null);
  const { marginBox: { width } = {} } = useDimensions(elementRef) || {};
  const { handlePrev, handleNext, slideProps, containerRef, hasNext, hasPrev } =
    useSliding(width, items?.length);

  return (
    <Box overflow={'hidden'} position={'relative'}>
      <Flex position={'relative'}>
        <Flex
          ref={containerRef}
          sx={{ transition: 'transform 300ms ease 100ms' }}
          width={'100%'}
          {...slideProps}
        >
          {items.map((item, index) => {
            return (
              <Box
                position={'relative'}
                flexGrow={0}
                flexShrink={0}
                flexBasis={'40%'}
                key={index}
                ref={elementRef}
              >
                <Component item={item} />
              </Box>
            );
          })}
        </Flex>
      </Flex>
      {hasPrev && (
        <Button
          variant='ghost'
          onClick={handlePrev}
          position={'absolute'}
          top={0}
          bottom={0}
          left={0}
          height={'auto'}
          w={width / 10}
          colorScheme='transparent'
        >
          <ChevronLeftIcon w={10} h={10} />
        </Button>
      )}
      {hasNext && (
        <Button
          variant='ghost'
          onClick={handleNext}
          position={'absolute'}
          top={0}
          bottom={0}
          right={0}
          height={'auto'}
          colorScheme='transparent'
          w={width / 10}
        >
          <ChevronRightIcon w={10} h={10} />
        </Button>
      )}
    </Box>
  );
};

export default Slider;
