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


  app.get('/api/models', async (request, reply) => {
    try {
      let jsonData = {
          message: "GET model request received"
      }
      return reply.send(jsonData)
    } catch (err) {
      request.log.error(err)
      reply.code(500).send('Internal Server Error')
    }
  })

  app.post('/api/models', async (request, reply) => {
    try {
      let jsonData = {
          message: "POST model request received"
      }
      return reply.send(jsonData)
    } catch (err) {
      request.log.error(err)
      reply.code(500).send('Internal Server Error')
    }
  })


  app.get('/api/models/:id', async (request, reply) => {
    try {
      let jsonData = {
          message: "GET ID model request received"
      }
      return reply.send(jsonData)
    } catch (err) {
      request.log.error(err)
      reply.code(500).send('Internal Server Error')
    }
  });

  app.put('/api/models/:id', async (request, reply) => {
    try {
      let jsonData = {
          message: "PUT ID model request received"
      }
      return reply.send(jsonData)
    } catch (err) {
      request.log.error(err)
      reply.code(500).send('Internal Server Error')
    }
  });

  app.delete('/api/models/:id', async (request, reply) => {
    try {
      let jsonData = {
          message: "DELETE ID model request received"
      }
      return reply.send(jsonData)
    } catch (err) {
      request.log.error(err)
      reply.code(500).send('Internal Server Error')
    }
  });

  app.get('/favicon.ico', (request, reply) => {
    reply.code(204).send();
  });

  //  Requests under HTML standard 443

  // app.get('/example', (request, reply) => {
  //   reply.send({ message: 'GET request received' });
  // });
  
  // app.post('/example', async (request, reply) => {
  //   reply.send({ message: 'POST request received' });
  // });
  
  
  // app.put('/example', async (request, reply) => {
  //   reply.send({ message: 'PUT request received' });
  // });
  
  
  // app.patch('/example', async (request, reply) => {
  //   reply.send({ message: 'PATCH request received' });
  // });
  
  
  // app.delete('/example', async (request, reply) => {
  //   reply.send({ message: 'DELETE request received' });
  // });
  
  // app.head('/path', async (request, reply) => {
  //   reply.header('Custom-Header', 'value');
  //   reply.send();
  // });
  
  
  // app.options('/example', async (request, reply) => {
  //   reply.send({ message: 'OPTIONS request received' });
  // });

}
