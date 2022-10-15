import { FC, useEffect, useState } from 'react';
import { Layout } from '../Layout';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectors } from '../../app/store';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import { HeroesCard } from '../HeroesCard';
import { useNavigate } from 'react-router-dom';
import { fetchHeroesForCurrentPage } from '../../features/heroesSlice';

const ITEMS_PER_PAGE = 5;

export const HeroesList: FC = () => {
  const { heroes, heroesCount, heroesIsLoading, heroesError } = useAppSelector(selectors.getHeroes);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const pages = Math.ceil(heroesCount / ITEMS_PER_PAGE);

  useEffect(() => {
    dispatch(fetchHeroesForCurrentPage({
      page: currentPage,
      limit: ITEMS_PER_PAGE,
    }))
  }, [currentPage])


  return (
    <Layout>
      <main>
        {heroesIsLoading && <LinearProgress />}

        {heroesError && (
          <Alert severity="error">Something went wrong!</Alert>
        )}

        {heroes.length === 0 && (
          <Alert severity="info">No heroes found</Alert>
        )}

        {!heroesIsLoading && !heroesError && heroes.length > 0 && (
          <Paper elevation={16} sx={{ padding: '20px' }}>
            <Button
              variant="contained"
              onClick={() => navigate('/hero/edit')}
              sx={{ marginBottom: '20px' }}
            >
              Add new hero
            </Button>

            <Grid container spacing={4}>
              {heroes.map(hero => (
                <HeroesCard hero={hero} key={hero._id} />
              ))}
            </Grid>
          </Paper>
        )}

        <Container sx={{ display: 'grid' }}>
          <Pagination
            sx={{ placeSelf: 'center' }}
            count={pages}
            color="primary"
            onChange={(_, pageNumber) => setCurrentPage(pageNumber)}
          />
        </Container>
      </main>
    </Layout>
  );
};
