import { useState, useEffect, useCallback } from 'react';
import { User, AuthState, LoginCredentials, RegisterData } from '../types/auth';
import { hashPassword, verifyPassword, generateUserId, createDefaultAdmin } from '../utils/auth';

const USERS_STORAGE_KEY = 'aac_users';
const CURRENT_USER_KEY = 'aac_current_user';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  // Load current user from localStorage
  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const currentUserId = localStorage.getItem(CURRENT_USER_KEY);
        if (currentUserId) {
          const users = getStoredUsers();
          const user = users.find(u => u.id === currentUserId);
          if (user) {
            setAuthState({
              user,
              isAuthenticated: true,
              isLoading: false
            });
            return;
          }
        }
      } catch (error) {
        console.error('Error loading current user:', error);
      }
      
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
    };

    loadCurrentUser();
  }, []);

  // Initialize default admin if no users exist
  useEffect(() => {
    const initializeDefaultAdmin = async () => {
      const users = getStoredUsers();
      if (users.length === 0) {
        const defaultAdmin = await createDefaultAdmin();
        saveUser(defaultAdmin);
      }
    };

    if (!authState.isLoading) {
      initializeDefaultAdmin();
    }
  }, [authState.isLoading]);

  const getStoredUsers = (): User[] => {
    try {
      const usersData = localStorage.getItem(USERS_STORAGE_KEY);
      if (usersData) {
        const users = JSON.parse(usersData);
        return users.map((user: any) => ({
          ...user,
          createdAt: new Date(user.createdAt),
          lastLogin: new Date(user.lastLogin)
        }));
      }
    } catch (error) {
      console.error('Error loading users:', error);
    }
    return [];
  };

  const saveUser = (user: User) => {
    const users = getStoredUsers();
    const existingIndex = users.findIndex(u => u.id === user.id);
    
    if (existingIndex >= 0) {
      users[existingIndex] = user;
    } else {
      users.push(user);
    }
    
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  };

  const login = useCallback(async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
    try {
      const users = getStoredUsers();
      const user = users.find(u => u.username === credentials.username);
      
      if (!user) {
        return { success: false, error: 'Invalid username or password' };
      }

      const isValidPassword = await verifyPassword(credentials.password, user.passwordHash);
      if (!isValidPassword) {
        return { success: false, error: 'Invalid username or password' };
      }

      // Update last login
      const updatedUser = { ...user, lastLogin: new Date() };
      saveUser(updatedUser);

      localStorage.setItem(CURRENT_USER_KEY, user.id);
      setAuthState({
        user: updatedUser,
        isAuthenticated: true,
        isLoading: false
      });

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An error occurred during login' };
    }
  }, []);

  const register = useCallback(async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    try {
      if (data.password !== data.confirmPassword) {
        return { success: false, error: 'Passwords do not match' };
      }

      if (data.password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters' };
      }

      const users = getStoredUsers();
      const existingUser = users.find(u => u.username === data.username);
      
      if (existingUser) {
        return { success: false, error: 'Username already exists' };
      }

      const newUser: User = {
        id: generateUserId(),
        username: data.username,
        passwordHash: await hashPassword(data.password),
        isAdmin: false,
        createdAt: new Date(),
        lastLogin: new Date()
      };

      saveUser(newUser);
      localStorage.setItem(CURRENT_USER_KEY, newUser.id);
      
      setAuthState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false
      });

      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'An error occurred during registration' };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  }, []);

  const getAllUsers = useCallback((): User[] => {
    return getStoredUsers();
  }, []);

  const deleteUser = useCallback((userId: string) => {
    const users = getStoredUsers().filter(u => u.id !== userId);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    
    // If deleting current user, logout
    if (authState.user?.id === userId) {
      logout();
    }
  }, [authState.user?.id, logout]);

  const updateUser = useCallback((userId: string, updates: Partial<User>) => {
    const users = getStoredUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex >= 0) {
      users[userIndex] = { ...users[userIndex], ...updates };
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
      
      // Update current user state if it's the same user
      if (authState.user?.id === userId) {
        setAuthState(prev => ({
          ...prev,
          user: users[userIndex]
        }));
      }
    }
  }, [authState.user?.id]);

  const createUser = useCallback(async (userData: { username: string; password: string; isAdmin: boolean }): Promise<{ success: boolean; error?: string }> => {
    try {
      const users = getStoredUsers();
      const existingUser = users.find(u => u.username === userData.username);
      
      if (existingUser) {
        return { success: false, error: 'Username already exists' };
      }

      const newUser: User = {
        id: generateUserId(),
        username: userData.username,
        passwordHash: await hashPassword(userData.password),
        isAdmin: userData.isAdmin,
        createdAt: new Date(),
        lastLogin: new Date()
      };

      saveUser(newUser);
      return { success: true };
    } catch (error) {
      console.error('Create user error:', error);
      return { success: false, error: 'An error occurred while creating the user' };
    }
  }, []);

  const changePassword = useCallback(async (userId: string, currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const users = getStoredUsers();
      const user = users.find(u => u.id === userId);
      
      if (!user) {
        return { success: false, error: 'User not found' };
      }

      // Verify current password (unless admin is changing another user's password)
      if (userId === authState.user?.id) {
        const isValidPassword = await verifyPassword(currentPassword, user.passwordHash);
        if (!isValidPassword) {
          return { success: false, error: 'Current password is incorrect' };
        }
      }

      if (newPassword.length < 6) {
        return { success: false, error: 'New password must be at least 6 characters' };
      }

      const newPasswordHash = await hashPassword(newPassword);
      updateUser(userId, { passwordHash: newPasswordHash });

      return { success: true };
    } catch (error) {
      console.error('Change password error:', error);
      return { success: false, error: 'An error occurred while changing password' };
    }
  }, [authState.user?.id, updateUser]);
  return {
    ...authState,
    login,
    register,
    logout,
    getAllUsers,
    deleteUser,
    updateUser,
    createUser,
    changePassword
  };
};