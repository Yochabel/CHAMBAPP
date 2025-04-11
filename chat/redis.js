const { createClient } = require('redis');

const pubClient = createClient({ url: 'redis://redis:6379' }); // nombre del contenedor Redis
const subClient = pubClient.duplicate();

(async () => {
  await pubClient.connect();
  await subClient.connect();
})();

module.exports = { pubClient, subClient };
