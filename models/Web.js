import mongoose, { Schema, model } from "mongoose";

const WebSchema = new Schema({
  merchantStoreId: {
    type: mongoose.Types.ObjectId,
    ref: "MerchantStore",
    unique: true,
    required: true,
  },
  mainHeader: {
    type: String,
    required: true,
  },
  mainDescription: {
    type: String,
    required: true,
  },
  mainImg: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  openSchedule: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  twitter: {
    type: String,
    required: true,
  },
  instagram: {
    type: String,
    required: true,
  },
  facebook: {
    type: String,
    required: true,
  },
  whatsapp: {
    type: String,
    required: true,
  },
});

export const Web = model("Web", WebSchema);
