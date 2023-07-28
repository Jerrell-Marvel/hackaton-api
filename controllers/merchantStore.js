import axios from "axios";
import { MerchantStore } from "../models/MerchantStore.js";
import { NotFoundError } from "../errors/NotFoundError.js";

import qr from "qrcode";
import fs from "fs";
import { InternalServerError } from "../errors/InternalServerError.js";

export const createMerchantStore = async (req, res, next) => {
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

  // Create qrcode
  let url = `localhost:3000/charge/${merchantStore._id}`;

  qr.toDataURL(url, { type: "image/png" }, function (err, qrCodeData) {
    if (err) {
      return next(new InternalServerError("fail to process qr code"));
    }

    const imageFileName = `${Date.now()}_${merchantStore._id}.png`;

    const imagePath = `./public/${imageFileName}`;
    fs.writeFile(imagePath, qrCodeData.replace(/^data:image\/png;base64,/, ""), "base64", async (err) => {
      if (err) {
        return next(new InternalServerError("fail to process qr code"));
      }

      const updatedMerchantStore = await MerchantStore.findOneAndUpdate(
        {
          name,
          accountName,
          accountNo,
        },
        {
          qrCodeImg: imageFileName,
        },
        {
          new: true,
        }
      );

      return res.json(updatedMerchantStore);
    });
  });
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

export const getAllMerchants = async (req, res) => {
  const { uid, phoneNumber, gender, createTime, ktpId, updateTime, birthDate, email, username } = req.user;

  const merchantStores = await MerchantStore.find({ accountName: username });

  const result = [];

  for (const merchantStore of merchantStores) {
    const accountInfoResponse = await axios.post(
      "http://34.101.154.14:8175/hackathon/bankAccount/info",
      {
        accountNo: merchantStore._doc.accountNo,
      },
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );

    result.push({ ...merchantStore._doc, accountInfo: accountInfoResponse.data });
  }

  return res.json(result);
};
