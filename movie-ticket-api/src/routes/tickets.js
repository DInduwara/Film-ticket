import express from "express";
import client from "../cassandra.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

const table = "tickets";

/**
 * 🎟️ Create Ticket
 */
router.post("/", async (req, res) => {
  const { movie_name, seat_number, price, customer_name } = req.body;
  const id = uuidv4();

  try {
    const query = `
      INSERT INTO ${table} (id, movie_name, seat_number, price, customer_name)
      VALUES (?, ?, ?, ?, ?)
    `;
    await client.execute(query, [id, movie_name, seat_number, price, customer_name], { prepare: true });
    res.status(201).json({ message: "Ticket created", id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create ticket" });
  }
});

/**
 * 📋 Get All Tickets
 */
router.get("/", async (req, res) => {
  try {
    const query = `SELECT * FROM ${table}`;
    const result = await client.execute(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
});

/**
 * 🔍 Get Ticket by ID
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const query = `SELECT * FROM ${table} WHERE id = ?`;
    const result = await client.execute(query, [id], { prepare: true });
    if (result.rowLength === 0) return res.status(404).json({ message: "Ticket not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch ticket" });
  }
});

/**
 * ✏️ Update Ticket
 */
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { movie_name, seat_number, price, customer_name } = req.body;

  try {
    const query = `
      UPDATE ${table}
      SET movie_name = ?, seat_number = ?, price = ?, customer_name = ?
      WHERE id = ?
    `;
    await client.execute(query, [movie_name, seat_number, price, customer_name, id], { prepare: true });
    res.json({ message: "Ticket updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update ticket" });
  }
});

/**
 * ❌ Delete Ticket
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const query = `DELETE FROM ${table} WHERE id = ?`;
    await client.execute(query, [id], { prepare: true });
    res.json({ message: "Ticket deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete ticket" });
  }
});

export default router;
