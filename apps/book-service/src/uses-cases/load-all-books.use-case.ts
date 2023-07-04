import { Book } from "../entities/book.entity";
import { BookRepository } from "../repositories/book.repository.interface";

export class LoadAllBooksUseCase {
  constructor(private repository: BookRepository) {}

  async execute(): Promise<Book[]> {
    return this.repository.getAll();
  }
}