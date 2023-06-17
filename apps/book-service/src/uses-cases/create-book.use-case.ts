import { Book } from "../entities/book.entity";
import { BookRepository } from "../repositories/book.repository.interface";

export class CreateBookUseCase {
  constructor(private repository: BookRepository) {}

  async execute(entity: Book): Promise<Book> {
    return this.repository.create(entity)
  }
  
}