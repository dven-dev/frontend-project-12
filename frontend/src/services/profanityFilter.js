import filter from 'leo-profanity';
import { flatWords, words } from 'russian-bad-words';

filter.loadDictionary();

filter.add(flatWords);
filter.add(words);

export const cleanWithAsterisks = (text) => {
  if (!text || typeof text !== 'string') {
    return text;
  }
  
  return filter.clean(text, '*');
};

export const containsProfanity = (text) => {
  if (!text || typeof text !== 'string') {
    return false;
  }
  return filter.check(text);
};

export const getProfanityWords = (text) => {
  if (!text || typeof text !== 'string') {
    return [];
  }
  return filter.list(text);
};

export default {
  cleanWithAsterisks,
  containsProfanity,
  getProfanityWords
};
