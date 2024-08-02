import { PromotionController } from "@/controllers/promotion.controller";
import { Router } from "express";

export class PromotionRouter {
	private router: Router;
	private referralController: PromotionController;

	constructor() {
		this.referralController = new PromotionController();
		this.router = Router();
		this.initializeRoutes();
	}

	private initializeRoutes(): void {
		this.router.get(
			"/:event_id",
			this.referralController.getPromotionByEventId.bind(
				this.referralController,
			),
		);

		this.router.post(
			"/",
			this.referralController.createPromotion.bind(this.referralController),
		);
	}

	getRouter(): Router {
		return this.router;
	}
}
