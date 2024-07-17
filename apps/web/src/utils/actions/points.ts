"use server";

export async function getPointById(user_id: number) {
	const res = await fetch(`http://localhost:8000/api/points/${user_id}`);

	if (!res.ok) throw new Error("Failed to fetch point");

	return res.json();
}
