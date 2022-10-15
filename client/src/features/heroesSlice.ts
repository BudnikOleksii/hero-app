import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createHero, deleteHeroById, getHeroes, getHeroesWithQueryParams, updateHero,
} from '../api/heroes';
import { Hero } from '../types/Hero';

interface HeroesState {
  heroes: Hero[],
  heroesCount: number,
  heroesIsLoading: boolean;
  heroesError: string;
}

const initialState: HeroesState = {
  heroes: [],
  heroesCount: 0,
  heroesIsLoading: false,
  heroesError: '',
};

export const fetchHeroes = createAsyncThunk<Hero[]>(
  'heroes/fetch_heroes',
  getHeroes,
);

export const fetchHeroesForCurrentPage = createAsyncThunk(
  'heroes/fetch_current_heroes',
  getHeroesWithQueryParams,
);

export const addNewHero = createAsyncThunk(
  'heroes/add_hero',
  createHero,
);

export const updateHeroById = createAsyncThunk(
  'heroes/update_hero',
  updateHero,
);

export const removeHeroById = createAsyncThunk(
  'heroes/delete_hero',
  deleteHeroById,
);

export const heroesSlice = createSlice({
  name: 'heroesState',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHeroes.pending, (state) => {
      state.heroesIsLoading = true;
    });
    builder.addCase(fetchHeroesForCurrentPage.pending, (state) => {
      state.heroesIsLoading = true;
    });

    builder.addCase(fetchHeroes.fulfilled, (state, action) => {
        state.heroesCount = action.payload.length;
        state.heroesIsLoading = false;
      });

    builder.addCase(fetchHeroesForCurrentPage.fulfilled, (state, action) => {
        state.heroes = action.payload;
        state.heroesIsLoading = false;
      });

    builder.addCase(fetchHeroes.rejected, (state, action) => {
      state.heroesError = action.error.name || 'Error';
    });

    builder.addCase(addNewHero.fulfilled, (state, action) => {
      state.heroesCount += 1;
      state.heroes.push(action.payload);
    });

    builder.addCase(updateHeroById.fulfilled, (state, action) => {
      state.heroes = state.heroes.map(hero => (
        hero._id === action.meta.arg._id ? action.payload : hero
      ));
    });

    builder.addCase(removeHeroById.fulfilled, (state, action) => {
      state.heroesCount -= 1;
      state.heroes = state.heroes.filter(hero => (
        hero._id !== action.meta.arg
      ));
    });
  },
});

export default heroesSlice.reducer;
