import React, { useCallback, useEffect, useRef, useState } from 'react';
import useSliding from 'src/hooks/useSliding';
import { Box, Flex } from '@chakra-ui/react';
import useTouchDirection from 'src/hooks/useTouchDirection';
import { SliderButtons } from './Slider';

const Carrousel = ({
  items,
  Component = Box,
  autoplay = true,
  delay = 7000,
  children,
  ...rest
}) => {
  const timeoutRef = useRef(null);
  const [showing, setShowing] = useState(0);
  const {
    handlePrev,
    handleNext,
    handleReset,
    slideProps,
    itemLength,
    containerRef,
    hasNext,
    hasPrev,
  } = useSliding(1, items?.length);

  function prev() {
    if (hasPrev) {
      setShowing((prev) => prev - 1);
      handlePrev();
    }
  }

  const next = useCallback(() => {
    if (hasNext) {
      setShowing((prev) => prev + 1);
      handleNext();
    }
  }, [handleNext, hasNext]);

  const reset = useCallback(() => {
    setShowing(0);
    handleReset();
  }, [handleReset]);

  const { onTouchStart, onTouchEnd, onTouchMove } = useTouchDirection(
    prev,
    next
  );

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      const last = showing + 1 === items.length;
      if (!last) {
        return next();
      }
      return reset();
    }, delay);

    return () => {
      resetTimeout();
    };
  }, [delay, autoplay, items, next, reset, showing]);

  if (!items?.length) {
    return null;
  }

  const indicator = () => (
    <Flex
      direction={'row'}
      position={'absolute'}
      bottom={4}
      width={'100%'}
      justifyContent={'center'}
      alignContent={'center'}
      gap={3}
    >
      {items.map((_, index) => (
        <Box
          key={index}
          width={2.5}
          height={2.5}
          borderRadius={'100%'}
          bgColor={'white'}
          opacity={index === showing ? 1 : 0.5}
        />
      ))}
    </Flex>
  );

  return (
    <Flex
      position={'relative'}
      overflow={'hidden'}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
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
            >
              <Component item={item} />
            </Box>
          );
        })}
      </Flex>
      {children}
      <SliderButtons
        hasPrev={hasPrev}
        hasNext={hasNext}
        prev={handlePrev}
        next={handleNext}
      />
      {indicator()}
    </Flex>
  );
};

export default Carrousel;
