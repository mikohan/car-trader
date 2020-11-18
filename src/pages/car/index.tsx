import { Grid } from '@material-ui/core';
import { getAsString } from '~/helpers';
import { getMakes } from '~/database/getMakes';
import { getModels } from '~/database/getModel';
import { GetServerSideProps } from 'next';
import { IMake, IModel, ICar } from '~/interfaces/Car';
import Search from '~/pages/index';
import { getPaginatedCars } from '~/database/getPaginatedCars';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { useRouter } from 'next/router';
import { PaginationRenderItemParams } from '@material-ui/lab';
import { ParsedUrlQuery } from 'querystring';
import Link from 'next/link';
import { forwardRef } from 'react';

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
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={5} md={3} lg={2}>
        <Search singleColumn makes={makes} models={models} />
      </Grid>
      <Grid item xs={12} sm={7} md={9} lg={10}>
        <Pagination
          page={parseInt(getAsString(query.page) || '1')}
          count={totalPages}
          renderItem={(item) => (
            <PaginationItem
              component={MaterialUiLink}
              query={query}
              item={item}
              {...item}
            />
          )}
        />
        <pre>{JSON.stringify({ cars, totalPages }, null, 4)}</pre>
      </Grid>
    </Grid>
  );
}

interface MaterialUiLinkProps {
  item: PaginationRenderItemParams;
  query: ParsedUrlQuery;
}

const MaterialUiLink = forwardRef<HTMLAnchorElement, MaterialUiLinkProps>(
  ({ item, query, ...props }: MaterialUiLinkProps, ref) => (
    <Link
      href={{
        pathname: '/car',
        query: { ...query, page: item.page },
      }}
      shallow
    >
      <a ref={ref} {...props}></a>
    </Link>
  )
);

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
