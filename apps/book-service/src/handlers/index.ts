import create from "./create";
import loadAll from "./load-all";
import loadOne from "./load-one";
import deleteBook from "./delete";
import updateBook from "./update";

export default {
    'create-book': create,
    'list-books': loadAll,
    'load-book': loadOne,
    'delete-book': deleteBook,
    'update-book': updateBook
}