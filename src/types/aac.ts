export interface CommunicationButton {
  id: string;
  text: string;
  image?: string;
  backgroundColor: string;
  textColor: string;
  size: 'small' | 'medium' | 'large';
  category: string;
  position: { x: number; y: number };
  pageId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommunicationPage {
  id: string;
  title: string;
  description?: string;
  backgroundColor: string;
  buttons: CommunicationButton[];
  order: number;
  isTemplate: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  id: string;
  name: string;
  language: string;
  voiceSettings: {
    rate: number;
    pitch: number;
    volume: number;
    voice?: string;
  };
  displaySettings: {
    buttonSize: 'small' | 'medium' | 'large';
    highContrast: boolean;
    reducedMotion: boolean;
  };
  pages: CommunicationPage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'basic' | 'emotions' | 'needs' | 'social' | 'activities';
  pages: Omit<CommunicationPage, 'id' | 'createdAt' | 'updatedAt'>[];
  preview: string;
}

export interface SpeechSettings {
  rate: number;
  pitch: number;
  volume: number;
  voice?: SpeechSynthesisVoice;
  language: string;
}

export interface DragItem {
  type: 'button' | 'page';
  id: string;
  pageId?: string;
}

export interface GridPosition {
  row: number;
  col: number;
}