import React, { useState } from 'react';
import { X, Edit3, Trash2, Copy, Move, Palette } from 'lucide-react';
import { CommunicationPageType } from '../types/aac';

interface PageManagerProps {
  isOpen: boolean;
  onClose: () => void;
  pages: CommunicationPageType[];
  onUpdatePage: (pageId: string, updates: Partial<CommunicationPageType>) => void;
  onDeletePage: (pageId: string) => void;
  onDuplicatePage: (pageId: string) => void;
  onReorderPages: (fromIndex: number, toIndex: number) => void;
}

const PageManager: React.FC<PageManagerProps> = ({
  isOpen,
  onClose,
  pages,
  onUpdatePage,
  onDeletePage,
  onDuplicatePage,
  onReorderPages
}) => {
  const [editingPage, setEditingPage] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: '', description: '', backgroundColor: '' });

  const startEditing = (page: CommunicationPageType) => {
    setEditingPage(page.id);
    setEditForm({
      title: page.title,
      description: page.description || '',
      backgroundColor: page.backgroundColor
    });
  };

  const saveEdit = () => {
    if (editingPage) {
      onUpdatePage(editingPage, editForm);
      setEditingPage(null);
    }
  };

  const cancelEdit = () => {
    setEditingPage(null);
    setEditForm({ title: '', description: '', backgroundColor: '' });
  };

  const handleDelete = (pageId: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      onDeletePage(pageId);
    }
  };

  const predefinedColors = [
    '#F8FAFC', '#FEF3C7', '#FEF2F2', '#F0FDF4', '#EFF6FF',
    '#F5F3FF', '#FDF4FF', '#FFFBEB', '#F0F9FF', '#ECFDF5'
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Page Manager</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[70vh]">
          <div className="space-y-4">
            {pages.map((page, index) => (
              <div
                key={page.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                style={{ borderLeftColor: page.backgroundColor, borderLeftWidth: '4px' }}
              >
                {editingPage === page.id ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Page Title
                      </label>
                      <input
                        type="text"
                        value={editForm.title}
                        onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter page title"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description (Optional)
                      </label>
                      <textarea
                        value={editForm.description}
                        onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter page description"
                        rows={2}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Background Color
                      </label>
                      <div className="flex items-center gap-3 mb-3">
                        <input
                          type="color"
                          value={editForm.backgroundColor}
                          onChange={(e) => setEditForm(prev => ({ ...prev, backgroundColor: e.target.value }))}
                          className="w-10 h-10 border border-gray-300 rounded-lg cursor-pointer"
                        />
                        <span className="text-sm text-gray-600">{editForm.backgroundColor}</span>
                      </div>
                      <div className="grid grid-cols-5 gap-2">
                        {predefinedColors.map((color) => (
                          <button
                            key={color}
                            type="button"
                            onClick={() => setEditForm(prev => ({ ...prev, backgroundColor: color }))}
                            className={`
                              w-10 h-10 rounded-lg border-2 transition-all
                              ${editForm.backgroundColor === color ? 'border-gray-800 scale-110' : 'border-gray-300 hover:scale-105'}
                            `}
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={saveEdit}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{page.title}</h3>
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          {page.buttons.length} buttons
                        </span>
                      </div>
                      {page.description && (
                        <p className="text-sm text-gray-600 mb-2">{page.description}</p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Position: {index + 1}</span>
                        <span>Created: {page.createdAt.toLocaleDateString()}</span>
                        <span>Updated: {page.updatedAt.toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => startEditing(page)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit page"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDuplicatePage(page.id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Duplicate page"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => index > 0 && onReorderPages(index, index - 1)}
                          disabled={index === 0}
                          className="p-1 text-gray-600 hover:bg-gray-50 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          title="Move up"
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => index < pages.length - 1 && onReorderPages(index, index + 1)}
                          disabled={index === pages.length - 1}
                          className="p-1 text-gray-600 hover:bg-gray-50 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          title="Move down"
                        >
                          ↓
                        </button>
                      </div>
                      <button
                        onClick={() => handleDelete(page.id, page.title)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete page"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {pages.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <div className="text-4xl mb-4">📄</div>
              <h3 className="text-lg font-medium mb-2">No pages found</h3>
              <p>Create your first communication page to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageManager;