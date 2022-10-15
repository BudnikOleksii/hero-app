import { FC, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import ClearIcon from '@mui/icons-material/Clear';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Hero } from '../../types/Hero';
import { removeHeroById, updateHeroById } from '../../features/heroesSlice';
import { ModalContentWrapper } from '../ModalContentWrapper';

type Props = {
  hero: Hero
};

export const HeroDetails: FC<Props> = ({ hero }) => {
  const {
    _id,
    nickname,
    origin_description,
    superpowers,
    catch_phrase,
    images,
    real_name,
  } = hero;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [heroImages, setHeroImages] = useState(images);

  const handleDeleteImage = (imgUrl: string) => {
    const updatedHeroImages = images.filter(image => (
      image !== imgUrl
    ));

    const updatedHero = {
      ...hero,
      images: updatedHeroImages,
    };

    dispatch(updateHeroById(updatedHero));
    setHeroImages(updatedHeroImages);
  };

  const handleRemoveHero = () => {
    dispatch(removeHeroById(_id));
    navigate('/');
  };

  return (
    <ModalContentWrapper>
      <Card sx={{ maxWidth: 400, placeSelf: 'center' }}>
        <CardMedia
          component="img"
          alt={nickname}
          height="200"
          image={images[0] || 'https://boss.te.ua/uploads/shop/nophoto/nophoto.jpg'}
          sx={{ objectFit: 'contain' }}
        />

        <CardContent sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
        >
          <Typography gutterBottom variant="h5" component="h5">
            {nickname}
          </Typography>

          <List>
            <ListItem disablePadding>
              <ListItemText primary={`Real name: ${real_name}`} />
            </ListItem>

            <ListItem disablePadding>
              <ListItemText primary={`Origin description: ${origin_description}`} />
            </ListItem>

            <ListItem disablePadding>
              <ListItemText primary={`Super powers: ${superpowers}`} />
            </ListItem>

            <ListItem disablePadding>
              <ListItemText primary={`Catch phrase: ${catch_phrase}`} />
            </ListItem>
          </List>

          {heroImages.length > 0 && (
            <>
              <Typography>Images</Typography>
              <ImageList sx={{ width: '100%', height: '100%' }} cols={3}>
                {heroImages.map((image) => (
                  <ImageListItem
                    sx={{ display: 'flex' }}
                    key={image}
                  >
                    <img
                      src={image}
                      alt={nickname}
                    />

                    <Button onClick={() => handleDeleteImage(image)}>
                      <ClearIcon />
                    </Button>
                  </ImageListItem>
                ))}
              </ImageList>
            </>
          )}
        </CardContent>

        <CardActions>
          <Button
            size="small"
            onClick={() => navigate(`/hero/edit/${_id}`)}
          >
            Edit
          </Button>

          <Button
            size="small"
            onClick={handleRemoveHero}
          >
            Delete
          </Button>

          <Button
            size="small"
            onClick={() => navigate('/')}
          >
            Return to main page
          </Button>
        </CardActions>
      </Card>
    </ModalContentWrapper>
  );
};
