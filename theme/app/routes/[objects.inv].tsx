import type { LoaderFunction } from '@remix-run/node';
import { getObjectsInv } from '../utils';

export const loader: LoaderFunction = async (): Promise<Response> => {
  const inv = await getObjectsInv();
  if (!inv) return new Response('Inventory not found', { status: 404 });
  return new Response(inv);
};
