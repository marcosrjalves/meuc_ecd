import * as Yup from 'yup';
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

class EcdController {
    async list(req, res) {
        try {
            const hoje          = new Date()
            const dataInicial   = new Date(hoje.getTime() - 60 * 60 * 24 * 1 * 1000)
            const dataFinal     = new Date(hoje.getTime() + 60 * 60 * 24 * 7 * 1000);
            const reunioes = await prisma.participantes_por_reuniao.findMany({
                where: {
                    datar: {
                        lte: dataFinal,
                        gte: dataInicial,
                    },
                    tipo_ministerio_id: {
                        equals: 12
                    }
                }
            })
            
            return res.json([reunioes])

        } catch (error) {

            const message = 'Internal Server Error'
            console.log(err)
            res.statusCode = err.statusCode
            return res.json([message, err])

        } finally {

            (async () => {
                await prisma.disconnect()
            })

        }
    }

    async create(req, res) {
        try {
            const schema = Yup.object().shape({
                reuniao_id: Yup.number().required(),
                nome: Yup.string().required(),
                qtd_pessoas: Yup.number().required(),
            });
        
            if (!(await schema.isValid(req.body))) {
                return res.status(400).json({ error: 'Validation Error' });
            }
    
            const { reuniao_id, nome, qtd_pessoas } = req.body;
    
            const newAgenda = await prisma.reunioes_participantes.create({
                data: {
                    nome: nome,
                    qtd_pessoas: qtd_pessoas,
                    reunioes: {
                      connect: {
                          id: reuniao_id
                      },
                    },
                }
            })
            
            return res.json(newAgenda);
            
        } catch (error) {

            const message = 'Internal Server Error'
            console.log(err)
            res.statusCode = err.statusCode
            return res.json([message, err])

        } finally {

            (async () => {
                await prisma.disconnect()
            })

        }
    }
}

export default new EcdController();
