import React from "react";
import { Book } from "../types/book";

type BookItemProps = {
	book: Book;
};

const BookItem: React.FC<BookItemProps> = ({ book }) => {
	return (
		<div key={book.id} className="bg-gray-900 p-4 rounded-lg shadow-lg">
			<div className="w-full h-40 md:h-48 lg:h-52 flex items-center justify-center">
				<img
					src={book.thumbnail}
					alt={book.title}
					className="object-cover w-full h-full rounded"
				/>
			</div>
			<h2 className="text-md font-semibold mt-2 text-white">{book.title}</h2>
			<p className="text-sm text-gray-400">{book.authors.join(", ")}</p>
		</div>
	);
};

export default React.memo(BookItem);
