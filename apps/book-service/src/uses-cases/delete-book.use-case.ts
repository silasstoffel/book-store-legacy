import { Book } from "../entities/book.entity";
import { BookRepository } from "../repositories/book.repository.interface";

export class DeleteBookUseCase {
  constructor(private repository: BookRepository) {}

  async execute(id: string): Promise<void> {
    return this.repository.delete(id)
  }
}