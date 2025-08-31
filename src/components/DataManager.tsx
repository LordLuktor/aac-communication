import React, { useState } from 'react';
import { X, Download, Upload, Trash2, AlertTriangle } from 'lucide-react';
import { UserProfile } from '../types/aac';

interface DataManagerProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile | null;
  onImportData: (data: UserProfile) => void;
  onClearData: () => void;
}

const DataManager: React.FC<DataManagerProps> = ({
  isOpen,
  onClose,
  userProfile,
  onImportData,
  onClearData
}) => {
  const [importError, setImportError] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const exportData = () => {
    if (!userProfile) return;

    const dataStr = JSON.stringify(userProfile, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `aac-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        
        // Validate the data structure
        if (!data.id || !data.name || !Array.isArray(data.pages)) {
          throw new Error('Invalid backup file format');
        }

        // Convert date strings back to Date objects
        data.createdAt = new Date(data.createdAt);
        data.updatedAt = new Date(data.updatedAt);
        data.pages = data.pages.map((page: any) => ({
          ...page,
          createdAt: new Date(page.createdAt),
          updatedAt: new Date(page.updatedAt),
          buttons: page.buttons.map((button: any) => ({
            ...button,
            createdAt: new Date(button.createdAt),
            updatedAt: new Date(button.updatedAt)
          }))
        }));

        onImportData(data);
        setImportError(null);
        onClose();
      } catch (error) {
        setImportError('Invalid backup file. Please select a valid AAC backup file.');
      }
    };
    reader.readAsText(file);
  };

  const handleClearData = () => {
    onClearData();
    setShowClearConfirm(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Data Management</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Export Data */}
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Export Data</h3>
            <p className="text-sm text-gray-600 mb-4">
              Download a backup of all your communication pages and settings.
            </p>
            <button
              onClick={exportData}
              disabled={!userProfile}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Download className="w-4 h-4" />
              Export Backup
            </button>
          </div>

          {/* Import Data */}
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Import Data</h3>
            <p className="text-sm text-gray-600 mb-4">
              Restore from a previously exported backup file. This will replace all current data.
            </p>
            <label className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 cursor-pointer transition-colors">
              <Upload className="w-4 h-4" />
              Select Backup File
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
            {importError && (
              <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">{importError}</p>
              </div>
            )}
          </div>

          {/* Clear Data */}
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Clear All Data</h3>
            <p className="text-sm text-gray-600 mb-4">
              Permanently delete all communication pages, buttons, and settings. This action cannot be undone.
            </p>
            {!showClearConfirm ? (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear All Data
              </button>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                  <p className="text-sm text-yellow-800">
                    Are you sure? This will permanently delete all your data.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleClearData}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Yes, Delete All
                  </button>
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Data Statistics */}
          {userProfile && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Current Data</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">Pages</div>
                  <div className="text-xl font-semibold">{userProfile.pages.length}</div>
                </div>
                <div>
                  <div className="text-gray-600">Buttons</div>
                  <div className="text-xl font-semibold">
                    {userProfile.pages.reduce((total, page) => total + page.buttons.length, 0)}
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="text-gray-600">Last Updated</div>
                  <div className="font-medium">
                    {userProfile.updatedAt.toLocaleDateString()} at {userProfile.updatedAt.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataManager;