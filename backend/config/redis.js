// redis.js
const { createClient } = require('redis');

const client = createClient({
    username: 'default',
    password: '6Xz6d0mcxU91PVggjeY2xzFuOixSZ2wf',
    socket: {
        host: 'redis-19029.crce179.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 19029
    }
});

client.on('error', err => console.error('Redis Client Error', err));

async function connectRedis() {
    await client.connect();
    await client.set('foo', 'bar');
    const result = await client.get('foo');
    console.log(result); // bar
}

connectRedis();

module.exports = client;
