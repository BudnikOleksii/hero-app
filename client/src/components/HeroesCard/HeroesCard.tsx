import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Hero } from '../../types/Hero';

type Props = {
  hero: Hero
};

export const HeroesCard: FC<Props> = ({ hero }) => {
  const {
    _id, nickname, images, real_name
  } = hero;
  const navigate = useNavigate();

  return (
    <Grid item xs={4}>
      <Card sx={{
        width: 400,
        margin: 'auto',
        mb: '10px',
        display: 'flex',
        flexDirection: 'column',
      }}
      >
        <CardMedia
          component="img"
          height="400px"
          image={images[0] || 'https://boss.te.ua/uploads/shop/nophoto/nophoto.jpg'}
          alt={nickname}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {nickname}
          </Typography>

          <Typography gutterBottom variant="h6" component="h3">
            {real_name}
          </Typography>
        </CardContent>

        <CardActions sx={{ mt: 'auto' }}>
          <Button
            size="small"
            onClick={() => navigate(`/hero/${_id}`)}
          >
            Read More
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
