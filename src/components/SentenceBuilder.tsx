import React, { useState } from 'react';
import { X, Volume2, RotateCcw, Copy } from 'lucide-react';

interface SentenceBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  onSpeak: (text: string) => void;
}

const SentenceBuilder: React.FC<SentenceBuilderProps> = ({
  isOpen,
  onClose,
  onSpeak
}) => {
  const [sentence, setSentence] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);

  const addWord = (word: string) => {
    setSentence(prev => [...prev, word]);
  };

  const removeWord = (index: number) => {
    setSentence(prev => prev.filter((_, i) => i !== index));
  };

  const clearSentence = () => {
    setSentence([]);
  };

  const speakSentence = () => {
    const text = sentence.join(' ');
    if (text.trim()) {
      onSpeak(text);
      setHistory(prev => [text, ...prev.slice(0, 9)]); // Keep last 10
      setSentence([]);
    }
  };

  const quickWords = [
    'I', 'want', 'need', 'like', 'don\'t', 'can', 'help', 'please',
    'thank you', 'yes', 'no', 'more', 'stop', 'go', 'come', 'here'
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Sentence Builder</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Current Sentence */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Sentence
            </label>
            <div className="min-h-[60px] p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
              {sentence.length === 0 ? (
                <p className="text-gray-500 text-center">Tap words below to build your sentence</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {sentence.map((word, index) => (
                    <button
                      key={index}
                      onClick={() => removeWord(index)}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors"
                    >
                      {word} ×
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={speakSentence}
              disabled={sentence.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Volume2 className="w-4 h-4" />
              Speak
            </button>
            <button
              onClick={clearSentence}
              disabled={sentence.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Clear
            </button>
          </div>

          {/* Quick Words */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Quick Words
            </label>
            <div className="grid grid-cols-4 gap-2">
              {quickWords.map((word) => (
                <button
                  key={word}
                  onClick={() => addWord(word)}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  {word}
                </button>
              ))}
            </div>
          </div>

          {/* History */}
          {history.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Recent Sentences
              </label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {history.map((sentence, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                  >
                    <span className="text-sm text-gray-700 flex-1">{sentence}</span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => onSpeak(sentence)}
                        className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                        title="Speak again"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setSentence(sentence.split(' '))}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Edit sentence"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SentenceBuilder;