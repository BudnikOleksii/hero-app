import { FC } from 'react';
import { FormEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { NewHero } from '../../types/Hero';
import { addNewHero, updateHeroById } from '../../features/heroesSlice';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import { ModalContentWrapper } from '../ModalContentWrapper';

const defaultHero: NewHero = {
  nickname: '',
  real_name: '',
  origin_description: '',
  superpowers: '',
  catch_phrase: '',
  images: [],
};

export const HeroForm: FC = () => {
  const { heroId } = useParams();
  const [open, setOpen] = useState(Number(heroId) !== 0);

  const heroState = useAppSelector(state => (
    state.heroesState.heroes.find(hero => hero._id === heroId) || defaultHero
  ));

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [hero, setHero] = useState(heroState);
  const [errorMessage, setErrorMessage] = useState('');

  const handleClose = () => {
    setOpen(false);
    navigate(`/`);
  };

  const isValidTextInput = (value: string) => {
    if (value.length < 3) {
      setErrorMessage('Input text field should contain more than 2 characters');

      return false;
    }

    return true;
  };

  const handleNewHeroData = (field: string, value: string) => {
    setErrorMessage('');

    if (field !== 'images') {
      setHero(prevState => ({
        ...prevState,
        [field]: value,
      }));
    }

    if (field === 'images') {
      const newImages = value.split(',');

      setHero(prevState => ({
        ...prevState,
        [field]: newImages,
      }));
    }
  };

  const isValidForm = () => {
    const heroValues = Object.values(hero);

    return heroValues.every(value => {
      if (typeof value === 'string') {
        return isValidTextInput(value);
      }

      return true;
    });
  };

  const handleAddNewHero = (event: FormEvent) => {
    event.preventDefault();

    if (!isValidForm()) {
      return;
    }

    if (heroId) {
      dispatch(updateHeroById({
        ...hero,
        _id: heroId,
      }));
    } else {
      dispatch(addNewHero(hero));
    }

    navigate('/');
  };

  const isDisabled = !hero.catch_phrase || !hero.nickname || !hero.origin_description || !hero.real_name || !hero.images?.length;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalContentWrapper>
        <form
          style={{
            display: 'grid',
            margin: '30px',
            gap: '20px',
          }}
          onSubmit={handleAddNewHero}
        >
          <TextField
            sx={{ placeSelf: 'center' }}
            type="text"
            placeholder="NickName"
            value={hero.nickname}
            onChange={(event) => (
              handleNewHeroData('nickname', event.target.value)
            )}
            required
            error={!!errorMessage && hero.nickname.length < 3}
            helperText={(hero.nickname.length < 3) && errorMessage}
          />

          <TextField
            sx={{ placeSelf: 'center' }}
            type="text"
            placeholder="Real Name"
            value={hero.real_name}
            onChange={(event) => (
              handleNewHeroData('real_name', event.target.value)
            )}
            required
            error={!!errorMessage && hero.real_name.length < 3}
            helperText={(hero.real_name.length < 3) && errorMessage}
          />

          <TextField
            sx={{ placeSelf: 'center' }}
            type="text"
            placeholder="Origin description"
            value={hero.origin_description}
            onChange={(event) => (
              handleNewHeroData('origin_description', event.target.value)
            )}
            required
            error={!!errorMessage && hero.origin_description.length < 3}
            helperText={(hero.origin_description.length < 3) && errorMessage}
          />

          <TextField
            sx={{ placeSelf: 'center' }}
            type="text"
            placeholder="Superpowers"
            value={hero.superpowers}
            onChange={(event) => (
              handleNewHeroData('superpowers', event.target.value)
            )}
            required
            error={!!errorMessage && hero.superpowers.length < 3}
            helperText={(hero.superpowers.length < 3) && errorMessage}
          />

          <TextField
            sx={{ placeSelf: 'center' }}
            type="text"
            placeholder="Catch phrase"
            value={hero.catch_phrase}
            onChange={(event) => (
              handleNewHeroData('catch_phrase', event.target.value)
            )}
            required
            error={!!errorMessage && hero.catch_phrase.length < 3}
            helperText={(hero.catch_phrase.length < 3) && errorMessage}
          />

          <TextField
            sx={{ placeSelf: 'center' }}
            label="Images"
            placeholder="Image URL"
            value={hero.images.join(', ')}
            onChange={(event) => {
              handleNewHeroData('images', event.target.value);
              setErrorMessage('');
            }}
            error={!!errorMessage}
            helperText={errorMessage}
          />

          <Button
            type="submit"
            disabled={isDisabled}
          >
            {heroId ? 'Edit hero' : 'Add hero'}
          </Button>

          <Button
            type="button"
            onClick={() => navigate('/')}
          >
            Cancel
          </Button>
        </form>
      </ModalContentWrapper>
    </Modal>
  );
};
