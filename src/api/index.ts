const BASE_URL = "https://api.tvmaze.com";

interface ShowResType {
  show: {
    id: number;
    image: {
      medium: string;
    };
    name: string;
    language: string;
    summary: string;
  };
}

export interface Show {
  id: number;
  image: string;
  name: string;
  language: string;
  summary: string;
}

type ShowDetailApiResType = {
  id: number;
  name: string;
  image?: {
    original: string;
  };
  summary?: string;
  genres?: string[];
  premiered?: string;
  ended?: string;
  rating?: {
    average: number;
  };
  language: string;
};

export type ShowDetailType = {
  id: number;
  title: string;
  image?: string;
  summary?: string;
  genres?: string[];
  startDate?: string;
  endDate?: string;
  avgRating?: number;
  language: string;
};

export const getShowsBySearch = async (query: string) => {
  const res = await fetch(`${BASE_URL}/search/shows?q=${query}`);
  const data: ShowResType[] = (await res.json()) as ShowResType[];
  console.log(data);

  const mappedData: Show[] = data.map((el) => ({
    id: el.show.id,
    image: el.show.image?.medium,
    name: el.show.name,
    language: el.show.language,
    summary: el.show.summary,
  }));
  console.log(mappedData);
  return mappedData;
};

export const getShowById = async (id: number): Promise<ShowDetailType> => {
  if (id <= 0) {
    return {} as ShowDetailType;
  }

  const response = await fetch(`${BASE_URL}/shows/${id}`);
  const data: ShowDetailApiResType = await response.json();
  console.log(data);

  return {
    id: data.id,
    title: data.name,
    image: data.image?.original,
    summary: data.summary,
    genres: data.genres,
    startDate: data.premiered,
    endDate: data.ended,
    avgRating: data.rating?.average,
    language: data.language,
  };
};
