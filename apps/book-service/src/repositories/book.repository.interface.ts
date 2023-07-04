import { Book } from "../entities/book.entity";

export interface BookRepository {
    create(book: Book): Promise<Book>;
    getById(id: string): Promise<Book | null>;
    getAll(): Promise<Book[]>;
    update(id: string, item: Partial<Book>): Promise<Book>;
    delete(id: string): Promise<void>;
}