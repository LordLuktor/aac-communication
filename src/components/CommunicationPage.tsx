import React from 'react';
import { useDrop } from 'react-dnd';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import { CommunicationPage as PageType, CommunicationButton as ButtonType, DragItem } from '../types/aac';
import CommunicationButton from './CommunicationButton';

interface CommunicationPageProps {
  page: PageType;
  onSpeak: (text: string) => void;
  onEditButton?: (button: ButtonType) => void;
  onDeleteButton?: (buttonId: string) => void;
  onMoveButton?: (buttonId: string, targetPageId: string, position: { x: number; y: number }) => void;
  isEditMode: boolean;
  disabled?: boolean;
}

const CommunicationPage: React.FC<CommunicationPageProps> = ({
  page,
  onSpeak,
  onEditButton,
  onDeleteButton,
  onMoveButton,
  isEditMode,
  disabled = false
}) => {
  const [focusedButtonIndex, setFocusedButtonIndex] = React.useState(0);
  const [isKeyboardMode, setIsKeyboardMode] = React.useState(false);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'button',
    drop: (item: DragItem, monitor) => {
      if (!isEditMode || !onMoveButton) return;
      
      const offset = monitor.getClientOffset();
      const targetRect = monitor.getDropResult();
      
      if (offset && item.type === 'button') {
        onMoveButton(item.id, page.id, { x: offset.x, y: offset.y });
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  }), [isEditMode, page.id, onMoveButton]);

  const handleKeyboardNavigation = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (page.buttons.length === 0) return;
    
    setIsKeyboardMode(true);
    const buttonsPerRow = Math.floor(window.innerWidth / 150); // Approximate buttons per row
    let newIndex = focusedButtonIndex;

    switch (direction) {
      case 'left':
        newIndex = Math.max(0, focusedButtonIndex - 1);
        break;
      case 'right':
        newIndex = Math.min(page.buttons.length - 1, focusedButtonIndex + 1);
        break;
      case 'up':
        newIndex = Math.max(0, focusedButtonIndex - buttonsPerRow);
        break;
      case 'down':
        newIndex = Math.min(page.buttons.length - 1, focusedButtonIndex + buttonsPerRow);
        break;
    }
    
    setFocusedButtonIndex(newIndex);
  };

  useKeyboardNavigation({
    isEnabled: !isEditMode && !disabled,
    onNavigateUp: () => handleKeyboardNavigation('up'),
    onNavigateDown: () => handleKeyboardNavigation('down'),
    onNavigateLeft: () => handleKeyboardNavigation('left'),
    onNavigateRight: () => handleKeyboardNavigation('right'),
    onSelect: () => {
      const focusedButton = page.buttons[focusedButtonIndex];
      if (focusedButton) {
        onSpeak(focusedButton.text);
      }
    }
  });

  return (
    <div
      ref={drop}
      className={`
        min-h-screen p-4 transition-colors duration-200
        ${isOver && isEditMode ? 'bg-blue-50 border-2 border-blue-300 border-dashed' : ''}
      `}
      style={{ backgroundColor: page.backgroundColor }}
    >
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{page.title}</h1>
        {page.description && (
          <p className="text-gray-600">{page.description}</p>
        )}
      </div>

      {/* Buttons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {page.buttons.map((button, index) => (
          <CommunicationButton
            key={button.id}
            button={button}
            onSpeak={onSpeak}
            onEdit={onEditButton}
            onDelete={onDeleteButton}
            isEditMode={isEditMode}
            disabled={disabled}
            isFocused={isKeyboardMode && index === focusedButtonIndex}
            onFocus={() => {
              setFocusedButtonIndex(index);
              setIsKeyboardMode(false);
            }}
          />
        ))}
      </div>

      {/* Empty State */}
      {page.buttons.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
          <div className="text-6xl mb-4">💬</div>
          <h3 className="text-xl font-medium mb-2">No buttons yet</h3>
          <p className="text-center max-w-md">
            {isEditMode 
              ? "Add your first communication button to get started."
              : "This page doesn't have any communication buttons yet."
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default CommunicationPage;