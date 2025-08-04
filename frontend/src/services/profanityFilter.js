import * as filter from 'leo-profanity';
import * as russianBadWords from 'russian-bad-words';

// Настройка фильтра
filter.loadDictionary(); // Загружает английский словарь по умолчанию

// Загрузка русского словаря из библиотеки russian-bad-words
try {
  // Попробуем разные способы получения слов из библиотеки
  let russianWords = [];
  
  if (Array.isArray(russianBadWords.default)) {
    russianWords = russianBadWords.default;
  } else if (Array.isArray(russianBadWords)) {
    russianWords = russianBadWords;
  } else if (russianBadWords.all && Array.isArray(russianBadWords.all)) {
    russianWords = russianBadWords.all;
  } else if (russianBadWords.words && Array.isArray(russianBadWords.words)) {
    russianWords = russianBadWords.words;
  } else {
    // Если ничего не найдено, используем Object.values для извлечения массива
    const values = Object.values(russianBadWords);
    russianWords = values.find(Array.isArray) || [];
  }
  
  if (russianWords.length > 0) {
    filter.add(russianWords);
    console.log(`Loaded ${russianWords.length} Russian profanity words`);
  } else {
    throw new Error('No Russian words found in library');
  }
} catch (error) {
  console.error('Failed to load Russian bad words library:', error);
  
  // Fallback - добавляем основные русские слова вручную
  const fallbackRussianWords = [
    'блядь', 'бля', 'сука', 'пизда', 'хуй', 'ебать', 'говно', 'дерьмо',
    'мудак', 'козел', 'идиот', 'дебил', 'урод', 'ублюдок', 'мразь',
    'долбоеб', 'пидор', 'шлюха', 'тварь', 'сволочь', 'падла'
  ];
  filter.add(fallbackRussianWords);
  console.log(`Loaded ${fallbackRussianWords.length} fallback Russian words`);
}

// Дополнительные английские слова (усиливаем английский словарь)
const additionalEnglishWords = [
  // Основные английские нецензурные слова
  'fuck', 'fucking', 'fucked', 'fucker', 'fucks',
  'shit', 'shitty', 'bullshit', 'horseshit',
  'damn', 'damned', 'dammit',
  'bitch', 'bitchy', 'bitches',
  'ass', 'asshole', 'asses', 'badass',
  'hell', 'bloody', 'bastard', 'bastards',
  'cock', 'dick', 'penis', 'pussy', 'vagina',
  'whore', 'slut', 'slutty', 'prostitute',
  'piss', 'pissed', 'crap', 'crappy',
  'retard', 'retarded', 'stupid', 'idiot',
  'faggot', 'fag', 'gay', 'homo',
  'nigger', 'nigga', 'negro',
  
  // Обходы цензуры английских слов
  'f**k', 'f***', 'f*ck', 'fck', 'fuk', 'phuck',
  's**t', 's***', 'sh*t', 'sht', 'shyt',
  'b***h', 'b*tch', 'btch', 'beatch',
  'd**n', 'd*mn', 'dmn', 'dayum',
  'a**', 'a*s', '@ss', 'azz',
  'h*ll', 'heck', 'h3ll',
  
  // Цифровые замены
  'f4ck', 'sh1t', 'b1tch', 'd4mn', '4ss', 'h3ll',
  'fvck', 'shyt', 'bytch', 'azz', 'hellz',
  
  // Leetspeak
  'ph*ck', 'sh!t', 'b!tch', 'd@mn', '@ss'
];

// Дополнительные русские слова и их вариации (транслит и обходы)
const additionalRussianWords = [
  // Транслит русских слов
  'blyad', 'blya', 'suka', 'huy', 'hui', 'huj', 'pizda', 'pizd', 
  'ebat', 'ebal', 'govno', 'mudak', 'kozel', 'debil',
  'urod', 'ublydok', 'mraz', 'dolboeb', 'pidor', 'shluha',
  'tvar', 'svoloch', 'padla',
  
  // Обходы цензуры русских слов
  'бл***ь', 'бл**ь', 'бл*дь', 'бляд*', 'бл@дь',
  'с**а', 'с*ка', 'сук@', 'cy*a', 'cyк@',
  'х**', 'х*й', 'хy*', 'x*й', 'xyй',
  'п***а', 'п*зда', 'пи*да', 'пизд@', 'п@зда',
  'е***ь', 'еб*ть', 'еб@ть', 'eb*ть', 'ебат*',
  'г***о', 'г*вно', 'гов*о', 'г@вно',
  'м***к', 'м*дак', 'муд@к', 'мyдак',
  
  // Сокращения
  'бл', 'хр', 'пзд', 'еб', 'гв'
];

// Расширенный список русских нецензурных слов для точного поиска
const russianProfanityList = [
  // Основные русские мат-слова
  'блядь', 'бля', 'блять', 'сука', 'пизда', 'пизде', 'пизду', 'пиздец', 'пиздеть',
  'хуй', 'хуя', 'хую', 'хуем', 'хуё', 'хуёв', 'хуйня', 'хуйло', 'хуеть', 'хуево',
  'ебать', 'ебал', 'ебаль', 'ебучий', 'ебучка', 'ебля', 'ебаный', 'ебанутый',
  'говно', 'говна', 'говне', 'говном', 'дерьмо', 'дерьма', 'дерьме', 'дерьмом',
  'мудак', 'мудака', 'мудаке', 'мудаком', 'мудачок', 'мудила', 'мудило',
  'козел', 'козла', 'козлу', 'козлом', 'козлина', 'козленок',
  'идиот', 'идиота', 'идиоту', 'идиотом', 'идиотка', 'идиотизм',
  'дебил', 'дебила', 'дебилу', 'дебилом', 'дебилка', 'дебильный',
  'урод', 'урода', 'уроду', 'уродом', 'уродка', 'уродливый',
  'ублюдок', 'ублюдка', 'ублюдку', 'ублюдком', 'мразь', 'мрази', 'мразота',
  'долбоеб', 'долбоёб', 'пидор', 'пидора', 'пидору', 'пидором', 'пидорас',
  'шлюха', 'шлюхи', 'шлюхе', 'шлюхой', 'шалава', 'шалавы', 'шалаве',
  'тварь', 'твари', 'твари', 'тварью', 'сволочь', 'сволочи', 'сволочью',
  'падла', 'падлы', 'падле', 'падлой', 'гнида', 'гниды', 'гниде', 'гнидой',
  
  // Транслитерация
  'blyad', 'blya', 'suka', 'pizda', 'huy', 'hui', 'huj', 'ebat', 'govno', 'mudak',
  
  // Обходы цензуры
  'бл***ь', 'бл**ь', 'бл*дь', 'бляд*', 'бл@дь', 'блiadь',
  'с**а', 'с*ка', 'сук@', 'cy*a', 'cyк@', 'cvka',
  'х**', 'х*й', 'хy*', 'x*й', 'xyй', 'xui',
  'п***а', 'п*зда', 'пи*да', 'пизд@', 'п@зда', 'pi3da',
  'е***ь', 'еб*ть', 'еб@ть', 'eb*ть', 'ебат*', 'jebat',
  'г***о', 'г*вно', 'гов*о', 'г@вно', 'govn0',
  'м***к', 'м*дак', 'муд@к', 'мyдак', 'mudak'
];

// Добавляем все дополнительные слова
filter.add([...additionalEnglishWords, ...additionalRussianWords]);

// Функция для очистки текста
export const cleanText = (text) => {
  if (!text || typeof text !== 'string') {
    return text;
  }
  return filter.clean(text);
};

// Функция для очистки с кастомной заменой
export const cleanTextCustom = (text, replacement = '***') => {
  if (!text || typeof text !== 'string') {
    return text;
  }
  
  let cleanedText = text;
  const profaneWords = filter.list(text);
  
  profaneWords.forEach(word => {
    // Преобразуем в строку, если это объект
    const wordStr = typeof word === 'string' ? word : String(word);
    const regex = new RegExp(wordStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    cleanedText = cleanedText.replace(regex, replacement);
  });
  
  return cleanedText;
};

// Функция для проверки наличия нецензурных слов
export const containsProfanity = (text) => {
  if (!text || typeof text !== 'string') {
    return false;
  }
  return filter.check(text);
};

// Функция для получения списка найденных нецензурных слов
export const getProfanityWords = (text) => {
  if (!text || typeof text !== 'string') {
    return [];
  }
  return filter.list(text);
};

// Функция для добавления новых слов в фильтр
export const addWords = (words) => {
  if (Array.isArray(words)) {
    filter.add(words);
  }
};

// Функция для удаления слов из фильтра
export const removeWords = (words) => {
  if (Array.isArray(words)) {
    filter.remove(words);
  }
};

// Функция для проверки конкретного слова
export const isWordProfane = (word) => {
  if (!word || typeof word !== 'string') {
    return false;
  }
  return filter.check(word.trim());
};

// ИСПРАВЛЕННАЯ функция для очистки с сохранением длины (замена звездочками)
export const cleanWithAsterisks = (text) => {
  if (!text || typeof text !== 'string') {
    return text;
  }
  
  let cleanedText = text;
  
  try {
    // Сначала обрабатываем с помощью leo-profanity (для английских слов)
    const profaneWords = filter.list(text);
    
    if (profaneWords && profaneWords.length > 0) {
      profaneWords.forEach(word => {
        // Преобразуем в строку, если это объект
        const wordStr = typeof word === 'string' ? word : String(word);
        
        if (wordStr && wordStr.length > 0) {
          const asterisks = '*'.repeat(wordStr.length);
          const regex = new RegExp(wordStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
          cleanedText = cleanedText.replace(regex, asterisks);
        }
      });
    }
    
    // Дополнительно обрабатываем русские слова из нашего списка
    russianProfanityList.forEach(word => {
      if (word && word.length > 0) {
        // Проверяем есть ли это слово в тексте (регистронезависимо)
        const regex = new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
        if (regex.test(cleanedText)) {
          const asterisks = '*'.repeat(word.length);
          cleanedText = cleanedText.replace(regex, asterisks);
        }
      }
    });
    
  } catch (error) {
    console.error('Error in cleanWithAsterisks:', error);
    // В случае ошибки возвращаем оригинальный текст
    return text;
  }
  
  return cleanedText;
};

// Функция для получения статистики словаря
export const getDictionaryStats = () => {
  try {
    return {
      message: 'Dictionary loaded with Russian and English profanity words',
      hasRussian: true,
      hasEnglish: true
    };
  } catch (error) {
    return {
      message: 'Dictionary stats unavailable',
      error: error.message
    };
  }
};

export default {
  cleanText,
  cleanTextCustom,
  containsProfanity,
  getProfanityWords,
  addWords,
  removeWords,
  isWordProfane,
  cleanWithAsterisks,
  getDictionaryStats
};
