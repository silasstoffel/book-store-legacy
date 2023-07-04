import { Book } from "../entities/book.entity";
import { BookRepository } from "../repositories/book.repository.interface";

export class LoadOneBooksUseCase {
  constructor(private repository: BookRepository) {}

  async execute(id: string): Promise<Book|null> {
    return this.repository.getById(id)
  }
}