import { useState, useEffect, useMemo } from "react";
import { Button, Loader, Alert } from "@mantine/core";
import { BooksResponse } from "../types/book";
import { BOOK_LIMIT_PER_LOAD, REFRESH_AFTER_SECONDS } from "../constants/book";
import BookItem from "./BookItem";
import useFetch from "../utils/useFetch";

type BookListProps = {
	limit?: number;
	refeshTime?: number;
};

const BookList: React.FC<BookListProps> = ({
	limit = BOOK_LIMIT_PER_LOAD,
	refeshTime = REFRESH_AFTER_SECONDS,
}) => {
	const [titleFilter, setTitleFilter] = useState("");
	const [authorFilter, setAuthorFilter] = useState("");
	const [cursor, setCursor] = useState<string | null>(null);

	const { data, isLoading, error, refetch } = useFetch<BooksResponse>(
		`http://localhost:3001/api/books`,
		{
			title: titleFilter,
			authors: authorFilter,
			cursor,
			limit,
		}
	);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursor(null);
      refetch();
    }, refeshTime * 1000);

    return () => clearInterval(interval);
  }, [refeshTime, refetch]);


  const applyFilters = () => {
    setCursor(null);
    refetch();
  };


	const bookitems = useMemo(() => {
		return data?.books.map((book) => <BookItem book={book} />);
	}, [data]);

	return (
		<section className="container mx-auto px-4 py-6">
			<header className="flex flex-wrap justify-center items-center space-x-4 mb-6">
				<div className="w-full md:w-1/4">
					<input
						type="text"
						placeholder="Search by title"
						className="w-full border p-2 rounded"
						value={titleFilter}
						onChange={(e) => setTitleFilter(e.target.value)}
					/>
				</div>
				<div className="w-full md:w-1/4">
					<input
						type="text"
						placeholder="Search by author"
						className="w-full border p-2 rounded"
						value={authorFilter}
						onChange={(e) => setAuthorFilter(e.target.value)}
					/>
				</div>
				<Button onClick={applyFilters} className="w-full md:w-auto">
					Apply Filters
				</Button>
			</header>

			<section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
				{bookitems}
			</section>

			{error && (
				<Alert color="red" className="mb-4">
					{error}
				</Alert>
			)}


			{isLoading && (
				<section className="flex justify-center my-6">
					<Loader />
				</section>
			)}

			{!isLoading && (
				<section className="mt-6 text-center">
					<Button onClick={() => setCursor(cursor)}>Load More</Button>
				</section>
			)}
		</section>
	);
};

export default BookList;
