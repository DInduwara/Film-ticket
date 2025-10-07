import cassandra from "cassandra-driver";
import dotenv from "dotenv";
dotenv.config();

const client = new cassandra.Client({
  contactPoints: [process.env.CASSANDRA_HOST],
  localDataCenter: "datacenter1",
  keyspace: process.env.CASSANDRA_KEYSPACE,
});

client.connect()
  .then(() => console.log("✅ Connected to Cassandra"))
  .catch(err => console.error("❌ Cassandra connection failed:", err));

export default client;
