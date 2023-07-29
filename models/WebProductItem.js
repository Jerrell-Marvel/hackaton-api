import mongoose, { model, Schema } from "mongoose";

const WebProductItemSchema = new Schema({
  webId: {
    type: mongoose.Types.ObjectId,
    ref: "Web",
    required: true,
  },

  imgUrl: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
});

export const WebProductItem = model("WebProductItem", WebProductItemSchema);
