import { useDimensions } from '@chakra-ui/react';
import { useState, useRef, useEffect } from 'react';

const useSliding = (elementWidth, countElements) => {
  const containerRef = useRef(null);
  const { marginBox: { width } = {} } = useDimensions(containerRef) || {};
  const [distance, setDistance] = useState(0);
  const [totalInViewport, setTotalInViewport] = useState(0);
  const [viewed, setViewed] = useState(0);

  useEffect(() => {
    setTotalInViewport(Math.floor(width / elementWidth));
  }, [elementWidth, width]);

  const handlePrev = () => {
    setViewed(viewed - totalInViewport);
    setDistance(distance + elementWidth * totalInViewport);
  };

  const handleNext = () => {
    setViewed(viewed + totalInViewport);
    setDistance(distance - elementWidth * totalInViewport);
  };

  const slideProps = {
    style: { transform: `translate3d(${distance}px, 0, 0)` },
  };

  const hasPrev = distance < 0;
  const hasNext = viewed + totalInViewport < countElements;

  return { handlePrev, handleNext, slideProps, containerRef, hasPrev, hasNext };
};

export default useSliding;
