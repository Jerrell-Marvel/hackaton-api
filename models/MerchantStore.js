import { Schema, model, Types } from "mongoose";

const MerchantStoreSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  accountName: {
    type: String,
    required: true,
    unique: true,
  },

  accountNo: {
    type: String,
    required: true,
    unique: true,
  },

  verified: {
    type: Boolean,
    required: true,
    default: false,
  },

  assets: {
    type: [String],
    default: [],
  },
});

export const MerchantStore = model("MerchantStore", MerchantStoreSchema);
