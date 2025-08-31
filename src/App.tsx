import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { Settings, Library, Plus, MessageCircle, Shield, LogOut } from 'lucide-react';
import { Database } from 'lucide-react';

import SentenceBuilder from './components/SentenceBuilder';
import PageManager from './components/PageManager';
import DataManager from './components/DataManager';
import LoginForm from './components/LoginForm';
import AdminDashboard from './components/AdminDashboard';
import { useSpeech } from './hooks/useSpeech';
import { useOfflineStorage } from './hooks/useOfflineStorage';
import { useAccessibility } from './hooks/useAccessibility';
import { useAuth } from './hooks/useAuth';
import { CommunicationButton as ButtonType, CommunicationPage as CommunicationPageType, Template } from './types/aac';
import { defaultTemplates } from './data/templates';

import CommunicationPage from './components/CommunicationPage';
import PageNavigation from './components/PageNavigation';
import ButtonEditor from './components/ButtonEditor';
import TemplateGallery from './components/TemplateGallery';
import SettingsPanel from './components/SettingsPanel';

import { X } from 'lucide-react';

// Detect if device supports touch
const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

function App() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingButton, setEditingButton] = useState<ButtonType | undefined>();
  const [isButtonEditorOpen, setIsButtonEditorOpen] = useState(false);
  const [isTemplateGalleryOpen, setIsTemplateGalleryOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isSentenceBuilderOpen, setIsSentenceBuilderOpen] = useState(false);
  const [isPageManagerOpen, setIsPageManagerOpen] = useState(false);
  const [isDataManagerOpen, setIsDataManagerOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [editModePassword, setEditModePassword] = useState('');
  const [showEditPasswordPrompt, setShowEditPasswordPrompt] = useState(false);
  const [showNewPageOptions, setShowNewPageOptions] = useState(false);

  // Authentication
  const { user, isAuthenticated, isLoading: authLoading, login, register, logout, getAllUsers, deleteUser, updateUser, createUser, changePassword } = useAuth();

  const {
    userProfile,
    isLoading,
    createProfile,
    updateProfile,
    addPage,
    updatePage,
    addButton,
    updateButton,
    deleteButton,
    clearData,
    getDefaultLayout,
    saveDefaultLayout
  } = useOfflineStorage(user?.id);

  const { settings: accessibilitySettings, announceToScreenReader } = useAccessibility();

  const {
    speak,
    settings: speechSettings,
    updateSettings: updateSpeechSettings,
    voices,
    isSupported: speechSupported,
    isSpeaking
  } = useSpeech({
    rate: userProfile?.voiceSettings.rate || 1,
    pitch: userProfile?.voiceSettings.pitch || 1,
    volume: userProfile?.voiceSettings.volume || 1,
    language: userProfile?.language || 'en-US'
  });

  // Initialize profile if none exists for authenticated user
  useEffect(() => {
    if (isAuthenticated && user && !isLoading && !userProfile) {
      const newProfile = createProfile(user.username);
      setShowWelcome(false); // Skip welcome since they have default pages
    } else if (userProfile) {
      setShowWelcome(false);
    }
  }, [isAuthenticated, user, isLoading, userProfile, createProfile]);

  // Update speech settings when profile changes
  useEffect(() => {
    if (userProfile) {
      updateSpeechSettings({
        rate: userProfile.voiceSettings.rate,
        pitch: userProfile.voiceSettings.pitch,
        volume: userProfile.voiceSettings.volume,
        language: userProfile.language
      });
    }
  }, [userProfile, updateSpeechSettings]);

  const handleSpeak = (text: string) => {
    if (!speechSupported || !text.trim()) return;
    speak(text);
  };

  const handleToggleEditMode = () => {
    if (!isEditMode) {
      setShowEditPasswordPrompt(true);
    } else {
      setIsEditMode(false);
      setEditModePassword('');
    }
  };

  const handleEditModePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password protection - you can change this password
    if (editModePassword === 'edit123') {
      setIsEditMode(true);
      setShowEditPasswordPrompt(false);
      setEditModePassword('');
      announceToScreenReader('Edit mode enabled');
    } else {
      alert('Incorrect password. Default password is: edit123');
    }
  };

  const handleEditButton = (button: ButtonType) => {
    setEditingButton(button);
    setIsButtonEditorOpen(true);
  };

  const handleSaveButton = (buttonData: Omit<ButtonType, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingButton) {
      updateButton(editingButton.id, buttonData);
    } else {
      addButton(buttonData.pageId, buttonData);
    }
    setEditingButton(undefined);
    setIsButtonEditorOpen(false);
  };

  const handleDeleteButton = (buttonId: string) => {
    deleteButton(buttonId);
  };

  const handleDuplicatePage = (pageId: string) => {
    const pageToClone = userProfile?.pages.find(p => p.id === pageId);
    if (!pageToClone) return;

    const newPage: Omit<CommunicationPageType, 'id' | 'createdAt' | 'updatedAt'> = {
      ...pageToClone,
      title: `${pageToClone.title} (Copy)`,
      order: (userProfile?.pages.length || 0),
      buttons: pageToClone.buttons.map(button => ({
        ...button,
        id: `button_${Date.now()}_${Math.random()}`,
        pageId: ''
      }))
    };
    addPage(newPage);
    announceToScreenReader(`Page "${newPage.title}" duplicated successfully`);
  };

  const handleReorderPages = (fromIndex: number, toIndex: number) => {
    if (!userProfile) return;
    
    const newPages = [...userProfile.pages];
    const [movedPage] = newPages.splice(fromIndex, 1);
    newPages.splice(toIndex, 0, movedPage);
    
    // Update order property for all pages
    const updatedPages = newPages.map((page, index) => ({
      ...page,
      order: index
    }));
    
    updateProfile({ pages: updatedPages });
  };

  const handleAddPage = () => {
    setShowNewPageOptions(true);
  };

  const handleCreateBlankPage = () => {
    const newPage: Omit<CommunicationPageType, 'id' | 'createdAt' | 'updatedAt'> = {
      title: `Page ${(userProfile?.pages.length || 0) + 1}`,
      description: 'New communication page',
      backgroundColor: '#F8F9FA',
      buttons: [],
      order: (userProfile?.pages.length || 0),
      isTemplate: false
    };
    addPage(newPage);
    setShowNewPageOptions(false);
    setCurrentPageIndex((userProfile?.pages.length || 0));
  };

  const handleCreateFromTemplate = (template: Template) => {
    template.pages.forEach((templatePage, index) => {
      const newPage: Omit<CommunicationPageType, 'id' | 'createdAt' | 'updatedAt'> = {
        ...templatePage,
        order: (userProfile?.pages.length || 0) + index
      };
      addPage(newPage);
    });
    setShowNewPageOptions(false);
  };

  const handleApplyTemplate = (template: Template) => {
    if (!userProfile) return;

    template.pages.forEach((templatePage, index) => {
      const newPage: Omit<CommunicationPageType, 'id' | 'createdAt' | 'updatedAt'> = {
        ...templatePage,
        order: userProfile.pages.length + index
      };
      addPage(newPage);
    });

    setIsTemplateGalleryOpen(false);
  };

  const handleAddButton = () => {
    if (!userProfile?.pages[currentPageIndex]) return;
    setEditingButton(undefined); // This ensures we get a blank form
    setIsButtonEditorOpen(true);
  };

  const handleUpdateProfile = (updates: Partial<any>) => {
    updateProfile(updates);
  };

  const handleUpdateSpeechSettings = (settings: Partial<any>) => {
    if (!userProfile) return;
    
    const newVoiceSettings = {
      ...userProfile.voiceSettings,
      ...settings
    };
    
    updateProfile({ voiceSettings: newVoiceSettings });
    updateSpeechSettings(settings);
  };

  const handleImportData = (data: any) => {
    // Generate new IDs to avoid conflicts
    const newData = {
      ...data,
      id: `profile_${Date.now()}`,
      pages: data.pages.map((page: any) => ({
        ...page,
        id: `page_${Date.now()}_${Math.random()}`,
        buttons: page.buttons.map((button: any) => ({
          ...button,
          id: `button_${Date.now()}_${Math.random()}`,
          pageId: page.id
        }))
      }))
    };
    
    updateProfile(newData);
    announceToScreenReader('Data imported successfully');
  };

  const handleChangePassword = async (currentPassword: string, newPassword: string) => {
    if (!user) return { success: false, error: 'No user logged in' };
    return await changePassword(user.id, currentPassword, newPassword);
  };
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
      setIsEditMode(false);
      setEditModePassword('');
    }
  };

  // Show login form if not authenticated
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={login} onRegister={register} />;
  }

  const currentPage = userProfile?.pages[currentPageIndex];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your communication board...</p>
        </div>
      </div>
    );
  }

  // Welcome Screen
  if (showWelcome || !userProfile || userProfile.pages.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="mb-6">
            <MessageCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome, {user?.username}!
            </h1>
            <p className="text-gray-600">
              Your personalized communication board to express thoughts, needs, and feelings.
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setIsTemplateGalleryOpen(true)}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Library className="w-5 h-5" />
              Start with Template
            </button>
            
            <button
              onClick={handleAddPage}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create Empty Page
            </button>
          </div>

          {!speechSupported && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                ⚠️ Speech synthesis is not supported in this browser. Text-to-speech functionality will be limited.
              </p>
            </div>
          )}
        </div>

        <TemplateGallery
          isOpen={isTemplateGalleryOpen}
          onClose={() => setIsTemplateGalleryOpen(false)}
          onApplyTemplate={handleApplyTemplate}
        />
      </div>
    );
  }

  const dndBackend = isTouchDevice() ? TouchBackend : HTML5Backend;

  return (
    <DndProvider backend={dndBackend}>
      <div className={`min-h-screen bg-gray-50 ${userProfile.displaySettings.reducedMotion ? '' : 'transition-all'}`}>
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <MessageCircle className="w-6 h-6 text-blue-600" />
              <div>
                <h1 className="font-semibold text-gray-900">AAC Communicator</h1>
                <p className="text-sm text-gray-500">{user?.username}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Communication Tools */}
              <div className="flex items-center gap-1 px-3 py-1 bg-purple-50 rounded-lg border border-purple-200">
                <span className="text-xs font-medium text-purple-700 mr-2">Communication</span>
                <button
                  onClick={() => setIsSentenceBuilderOpen(true)}
                  className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
                  title="Sentence builder"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
              </div>

              {/* Content Management (Edit Mode Only) */}
              {isEditMode && (
                <div className="flex items-center gap-1 px-3 py-1 bg-blue-50 rounded-lg border border-blue-200">
                  <span className="text-xs font-medium text-blue-700 mr-2">Content</span>
                  <button
                    onClick={() => setIsTemplateGalleryOpen(true)}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                    title="Browse templates"
                  >
                    <Library className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsPageManagerOpen(true)}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                    title="Manage pages"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsDataManagerOpen(true)}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                    title="Data management"
                  >
                    <Database className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* System Controls */}
              <div className="flex items-center gap-1 px-3 py-1 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-xs font-medium text-gray-700 mr-2">System</span>
                {user?.isAdmin && (
                  <button
                    onClick={() => setIsAdminDashboardOpen(true)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Admin dashboard"
                  >
                    <Shield className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsSettingsOpen(true)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Settings"
                >
                  <Settings className="w-4 h-4" />
                </button>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation */}
        {userProfile.pages.length > 0 && (
          <PageNavigation
            pages={userProfile.pages}
            currentPageIndex={currentPageIndex}
            onPageChange={setCurrentPageIndex}
            onAddPage={handleAddPage}
            onToggleEditMode={handleToggleEditMode}
            isEditMode={isEditMode}
          />
        )}

        {/* Edit Mode Panel */}
        {isEditMode && currentPage && (
          <div className="bg-blue-50 border-b border-blue-200 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-blue-800">Edit Mode Active</span>
                <span className="text-xs text-blue-600">Click buttons to edit, drag to reorder</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddButton}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Button
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="pb-8">
          {currentPage ? (
            <CommunicationPage
              page={currentPage}
              onSpeak={handleSpeak}
              onEditButton={handleEditButton}
              onDeleteButton={handleDeleteButton}
              isEditMode={isEditMode}
              disabled={isSpeaking}
            />
          ) : (
            <div className="flex items-center justify-center min-h-[50vh] text-gray-500">
              <div className="text-center">
                <div className="text-6xl mb-4">📄</div>
                <h3 className="text-xl font-medium mb-2">No pages found</h3>
                <p className="mb-4">Create your first communication page to get started.</p>
                <button
                  onClick={handleAddPage}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Page
                </button>
              </div>
            </div>
          )}
        </main>

        {/* Edit Mode Password Prompt */}
        {showEditPasswordPrompt && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-lg font-semibold mb-4">Enter Edit Mode Password</h3>
              <form onSubmit={handleEditModePasswordSubmit} className="space-y-4">
                <div>
                  <input
                    type="password"
                    value={editModePassword}
                    onChange={(e) => setEditModePassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter password to enable editing"
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditPasswordPrompt(false);
                      setEditModePassword('');
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Enable Edit Mode
                  </button>
                </div>
              </form>
              <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-xs text-gray-600 text-center">
                  Default password: edit123
                </p>
              </div>
            </div>
          </div>
        )}

        {/* New Page Options Modal */}
        {showNewPageOptions && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-lg font-semibold">Create New Page</h3>
                <button
                  onClick={() => setShowNewPageOptions(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <p className="text-gray-600 mb-4">
                  Choose how you'd like to create your new page:
                </p>
                
                <button
                  onClick={handleCreateBlankPage}
                  className="w-full flex items-center gap-3 p-4 border-2 border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Plus className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Blank Page</div>
                    <div className="text-sm text-gray-600">Start with an empty page and add your own buttons</div>
                  </div>
                </button>
                
                <button
                  onClick={() => {
                    setShowNewPageOptions(false);
                    setIsTemplateGalleryOpen(true);
                  }}
                  className="w-full flex items-center gap-3 p-4 border-2 border-blue-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-left"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Library className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">From Template</div>
                    <div className="text-sm text-gray-600">Choose from pre-made communication boards</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modals */}
        <ButtonEditor
          button={editingButton}
          pageId={currentPage?.id || ''}
          isOpen={isButtonEditorOpen}
          onClose={() => {
            setIsButtonEditorOpen(false);
            setEditingButton(undefined);
          }}
          onSave={handleSaveButton}
        />

        <TemplateGallery
          isOpen={isTemplateGalleryOpen}
          onClose={() => setIsTemplateGalleryOpen(false)}
          onApplyTemplate={showNewPageOptions ? handleCreateFromTemplate : handleApplyTemplate}
        />

        <SettingsPanel
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          userProfile={userProfile}
          speechSettings={speechSettings}
          voices={voices}
          onUpdateProfile={handleUpdateProfile}
          onUpdateSpeechSettings={handleUpdateSpeechSettings}
          onChangePassword={handleChangePassword}
        />

        <SentenceBuilder
          isOpen={isSentenceBuilderOpen}
          onClose={() => setIsSentenceBuilderOpen(false)}
          onSpeak={handleSpeak}
        />

        <PageManager
          isOpen={isPageManagerOpen}
          onClose={() => setIsPageManagerOpen(false)}
          pages={userProfile?.pages || []}
          onUpdatePage={updatePage}
          onDeletePage={(pageId) => {
            const page = userProfile?.pages.find(p => p.id === pageId);
            if (page && userProfile?.pages.length === 1) {
              alert('Cannot delete the last page. Create another page first.');
              return;
            }
            updateProfile({
              pages: userProfile?.pages.filter(p => p.id !== pageId) || []
            });
            if (currentPageIndex >= (userProfile?.pages.length || 1) - 1) {
              setCurrentPageIndex(Math.max(0, currentPageIndex - 1));
            }
          }}
          onDuplicatePage={handleDuplicatePage}
          onReorderPages={handleReorderPages}
        />

        <DataManager
          isOpen={isDataManagerOpen}
          onClose={() => setIsDataManagerOpen(false)}
          userProfile={userProfile}
          onImportData={handleImportData}
          onClearData={() => {
            clearData();
            setShowWelcome(true);
          }}
        />

        {user?.isAdmin && (
          <AdminDashboard
            isOpen={isAdminDashboardOpen}
            onClose={() => setIsAdminDashboardOpen(false)}
            users={getAllUsers()}
            currentUser={user}
            onDeleteUser={deleteUser}
            onUpdateUser={updateUser}
            onCreateUser={createUser}
            onChangePassword={changePassword}
            defaultLayout={getDefaultLayout()}
            onSaveDefaultLayout={saveDefaultLayout}
          />
        )}
      </div>
    </DndProvider>
  );
}

export default App;