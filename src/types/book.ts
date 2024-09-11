export type Book = {
	id: string;
	title: string;
	authors: string[];
	thumbnail: string;
}

export type BooksResponse = {
	books: Book[];
	nextCursor: string | null;
}