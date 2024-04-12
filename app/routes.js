import { promises as fs } from 'fs'
import path from 'path'
import { readFile } from 'fs/promises';

import jwt from 'jsonwebtoken'

export function registerRoutes(app, __dirname) { 

  app.get('/', async (request, reply) => { 
    try { 
      const desktopPath = path.join(__dirname, 'dist', '/app/template/default/page/html/index.html')
      const content = await fs.readFile(desktopPath, 'utf8')
      return reply.type('text/html').send(content)
    } catch (err) { 
      request.log.error(err)
      return reply.code(500).send('Internal Server Error')
    } 
  })

  app.get('/models', async (request, reply) => { 
    try { 
      const desktopPath = path.join(__dirname, 'dist', '/app/template/default/page/html/models.html')
      const content = await fs.readFile(desktopPath, 'utf8')
      return reply.type('text/html').send(content)
    } catch (err) { 
      request.log.error(err)
      return reply.code(500).send('Internal Server Error')
    } 
  })

  app.setNotFoundHandler(async (request, reply) => { 
    try { 
      const notFoundPath = path.join(__dirname, 'dist', '/app/template/default/page/html/404.html')
      const content = await fs.readFile(notFoundPath, 'utf8')
      return reply.code(404).type('text/html').send(content)
    } catch (err) { 
      request.log.error(err)
      return reply.code(404).send('Not Found')
    } 
  })

  app.setErrorHandler(async (error, request, reply) => { 
    try { 
      const serverErrorPath = path.join(__dirname, 'dist', '/app/template/default/page/html/500.html')
      const content = await fs.readFile(serverErrorPath, 'utf8')
      return reply.code(500).type('text/html').send(content)
    } catch (err) { 
      request.log.error(err)
      return reply.code(500).send('Internal Server Error')
    } 
  })

  app.get('/favicon.ico', (request, reply) => {
    reply.code(204).send()
  })
  
}
