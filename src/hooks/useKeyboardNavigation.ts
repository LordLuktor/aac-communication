import { useEffect, useCallback } from 'react';

interface UseKeyboardNavigationProps {
  isEnabled: boolean;
  onNavigateUp?: () => void;
  onNavigateDown?: () => void;
  onNavigateLeft?: () => void;
  onNavigateRight?: () => void;
  onSelect?: () => void;
  onEscape?: () => void;
}

export const useKeyboardNavigation = ({
  isEnabled,
  onNavigateUp,
  onNavigateDown,
  onNavigateLeft,
  onNavigateRight,
  onSelect,
  onEscape
}: UseKeyboardNavigationProps) => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!isEnabled) return;

    // Prevent default behavior for navigation keys
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'Space', 'Escape'].includes(event.key)) {
      event.preventDefault();
    }

    switch (event.key) {
      case 'ArrowUp':
        onNavigateUp?.();
        break;
      case 'ArrowDown':
        onNavigateDown?.();
        break;
      case 'ArrowLeft':
        onNavigateLeft?.();
        break;
      case 'ArrowRight':
        onNavigateRight?.();
        break;
      case 'Enter':
      case ' ':
        onSelect?.();
        break;
      case 'Escape':
        onEscape?.();
        break;
    }
  }, [isEnabled, onNavigateUp, onNavigateDown, onNavigateLeft, onNavigateRight, onSelect, onEscape]);

  useEffect(() => {
    if (isEnabled) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isEnabled, handleKeyDown]);

  return { handleKeyDown };
};