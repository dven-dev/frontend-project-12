import * as filter from 'leo-profanity';
import * as russianBadWords from 'russian-bad-words';

filter.loadDictionary();

try {
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
   
    const values = Object.values(russianBadWords);
    russianWords = values.find(Array.isArray) || [];
  }
  
  if (russianWords.length > 0) {
    filter.add(russianWords);
    // Removed console.log: console.log(`Loaded ${russianWords.length} Russian profanity words`);
  } else {
    throw new Error('No Russian words found in library');
  }
} catch (error) {
 
  const fallbackRussianWords = [
    'блядь', 'бля', 'сука', 'пизда', 'хуй', 'ебать', 'говно', 'дерьмо',
    'мудак', 'козел', 'идиот', 'дебил', 'урод', 'ублюдок', 'мразь',
    'долбоеб', 'пидор', 'шлюха', 'тварь', 'сволочь', 'падла'
  ];
  filter.add(fallbackRussianWords);
}

const additionalEnglishWords = [
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
  
  'f**k', 'f***', 'f*ck', 'fck', 'fuk', 'phuck',
  's**t', 's***', 'sh*t', 'sht', 'shyt',
  'b***h', 'b*tch', 'btch', 'beatch',
  'd**n', 'd*mn', 'dmn', 'dayum',
  'a**', 'a*s', '@ss', 'azz',
  'h*ll', 'heck', 'h3ll',
  
  'f4ck', 'sh1t', 'b1tch', 'd4mn', '4ss', 'h3ll',
  'fvck', 'shyt', 'bytch', 'azz', 'hellz',
  
  'ph*ck', 'sh!t', 'b!tch', 'd@mn', '@ss'
];

const additionalRussianWords = [
  'blyad', 'blya', 'suka', 'huy', 'hui', 'huj', 'pizda', 'pizd', 
  'ebat', 'ebal', 'govno', 'mudak', 'kozel', 'debil',
  'urod', 'ublydok', 'mraz', 'dolboeb', 'pidor', 'shluha',
  'tvar', 'svoloch', 'padla',
  
  'бл***ь', 'бл**ь', 'бл*дь', 'бляд*', 'бл@дь',
  'с**а', 'с*ка', 'сук@', 'cy*a', 'cyк@',
  'х**', 'х*й', 'хy*', 'x*й', 'xyй',
  'п***а', 'п*зда', 'пи*да', 'пизд@', 'п@зда',
  'е***ь', 'еб*ть', 'еб@ть', 'eb*ть', 'ебат*',
  'г***о', 'г*вно', 'гов*о', 'г@вно',
  'м***к', 'м*дак', 'муд@к', 'мyдак',
  
  'бл', 'хр', 'пзд', 'еб', 'гв'
];

const russianProfanityList = [
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
  
  'blyad', 'blya', 'suka', 'pizda', 'huy', 'hui', 'huj', 'ebat', 'govno', 'mudak',
  
  'бл***ь', 'бл**ь', 'бл*дь', 'бляд*', 'бл@дь', 'блiadь',
  'с**а', 'с*ка', 'сук@', 'cy*a', 'cyк@', 'cvka',
  'х**', 'х*й', 'хy*', 'x*й', 'xyй', 'xui',
  'п***а', 'п*зда', 'пи*да', 'пизд@', 'п@зда', 'pi3da',
  'е***ь', 'еб*ть', 'еб@ть', 'eb*ть', 'ебат*', 'jebat',
  'г***о', 'г*вно', 'гов*о', 'г@вно', 'govn0',
  'м***к', 'м*дак', 'муд@к', 'мyдак', 'mudak'
];

filter.add([...additionalEnglishWords, ...additionalRussianWords]);

export const cleanText = (text) => {
  if (!text || typeof text !== 'string') {
    return text;
  }
  return filter.clean(text);
};

export const cleanTextCustom = (text, replacement = '***') => {
  if (!text || typeof text !== 'string') {
    return text;
  }
  
  let cleanedText = text;
  const profaneWords = filter.list(text);
  
  profaneWords.forEach(word => {
    const wordStr = typeof word === 'string' ? word : String(word);
    const regex = new RegExp(wordStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    cleanedText = cleanedText.replace(regex, replacement);
  });
  
  return cleanedText;
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

export const addWords = (words) => {
  if (Array.isArray(words)) {
    filter.add(words);
  }
};

export const removeWords = (words) => {
  if (Array.isArray(words)) {
    filter.remove(words);
  }
};

export const isWordProfane = (word) => {
  if (!word || typeof word !== 'string') {
    return false;
  }
  return filter.check(word.trim());
};

export const cleanWithAsterisks = (text) => {
  if (!text || typeof text !== 'string') {
    return text;
  }
  
  let cleanedText = text;
  
  try {
    const profaneWords = filter.list(text);
    
    if (profaneWords && profaneWords.length > 0) {
      profaneWords.forEach(word => {
        const wordStr = typeof word === 'string' ? word : String(word);
        
        if (wordStr && wordStr.length > 0) {
          const asterisks = '*'.repeat(wordStr.length);
          const regex = new RegExp(wordStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
          cleanedText = cleanedText.replace(regex, asterisks);
        }
      });
    }
    
    russianProfanityList.forEach(word => {
      if (word && word.length > 0) {
        const regex = new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
        if (regex.test(cleanedText)) {
          const asterisks = '*'.repeat(word.length);
          cleanedText = cleanedText.replace(regex, asterisks);
        }
      }
    });
    
  } catch (error) {
    return text;
  }
  
  return cleanedText;
};

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
