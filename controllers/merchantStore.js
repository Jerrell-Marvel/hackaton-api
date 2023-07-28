import axios from "axios";
import { MerchantStore } from "../models/MerchantStore.js";
import { NotFoundError } from "../errors/NotFoundError.js";

export const createMerchantStore = async (req, res) => {
  const { name } = req.body;
  const { authorization } = req.headers;

  const createAccountResponse = await axios.post(
    "http://34.101.154.14:8175/hackathon/bankAccount/create",
    { balance: 0 },
    {
      headers: {
        Authorization: authorization,
      },
    }
  );

  const createAccountData = createAccountResponse.data.data;

  const { accountName, accountNo } = createAccountData;
  const merchantStore = await MerchantStore.create({
    name,
    accountName,
    accountNo,
  });

  return res.json(merchantStore);
};

export const getMerchantStoreInfo = async (req, res) => {
  const { merchantStoreId } = req.params;
  const merchantStoreInfo = await MerchantStore.findOne({
    _id: merchantStoreId,
  });

  if (!merchantStoreInfo) {
    throw new NotFoundError("Merchant Store Info Not Found");
  }

  return res.json(merchantStoreInfo);
};
