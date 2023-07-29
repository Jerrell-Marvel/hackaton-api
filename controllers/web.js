import axios from "axios";
import { MerchantStore } from "../models/MerchantStore.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { Web } from "../models/Web.js";
import { WebProductItem } from "../models/WebProductItem.js";

export const createWeb = async (req, res) => {
  const { merchantStoreId } = req.params;

  const { uid, phoneNumber, gender, createTime, ktpId, updateTime, birthDate, email, username } = req.user;

  const { mainHeader, mainDescription, address, openSchedule, phoneNumber: webPhoneNumber, twitter, instagram, facebook, whatsapp, products } = req.body;

  const merchantStore = await MerchantStore.findOne({ _id: merchantStoreId, accountName: username });

  if (!merchantStore) {
    throw new NotFoundError("merchant not found");
  }

  const web = await Web.create({ merchantStoreId, mainHeader, mainDescription, address, openSchedule, phoneNumber: webPhoneNumber, twitter, instagram, facebook, whatsapp, mainImg: req.files["main-banner-img"][0].filename });

  const productsJSON = JSON.parse(products);

  let i = 0;
  for (const file of req.files["product-img"]) {
    const webProductItem = await WebProductItem.create({ webId: web._id, imgUrl: file.filename, name: productsJSON[i].name, description: productsJSON[i].description });
    i++;
  }

  return res.json({ merchantStore, body: req.body, files: req.files });
};

export const getWebData = async (req, res) => {
  const { merchantStoreName } = req.params;
  const merchantStore = await MerchantStore.findOne({ name: merchantStoreName });

  if (!merchantStore) {
    throw new NotFoundError("merchant store not found");
  }

  const merchantWebData = await Web.findOne({ merchantStoreId: merchantStore._id });

  if (!merchantWebData) {
    throw new NotFoundError("merchant web data not found");
  }

  const products = await WebProductItem.find({ webId: merchantWebData._id });

  return res.json({ ...merchantWebData._doc, products });
};
