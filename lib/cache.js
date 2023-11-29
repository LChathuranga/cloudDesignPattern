import { createClient } from "redis";

const client = createClient({
  password: "Q98yNSQyQmu6QU84VDoXgJbugVUloJ6T",
  socket: {
    host: "redis-14160.c321.us-east-1-2.ec2.cloud.redislabs.com",
    port: "14160",
  },
});

client.on("error", (err) => console.log(err));

if (!client.isOpen) {
  client.connect();
}

export { client };
