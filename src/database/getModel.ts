import { openDB } from '../openDB';
import { IModel } from '~/interfaces/Car';

export async function getModels(make: string): Promise<IModel[]> {
  const db = await openDB();
  const models = await db.all(
    `SELECT model, count(id) as count
     FROM Car
     WHERE make = ?
     GROUP BY model
     `,
    [make]
  );

  return models;
}
