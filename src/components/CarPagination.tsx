import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { getAsString } from '~/helpers';

import { MaterialUiLink } from './MaterialUiLink';
import { useRouter } from 'next/router';

interface CarPaginationProps {
  totalPages: number;
}

export function CarPagination({ totalPages }: CarPaginationProps) {
  const { query } = useRouter();
  return (
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
  );
}
