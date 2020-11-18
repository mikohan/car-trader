import { PaginationRenderItemParams } from '@material-ui/lab';
import { ParsedUrlQuery } from 'querystring';
import Link from 'next/link';
import { forwardRef } from 'react';
interface MaterialUiLinkProps {
  item: PaginationRenderItemParams;
  query: ParsedUrlQuery;
}
export const MaterialUiLink = forwardRef<
  HTMLAnchorElement,
  MaterialUiLinkProps
>(({ item, query, ...props }: MaterialUiLinkProps, ref) => (
  <Link
    href={{
      pathname: '/car',
      query: { ...query, page: item.page },
    }}
    shallow
  >
    <a ref={ref} {...props}></a>
  </Link>
));
