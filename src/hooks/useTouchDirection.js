import React, { useState } from 'react';

const useTouchDirection = (left, right) => {
  const [touch, setTouch] = useState({
    startPoint: 0,
    direction: true,
  });
  /* Touch */
  function onTouchStart(e) {
    setTouch((prev) => {
      return {
        startPoint: e.changedTouches[0].clientX,
        direction: prev.direction,
      };
    });
  }
  function onTouchMove(e) {
    setTouch((prev) => {
      return {
        startPoint: prev.startPoint,
        direction: e.changedTouches[0].clientX < prev.startPoint,
      };
    });
  }
  function onTouchEnd() {
    if (!touch.direction) {
      return left();
    }
    right();
  }
  return {
    onTouchStart,
    onTouchEnd,
    onTouchMove,
  };
};

export default useTouchDirection;
