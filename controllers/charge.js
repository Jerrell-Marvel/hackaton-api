import { BadRequestError } from "../errors/BadRequestError.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { MerchantStore } from "../models/MerchantStore.js";
import axios from "axios";

export const charge = async (req, res) => {
  const { merchantStoreId } = req.params;
  const { authorization } = req.headers;
  const { senderAccountNo, amount } = req.body;

  const merchantStore = await MerchantStore.findOne({ _id: merchantStoreId });
  if (!merchantStore) {
    throw new NotFoundError("merchant store not found");
  }
  const receiverAccountNo = merchantStore.accountNo;

  const accountInfoResponse = await axios.post("http://34.101.154.14:8175/hackathon/bankAccount/info/all", null, {
    headers: {
      Authorization: authorization,
    },
  });

  const accountInfoData = accountInfoResponse.data.data.accounts;

  const isSenderAccountNoValid = accountInfoData.some((accountInfo) => {
    return accountInfo.accountNo === senderAccountNo;
  });

  if (!isSenderAccountNoValid) {
    throw new BadRequestError("invalid sender account number");
  }

  const transaction = await axios.post(
    "http://34.101.154.14:8175/hackathon/bankAccount/transaction/create",
    {
      senderAccountNo,
      receiverAccountNo,
      amount,
    },
    {
      headers: {
        Authorization: authorization,
      },
    }
  );

  if (amount >= 100000) {
    const fee = (amount * 0.3) / 100;
    const transactionFeeResponse = await axios.post(
      "http://34.101.154.14:8175/hackathon/bankAccount/transaction/create",
      {
        senderAccountNo: receiverAccountNo,
        receiverAccountNo: "5859452266220981",
        amount: fee,
      },
      {
        headers: {
          Authorization: authorization,
        },
      }
    );
  }

  return res.json(transaction.data);
};
