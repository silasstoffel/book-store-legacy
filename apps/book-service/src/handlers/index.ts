import create from "./create";
import loadAll from "./load-all";
import loadOne from "./load-one";
import deleteBook from "./delete";

export default {
    'create-book': create,
    'list-books': loadAll,
    'load-book': loadOne,
    'delete-book': deleteBook
}