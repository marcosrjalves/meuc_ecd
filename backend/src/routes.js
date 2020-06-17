import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

// Controllers
import Ecd from './prisma/controllers/ecd_controller'

const routes = new Router();

routes.get('/lista', Ecd.list);
routes.post('/euvou', celebrate({
    [Segments.BODY]: Joi.object().keys({
        reuniao_id: Joi.number().required(),
        nome: Joi.string().required(),
        qtd_pessoas: Joi.number().required()
    })
}), Ecd.create);

export default routes;
