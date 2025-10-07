import express from "express";
import dotenv from "dotenv";
import ticketRoutes from "./routes/tickets.js";
dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("🎬 Movie Ticket API is running!"));
app.use("/tickets", ticketRoutes);

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);
