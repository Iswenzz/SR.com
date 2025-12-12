export const fetchJson = async <T>(endpoint: string, revalidate?: number): Promise<T> => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
		next: { revalidate }
	});
	return response.json();
};
