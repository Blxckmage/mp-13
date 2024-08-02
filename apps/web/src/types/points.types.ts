import { z } from "zod";

export const pointsSchema = z.object({
	points_id: z.number().nullable().optional(),
	referral_id: z.number(),
	user_id: z.number(),
	points: z.number(),
	created_at: z.string().nullable().optional(),
	expires_at: z.string().nullable().optional(),
});

export type Points = z.infer<typeof pointsSchema>;
