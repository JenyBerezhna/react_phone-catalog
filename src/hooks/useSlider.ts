import { useRef } from 'react';

export const useSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    const container = sliderRef.current;

    if (!container) {
      return;
    }

    const firstItem = container.firstElementChild as HTMLElement | null;

    if (!firstItem) {
      return;
    }

    const itemWidth = firstItem.getBoundingClientRect().width;

    const { gap } = window.getComputedStyle(container);
    const gapValue = parseFloat(gap) || 0;

    const offset =
      direction === 'left' ? -(itemWidth + gapValue) : itemWidth + gapValue;

    container.scrollBy({
      left: offset,
      behavior: 'smooth',
    });
  };

  const next = () => {
    scroll('right');
  };

  const prev = () => {
    scroll('left');
  };

  return {
    sliderRef,
    next,
    prev,
  };
};
