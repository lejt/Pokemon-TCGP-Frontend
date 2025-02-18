import { useRef, useState } from 'react';

export const useDragScroll = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [clickPrevent, setClickPrevent] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setClickPrevent(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!scrollRef.current || !isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
    setClickPrevent(true); // Prevent clicks while dragging
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return {
    scrollRef,
    isDragging,
    clickPrevent,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};
