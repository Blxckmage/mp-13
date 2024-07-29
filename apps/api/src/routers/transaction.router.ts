import { TransactionController } from "@/controllers/transaction.controller";
import { Router } from "express";

export class TransactionRouter {
	private router: Router;
	private transactionController: TransactionController;

	constructor() {
		this.transactionController = new TransactionController();
		this.router = Router();
		this.initializeRoutes();
	}

	private initializeRoutes(): void {
		this.router.get(
			"/",
			this.transactionController.getTransactions.bind(
				this.transactionController,
			),
		);

		this.router.get(
			"/:user_id",
			this.transactionController.getTransactionsByUserId.bind(
				this.transactionController,
			),
		);

		this.router.post(
			"/",
			this.transactionController.createTransaction.bind(
				this.transactionController,
			),
		);
	}

	getRouter(): Router {
		return this.router;
	}
}
