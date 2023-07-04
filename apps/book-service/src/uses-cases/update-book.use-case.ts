import { Book } from "../entities/book.entity";
import { BookRepository } from "../repositories/book.repository.interface";

export class UpdateBookUseCase {
  constructor(private repository: BookRepository) {}

  async execute(id: string, book: Book): Promise<Book> {
    return this.repository.update(id, book);
  }
}