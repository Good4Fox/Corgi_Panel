import cron from 'node-cron'
import fetch from 'node-fetch'
import fastifyPostgres from '@fastify/postgres'

export function dataBase(app, __dirname) {
    app.register(fastifyPostgres, {
        connectionString: 'postgresql://postgres@localhost:5432/models',

        onConnect: (client) => {
            fastify.log.info('Database connection successfully established')
        }
    })

    app.addHook('onReady', async () => {
        const client = await app.pg.connect()
        const queryText = `
            CREATE TABLE IF NOT EXISTS models (
            id SERIAL PRIMARY KEY,
            name TEXT,
            description TEXT,
            context_length NUMERIC,
            tokenizer TEXT,
            modality TEXT
            )
        `
        
        try {
            await client.query(queryText)
            app.log.info('Table "models" has been successfully created or already exists.')
        } catch (error) {
            app.log.error('Error creating table "models":', error)
        } finally {
            client.release()
        }
    })

    async function updateData() {
        try {
            const response = await fetch('https://openrouter.ai/api/v1/models')
            if (!response.ok) {
                throw new Error(`API call failed with status ${response.status}`)
            }
            const jsonResponse = await response.json()
            const data = jsonResponse.data
    
            console.log('Data successfully retrieved from the API.')
    
            const client = await app.pg.connect()
            await client.query('TRUNCATE models RESTART IDENTITY')
    
            console.log('Table "models" has been successfully truncated.')
    
            for (const item of data) {
                await client.query(
                    'INSERT INTO models(name, description, context_length, tokenizer, modality) VALUES($1, $2, $3, $4, $5)',
                    [item.name, item.description, item.context_length, item.architecture.tokenizer, item.architecture.modality]
                )
            }
    
            console.log(`Data successfully inserted into the database. Total records inserted: ${data.length}.`)
    
            client.release()
        } catch (error) {
            console.error('Failed to update data:', error)
        }
    }

    cron.schedule('0 0 * * *', () => {
        updateData()
    })
    
    app.get('/api/models', async (request, reply) => {
        try {
            const client = await app.pg.connect()
            const { rows } = await client.query('SELECT * FROM models')
            client.release()
            reply.send(rows)
        } catch (err) {
            request.log.error(err)
            reply.code(500).send('Internal Server Error')
        }
    })

    app.post('/api/models', async (request, reply) => {
        const { name, description, context_length, tokenizer, modality } = request.body;
        try {
            const client = await app.pg.connect();
            const result = await client.query(
                'INSERT INTO models(name, description, context_length, tokenizer, modality) VALUES($1, $2, $3, $4, $5) RETURNING id',
                [name, description, context_length, tokenizer, modality]
            );
            client.release();
            reply.code(201).send({ id: result.rows[0].id });
        } catch (err) {
            request.log.error(err);
            reply.code(500).send('Internal Server Error');
        }
    });
    
    app.get('/api/models/:id', async (request, reply) => {
        const id = parseInt(request.params.id, 10);
        if (isNaN(id)) {
            return reply.status(400).send({ error: "Invalid model ID" });
        }
    
        try {
            const client = await app.pg.connect();
            const { rows } = await client.query('SELECT * FROM models WHERE id = $1', [id]);
            client.release();
    
            if (rows.length === 0) {
                return reply.status(404).send({ error: "Model not found" });
            }
            
            reply.send(rows[0]);
        } catch (err) {
            request.log.error(err);
            reply.code(500).send('Internal Server Error');
        }
    });
    
    app.put('/api/models/:id', async (request, reply) => {
        const { id } = request.params;
        const { name, description, context_length, tokenizer, modality } = request.body;
        try {
            const client = await app.pg.connect();
            await client.query(
                'UPDATE models SET name = $1, description = $2, context_length = $3, tokenizer = $4, modality = $5 WHERE id = $6',
                [name, description, context_length, tokenizer, modality, id]
            );
            client.release();
            reply.send('Model updated successfully');
        } catch (err) {
            request.log.error(err);
            reply.code(500).send('Internal Server Error');
        }
    });
    
    app.delete('/api/models/:id', async (request, reply) => {
        const { id } = request.params;
        try {
            const client = await app.pg.connect();
            await client.query('DELETE FROM models WHERE id = $1', [id]);
            client.release();
            reply.send('Model deleted successfully');
        } catch (err) {
            request.log.error(err);
            reply.code(500).send('Internal Server Error');
        }
    });
}