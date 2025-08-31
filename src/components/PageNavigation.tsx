import React from 'react';
import { ChevronLeft, ChevronRight, Grid3X3, Plus, Settings } from 'lucide-react';
import { CommunicationPage } from '../types/aac';

interface PageNavigationProps {
  pages: CommunicationPage[];
  currentPageIndex: number;
  onPageChange: (index: number) => void;
  onAddPage?: () => void;
  onToggleEditMode?: () => void;
  isEditMode: boolean;
}

const PageNavigation: React.FC<PageNavigationProps> = ({
  pages,
  currentPageIndex,
  onPageChange,
  onAddPage,
  onToggleEditMode,
  isEditMode
}) => {
  const currentPage = pages[currentPageIndex];

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(Math.max(0, currentPageIndex - 1))}
            disabled={currentPageIndex === 0}
            className="p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                     hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-1">
            <Grid3X3 className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {currentPageIndex + 1} of {pages.length}
            </span>
          </div>

          <button
            onClick={() => onPageChange(Math.min(pages.length - 1, currentPageIndex + 1))}
            disabled={currentPageIndex === pages.length - 1}
            className="p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                     hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Center - Current Page Info */}
        <div className="flex-1 text-center">
          <h2 className="font-semibold text-gray-800 truncate max-w-xs">
            {currentPage?.title || 'Untitled Page'}
          </h2>
          {currentPage?.description && (
            <p className="text-sm text-gray-500 truncate max-w-sm">
              {currentPage.description}
            </p>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {onToggleEditMode && (
            <button
              onClick={onToggleEditMode}
              className={`
                px-3 py-2 rounded-lg text-sm font-medium transition-colors
                focus:outline-none focus:ring-2 focus:ring-blue-500
                ${isEditMode 
                  ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
              `}
            >
              <Settings className="w-4 h-4 mr-1" />
              {isEditMode ? 'Done' : 'Edit'}
            </button>
          )}

          {onAddPage && (
            <button
              onClick={onAddPage}
              className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 
                       transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Add new page"
              aria-label="Add new page"
            >
              <Plus className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Page Dots Indicator */}
      {pages.length > 1 && (
        <div className="flex justify-center py-2 border-t border-gray-100">
          <div className="flex gap-1">
            {pages.map((_, index) => (
              <button
                key={index}
                onClick={() => onPageChange(index)}
                className={`
                  w-2 h-2 rounded-full transition-all duration-200
                  ${index === currentPageIndex 
                    ? 'bg-blue-600 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'}
                `}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PageNavigation;