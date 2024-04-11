import fastifyStatic from '@fastify/static'
import path from 'path'


export function registerStatic(app, __dirname) {
    app.register(fastifyStatic, {
        root: path.join(__dirname, 'dist'),
        prefix: '/',
        setNotFoundHandler: true,
    })
}
