import React, { useState, useRef } from 'react';
import { CommunicationButton } from '../types/aac';
import { X, Upload, Palette } from 'lucide-react';

interface ButtonEditorProps {
  button?: CommunicationButton;
  pageId: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (button: Omit<CommunicationButton, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

const ButtonEditor: React.FC<ButtonEditorProps> = ({
  button,
  pageId,
  isOpen,
  onClose,
  onSave
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    text: '',
    image: '',
    backgroundColor: '#3B82F6',
    textColor: '#FFFFFF',
    size: 'medium' as const,
    category: 'general',
    position: { x: 0, y: 0 }
  });

  // Reset form when button prop changes or modal opens
  React.useEffect(() => {
    if (isOpen) {
      if (button) {
        // Editing existing button
        setFormData({
          text: button.text,
          image: button.image || '',
          backgroundColor: button.backgroundColor,
          textColor: button.textColor,
          size: button.size,
          category: button.category,
          position: button.position
        });
      } else {
        // Creating new button - always start with blank form
        setFormData({
          text: '',
          image: '',
          backgroundColor: '#3B82F6',
          textColor: '#FFFFFF',
          size: 'medium',
          category: 'general',
          position: { x: 0, y: 0 }
        });
      }
    }
  }, [button, isOpen]);

  const predefinedColors = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
    '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
  ];

  const categories = [
    'general', 'emotions', 'needs', 'social', 'activities',
    'food', 'places', 'people', 'weather', 'time'
  ];

  if (!isOpen) return null;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData(prev => ({ ...prev, image: e.target?.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.text.trim()) return;

    onSave({
      text: formData.text.trim(),
      image: formData.image,
      backgroundColor: formData.backgroundColor,
      textColor: formData.textColor,
      size: formData.size,
      category: formData.category,
      position: formData.position,
      pageId
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">
            {button ? 'Edit Button' : 'Add Button'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Text Input */}
          <div>
            <label htmlFor="button-text" className="block text-sm font-medium text-gray-700 mb-2">
              Button Text *
            </label>
            <input
              id="button-text"
              type="text"
              value={formData.text}
              onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter button text"
              required
              maxLength={50}
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Button Image (Optional)
            </label>
            <div className="flex items-center gap-4">
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded-lg border"
                />
              )}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Upload className="w-4 h-4" />
                Upload Image
              </button>
              {formData.image && (
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                  className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Size Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Button Size
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['small', 'medium', 'large'].map((size) => (
                <label key={size} className="cursor-pointer">
                  <input
                    type="radio"
                    name="size"
                    value={size}
                    checked={formData.size === size}
                    onChange={(e) => setFormData(prev => ({ ...prev, size: e.target.value as any }))}
                    className="sr-only"
                  />
                  <div className={`
                    p-3 text-center border-2 rounded-lg transition-colors capitalize
                    ${formData.size === size ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 hover:border-gray-400'}
                  `}>
                    {size}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Category Selection */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Background Color
            </label>
            <div className="flex items-center gap-3 mb-3">
              <input
                type="color"
                value={formData.backgroundColor}
                onChange={(e) => setFormData(prev => ({ ...prev, backgroundColor: e.target.value }))}
                className="w-10 h-10 border border-gray-300 rounded-lg cursor-pointer"
              />
              <span className="text-sm text-gray-600">{formData.backgroundColor}</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {predefinedColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, backgroundColor: color }))}
                  className={`
                    w-10 h-10 rounded-lg border-2 transition-all
                    ${formData.backgroundColor === color ? 'border-gray-800 scale-110' : 'border-gray-300 hover:scale-105'}
                  `}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Text Color Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={formData.textColor}
                onChange={(e) => setFormData(prev => ({ ...prev, textColor: e.target.value }))}
                className="w-10 h-10 border border-gray-300 rounded-lg cursor-pointer"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, textColor: '#FFFFFF' }))}
                  className={`
                    px-3 py-1 rounded text-sm transition-colors
                    ${formData.textColor === '#FFFFFF' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}
                  `}
                >
                  White
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, textColor: '#000000' }))}
                  className={`
                    px-3 py-1 rounded text-sm transition-colors
                    ${formData.textColor === '#000000' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}
                  `}
                >
                  Black
                </button>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preview
            </label>
            <div className="flex justify-center p-4 bg-gray-50 rounded-lg">
              <div
                className={`
                  rounded-lg flex flex-col items-center justify-center
                  ${formData.size === 'small' ? 'w-20 h-20 text-sm' :
                    formData.size === 'large' ? 'w-36 h-36 text-lg' : 'w-28 h-28 text-base'}
                  shadow-md font-medium
                `}
                style={{
                  backgroundColor: formData.backgroundColor,
                  color: formData.textColor
                }}
              >
                {formData.image && (
                  <img
                    src={formData.image}
                    alt=""
                    className={`
                      rounded object-cover mb-1
                      ${formData.size === 'small' ? 'w-8 h-8' : 
                        formData.size === 'large' ? 'w-16 h-16' : 'w-12 h-12'}
                    `}
                  />
                )}
                <span className="text-center leading-tight px-1">
                  {formData.text || 'Button Text'}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              disabled={!formData.text.trim()}
            >
              {button ? 'Update' : 'Create'} Button
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ButtonEditor;