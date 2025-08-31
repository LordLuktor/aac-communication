import React, { useState } from 'react';
import { Template } from '../types/aac';
import { X, Download, Eye } from 'lucide-react';
import { defaultTemplates } from '../data/templates';

interface TemplateGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyTemplate: (template: Template) => void;
}

const TemplateGallery: React.FC<TemplateGalleryProps> = ({
  isOpen,
  onClose,
  onApplyTemplate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');


  const categories = [
    { id: 'all', name: 'All Templates' },
    { id: 'basic', name: 'Basic Needs' },
    { id: 'emotions', name: 'Emotions' },
    { id: 'social', name: 'Social' },
    { id: 'activities', name: 'Activities' }
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? defaultTemplates 
    : defaultTemplates.filter(template => template.category === selectedCategory);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-semibold">Template Gallery</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex">
          {/* Category Sidebar */}
          <div className="w-48 p-4 border-r bg-gray-50">
            <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
            <div className="space-y-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`
                    w-full text-left px-3 py-2 rounded-lg text-sm transition-colors
                    ${selectedCategory === category.id 
                      ? 'bg-blue-100 text-blue-700 font-medium' 
                      : 'text-gray-600 hover:bg-gray-100'}
                  `}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Templates Grid */}
          <div className="flex-1 p-6 overflow-y-auto max-h-[70vh]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTemplates.map((template) => (
                <div key={template.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{template.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                    </div>
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {template.category}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="text-2xl text-center p-4 bg-gray-50 rounded-lg">
                      {template.preview}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onApplyTemplate(template)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Use Template
                    </button>
                  </div>

                  <div className="mt-3 text-xs text-gray-500">
                    {template.pages.reduce((total, page) => total + page.buttons.length, 0)} buttons
                  </div>
                </div>
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <div className="text-4xl mb-4">📦</div>
                <h3 className="text-lg font-medium mb-2">No templates found</h3>
                <p>Try selecting a different category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateGallery;