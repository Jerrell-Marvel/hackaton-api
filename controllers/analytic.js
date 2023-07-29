import axios from "axios";
import { MerchantStore } from "../models/MerchantStore.js";
import { BadRequestError } from "../errors/BadRequestError.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { InternalServerError } from "../errors/InternalServerError.js";

export const getAnalyticNumberByYear = async (req, res) => {
  const { name } = req.params;
  console.log(name);
  const { authorization } = req.headers;
  // console.log(authorization);

  // const { accountNo, traxType, pageNumber, recordsPerPage } = req.body;
  try {
    const merchantStore = await MerchantStore.findOne({
      name: name,
    });
    if (!merchantStore) {
      throw new NotFoundError("merchant store not found");
    }

    const { accountNo } = merchantStore;
    console.log(accountNo);
    // console.log(accountNo);

    const getTransactionInfoResponse = await axios.post(
      "http://34.101.154.14:8175/hackathon/bankAccount/transaction/info",
      {
        accountNo: accountNo,
        traxType: ["TRANSFER_IN", "TRANSFER_OUT"],
        pageNumber: 1,
        recordsPerPage: 1000000000,
      },
      {
        headers: {
          Authorization: authorization,
        },
      }
    );
    // const transactionData = {
    //   transactions: [
    //     {
    //       uid: 189,
    //       amount: 20000,
    //       senderAccountNo: "5859453038371679",
    //       traxId: 283,
    //       traxType: "Transfer In",
    //       receiverAccountNo: "5859452129199725",
    //       transactionDate: 1690588604449,
    //     },
    //     {
    //       uid: 189,
    //       amount: 20000,
    //       senderAccountNo: "5859453038371679",
    //       traxId: 281,
    //       traxType: "Transfer In",
    //       receiverAccountNo: "5859452129199725",
    //       transactionDate: 1690588604509,
    //     },
    //     {
    //       uid: 189,
    //       amount: 20000,
    //       senderAccountNo: "5859453038371679",
    //       traxId: 279,
    //       traxType: "Transfer In",
    //       receiverAccountNo: "5859452129199725",
    //       transactionDate: 1690588603643,
    //     },
    //     {
    //       uid: 189,
    //       amount: 20000,
    //       senderAccountNo: "5859453038371679",
    //       traxId: 277,
    //       traxType: "Transfer In",
    //       receiverAccountNo: "5859452129199725",
    //       transactionDate: 1674976181000,
    //     },
    //   ],
    // };
    // console.log(getTransactionInfoResponse.data.data);

    const transactionData = getTransactionInfoResponse.data.data;
    // console.log(getTransactionInfoResponse.data.data);
    // console.log(transactionData);

    // get choosenYear from req.query
    const { year } = req.query;
    const chosenYearNumber = parseInt(year); // String to int
    // console.log(choosenYear);

    function filterTransactionsByReceiverAccount(transactions, receiverAccountNo) {
      return transactions.filter((transaction) => {
        return transaction.receiverAccountNo === receiverAccountNo;
      });
    }

    const receiverAccountNoToFilter = accountNo;

    const filteredTransactions = filterTransactionsByReceiverAccount(transactionData.transactions, receiverAccountNoToFilter);

    // console.log(filteredTransactions);

    // to filter data by year and month
    function filterByYearAndMonth(arr, year, month) {
      return arr.filter((transaction) => {
        const date = new Date(transaction.transactionDate);
        return date.getFullYear() === year && date.getMonth() === month - 1;
      });
    }

    // calculate total amount each month
    function calculateTotalAmount(transactionsPerMonth) {
      return transactionsPerMonth.reduce((total, transaction) => {
        if (transaction.traxType === "Transfer In") {
          return total + transaction.amount;
        }
        return total;
      }, 0);
    }

    function calculateTotalIncomeInAYear(transactions, year) {
      return transactions.reduce((total, transaction) => {
        if (transaction.traxType === "Transfer In") {
          const date = new Date(transaction.transactionDate);
          if (date.getFullYear() === year) {
            return total + transaction.amount;
          }
        }
        return total;
      }, 0);
    }

    // total income in a year
    const totalIncomeInAYear = calculateTotalIncomeInAYear(filteredTransactions, chosenYearNumber);
    // console.log(totalIncomeInAYear);

    // V1
    // give response each month amount value as a number
    const monthlyData = {};
    const arrMonth = ["januari", "februari", "maret", "april", "mei", "juni", "juli", "agustus", "september", "oktober", "november", "desember"];
    for (let month = 1; month <= 12; month++) {
      const transactionsPerMonth = filterByYearAndMonth(filteredTransactions, chosenYearNumber, month);
      // console.log(transactionsPerMonth);
      // console.log("wowkwok");
      const totalAmountPerMonth = calculateTotalAmount(transactionsPerMonth);
      monthlyData[`${arrMonth[month - 1]}`] = totalAmountPerMonth;
    }
    // end of v1

    // console.log(monthlyData);
    return res.json({ monthlyData, total: totalIncomeInAYear });
  } catch (error) {
    throw new InternalServerError("Something wrong...");
  }
};
