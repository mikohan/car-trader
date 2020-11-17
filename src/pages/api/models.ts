import { getModels } from '~/database/getModel';
import { getAsString } from '~/helpers';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function models(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const make = getAsString(req.query.make);
  const models = await getModels(make);
  res.json(models);
}
