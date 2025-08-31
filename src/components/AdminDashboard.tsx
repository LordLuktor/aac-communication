import React, { useState } from 'react';
import { X, Users, Trash2, Shield, Eye, EyeOff, UserPlus, Database, Edit3, Save, Lock, Layout } from 'lucide-react';
import { User } from '../types/auth';
import { CommunicationPage } from '../types/aac';
import { hashPassword } from '../utils/auth';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
  currentUser: User;
  onDeleteUser: (userId: string) => void;
  onUpdateUser: (userId: string, updates: Partial<User>) => void;
  onCreateUser: (userData: { username: string; password: string; isAdmin: boolean }) => Promise<{ success: boolean; error?: string }>;
  onChangePassword: (userId: string, currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  defaultLayout: CommunicationPage[];
  onSaveDefaultLayout: (pages: CommunicationPage[]) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  users,
  currentUser,
  onDeleteUser,
  onUpdateUser,
  onCreateUser,
  onChangePassword,
  defaultLayout,
  onSaveDefaultLayout
}) => {
  const [passwordProtection, setPasswordProtection] = useState(true);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'users' | 'layout' | 'passwords'>('users');
  const [passwordChangeForm, setPasswordChangeForm] = useState({
    userId: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordChangeError, setPasswordChangeError] = useState<string | null>(null);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState<string | null>(null);
  const [newUserForm, setNewUserForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    isAdmin: false
  });
  const [editUserForm, setEditUserForm] = useState({
    username: '',
    password: '',
    isAdmin: false
  });

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check - in production, this should be more secure
    if (adminPassword === 'admin123') {
      setIsAuthenticated(true);
      setPasswordProtection(false);
    } else {
      alert('Incorrect admin password');
    }
  };

  const handleToggleAdmin = (userId: string, isAdmin: boolean) => {
    if (userId === currentUser.id) {
      alert('Cannot modify your own admin status');
      return;
    }
    onUpdateUser(userId, { isAdmin });
  };

  const handleDeleteUser = (userId: string, username: string) => {
    if (userId === currentUser.id) {
      alert('Cannot delete your own account');
      return;
    }
    
    if (window.confirm(`Are you sure you want to delete user "${username}"? This action cannot be undone.`)) {
      onDeleteUser(userId);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newUserForm.password !== newUserForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (newUserForm.password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    const result = await onCreateUser({
      username: newUserForm.username,
      password: newUserForm.password,
      isAdmin: newUserForm.isAdmin
    });

    if (result.success) {
      setNewUserForm({ username: '', password: '', confirmPassword: '', isAdmin: false });
      setShowAddUser(false);
    } else {
      alert(result.error || 'Failed to create user');
    }
  };

  const startEditUser = (user: User) => {
    setEditingUser(user.id);
    setEditUserForm({
      username: user.username,
      password: '',
      isAdmin: user.isAdmin
    });
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    const updates: Partial<User> = {
      username: editUserForm.username,
      isAdmin: editUserForm.isAdmin
    };

    if (editUserForm.password) {
      updates.passwordHash = await hashPassword(editUserForm.password);
    }

    onUpdateUser(editingUser, updates);
    setEditingUser(null);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordChangeError(null);
    setPasswordChangeSuccess(null);

    if (passwordChangeForm.newPassword !== passwordChangeForm.confirmPassword) {
      setPasswordChangeError('Passwords do not match');
      return;
    }

    if (passwordChangeForm.newPassword.length < 6) {
      setPasswordChangeError('Password must be at least 6 characters');
      return;
    }

    const result = await onChangePassword(passwordChangeForm.userId, '', passwordChangeForm.newPassword);
    
    if (result.success) {
      const user = users.find(u => u.id === passwordChangeForm.userId);
      setPasswordChangeSuccess(`Password changed successfully for ${user?.username}`);
      setPasswordChangeForm({ userId: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setPasswordChangeSuccess(null), 3000);
    } else {
      setPasswordChangeError(result.error || 'Failed to change password');
    }
  };

  const tabs = [
    { id: 'users' as const, name: 'User Management', icon: Users },
    { id: 'passwords' as const, name: 'Password Management', icon: Lock },
    { id: 'layout' as const, name: 'Default Layout', icon: Layout }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b bg-red-50">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-red-600" />
            <h2 className="text-xl font-semibold text-red-800">Admin Dashboard</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-100 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-red-600" />
          </button>
        </div>

        {passwordProtection && !isAuthenticated ? (
          <div className="p-8">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-6">
                <Shield className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Admin Access Required
                </h3>
                <p className="text-gray-600">
                  Enter the admin password to access the dashboard
                </p>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700 mb-1">
                    Admin Password
                  </label>
                  <input
                    id="admin-password"
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter admin password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Access Dashboard
                </button>
              </form>

              <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-xs text-gray-600 text-center">
                  Default admin password: admin123
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex">
            {/* Tabs Sidebar */}
            <div className="w-56 p-4 border-r bg-gray-50">
              <div className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-left
                        ${activeTab === tab.id 
                          ? 'bg-red-100 text-red-700 font-medium' 
                          : 'text-gray-600 hover:bg-gray-100'}
                      `}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 overflow-y-auto max-h-[70vh]">
              {/* User Management Tab */}
              {activeTab === 'users' && (
                <>
            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 text-sm font-medium">Total Users</p>
                    <p className="text-2xl font-bold text-blue-900">{users.length}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 text-sm font-medium">Admin Users</p>
                    <p className="text-2xl font-bold text-green-900">
                      {users.filter(u => u.isAdmin).length}
                    </p>
                  </div>
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-600 text-sm font-medium">Active Sessions</p>
                    <p className="text-2xl font-bold text-purple-900">
                      {users.filter(u => {
                        const dayAgo = new Date();
                        dayAgo.setDate(dayAgo.getDate() - 1);
                        return u.lastLogin > dayAgo;
                      }).length}
                    </p>
                  </div>
                  <Database className="w-8 h-8 text-purple-600" />
                </div>
              </div>
            </div>

            {/* User Management */}
            <div className="bg-white border rounded-lg">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-semibold">User Management</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowAddUser(true)}
                    className="flex items-center gap-2 px-3 py-1 text-sm bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors"
                  >
                    <UserPlus className="w-4 h-4" />
                    Add User
                  </button>
                  <button
                    onClick={() => setShowPasswords(!showPasswords)}
                    className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    {showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {showPasswords ? 'Hide' : 'Show'} Passwords
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Username</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Role</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Created</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Last Login</th>
                      {showPasswords && (
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Password Hash</th>
                      )}
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((user) => (
                      <React.Fragment key={user.id}>
                        {editingUser === user.id ? (
                          <tr className="bg-blue-50">
                            <td className="px-4 py-3">
                              <input
                                type="text"
                                value={editUserForm.username}
                                onChange={(e) => setEditUserForm(prev => ({ ...prev, username: e.target.value }))}
                                className="w-full p-1 border border-gray-300 rounded text-sm"
                                placeholder="Username"
                              />
                            </td>
                            <td className="px-4 py-3">
                              <label className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={editUserForm.isAdmin}
                                  onChange={(e) => setEditUserForm(prev => ({ ...prev, isAdmin: e.target.checked }))}
                                  className="rounded"
                                />
                                <span className="text-sm">Admin</span>
                              </label>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              {user.createdAt.toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3">
                              <input
                                type="password"
                                value={editUserForm.password}
                                onChange={(e) => setEditUserForm(prev => ({ ...prev, password: e.target.value }))}
                                className="w-full p-1 border border-gray-300 rounded text-sm"
                                placeholder="New password (optional)"
                              />
                            </td>
                            {showPasswords && (
                              <td className="px-4 py-3 text-xs text-gray-500">
                                Editing...
                              </td>
                            )}
                            <td className="px-4 py-3">
                              <div className="flex gap-1">
                                <button
                                  onClick={handleUpdateUser}
                                  className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                                  title="Save changes"
                                >
                                  <Save className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => setEditingUser(null)}
                                  className="p-1 text-gray-600 hover:bg-gray-50 rounded transition-colors"
                                  title="Cancel"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          <tr className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{user.username}</span>
                                {user.id === currentUser.id && (
                                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                    You
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <span className={`
                                  px-2 py-1 text-xs rounded-full font-medium
                                  ${user.isAdmin 
                                    ? 'bg-red-100 text-red-800' 
                                    : 'bg-gray-100 text-gray-800'}
                                `}>
                                  {user.isAdmin ? 'Admin' : 'User'}
                                </span>
                                {user.id !== currentUser.id && (
                                  <button
                                    onClick={() => handleToggleAdmin(user.id, !user.isAdmin)}
                                    className="text-xs text-blue-600 hover:text-blue-800 underline"
                                  >
                                    {user.isAdmin ? 'Remove Admin' : 'Make Admin'}
                                  </button>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              {user.createdAt.toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              {user.lastLogin.toLocaleDateString()} at {user.lastLogin.toLocaleTimeString()}
                            </td>
                            {showPasswords && (
                              <td className="px-4 py-3 text-xs text-gray-500 font-mono max-w-xs truncate">
                                {user.passwordHash}
                              </td>
                            )}
                            <td className="px-4 py-3">
                              <div className="flex gap-1">
                                <button
                                  onClick={() => startEditUser(user)}
                                  className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                  title="Edit user"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                {user.id !== currentUser.id && (
                                  <button
                                    onClick={() => handleDeleteUser(user.id, user.username)}
                                    className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                    title="Delete user"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
                </>
              )}

              {/* Password Management Tab */}
              {activeTab === 'passwords' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Password Management</h3>
                  <p className="text-gray-600">Change passwords for any user account.</p>

                  {passwordChangeSuccess && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800">{passwordChangeSuccess}</p>
                    </div>
                  )}

                  {passwordChangeError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-800">{passwordChangeError}</p>
                    </div>
                  )}

                  <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                    <div>
                      <label htmlFor="user-select" className="block text-sm font-medium text-gray-700 mb-1">
                        Select User
                      </label>
                      <select
                        id="user-select"
                        value={passwordChangeForm.userId}
                        onChange={(e) => setPasswordChangeForm(prev => ({ ...prev, userId: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">Choose a user...</option>
                        {users.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.username} {user.isAdmin ? '(Admin)' : ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="admin-new-password" className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <input
                        id="admin-new-password"
                        type="password"
                        value={passwordChangeForm.newPassword}
                        onChange={(e) => setPasswordChangeForm(prev => ({ ...prev, newPassword: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                        minLength={6}
                      />
                    </div>

                    <div>
                      <label htmlFor="admin-confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        id="admin-confirm-password"
                        type="password"
                        value={passwordChangeForm.confirmPassword}
                        onChange={(e) => setPasswordChangeForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Change Password
                    </button>
                  </form>
                </div>
              )}

              {/* Default Layout Tab */}
              {activeTab === 'layout' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold">Default Layout Management</h3>
                    <p className="text-gray-600 mt-1">
                      Configure the default pages that new users will receive when they register.
                    </p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-2">Current Default Layout</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {defaultLayout.map((page, index) => (
                        <div key={page.id} className="bg-white p-3 rounded border">
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-medium text-gray-900">{page.title}</h5>
                              <p className="text-sm text-gray-600">{page.buttons.length} buttons</p>
                            </div>
                            <div 
                              className="w-4 h-4 rounded border"
                              style={{ backgroundColor: page.backgroundColor }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h4 className="font-medium text-yellow-900 mb-2">⚠️ Important Notes</h4>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      <li>• Changes to the default layout only affect new users</li>
                      <li>• Existing users will keep their current pages</li>
                      <li>• The default layout is currently based on all available templates</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">Layout Statistics</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Total Pages</div>
                        <div className="text-xl font-semibold">{defaultLayout.length}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Total Buttons</div>
                        <div className="text-xl font-semibold">
                          {defaultLayout.reduce((total, page) => total + page.buttons.length, 0)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            {/* Add User Modal */}
            {showAddUser && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                  <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="text-lg font-semibold">Add New User</h3>
                    <button
                      onClick={() => setShowAddUser(false)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <form onSubmit={handleCreateUser} className="p-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Username
                      </label>
                      <input
                        type="text"
                        value={newUserForm.username}
                        onChange={(e) => setNewUserForm(prev => ({ ...prev, username: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                        minLength={3}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        value={newUserForm.password}
                        onChange={(e) => setNewUserForm(prev => ({ ...prev, password: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                        minLength={6}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        value={newUserForm.confirmPassword}
                        onChange={(e) => setNewUserForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={newUserForm.isAdmin}
                          onChange={(e) => setNewUserForm(prev => ({ ...prev, isAdmin: e.target.checked }))}
                          className="rounded"
                        />
                        <span className="text-sm font-medium text-gray-700">Admin User</span>
                      </label>
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddUser(false)}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Create User
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

              {/* System Information */}
              <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-4">System Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Storage Type:</span>
                    <span className="ml-2 font-medium">Local Storage</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Data Encryption:</span>
                    <span className="ml-2 font-medium">SHA-256 Hashing</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Session Management:</span>
                    <span className="ml-2 font-medium">Browser Session</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Backup Support:</span>
                    <span className="ml-2 font-medium">JSON Export/Import</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;