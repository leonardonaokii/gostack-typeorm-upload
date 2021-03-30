import { EntityRepository, Repository, getRepository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    const { income, outcome } = transactions.reduce(
      (prevBalance: Balance, transaction: Transaction) =>
        transaction.type === 'income'
          ? {
              ...prevBalance,
              income: prevBalance.income + transaction.value,
            }
          : {
              ...prevBalance,
              outcome: prevBalance.outcome + transaction.value,
            },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }
}

export default TransactionsRepository;
