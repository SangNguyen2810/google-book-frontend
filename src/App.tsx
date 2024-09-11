import "./App.css";
import BookList from "./components/BookList";
import { BOOK_LIMIT_PER_LOAD, REFRESH_AFTER_SECONDS } from "./constants/book";

function App() {
	return (
		<div className="App">
			<BookList limit={BOOK_LIMIT_PER_LOAD} refeshTime={REFRESH_AFTER_SECONDS}/>
		</div>
	);
}

export default App;
