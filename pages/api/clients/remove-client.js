import { getClient } from '../../../lib/db-utils';

import { getSession } from 'next-auth/client';

const handler = async (req, res) => {
  if (req.method !== 'DELETE') return;
  const client = await getClient();
  const session = getSession({ req });
  console.log(session.user.email);

  const { email } = session.user;
  const { clientId } = req.body;
};

export default handler;
