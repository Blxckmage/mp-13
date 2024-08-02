// promotion_id        Int      @id @default(autoincrement())
// event_id            Int
// discount_percentage Float
// valid_from          DateTime
// valid_until         DateTime
// max_uses            Int
// created_at          DateTime @default(now())
// updated_at          DateTime @updatedAt

import { z } from "zod";

export const promotionSchema = z.object({
	promotion_id: z.number().nullable().optional(),
	event_id: z.coerce.number(),
	promotion_name: z
		.string()
		.min(5, "Promotion name must be at least 5 character"),
	discount_percentage: z.coerce
		.number()
		.min(0, "Discount percentage must be greater than or equal to 0")
		.max(100, "Discount percentage must be less than or equal to 100"),
	valid_from: z.date(),
	valid_until: z.date(),
	max_uses: z.coerce
		.number()
		.min(0, "Max uses must be greater than or equal to 0"),
	created_at: z.string().nullable().optional(),
	updated_at: z.string().nullable().optional(),
});

export type Promotion = z.infer<typeof promotionSchema>;
