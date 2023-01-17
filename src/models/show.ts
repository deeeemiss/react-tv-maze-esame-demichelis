export interface ShowType {
  id: number;
  image: string;
  name: string;
  language: string;
  summary: string;
}

export interface ShowFav extends ShowType {
  favorite: boolean;
}

export interface firebaseDbMovie {
  [key: string]: ShowFav;
}
