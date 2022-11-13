import { About } from './components/About/About';
import { Benefits } from './components/Benefits/Benefits';
import { Team } from './components/Team/Team';

export const Welcome = () => {
  return (
    <main className='main'>
      <About />
      <Benefits />
      <Team />
    </main>
  );
};
