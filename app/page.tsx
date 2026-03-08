import { FC } from 'react';

import { redirect } from 'next/navigation';

const Home: FC = () => {
  redirect('/quiz');
};

export default Home;
