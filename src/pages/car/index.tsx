import { Grid } from '@material-ui/core';
import { getAsString } from '~/helpers';
import { getMakes } from '~/database/getMakes';
import { getModels } from '~/database/getModel';
import { GetServerSideProps } from 'next';
import { IMake, IModel, ICar } from '~/interfaces/Car';
import Search from '~/pages/index';
import { getPaginatedCars } from '~/database/getPaginatedCars';
import { useRouter } from 'next/router';
import { stringify } from 'querystring';
import useSWR from 'swr';
import { useState, useEffect } from 'react';
import deepEqual from 'fast-deep-equal';
import { CarPagination } from '~/components/CarPagination';
import CarCard from '~/components/CarCard';

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
  const { query } = useRouter();
  const [serverQuery] = useState(query);
  useEffect(() => {}, []);
  const sleep = (ms: number) => new Promise((r: any) => setTimeout(r, ms));
  function getData(query: any) {
    sleep(3000);
    const { data } = useSWR(`/api/cars?${stringify(query)}`, {
      dedupingInterval: 60000,
      initialData: deepEqual(query, serverQuery)
        ? { cars, totalPages }
        : undefined,
    });
    return data;
  }
  const data = getData(query);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={5} md={3} lg={2}>
        <Search singleColumn makes={makes} models={models} />
      </Grid>
      <Grid container item xs={12} sm={7} md={9} lg={10} spacing={3}>
        <Grid item xs={12}>
          <CarPagination totalPages={data?.totalPages} />
        </Grid>
        {(data?.cars || []).map((car: ICar) => (
          <Grid key={car.id} item xs={12} sm={6}>
            <CarCard car={car} />
          </Grid>
        ))}
        <CarPagination totalPages={data?.totalPages} />
      </Grid>
    </Grid>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const param = context.query!.make;

  const make = getAsString(param);
  const [makes, models, pagination] = await Promise.all([
    getMakes(),
    getModels(make),
    getPaginatedCars(context.query),
  ]);
  return {
    props: {
      makes: makes,
      models: models,
      cars: pagination.cars,
      totalPages: pagination.totalPages,
    },
  };
};
