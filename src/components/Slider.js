import React, { useRef } from 'react';
import useSliding from 'src/hooks/useSliding';
import { Box, Button, Flex, useBreakpointValue } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const Slider = ({ items, gap = 1, Component = Box }) => {
  const itemsPerParent = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const {
    handlePrev,
    handleNext,
    slideProps,
    itemLength,
    containerRef,
    hasNext,
    hasPrev,
  } = useSliding(itemsPerParent, items?.length);

  if (!items?.length) {
    return null;
  }

  return (
    <Box overflow={'hidden'} position={'relative'}>
      <Flex position={'relative'} overflow={'hidden'}>
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
                flexBasis={itemLength}
                key={index}
                pr={gap}
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
          w={itemLength / 10}
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
          w={itemLength / 10}
        >
          <ChevronRightIcon w={10} h={10} />
        </Button>
      )}
    </Box>
  );
};

export default Slider;
