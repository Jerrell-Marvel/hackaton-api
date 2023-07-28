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

  qrCodeImg: {
    type: String,
    required: true,
    default: "alternate.png",
  },

  assets: {
    type: [String],
    default: [],
  },
});

export const MerchantStore = model("MerchantStore", MerchantStoreSchema);
