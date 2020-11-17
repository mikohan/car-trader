import { GetServerSideProps } from 'next';
import { getMakes } from '~/database/getMakes';
import { IMake } from '~/interfaces/Car';

interface HomeProps {
  makes: IMake[];
}

export default function Home({ makes }: HomeProps) {
  return (
    <div>
      {makes.map((make: IMake) => (
        <pre>{JSON.stringify(make)}</pre>
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const makes: IMake[] = await getMakes();
  return {
    props: {
      makes: makes,
    },
  };
};
