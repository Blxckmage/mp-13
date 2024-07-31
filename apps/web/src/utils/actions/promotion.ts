"use server";

import { Promotion } from "@/types/promotion.types";

export async function getPromotionByEventId(eventId: number) {
	const res = await fetch(`http://localhost:8000/api/promotions/${eventId}`, {
		cache: "no-cache",
	});

	if (!res.ok) throw new Error("Failed to fetch promotions");

	return res.json();
}

export async function createPromotion(data: Promotion) {
	try {
		const res = await fetch("http://localhost:8000/api/promotions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!res.ok) throw new Error("Failed to create promotion");

		return res.json();
	} catch (error) {
		return { error: "Something went wrong!" };
	}
}
