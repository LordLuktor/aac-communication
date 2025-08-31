import { Template } from '../types/aac';

export const defaultTemplates: Template[] = [
  {
    id: 'core-words',
    name: 'Core Words',
    description: 'Essential communication words for everyday use',
    category: 'basic',
    preview: '💬',
    pages: [
      {
        title: 'Core Words',
        description: 'Essential words for basic communication',
        backgroundColor: '#FEF3C7',
        buttons: [
          // Row 1
          { id: 'core_1', text: 'I', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEF3C7', textColor: '#92400E', size: 'medium', category: 'core', position: { x: 0, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'core_2', text: 'you', image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEF3C7', textColor: '#92400E', size: 'medium', category: 'core', position: { x: 1, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'core_3', text: 'it', image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEF3C7', textColor: '#92400E', size: 'medium', category: 'core', position: { x: 2, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'core_4', text: 'he', image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEF3C7', textColor: '#92400E', size: 'medium', category: 'core', position: { x: 3, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'core_5', text: 'she', image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEF3C7', textColor: '#92400E', size: 'medium', category: 'core', position: { x: 4, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'core_6', text: 'we', image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEF3C7', textColor: '#92400E', size: 'medium', category: 'core', position: { x: 5, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'core_7', text: 'my', image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEF3C7', textColor: '#92400E', size: 'medium', category: 'core', position: { x: 6, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          
          // Row 2 - Actions
          { id: 'core_8', text: 'want', image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DCFCE7', textColor: '#166534', size: 'medium', category: 'core', position: { x: 0, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'core_9', text: 'need', image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DCFCE7', textColor: '#166534', size: 'medium', category: 'core', position: { x: 1, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'core_10', text: 'know', image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DCFCE7', textColor: '#166534', size: 'medium', category: 'core', position: { x: 2, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'core_11', text: 'come', image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DCFCE7', textColor: '#166534', size: 'medium', category: 'core', position: { x: 3, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'core_12', text: 'let', image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DCFCE7', textColor: '#166534', size: 'medium', category: 'core', position: { x: 4, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'core_13', text: 'feel', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DCFCE7', textColor: '#166534', size: 'medium', category: 'core', position: { x: 5, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'core_14', text: 'read', image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DCFCE7', textColor: '#166534', size: 'medium', category: 'core', position: { x: 6, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          
          // Row 3 - Descriptors
          { id: 'core_15', text: 'like', image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DBEAFE', textColor: '#1E40AF', size: 'medium', category: 'core', position: { x: 0, y: 2 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'core_16', text: 'go', image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DBEAFE', textColor: '#1E40AF', size: 'medium', category: 'core', position: { x: 1, y: 2 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'core_17', text: 'stop', image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEE2E2', textColor: '#991B1B', size: 'medium', category: 'core', position: { x: 2, y: 2 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'core_18', text: 'put', image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DBEAFE', textColor: '#1E40AF', size: 'medium', category: 'core', position: { x: 3, y: 2 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'core_19', text: 'get', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DBEAFE', textColor: '#1E40AF', size: 'medium', category: 'core', position: { x: 4, y: 2 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'core_20', text: 'make', image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DBEAFE', textColor: '#1E40AF', size: 'medium', category: 'core', position: { x: 5, y: 2 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          
          // Row 4 - Questions
          { id: 'core_21', text: 'what', image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#E0E7FF', textColor: '#3730A3', size: 'medium', category: 'core', position: { x: 0, y: 3 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'core_22', text: 'who', image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#E0E7FF', textColor: '#3730A3', size: 'medium', category: 'core', position: { x: 1, y: 3 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'core_23', text: 'where', image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#E0E7FF', textColor: '#3730A3', size: 'medium', category: 'core', position: { x: 2, y: 3 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'core_24', text: 'when', image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#E0E7FF', textColor: '#3730A3', size: 'medium', category: 'core', position: { x: 3, y: 3 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'core_25', text: 'why', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#E0E7FF', textColor: '#3730A3', size: 'medium', category: 'core', position: { x: 4, y: 3 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'core_26', text: 'how', image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#E0E7FF', textColor: '#3730A3', size: 'medium', category: 'core', position: { x: 5, y: 3 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'core_27', text: 'which', image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#E0E7FF', textColor: '#3730A3', size: 'medium', category: 'core', position: { x: 6, y: 3 }, pageId: '', createdAt: new Date(), updatedAt: new Date() }
        ],
        order: 0,
        isTemplate: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
  },
  {
    id: 'meals-food',
    name: 'Meals & Food',
    description: 'Comprehensive food and meal communication',
    category: 'basic',
    preview: '🍽️',
    pages: [
      {
        title: 'Meals',
        description: 'Food, drinks, and meal-related communication',
        backgroundColor: '#DBEAFE',
        buttons: [
          // Food preferences
          { id: 'meal_1', text: 'Ready yet?', image: 'https://images.pexels.com/photos/1367276/pexels-photo-1367276.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DBEAFE', textColor: '#1E40AF', size: 'medium', category: 'meals', position: { x: 0, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'meal_2', text: 'Can I have different food?', image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEF3C7', textColor: '#92400E', size: 'medium', category: 'meals', position: { x: 1, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'meal_3', text: 'What to eat', image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEF3C7', textColor: '#92400E', size: 'medium', category: 'meals', position: { x: 2, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'meal_4', text: 'I want to eat', image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEF3C7', textColor: '#92400E', size: 'medium', category: 'meals', position: { x: 3, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'meal_5', text: 'I\'m done', image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEF3C7', textColor: '#92400E', size: 'medium', category: 'meals', position: { x: 4, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'meal_6', text: 'I\'m hungry', image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEF3C7', textColor: '#92400E', size: 'medium', category: 'meals', position: { x: 5, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          
          // Drinks
          { id: 'meal_7', text: 'I\'m thirsty', image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DCFCE7', textColor: '#166534', size: 'medium', category: 'meals', position: { x: 0, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'meal_8', text: 'I want different food', image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEF3C7', textColor: '#92400E', size: 'medium', category: 'meals', position: { x: 1, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'meal_9', text: 'Let\'s finish later', image: 'https://images.pexels.com/photos/1367276/pexels-photo-1367276.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DCFCE7', textColor: '#166534', size: 'medium', category: 'meals', position: { x: 2, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'meal_10', text: 'You are a good cook', image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DCFCE7', textColor: '#166534', size: 'medium', category: 'meals', position: { x: 3, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'meal_11', text: 'This tastes funny', image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEE2E2', textColor: '#991B1B', size: 'medium', category: 'meals', position: { x: 4, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'meal_12', text: 'That is good', image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DCFCE7', textColor: '#166534', size: 'medium', category: 'meals', position: { x: 5, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          
          // More options
          { id: 'meal_13', text: 'It\'s delicious', image: 'https://images.pexels.com/photos/1367276/pexels-photo-1367276.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DCFCE7', textColor: '#166534', size: 'medium', category: 'meals', position: { x: 0, y: 2 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'meal_14', text: 'That is not healthy', image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEE2E2', textColor: '#991B1B', size: 'medium', category: 'meals', position: { x: 1, y: 2 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'meal_15', text: 'That is good', image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DCFCE7', textColor: '#166534', size: 'medium', category: 'meals', position: { x: 2, y: 2 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'meal_16', text: 'Don\'t want anything', image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEE2E2', textColor: '#991B1B', size: 'medium', category: 'meals', position: { x: 3, y: 2 }, pageId: '', createdAt: new Date(), updatedAt: new Date() }
        ],
        order: 0,
        isTemplate: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
  },
  {
    id: 'playground-topic',
    name: 'Playground',
    description: 'Playground activities and social interactions',
    category: 'activities',
    preview: '🏃',
    pages: [
      {
        title: 'Playground',
        description: 'Activities and interactions at the playground',
        backgroundColor: '#FEF3C7',
        buttons: [
          // Actions
          { id: 'play_1', text: 'I can do it', image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DCFCE7', textColor: '#166534', size: 'medium', category: 'playground', position: { x: 0, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'play_2', text: 'Look at me', image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DBEAFE', textColor: '#1E40AF', size: 'medium', category: 'playground', position: { x: 1, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'play_3', text: 'I want to go', image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DBEAFE', textColor: '#1E40AF', size: 'medium', category: 'playground', position: { x: 2, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'play_4', text: 'Try to get me', image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DCFCE7', textColor: '#166534', size: 'medium', category: 'playground', position: { x: 3, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'play_5', text: 'Let\'s go there', image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DBEAFE', textColor: '#1E40AF', size: 'medium', category: 'playground', position: { x: 4, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'play_6', text: 'Come with me', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DCFCE7', textColor: '#166534', size: 'medium', category: 'playground', position: { x: 5, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          
          // Equipment
          { id: 'play_7', text: 'Do something else', image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEF3C7', textColor: '#92400E', size: 'medium', category: 'playground', position: { x: 0, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'play_8', text: 'Sure', image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DCFCE7', textColor: '#166534', size: 'medium', category: 'playground', position: { x: 1, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'play_9', text: 'Right', image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DCFCE7', textColor: '#166534', size: 'medium', category: 'playground', position: { x: 2, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'play_10', text: 'Tree', image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DCFCE7', textColor: '#166534', size: 'medium', category: 'playground', position: { x: 3, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'play_11', text: 'Maybe', image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEF3C7', textColor: '#92400E', size: 'medium', category: 'playground', position: { x: 4, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'play_12', text: 'Nothing', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEE2E2', textColor: '#991B1B', size: 'medium', category: 'playground', position: { x: 5, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() }
        ],
        order: 0,
        isTemplate: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
  },
  {
    id: 'little-words',
    name: 'Little Words',
    description: 'Small but important connecting words',
    category: 'basic',
    preview: '📝',
    pages: [
      {
        title: 'Little Words',
        description: 'Important connecting and descriptive words',
        backgroundColor: '#F0FDF4',
        buttons: [
          // Prepositions and connectors
          { id: 'little_1', text: 'else', image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEE2E2', textColor: '#991B1B', size: 'medium', category: 'little', position: { x: 0, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'little_2', text: 'on', image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#F0FDF4', textColor: '#166534', size: 'medium', category: 'little', position: { x: 1, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'little_3', text: 'these', image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#F0FDF4', textColor: '#166534', size: 'medium', category: 'little', position: { x: 2, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'little_4', text: 'yet', image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#F0FDF4', textColor: '#166534', size: 'medium', category: 'little', position: { x: 3, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'little_5', text: 'everyone', image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#F0FDF4', textColor: '#166534', size: 'medium', category: 'little', position: { x: 4, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'little_6', text: 'sometime', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#F0FDF4', textColor: '#166534', size: 'medium', category: 'little', position: { x: 5, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          
          // More connectors
          { id: 'little_7', text: 'by', image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#F0FDF4', textColor: '#166534', size: 'medium', category: 'little', position: { x: 0, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'little_8', text: 'of', image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#F0FDF4', textColor: '#166534', size: 'medium', category: 'little', position: { x: 1, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'little_9', text: 'then', image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#F0FDF4', textColor: '#166534', size: 'medium', category: 'little', position: { x: 2, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'little_10', text: 'while', image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#F0FDF4', textColor: '#166534', size: 'medium', category: 'little', position: { x: 3, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'little_11', text: 'everybody', image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#F0FDF4', textColor: '#166534', size: 'medium', category: 'little', position: { x: 4, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'little_12', text: 'someone', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#F0FDF4', textColor: '#166534', size: 'medium', category: 'little', position: { x: 5, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          
          // Additional words
          { id: 'little_13', text: 'any', image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#F0FDF4', textColor: '#166534', size: 'medium', category: 'little', position: { x: 0, y: 2 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'little_14', text: 'maybe', image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEF3C7', textColor: '#92400E', size: 'medium', category: 'little', position: { x: 1, y: 2 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'little_15', text: 'than', image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#F0FDF4', textColor: '#166534', size: 'medium', category: 'little', position: { x: 2, y: 2 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'little_16', text: 'whether', image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#F0FDF4', textColor: '#166534', size: 'medium', category: 'little', position: { x: 3, y: 2 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'little_17', text: 'anywhere', image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#F0FDF4', textColor: '#166534', size: 'medium', category: 'little', position: { x: 4, y: 2 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'little_18', text: 'nothing', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEE2E2', textColor: '#991B1B', size: 'medium', category: 'little', position: { x: 5, y: 2 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          
          // Time and sequence
          { id: 'little_19', text: 'about', image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#F0FDF4', textColor: '#166534', size: 'medium', category: 'little', position: { x: 0, y: 3 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'little_20', text: 'if', image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#F0FDF4', textColor: '#166534', size: 'medium', category: 'little', position: { x: 1, y: 3 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'little_21', text: 'so', image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#F0FDF4', textColor: '#166534', size: 'medium', category: 'little', position: { x: 2, y: 3 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'little_22', text: 'very', image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#F0FDF4', textColor: '#166534', size: 'medium', category: 'little', position: { x: 3, y: 3 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'little_23', text: 'anytime', image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#F0FDF4', textColor: '#166534', size: 'medium', category: 'little', position: { x: 4, y: 3 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'little_24', text: 'nobody', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEE2E2', textColor: '#991B1B', size: 'medium', category: 'little', position: { x: 5, y: 3 }, pageId: '', createdAt: new Date(), updatedAt: new Date() }
        ],
        order: 0,
        isTemplate: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
  },
  {
    id: 'quickfires',
    name: 'QuickFires',
    description: 'Quick responses and common phrases',
    category: 'social',
    preview: '⚡',
    pages: [
      {
        title: 'QuickFires',
        description: 'Fast responses for common situations',
        backgroundColor: '#F3F4F6',
        buttons: [
          // Quick responses
          { id: 'quick_1', text: 'Try doing it', image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DBEAFE', textColor: '#1E40AF', size: 'medium', category: 'quick', position: { x: 0, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'quick_2', text: 'Make mistake', image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEE2E2', textColor: '#991B1B', size: 'medium', category: 'quick', position: { x: 1, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'quick_3', text: 'Hi', image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEF3C7', textColor: '#92400E', size: 'medium', category: 'quick', position: { x: 2, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'quick_4', text: 'Peace', image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DCFCE7', textColor: '#166534', size: 'medium', category: 'quick', position: { x: 3, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'quick_5', text: 'Wait', image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEF3C7', textColor: '#92400E', size: 'medium', category: 'quick', position: { x: 4, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'quick_6', text: 'Don\'t', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEE2E2', textColor: '#991B1B', size: 'medium', category: 'quick', position: { x: 5, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          
          // Emotions and reactions
          { id: 'quick_7', text: 'Not done yet', image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEE2E2', textColor: '#991B1B', size: 'medium', category: 'quick', position: { x: 0, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'quick_8', text: 'Not on device', image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEE2E2', textColor: '#991B1B', size: 'medium', category: 'quick', position: { x: 1, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'quick_9', text: 'How are you?', image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DBEAFE', textColor: '#1E40AF', size: 'medium', category: 'quick', position: { x: 2, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'quick_10', text: 'Thank you', image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DCFCE7', textColor: '#166534', size: 'medium', category: 'quick', position: { x: 3, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'quick_11', text: 'I don\'t know', image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEF3C7', textColor: '#92400E', size: 'medium', category: 'quick', position: { x: 4, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'quick_12', text: 'No way', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEE2E2', textColor: '#991B1B', size: 'medium', category: 'quick', position: { x: 5, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          
          // More responses
          { id: 'quick_13', text: 'Miss Privacy', image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#F3E8FF', textColor: '#7C3AED', size: 'medium', category: 'quick', position: { x: 0, y: 2 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'quick_14', text: 'Ask yes/no question', image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DBEAFE', textColor: '#1E40AF', size: 'medium', category: 'quick', position: { x: 1, y: 2 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'quick_15', text: 'Bye', image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEF3C7', textColor: '#92400E', size: 'medium', category: 'quick', position: { x: 2, y: 2 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'quick_16', text: 'Sorry', image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEE2E2', textColor: '#991B1B', size: 'medium', category: 'quick', position: { x: 3, y: 2 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'quick_17', text: 'Hey', image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEF3C7', textColor: '#92400E', size: 'medium', category: 'quick', position: { x: 4, y: 2 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'quick_18', text: 'Good', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DCFCE7', textColor: '#166534', size: 'medium', category: 'quick', position: { x: 5, y: 2 }, pageId: '', createdAt: new Date(), updatedAt: new Date() }
        ],
        order: 0,
        isTemplate: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
  },
  {
    id: 'communication-book',
    name: 'Core First Communication Book',
    description: 'Comprehensive communication board with core vocabulary',
    category: 'basic',
    preview: '📖',
    pages: [
      {
        title: 'Communication Book',
        description: 'Core vocabulary for daily communication',
        backgroundColor: '#F8FAFC',
        buttons: [
          // Row 1 - People and pronouns
          { id: 'comm_1', text: 'I don\'t like that', image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEE2E2', textColor: '#991B1B', size: 'medium', category: 'communication', position: { x: 0, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'comm_2', text: 'Good idea', image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DCFCE7', textColor: '#166534', size: 'medium', category: 'communication', position: { x: 1, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'comm_3', text: 'This is fun', image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DCFCE7', textColor: '#166534', size: 'medium', category: 'communication', position: { x: 2, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'comm_4', text: 'Push me', image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DBEAFE', textColor: '#1E40AF', size: 'medium', category: 'communication', position: { x: 3, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'comm_5', text: 'Try this', image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DBEAFE', textColor: '#1E40AF', size: 'medium', category: 'communication', position: { x: 4, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'comm_6', text: 'Where can we go?', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#E0E7FF', textColor: '#3730A3', size: 'medium', category: 'communication', position: { x: 5, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'comm_7', text: 'What to do?', image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#E0E7FF', textColor: '#3730A3', size: 'medium', category: 'communication', position: { x: 6, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          
          // Row 2 - Actions
          { id: 'comm_8', text: 'My turn', image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEF3C7', textColor: '#92400E', size: 'medium', category: 'communication', position: { x: 0, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'comm_9', text: 'No turn', image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEE2E2', textColor: '#991B1B', size: 'medium', category: 'communication', position: { x: 1, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'comm_10', text: 'You turn', image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DBEAFE', textColor: '#1E40AF', size: 'medium', category: 'communication', position: { x: 2, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'comm_11', text: 'Help me come down', image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEF3C7', textColor: '#92400E', size: 'medium', category: 'communication', position: { x: 3, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() }
        ],
        order: 0,
        isTemplate: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
  },
  {
    id: 'emotions-feelings',
    name: 'Emotions & Feelings',
    description: 'Express emotions and feelings clearly',
    category: 'emotions',
    preview: '😊',
    pages: [
      {
        title: 'Emotions',
        description: 'Express how you feel',
        backgroundColor: '#FEF3C7',
        buttons: [
          // Basic emotions
          { id: 'emotion_1', text: 'Happy', image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DCFCE7', textColor: '#166534', size: 'medium', category: 'emotions', position: { x: 0, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'emotion_2', text: 'Sad', image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DBEAFE', textColor: '#1E40AF', size: 'medium', category: 'emotions', position: { x: 1, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'emotion_3', text: 'Angry', image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEE2E2', textColor: '#991B1B', size: 'medium', category: 'emotions', position: { x: 2, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'emotion_4', text: 'Scared', image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#F3E8FF', textColor: '#7C3AED', size: 'medium', category: 'emotions', position: { x: 3, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'emotion_5', text: 'Excited', image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEF3C7', textColor: '#92400E', size: 'medium', category: 'emotions', position: { x: 4, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'emotion_6', text: 'Tired', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#E5E7EB', textColor: '#374151', size: 'medium', category: 'emotions', position: { x: 5, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          
          // Complex emotions
          { id: 'emotion_7', text: 'Confused', image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEF3C7', textColor: '#92400E', size: 'medium', category: 'emotions', position: { x: 0, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'emotion_8', text: 'Proud', image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DCFCE7', textColor: '#166534', size: 'medium', category: 'emotions', position: { x: 1, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'emotion_9', text: 'Worried', image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEF3C7', textColor: '#92400E', size: 'medium', category: 'emotions', position: { x: 2, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'emotion_10', text: 'Surprised', image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEF3C7', textColor: '#92400E', size: 'medium', category: 'emotions', position: { x: 3, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'emotion_11', text: 'Frustrated', image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEE2E2', textColor: '#991B1B', size: 'medium', category: 'emotions', position: { x: 4, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'emotion_12', text: 'Calm', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DCFCE7', textColor: '#166534', size: 'medium', category: 'emotions', position: { x: 5, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() }
        ],
        order: 0,
        isTemplate: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
  },
  {
    id: 'bathroom-personal',
    name: 'Bathroom & Personal Care',
    description: 'Personal care and bathroom needs',
    category: 'needs',
    preview: '🚿',
    pages: [
      {
        title: 'Bathroom & Personal Care',
        description: 'Personal hygiene and bathroom communication',
        backgroundColor: '#E0F2FE',
        buttons: [
          // Bathroom needs
          { id: 'bath_1', text: 'I need to go', image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEF3C7', textColor: '#92400E', size: 'medium', category: 'bathroom', position: { x: 0, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'bath_2', text: 'Bathroom', image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#E0F2FE', textColor: '#0C4A6E', size: 'medium', category: 'bathroom', position: { x: 1, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'bath_3', text: 'Wash hands', image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#E0F2FE', textColor: '#0C4A6E', size: 'medium', category: 'bathroom', position: { x: 2, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'bath_4', text: 'Brush teeth', image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#E0F2FE', textColor: '#0C4A6E', size: 'medium', category: 'bathroom', position: { x: 3, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'bath_5', text: 'Take shower', image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#E0F2FE', textColor: '#0C4A6E', size: 'medium', category: 'bathroom', position: { x: 4, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'bath_6', text: 'Get dressed', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#E0F2FE', textColor: '#0C4A6E', size: 'medium', category: 'bathroom', position: { x: 5, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          
          // Personal care
          { id: 'bath_7', text: 'Comb hair', image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#E0F2FE', textColor: '#0C4A6E', size: 'medium', category: 'bathroom', position: { x: 0, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'bath_8', text: 'I\'m finished', image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DCFCE7', textColor: '#166534', size: 'medium', category: 'bathroom', position: { x: 1, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'bath_9', text: 'Need help', image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEF3C7', textColor: '#92400E', size: 'medium', category: 'bathroom', position: { x: 2, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'bath_10', text: 'Privacy please', image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#F3E8FF', textColor: '#7C3AED', size: 'medium', category: 'bathroom', position: { x: 3, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'bath_11', text: 'All done', image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DCFCE7', textColor: '#166534', size: 'medium', category: 'bathroom', position: { x: 4, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'bath_12', text: 'Clean up', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#E0F2FE', textColor: '#0C4A6E', size: 'medium', category: 'bathroom', position: { x: 5, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() }
        ],
        order: 0,
        isTemplate: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
  },
  {
    id: 'school-learning',
    name: 'School & Learning',
    description: 'Educational activities and classroom communication',
    category: 'activities',
    preview: '📚',
    pages: [
      {
        title: 'School & Learning',
        description: 'Classroom and learning activities',
        backgroundColor: '#F0FDF4',
        buttons: [
          // School activities
          { id: 'school_1', text: 'Read book', image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DBEAFE', textColor: '#1E40AF', size: 'medium', category: 'school', position: { x: 0, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'school_2', text: 'Write', image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DBEAFE', textColor: '#1E40AF', size: 'medium', category: 'school', position: { x: 1, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'school_3', text: 'Draw', image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DCFCE7', textColor: '#166534', size: 'medium', category: 'school', position: { x: 2, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'school_4', text: 'Count', image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEF3C7', textColor: '#92400E', size: 'medium', category: 'school', position: { x: 3, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'school_5', text: 'Learn', image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DCFCE7', textColor: '#166534', size: 'medium', category: 'school', position: { x: 4, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'school_6', text: 'Teacher', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#F3E8FF', textColor: '#7C3AED', size: 'medium', category: 'school', position: { x: 5, y: 0 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          
          // Questions and interactions
          { id: 'school_7', text: 'I need help', image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEF3C7', textColor: '#92400E', size: 'medium', category: 'school', position: { x: 0, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'school_8', text: 'I understand', image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DCFCE7', textColor: '#166534', size: 'medium', category: 'school', position: { x: 1, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'school_9', text: 'I don\'t understand', image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEE2E2', textColor: '#991B1B', size: 'medium', category: 'school', position: { x: 2, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'school_10', text: 'Can you repeat?', image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#E0E7FF', textColor: '#3730A3', size: 'medium', category: 'school', position: { x: 3, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'school_11', text: 'I\'m done', image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#DCFCE7', textColor: '#166534', size: 'medium', category: 'school', position: { x: 4, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() },
          { id: 'school_12', text: 'Break time', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', backgroundColor: '#FEF3C7', textColor: '#92400E', size: 'medium', category: 'school', position: { x: 5, y: 1 }, pageId: '', createdAt: new Date(), updatedAt: new Date() }
        ],
        order: 0,
        isTemplate: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
  }
];