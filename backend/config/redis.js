const { createClient } = require("redis");
const client = createClient({
  username: "default",
  password: "7iKk7ISnUhCMjXtmCYYx7yFVJxWA4F0f",
  socket: {
    host: "redis-17458.crce206.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 17458,
  },
});

client.on("error", (err) => console.error("Redis Client Error", err));

async function connectRedis() {
  await client.connect();
  await client.set("foo", "bar");
  const result = await client.get("foo");
  console.log(result); // bar
}

connectRedis();

module.exports = client;
