import { User } from '../types/auth';

// Simple password hashing (in production, use bcrypt or similar)
export const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'salt_key_aac_2024');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  const passwordHash = await hashPassword(password);
  return passwordHash === hash;
};

export const generateUserId = (): string => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Default admin user (username: admin, password: admin123)
export const createDefaultAdmin = async (): Promise<User> => {
  return {
    id: 'admin_default',
    username: 'admin',
    passwordHash: await hashPassword('admin123'),
    isAdmin: true,
    createdAt: new Date(),
    lastLogin: new Date()
  };
};