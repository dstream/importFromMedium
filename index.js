const mediumToMarkdown = require('medium-to-markdown');

const fs = require('fs');
const fastify = require('fastify')({
  logger: false,
//   https: {
//     key: fs.readFileSync( '/etc/letsencrypt/live/crowdsharing.cash/privkey.pem' ),
//     cert: fs.readFileSync( '/etc/letsencrypt/live/crowdsharing.cash/fullchain.pem' )
//   }
})
fastify.register(require('fastify-cors'), {})

fastify.get('/get', async (request, reply) => {
    reply.type('application/json').code(200)
    let md = await mediumToMarkdown.convertFromUrl(request.query.address)
    return {data:md};
  })

fastify.get('/', async (request, reply) => {
  reply.type('application/json').code(200)
  return { hello: 'world' }

})

let PORT = typeof process.env.PORT === 'undefined' ? 3000 : process.env.PORT;
fastify.listen(PORT , '0.0.0.0', (err, address) => {
  if (err) throw err
  console.info(`server listening on ${address}`)
})
