import { useState, useEffect, useCallback } from 'react';
import { SpeechSettings } from '../types/aac';

export const useSpeech = (initialSettings: SpeechSettings) => {
  const [settings, setSettings] = useState<SpeechSettings>(initialSettings);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSupported, setIsSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      setIsSupported(true);
      
      const updateVoices = () => {
        const availableVoices = speechSynthesis.getVoices();
        setVoices(availableVoices);
        
        // Set default voice if none selected
        if (!settings.voice && availableVoices.length > 0) {
          const defaultVoice = availableVoices.find(voice => 
            voice.lang.startsWith(settings.language)
          ) || availableVoices[0];
          setSettings(prev => ({ ...prev, voice: defaultVoice }));
        }
      };

      updateVoices();
      speechSynthesis.onvoiceschanged = updateVoices;

      return () => {
        speechSynthesis.onvoiceschanged = null;
      };
    }
  }, [settings.language, settings.voice]);

  const speak = useCallback((text: string) => {
    if (!isSupported || !text.trim()) return;

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = settings.rate;
    utterance.pitch = settings.pitch;
    utterance.volume = settings.volume;
    
    if (settings.voice) {
      utterance.voice = settings.voice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthesis.speak(utterance);
  }, [settings, isSupported]);

  const stop = useCallback(() => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  const updateSettings = useCallback((newSettings: Partial<SpeechSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  return {
    speak,
    stop,
    settings,
    updateSettings,
    voices,
    isSupported,
    isSpeaking
  };
};