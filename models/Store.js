import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema({
  productName: {
    type: String,
    require: true,
    min: 5,
    max: 20,
  },
  quantity: {
    type: Number,
    require: true,
  },
  inStock: {
    type: Boolean,
  },
  description: {
    type: String,
    require: true,
    max: 100,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
});

const Store = mongoose.model("Store", StoreSchema);
export default Store;
