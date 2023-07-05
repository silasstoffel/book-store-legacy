import { Book } from "../entities/book.entity";
import { BookRepository } from "../repositories/book.repository.interface";
import { BookEventPublisher } from "../services/book-event-publisher";

export class UpdateBookUseCase {
  constructor(private repository: BookRepository, private readonly event: BookEventPublisher) {}

  async execute(id: string, book: Book): Promise<Book> {
    const data = await this.repository.update(id, book);
    this.event.publish('product.updated', data);

    return data;
  }
}