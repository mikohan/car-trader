import { GetServerSideProps } from 'next';
import { getMakes } from '~/database/getMakes';
import { CarModel } from 'api/Car';

interface HomeProps {
  makes: CarModel[];
}

export default function Home({ makes }: HomeProps) {
  return (
    <div>
      {makes.map((make: CarModel) => (
        <pre>{JSON.stringify(make)}</pre>
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const makes = await getMakes();
  return {
    props: {
      makes: makes,
    },
  };
};
