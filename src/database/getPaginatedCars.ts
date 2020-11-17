import { ParsedUrlQuery } from 'querystring';
import { openDB } from '~/openDB';
import { getAsString } from '~/helpers';
import { ICar } from '~/interfaces/Car';

const mainQuery = `FROM Car
                  WHERE (@make IS NULL OR @make = make)
                  AND (@model IS NULL OR @model = model)
                  AND (@min IS NULL OR @min <= price)
                  AND (@max IS NULL OR @max >= price)
`;

export async function getPaginatedCars(query: ParsedUrlQuery) {
  const db = await openDB();

  const page = getValueNumber(query.page) || 1;
  const rowsPerPage = getValueNumber(query.rowsPerPage) || 4;
  const offset = (page - 1) * rowsPerPage;

  const dbParams = {
    '@make': getValuesString(query.make),
    '@model': getValuesString(query.model),
    '@min': getValueNumber(query.min),
    '@max': getValueNumber(query.max),
  };

  const carsPromise: Promise<ICar[]> = db.all(
    `SELECT * ${mainQuery}
      LIMIT @rowsPerPage OFFSET @offset
      `,
    {
      ...dbParams,
      '@rowsPerPage': rowsPerPage,
      '@offset': offset,
    }
  );
  const totalRowsPromise: Promise<{ count: number }> = db.get(
    `
    SELECT COUNT(id) as count ${mainQuery}
    `,
    dbParams
  );
  const [cars, totalRows] = await Promise.all([carsPromise, totalRowsPromise]);
  return { cars: cars, totalPages: Math.ceil(totalRows.count / rowsPerPage) };
}

function getValueNumber(value: string | string[]): number | null {
  const str = getAsString(value);
  const num = parseInt(str);
  return isNaN(num) ? null : num;
}

function getValuesString(value: string | string[]): string | null {
  const str = getAsString(value);
  return !str || str.toLowerCase() === 'all' ? null : str;
}
