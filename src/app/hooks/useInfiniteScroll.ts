import { useEffect, useRef, useCallback } from 'react';

export const useInfiniteScroll = (
  fetchNextPage: () => void,
  hasNextPage: boolean | undefined,
  isFetchingNextPage: boolean
) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (bottomRef.current) {
      const isBottom =
        bottomRef.current.getBoundingClientRect().bottom <=
        window.innerHeight + 50;

      if (isBottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return bottomRef;
};
