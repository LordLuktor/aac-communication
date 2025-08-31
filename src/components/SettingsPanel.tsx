import React, { useState } from 'react';
import { X, Volume2, VolumeX, Palette, Monitor, Lock } from 'lucide-react';
import { UserProfile, SpeechSettings } from '../types/aac';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile | null;
  speechSettings: SpeechSettings;
  voices: SpeechSynthesisVoice[];
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  onUpdateSpeechSettings: (settings: Partial<SpeechSettings>) => void;
  onChangePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isOpen,
  onClose,
  userProfile,
  speechSettings,
  voices,
  onUpdateProfile,
  onUpdateSpeechSettings,
  onChangePassword
}) => {
  const [activeTab, setActiveTab] = useState<'speech' | 'display' | 'profile' | 'security'>('speech');
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  if (!isOpen || !userProfile) return null;

  const tabs = [
    { id: 'speech' as const, name: 'Speech', icon: Volume2 },
    { id: 'display' as const, name: 'Display', icon: Monitor },
    { id: 'profile' as const, name: 'Profile', icon: Palette },
    { id: 'security' as const, name: 'Security', icon: Lock }
  ];

  const handleVoiceTest = () => {
    const testText = "This is how I sound.";
    const utterance = new SpeechSynthesisUtterance(testText);
    utterance.rate = speechSettings.rate;
    utterance.pitch = speechSettings.pitch;
    utterance.volume = speechSettings.volume;
    if (speechSettings.voice) {
      utterance.voice = speechSettings.voice;
    }
    speechSynthesis.speak(utterance);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(false);

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    const result = await onChangePassword(passwordForm.currentPassword, passwordForm.newPassword);
    
    if (result.success) {
      setPasswordSuccess(true);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setPasswordSuccess(false), 3000);
    } else {
      setPasswordError(result.error || 'Failed to change password');
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex">
          {/* Tabs Sidebar */}
          <div className="w-48 p-4 border-r bg-gray-50">
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
                        ? 'bg-blue-100 text-blue-700 font-medium' 
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
            {/* Speech Settings */}
            {activeTab === 'speech' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Speech Settings</h3>

                {/* Voice Selection */}
                <div>
                  <label htmlFor="voice-select" className="block text-sm font-medium text-gray-700 mb-2">
                    Voice
                  </label>
                  <select
                    id="voice-select"
                    value={speechSettings.voice?.name || ''}
                    onChange={(e) => {
                      const selectedVoice = voices.find(voice => voice.name === e.target.value);
                      onUpdateSpeechSettings({ voice: selectedVoice });
                    }}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Default Voice</option>
                    {voices.map((voice) => (
                      <option key={voice.name} value={voice.name}>
                        {voice.name} ({voice.lang})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Speech Rate */}
                <div>
                  <label htmlFor="speech-rate" className="block text-sm font-medium text-gray-700 mb-2">
                    Speech Rate: {speechSettings.rate.toFixed(1)}x
                  </label>
                  <input
                    id="speech-rate"
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={speechSettings.rate}
                    onChange={(e) => onUpdateSpeechSettings({ rate: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Slow</span>
                    <span>Normal</span>
                    <span>Fast</span>
                  </div>
                </div>

                {/* Speech Pitch */}
                <div>
                  <label htmlFor="speech-pitch" className="block text-sm font-medium text-gray-700 mb-2">
                    Speech Pitch: {speechSettings.pitch.toFixed(1)}
                  </label>
                  <input
                    id="speech-pitch"
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={speechSettings.pitch}
                    onChange={(e) => onUpdateSpeechSettings({ pitch: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Low</span>
                    <span>Normal</span>
                    <span>High</span>
                  </div>
                </div>

                {/* Volume */}
                <div>
                  <label htmlFor="volume" className="block text-sm font-medium text-gray-700 mb-2">
                    Volume: {Math.round(speechSettings.volume * 100)}%
                  </label>
                  <input
                    id="volume"
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={speechSettings.volume}
                    onChange={(e) => onUpdateSpeechSettings({ volume: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                </div>

                {/* Test Voice */}
                <div>
                  <button
                    onClick={handleVoiceTest}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                    Test Voice
                  </button>
                </div>
              </div>
            )}

            {/* Display Settings */}
            {activeTab === 'display' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Display Settings</h3>

                {/* Button Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Default Button Size
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['small', 'medium', 'large'].map((size) => (
                      <label key={size} className="cursor-pointer">
                        <input
                          type="radio"
                          name="buttonSize"
                          value={size}
                          checked={userProfile.displaySettings.buttonSize === size}
                          onChange={(e) => onUpdateProfile({
                            displaySettings: {
                              ...userProfile.displaySettings,
                              buttonSize: e.target.value as 'small' | 'medium' | 'large'
                            }
                          })}
                          className="sr-only"
                        />
                        <div className={`
                          p-3 text-center border-2 rounded-lg transition-colors capitalize
                          ${userProfile.displaySettings.buttonSize === size 
                            ? 'border-blue-500 bg-blue-50 text-blue-700' 
                            : 'border-gray-300 hover:border-gray-400'}
                        `}>
                          {size}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* High Contrast */}
                <div>
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <div className="font-medium text-gray-700">High Contrast Mode</div>
                      <div className="text-sm text-gray-500">Increases contrast for better visibility</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={userProfile.displaySettings.highContrast}
                      onChange={(e) => onUpdateProfile({
                        displaySettings: {
                          ...userProfile.displaySettings,
                          highContrast: e.target.checked
                        }
                      })}
                      className="sr-only"
                    />
                    <div className={`
                      relative w-12 h-6 rounded-full transition-colors
                      ${userProfile.displaySettings.highContrast ? 'bg-blue-600' : 'bg-gray-300'}
                    `}>
                      <div className={`
                        absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform
                        ${userProfile.displaySettings.highContrast ? 'translate-x-6' : 'translate-x-0'}
                      `} />
                    </div>
                  </label>
                </div>

                {/* Reduced Motion */}
                <div>
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <div className="font-medium text-gray-700">Reduced Motion</div>
                      <div className="text-sm text-gray-500">Minimizes animations and transitions</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={userProfile.displaySettings.reducedMotion}
                      onChange={(e) => onUpdateProfile({
                        displaySettings: {
                          ...userProfile.displaySettings,
                          reducedMotion: e.target.checked
                        }
                      })}
                      className="sr-only"
                    />
                    <div className={`
                      relative w-12 h-6 rounded-full transition-colors
                      ${userProfile.displaySettings.reducedMotion ? 'bg-blue-600' : 'bg-gray-300'}
                    `}>
                      <div className={`
                        absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform
                        ${userProfile.displaySettings.reducedMotion ? 'translate-x-6' : 'translate-x-0'}
                      `} />
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Profile Settings</h3>

                {/* Name */}
                <div>
                  <label htmlFor="profile-name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    id="profile-name"
                    type="text"
                    value={userProfile.name}
                    onChange={(e) => onUpdateProfile({ name: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Language */}
                <div>
                  <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    id="language"
                    value={userProfile.language}
                    onChange={(e) => onUpdateProfile({ language: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="en-US">English (US)</option>
                    <option value="en-GB">English (UK)</option>
                    <option value="es-ES">Spanish</option>
                    <option value="fr-FR">French</option>
                    <option value="de-DE">German</option>
                    <option value="it-IT">Italian</option>
                    <option value="pt-BR">Portuguese</option>
                  </select>
                </div>

                {/* Profile Stats */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Profile Statistics</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">Pages Created</div>
                      <div className="text-xl font-semibold">{userProfile.pages.length}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Total Buttons</div>
                      <div className="text-xl font-semibold">
                        {userProfile.pages.reduce((total, page) => total + page.buttons.length, 0)}
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-gray-600">Profile Created</div>
                      <div className="font-medium">
                        {userProfile.createdAt.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Security Settings</h3>

                {/* Change Password */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Change Password</h4>
                  
                  {passwordSuccess && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800">Password changed successfully!</p>
                    </div>
                  )}

                  {passwordError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-800">{passwordError}</p>
                    </div>
                  )}

                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div>
                      <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <input
                        id="current-password"
                        type="password"
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <input
                        id="new-password"
                        type="password"
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                        minLength={6}
                      />
                    </div>

                    <div>
                      <label htmlFor="confirm-new-password" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        id="confirm-new-password"
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Change Password
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;