import { openDB } from '../openDB';
import { IMake } from '~/interfaces/Car';

export async function getMakes(): Promise<IMake[]> {
  const db = await openDB();
  const makes = await db.all(`
                             SELECT make, count(id) as count
                             FROM Car
                             GROUP BY make
                             `);

  return makes;
}
