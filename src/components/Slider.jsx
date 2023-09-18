import React from 'react';
import NextLink from 'next/link';
import useSliding from 'src/hooks/useSliding';
import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Heading,
  LinkOverlay,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import File from './File';

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

const Item = ({ item }) => {
  const { title, files = [] } = item;
  return (
    <LinkOverlay as={NextLink} href={title}>
      <Box as={'article'} position={'relative'} height={'100%'}>
        <AspectRatio ratio={16 / 9} height={'100%'}>
          <File data={files[0]} />
        </AspectRatio>
        <Box
          position={'absolute'}
          inset={0}
          bgGradient={'linear(to-t, blackAlpha.300 0%, transparent 50%)'}
        />
        <Flex direction='column' position={'absolute'} bottom={0} px={3} pb={3}>
          <Heading as={'h3'} fontSize={'lg'} fontWeight={'bold'}>
            {title}
          </Heading>
        </Flex>
      </Box>
    </LinkOverlay>
  );
};

const Slider = ({ items, gap = 1, Component = Item, ...rest }) => {
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
    <Flex position={'relative'} overflow={{ base: 'scroll', md: 'hidden' }}>
      <Flex
        ref={containerRef}
        sx={{ transition: 'transform 300ms ease 100ms' }}
        width={'100%'}
        {...slideProps}
        {...rest}
      >
        {items.map((item, index) => {
          return (
            <Box
              position={'relative'}
              flexGrow={0}
              flexShrink={0}
              flexBasis={itemLength}
              key={index}
              pr={index + 1 !== items.length ? gap : 6}
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
