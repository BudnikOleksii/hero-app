import { Hero, NewHero } from '../types/Hero';

const PORT = process.env.PORT || 8000;
const BASE_URL = `http://localhost:${PORT}/v1`;

export const ENDPOINTS = {
  heroes: '/heroes',
  heroesByQuery: (page: number, limit: number) => `/heroes?page=${page}&limit=${limit}`,
  heroById: (id: string) => `/heroes/${id}`,
};

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return fetch(BASE_URL + url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
  patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
};

export const getHeroes = (): Promise<Hero[]> => {
  return client.get<Hero[]>(ENDPOINTS.heroes);
};

export const getHeroesWithQueryParams = (page: number, limit: number): Promise<Hero[]> => {
  return client.get<Hero[]>(ENDPOINTS.heroesByQuery(page, limit));
};

export const getHeroById = (id: string): Promise<Hero> => {
  return client.get<Hero>(ENDPOINTS.heroById(id));
};

export const createHero = (data: NewHero): Promise<Hero> => {
  return client.post<Hero>(ENDPOINTS.heroes, data);
};

export const updateHero = (data: Hero): Promise<Hero> => {
  return client.patch<Hero>(ENDPOINTS.heroById(data._id), data);
};

export const deleteHeroById = (id: string) => {
  return client.delete(ENDPOINTS.heroById(id));
};
