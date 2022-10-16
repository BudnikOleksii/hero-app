import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import { getHeroById } from '../../api/heroes';
import { Hero } from '../../types/Hero';
import { HeroDetails } from '../HeroDetails';

export const HeroModal: FC = () => {
  const { heroId = 0 } = useParams();
  const navigate = useNavigate();

  const [open, setOpen] = useState(heroId !== 0);
  const [currentHero, setCurrentHero] = useState<Hero | null>(null);
  const [isHeroLoading, setIsHeroLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (heroId) {
      setIsError(false);
      setIsHeroLoading(true);

      getHeroById(heroId)
        .then(setCurrentHero)
        .catch(() => setIsError(true))
        .finally(() => setIsHeroLoading(false));
    }
  }, [heroId]);

  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          {isHeroLoading && <LinearProgress />}

          {isError && (
            <Alert severity="error">Something went wrong!</Alert>
          )}

          {currentHero && (<HeroDetails hero={currentHero} />)}
        </>
      </Modal>
    </div>
  );
};
