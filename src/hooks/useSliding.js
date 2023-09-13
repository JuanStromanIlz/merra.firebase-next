import { useDimensions } from '@chakra-ui/react';
import { useState, useRef, useEffect } from 'react';

const useSliding = (itemsPerParent, countElements) => {
  const containerRef = useRef(null);
  const { marginBox: { width } = {} } = useDimensions(containerRef) || {};
  const [itemLength, setItemLength] = useState(0);
  const [distance, setDistance] = useState(0);
  const [totalInViewport, setTotalInViewport] = useState(0);
  const [viewed, setViewed] = useState(0);

  useEffect(() => {
    const item = itemsPerParent + 0.5;
    setTotalInViewport(Math.floor(width / (width / item)));
    setItemLength(width / item);
  }, [itemLength, itemsPerParent, width]);

  const handlePrev = () => {
    setViewed(viewed - totalInViewport);
    setDistance(distance + itemLength * itemsPerParent);
  };

  const handleNext = () => {
    setViewed(viewed + totalInViewport);
    setDistance(distance - itemLength * itemsPerParent);
  };

  const slideProps = {
    style: { transform: `translate3d(${distance}px, 0, 0)` },
  };

  const hasPrev = distance < 0;
  const hasNext = viewed + totalInViewport < countElements;

  return {
    handlePrev,
    handleNext,
    slideProps,
    containerRef,
    itemLength,
    hasPrev,
    hasNext,
  };
};

export default useSliding;
