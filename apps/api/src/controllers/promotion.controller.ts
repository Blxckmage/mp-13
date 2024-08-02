import { Request, Response } from "express";
import prisma from "@/prisma";

export class PromotionController {
	async getPromotionByEventId(req: Request, res: Response) {
		try {
			const { event_id } = req.params;

			const promotions = await prisma.promotion.findMany({
				where: { event_id: Number(event_id) },
			});

			return res.status(200).send(promotions);
		} catch (error) {
			return res.status(500).send({ error: "Failed to fetch promotions" });
		}
	}

	async createPromotion(req: Request, res: Response) {
		try {
			const {
				event_id,
				promotion_name,
				discount_percentage,
				valid_from,
				valid_until,
				max_uses,
			} = req.body;

			const promotion = await prisma.promotion.create({
				data: {
					event_id: Number(event_id),
					promotion_name,
					discount_percentage: Number(discount_percentage),
					valid_from: new Date(valid_from),
					valid_until: new Date(valid_until),
					max_uses: Number(max_uses),
				},
			});

			return res.status(201).send(promotion);
		} catch (error) {
			return res.status(500).send({ error: "Failed to create promotion" });
		}
	}
}
