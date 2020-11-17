import { openDB } from '../openDB';

export async function getMakes() {
  const db = await openDB();
  const makes = await db.all(`
                             SELECT make, count(id) as count
                             FROM Car
                             GROUP BY make
                             `);

  return makes;
}
