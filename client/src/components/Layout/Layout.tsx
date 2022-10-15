import { FC } from 'react';
import { Header } from '../Header';

type Props = {
  children: JSX.Element,
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};
