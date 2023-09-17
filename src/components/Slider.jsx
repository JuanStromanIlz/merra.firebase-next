import React from 'react';
import useSliding from 'src/hooks/useSliding';
import { Box, Button, Flex, useBreakpointValue } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

export const SliderButtons = ({ hasPrev, hasNext, prev, next }) => (
  <Box display={{ base: 'none', lg: 'block' }}>
    {hasPrev && (
      <Button
        variant='ghost'
        onClick={prev}
        position={'absolute'}
        top={0}
        bottom={0}
        left={0}
        height={'auto'}
        colorScheme='transparent'
      >
        <ChevronLeftIcon w={10} h={10} />
      </Button>
    )}
    {hasNext && (
      <Button
        variant='ghost'
        onClick={next}
        position={'absolute'}
        top={0}
        bottom={0}
        right={0}
        height={'auto'}
        colorScheme='transparent'
      >
        <ChevronRightIcon w={10} h={10} />
      </Button>
    )}
  </Box>
);

const Slider = ({ items, gap = 1, Component = Box, ...rest }) => {
  const itemsPerParent = useBreakpointValue({ base: 1.3, md: 4.3 });
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
    <Flex
      position={'relative'}
      overflow={{ base: 'scroll', md: 'hidden' }}
      {...rest}
    >
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
      <SliderButtons
        hasPrev={hasPrev}
        hasNext={hasNext}
        prev={handlePrev}
        next={handleNext}
      />
    </Flex>
  );
};

export default Slider;
