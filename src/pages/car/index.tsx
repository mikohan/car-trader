import { Grid } from '@material-ui/core';
import { getAsString } from '~/helpers';
import { getMakes } from '~/database/getMakes';
import { getModels } from '~/database/getModel';
import { GetServerSideProps } from 'next';
import { IMake, IModel, ICar } from '~/interfaces/Car';
import Search from '~/pages/index';

interface CarListProps {
  makes: IMake[];
  models: IModel[];
  cars: ICar[];
  totalPages: number;
}

export default function CarList({
  makes,
  models,
  cars,
  totalPages,
}: CarListProps) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={5} lg={2}>
        <Search singleColumn makes={makes} models={models} />
      </Grid>
      <Grid item xs={12} sm={7} md={9} lg={10}>
        <pre>{JSON.stringify(makes, null, 4)}</pre>
      </Grid>
    </Grid>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const param = context.query!.make;

  const make = getAsString(param);
  const [makes, models] = await Promise.all([getMakes(), getModels(make)]);
  return {
    props: {
      makes: makes,
      models: models,
    },
  };
};
