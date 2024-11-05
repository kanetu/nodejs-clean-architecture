import express from 'express';
import { userRoutes } from './users';
import { agreementRoutes } from './agreements';

const routes = express.Router()

routes.use('/users', userRoutes)
routes.use('/agreements', agreementRoutes)

export default routes