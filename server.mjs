import fastify from 'fastify'
import path from 'path'
import { fileURLToPath } from 'url'
import { registerRoutes } from './app/routes.js'
import { registerStatic } from './app/static.js'


const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = fastify({ logger: true, disableRequestLogging: true })


registerStatic(app, __dirname)
registerRoutes(app, __dirname)


const start = async () => {
  try {
    const address = await app.listen({ port: 3000 })
    app.log.info(`Server listening on ${address}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}


start()
