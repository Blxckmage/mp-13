import { z } from "zod";
import { eventSchema } from "./event.types";

export const ticketSchema = z.object({
	ticket_id: z.number().nullable().optional(),
	user_id: z.number(),
	event_id: z.number(),
	price: z.coerce.number(),
	quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
	created_at: z.string().nullable().optional(),
	updated_at: z.string().nullable().optional(),
	event: eventSchema,
});

export type Ticket = z.infer<typeof ticketSchema>;
