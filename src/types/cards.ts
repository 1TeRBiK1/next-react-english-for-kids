export interface ICard {
  word: string;
  translation: string;
  image: string;
  audioSrc: string;
}

export interface ICategory {
  url: string;
  name: string;
}

export interface ICardsConfig {
  categories: ICategory[];
  cards: ICard[][];
}
