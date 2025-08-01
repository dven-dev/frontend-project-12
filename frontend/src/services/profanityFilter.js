import * as filter from 'leo-profanity';

// Настройка фильтра
filter.loadDictionary(); // Загружает словарь по умолчанию (английский)

// Можно добавить дополнительные слова
filter.add(['badword1', 'badword2']); // Добавьте нужные слова

// Функция для очистки текста
export const cleanText = (text) => {
  return filter.clean(text);
};

// Функция для проверки наличия нецензурных слов
export const containsProfanity = (text) => {
  return filter.check(text);
};

// Функция для получения списка найденных нецензурных слов
export const getProfanityWords = (text) => {
  return filter.list(text);
};

export default {
  cleanText,
  containsProfanity,
  getProfanityWords
};
