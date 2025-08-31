import { useState, useEffect, useCallback } from 'react';
import { UserProfile, CommunicationPage, CommunicationButton } from '../types/aac';
import { defaultTemplates } from '../data/templates';

const STORAGE_KEY_PREFIX = 'aac_user_profile_';
const SYNC_QUEUE_KEY = 'aac_sync_queue';
const DEFAULT_LAYOUT_KEY = 'aac_default_layout';

export const useOfflineStorage = (userId?: string) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [syncQueue, setSyncQueue] = useState<string[]>([]);

  const getStorageKey = useCallback(() => {
    return userId ? `${STORAGE_KEY_PREFIX}${userId}` : STORAGE_KEY_PREFIX + 'default';
  }, [userId]);

  // Get default layout (admin-configurable)
  const getDefaultLayout = useCallback((): CommunicationPage[] => {
    try {
      const savedLayout = localStorage.getItem(DEFAULT_LAYOUT_KEY);
      if (savedLayout) {
        const layout = JSON.parse(savedLayout);
        return layout.map((page: any) => ({
          ...page,
          createdAt: new Date(page.createdAt),
          updatedAt: new Date(page.updatedAt),
          buttons: page.buttons.map((button: any) => ({
            ...button,
            createdAt: new Date(button.createdAt),
            updatedAt: new Date(button.updatedAt)
          }))
        }));
      }
    } catch (error) {
      console.error('Error loading default layout:', error);
    }
    
    // Return all templates as default pages
    return defaultTemplates.flatMap(template => 
      template.pages.map((page, index) => ({
        ...page,
        id: `default_${template.id}_${index}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        buttons: page.buttons.map((button, buttonIndex) => ({
          ...button,
          id: `default_${template.id}_${index}_${buttonIndex}`,
          pageId: `default_${template.id}_${index}`,
          createdAt: new Date(),
          updatedAt: new Date()
        }))
      }))
    );
  }, []);

  // Save default layout (admin only)
  const saveDefaultLayout = useCallback((pages: CommunicationPage[]) => {
    try {
      localStorage.setItem(DEFAULT_LAYOUT_KEY, JSON.stringify(pages));
    } catch (error) {
      console.error('Error saving default layout:', error);
    }
  }, []);
  // Load data from localStorage on initialization
  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        const savedProfile = localStorage.getItem(getStorageKey());
        const savedSyncQueue = localStorage.getItem(SYNC_QUEUE_KEY);
        
        if (savedProfile) {
          const profile = JSON.parse(savedProfile);
          // Convert date strings back to Date objects
          profile.createdAt = new Date(profile.createdAt);
          profile.updatedAt = new Date(profile.updatedAt);
          profile.pages = profile.pages.map((page: any) => ({
            ...page,
            createdAt: new Date(page.createdAt),
            updatedAt: new Date(page.updatedAt),
            buttons: page.buttons.map((button: any) => ({
              ...button,
              createdAt: new Date(button.createdAt),
              updatedAt: new Date(button.updatedAt)
            }))
          }));
          setUserProfile(profile);
        }

        if (savedSyncQueue) {
          setSyncQueue(JSON.parse(savedSyncQueue));
        }
      } catch (error) {
        console.error('Error loading offline data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [userId, getStorageKey]);

  // Save profile to localStorage whenever it changes
  const saveProfile = useCallback((profile: UserProfile) => {
    try {
      localStorage.setItem(getStorageKey(), JSON.stringify(profile));
      setUserProfile(profile);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  }, [getStorageKey]);

  // Create new profile
  const createProfile = useCallback((name: string): UserProfile => {
    const defaultPages = getDefaultLayout();
    
    const newProfile: UserProfile = {
      id: `profile_${Date.now()}`,
      name,
      language: 'en-US',
      voiceSettings: {
        rate: 1,
        pitch: 1,
        volume: 1
      },
      displaySettings: {
        buttonSize: 'medium',
        highContrast: false,
        reducedMotion: false
      },
      pages: defaultPages,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    saveProfile(newProfile);
    return newProfile;
  }, [saveProfile, getDefaultLayout]);

  // Update profile
  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    if (!userProfile) return null;

    const updatedProfile = {
      ...userProfile,
      ...updates,
      updatedAt: new Date()
    };

    saveProfile(updatedProfile);
    return updatedProfile;
  }, [userProfile, saveProfile]);

  // Page management
  const addPage = useCallback((page: Omit<CommunicationPage, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!userProfile) return;

    const newPage: CommunicationPage = {
      ...page,
      id: `page_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const updatedProfile = {
      ...userProfile,
      pages: [...userProfile.pages, newPage],
      updatedAt: new Date()
    };

    saveProfile(updatedProfile);
  }, [userProfile, saveProfile]);

  const updatePage = useCallback((pageId: string, updates: Partial<CommunicationPage>) => {
    if (!userProfile) return;

    const updatedPages = userProfile.pages.map(page =>
      page.id === pageId
        ? { ...page, ...updates, updatedAt: new Date() }
        : page
    );

    const updatedProfile = {
      ...userProfile,
      pages: updatedPages,
      updatedAt: new Date()
    };

    saveProfile(updatedProfile);
  }, [userProfile, saveProfile]);

  const deletePage = useCallback((pageId: string) => {
    if (!userProfile) return;

    const updatedPages = userProfile.pages.filter(page => page.id !== pageId);

    const updatedProfile = {
      ...userProfile,
      pages: updatedPages,
      updatedAt: new Date()
    };

    saveProfile(updatedProfile);
  }, [userProfile, saveProfile]);

  // Button management
  const addButton = useCallback((pageId: string, button: Omit<CommunicationButton, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!userProfile) return;

    const newButton: CommunicationButton = {
      ...button,
      id: `button_${Date.now()}`,
      pageId,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const updatedPages = userProfile.pages.map(page =>
      page.id === pageId
        ? { ...page, buttons: [...page.buttons, newButton], updatedAt: new Date() }
        : page
    );

    const updatedProfile = {
      ...userProfile,
      pages: updatedPages,
      updatedAt: new Date()
    };

    saveProfile(updatedProfile);
  }, [userProfile, saveProfile]);

  const updateButton = useCallback((buttonId: string, updates: Partial<CommunicationButton>) => {
    if (!userProfile) return;

    const updatedPages = userProfile.pages.map(page => ({
      ...page,
      buttons: page.buttons.map(button =>
        button.id === buttonId
          ? { ...button, ...updates, updatedAt: new Date() }
          : button
      ),
      updatedAt: page.buttons.some(b => b.id === buttonId) ? new Date() : page.updatedAt
    }));

    const updatedProfile = {
      ...userProfile,
      pages: updatedPages,
      updatedAt: new Date()
    };

    saveProfile(updatedProfile);
  }, [userProfile, saveProfile]);

  const deleteButton = useCallback((buttonId: string) => {
    if (!userProfile) return;

    const updatedPages = userProfile.pages.map(page => ({
      ...page,
      buttons: page.buttons.filter(button => button.id !== buttonId),
      updatedAt: page.buttons.some(b => b.id === buttonId) ? new Date() : page.updatedAt
    }));

    const updatedProfile = {
      ...userProfile,
      pages: updatedPages,
      updatedAt: new Date()
    };

    saveProfile(updatedProfile);
  }, [userProfile, saveProfile]);

  // Clear all data
  const clearData = useCallback(() => {
    localStorage.removeItem(getStorageKey());
    localStorage.removeItem(SYNC_QUEUE_KEY);
    setUserProfile(null);
    setSyncQueue([]);
  }, [getStorageKey]);

  return {
    userProfile,
    isLoading,
    syncQueue,
    createProfile,
    updateProfile,
    addPage,
    updatePage,
    deletePage,
    addButton,
    updateButton,
    deleteButton,
    clearData,
    getDefaultLayout,
    saveDefaultLayout
  };
};