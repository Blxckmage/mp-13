import { z } from "zod";
import { transactionSchema } from "./transaction.types";
import { ticketSchema } from "./ticket.types";

export const userSchema = z.object({
	user_id: z.number().nullable().optional(),
	password: z.string().min(8, "Password must be at least 8 characters long"),
	email: z.string().email(),
	full_name: z.string().min(3, "Full name must be at least 3 characters long"),
	role: z.enum(["participant", "organizer"]),
	created_at: z.string().nullable().optional(),
	updated_at: z.string().nullable().optional(),
	id: z.string().nullable().optional(),
	transactions: transactionSchema.array().nullable().optional(),
	referrals: z
		.array(
			z.object({
				referrer_id: z.number(),
				referral_code: z.string(),
				created_at: z.string(),
				expires_at: z.string(),
			}),
		)
		.nullable()
		.optional(),
	points: z
		.array(
			z.object({
				referral_id: z.number(),
				user_id: z.number(),
				points: z.number(),
				created_at: z.string(),
				expires_at: z.string(),
			}),
		)
		.nullable()
		.optional(),
	tickets: ticketSchema.array().nullable().optional(),
	events: ticketSchema.array().nullable().optional(),
});

export type User = z.infer<typeof userSchema>;
