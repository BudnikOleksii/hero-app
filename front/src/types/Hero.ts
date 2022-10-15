export type Id = number | string;

export interface Hero {
  id: Id;
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string;
  catch_phrase: string;
  images: string[];
}

export type NewHero = Omit<Hero, 'id'>;
