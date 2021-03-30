import { getCustomRepository } from 'typeorm';

import TransactionRepository from '../repositories/TransactionsRepository';

import AppError from '../errors/AppError';

class DeleteTransactionService {
  public async execute(transaction_id: string): Promise<void> {
    const transactionRepository = getCustomRepository(TransactionRepository);

    const transaction = transactionRepository.findOne(transaction_id);

    if (!transaction) {
      throw new AppError('Id da transação não encontrado.');
    }

    await transactionRepository.delete(transaction_id);
  }
}

export default DeleteTransactionService;
