import { useState, useEffect } from 'react';

export const useCardDrag = (
  newCards: Card[],
  setNewCards: React.Dispatch<React.SetStateAction<Card[]>>,
  setCardPositions: React.Dispatch<
    React.SetStateAction<{ [key: number]: { x: number; y: number } }>
  >
) => {
  const [draggingCardIndex, setDraggingCardIndex] = useState<number | null>(
    null
  );
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [cardPositionsLocal, setCardPositionsLocal] = useState<{
    [key: number]: { x: number; y: number };
  }>({});

  // Initialize card positions to the center of the screen
  useEffect(() => {
    const initialPositions: { [key: number]: { x: number; y: number } } = {};
    newCards.forEach((_, index) => {
      initialPositions[index] = { x: 0, y: 0 }; // Set initial position to (0,0)
    });
    setCardPositionsLocal(initialPositions);
  }, [newCards]);

  // Handle mouse down event to start dragging
  const handleMouseDown = (e: React.MouseEvent, index: number) => {
    e.preventDefault(); // Prevent default drag behavior
    setDraggingCardIndex(index); // Set the card being dragged
    setStartX(e.pageX); // Capture starting X position
    setStartY(e.pageY); // Capture starting Y position
    setCardPositionsLocal((prev) => ({
      ...prev,
      [index]: { x: 0, y: 0 }, // Reset the position of the dragged card
    }));
  };

  // Track mouse movement and update card position
  const handleMouseMove = (e: MouseEvent) => {
    if (draggingCardIndex === null) return;

    const dx = e.pageX - startX; // Calculate horizontal movement
    const dy = e.pageY - startY; // Calculate vertical movement
    setCardPositionsLocal((prev) => ({
      ...prev,
      [draggingCardIndex]: { x: dx, y: dy }, // Update position of the dragged card only
    }));
  };

  // Handle mouse up event to either remove or reset the card
  const handleMouseUp = () => {
    if (draggingCardIndex === null) return;

    const { x, y } = cardPositionsLocal[draggingCardIndex];
    const distanceDragged = Math.sqrt(x * x + y * y); // Calculate the total distance dragged

    if (distanceDragged > 200) {
      // Remove the card from the array if dragged beyond the threshold
      setNewCards((prev) =>
        prev.filter((_, index) => index !== draggingCardIndex)
      );
    } else {
      // Return the card to its original position if not dragged far enough
      setCardPositionsLocal((prev) => ({
        ...prev,
        [draggingCardIndex]: { x: 0, y: 0 }, // Reset position to (0,0) for the non-dragged card
      }));
    }

    // Reset the dragging state after mouse release
    setDraggingCardIndex(null);
  };

  // Set up mouse event listeners
  useEffect(() => {
    if (draggingCardIndex === null) return;

    const handleMove = (e: MouseEvent) => handleMouseMove(e);
    const handleEnd = () => handleMouseUp();

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
    };
  }, [draggingCardIndex, cardPositionsLocal]);

  // Set the updated card positions to the parent component (or wherever needed)
  useEffect(() => {
    setCardPositions(cardPositionsLocal);
  }, [cardPositionsLocal, setCardPositions]);

  return {
    cardPositions: cardPositionsLocal,
    handleMouseDown,
  };
};
