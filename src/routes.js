import { Router } from 'express';

import User from './app/models/User';

const router = new Router();

router.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Lucas Pessone',
    email: 'lucas.rmagalhaes@gmail.com',
    password_hash: 'oid091eoiqid0912jdoq',
  });

  return res.json(user);
});

export default router;
