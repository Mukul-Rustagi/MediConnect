const { createClient } = require("redis");
const client = createClient({
  username: "default",
  password: "ULVv73VRfwImGoVNnEGi7QVjsriWQkJk",
  socket: {
    host: "redis-10280.c114.us-east-1-4.ec2.redns.redis-cloud.com",
    port: 10280,
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
