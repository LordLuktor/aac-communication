import React, { useState } from 'react';
import { CommunicationButton as ButtonType } from '../types/aac';
import { useDrag } from 'react-dnd';
import { Volume2, Edit3, X } from 'lucide-react';

interface CommunicationButtonProps {
  button: ButtonType;
  onSpeak: (text: string) => void;
  onEdit?: (button: ButtonType) => void;
  onDelete?: (buttonId: string) => void;
  isEditMode: boolean;
  disabled?: boolean;
  isFocused?: boolean;
  onFocus?: () => void;
}

const CommunicationButton: React.FC<CommunicationButtonProps> = ({
  button,
  onSpeak,
  onEdit,
  onDelete,
  isEditMode,
  disabled = false,
  isFocused = false,
  onFocus
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'button',
    item: { type: 'button', id: button.id, pageId: button.pageId },
    canDrag: isEditMode,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }), [isEditMode, button.id, button.pageId]);

  const getSizeClasses = () => {
    switch (button.size) {
      case 'small':
        return 'w-20 h-20 text-sm';
      case 'medium':
        return 'w-28 h-28 text-base';
      case 'large':
        return 'w-36 h-36 text-lg';
      default:
        return 'w-28 h-28 text-base';
    }
  };

  const handleClick = () => {
    if (disabled || isEditMode) return;
    onSpeak(button.text);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) onEdit(button);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete && window.confirm('Are you sure you want to delete this button?')) {
      onDelete(button.id);
    }
  };

  return (
    <div
      ref={drag}
      className={`
        relative rounded-lg flex flex-col items-center justify-center cursor-pointer
        transition-all duration-200 select-none
        ${getSizeClasses()}
        ${isDragging ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}
        ${isPressed ? 'scale-95' : ''}
        ${disabled ? 'cursor-not-allowed opacity-50' : ''}
        ${isEditMode ? 'ring-2 ring-blue-400 ring-dashed' : ''}
        ${isFocused ? 'ring-4 ring-yellow-400 ring-offset-2' : ''}
        shadow-md hover:shadow-lg
      `}
      style={{
        backgroundColor: button.backgroundColor,
        color: button.textColor
      }}
      onClick={handleClick}
      onFocus={onFocus}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={`Communication button: ${button.text}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* Button Image */}
      {button.image && (
        <div className="mb-1 flex-shrink-0">
          <img
            src={button.image}
            alt=""
            className={`
              rounded object-cover
              ${button.size === 'small' ? 'w-14 h-14' : 
                button.size === 'large' ? 'w-28 h-28' : 'w-20 h-20'}
            `}
            draggable={false}
          />
        </div>
      )}

      {/* Button Text */}
      <span className={`
        font-medium text-center leading-tight px-1 break-words max-w-full
        ${button.image ? 
          (button.size === 'small' ? 'text-xs' : button.size === 'large' ? 'text-sm' : 'text-xs') : 
          (button.size === 'small' ? 'text-sm' : button.size === 'large' ? 'text-lg' : 'text-base')
        }
      `}>
        {button.text}
      </span>

      {/* Volume Indicator */}
      {!isEditMode && (
        <Volume2 
          className="absolute top-1 right-1 w-3 h-3 opacity-50" 
          aria-hidden="true"
        />
      )}

      {/* Edit Mode Controls */}
      {isEditMode && (
        <div className="absolute -top-2 -right-2 flex gap-1">
          <button
            onClick={handleEdit}
            className="w-6 h-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full 
                     flex items-center justify-center shadow-md transition-colors"
            title="Edit button"
            aria-label="Edit button"
          >
            <Edit3 className="w-3 h-3" />
          </button>
          <button
            onClick={handleDelete}
            className="w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full 
                     flex items-center justify-center shadow-md transition-colors"
            title="Delete button"
            aria-label="Delete button"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CommunicationButton;