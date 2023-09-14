import React from 'react';
import useSliding from 'src/hooks/useSliding';
import { Box, Button, Flex, useBreakpointValue } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

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
      {hasPrev && itemsPerParent !== 1 && (
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
      {hasNext ||
        (itemsPerParent === 1 && (
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
        ))}
    </Flex>
  );
};

export default Slider;
