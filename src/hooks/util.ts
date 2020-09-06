import { useState, useEffect } from 'react';

export const useWindowWidth = (initialValue) => {
  const [width, setWidth] = useState(initialValue);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
  return Math.min(350, width);
};

export const useTitleLength = (windowWidth, windowDivNum) => {
  const [length, setLength] = useState(windowWidth / windowDivNum);
  useEffect(() => {
    const handleResize = () => setLength(window.innerWidth / windowDivNum);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
  return length;
};

export const useScrollDirection = (initialDirection: string) => {
  const [direction, setDirection] = useState(initialDirection);
  const [position, setPosition] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 100) return;
      if (Math.abs(position - window.scrollY) > 15) {
        setDirection(position > window.scrollY ? 'up' : 'down');
        setPosition(window.scrollY);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
  return direction;
};

export const useScrollY = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
  return scrollY;
};
