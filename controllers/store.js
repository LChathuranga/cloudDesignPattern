import { client } from "../lib/cache.js";
import Store from "../models/Store.js";

export const getStore = async (req, res) => {
  let redisKey = "products";
  let products;
  let isCached = false;

  try {
    const cacheResults = await client.get(redisKey);
    if (cacheResults) {
      isCached = true;
      products = JSON.parse(cacheResults);
    } else {
      products = await Store.find();
      client.setEx(redisKey, 3600, JSON.stringify(products));
    }
    res.status(200).json({ products, isCached });
  } catch (error) {
    console.error(error);
    res.status(404).send("Data unavailable");
  }
};

export const addStore = async (req, res) => {
  let redisKey = "products";
  try {
    const newProduct = await Store.create(req.body);
    if (newProduct) {
      client.setEx(redisKey, 1, "");
      res.status(200).json({ newProduct });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteAll = async (req, res) => {
  let redisKey = "products";
  Store.collection.drop((err) => {
    if (err) {
      res.status(500).json({ message: "Internal server error" });
    } else {
      client.setEx(redisKey, 1, "");
      res.status(200).json({ message: "All records deleted successfully!" });
    }
  });
};
