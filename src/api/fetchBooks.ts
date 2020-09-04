const fetchBooks = async (userId: number) => {
  const userIdParam = encodeURIComponent(String(userId));
  const resp = await fetch(`/api/books?userId=${userIdParam}`, { credentials: 'same-origin' });
  return resp.ok ? resp.json() : [];
};

export default fetchBooks;
