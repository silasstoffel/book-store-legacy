import { DynamoDB } from 'aws-sdk';
import { BookRepository } from './book.repository.interface';
import { Book } from '../entities/book.entity';

export class DynamoBookRepository implements BookRepository {
  constructor(
    private client: DynamoDB.DocumentClient,
    private tableName: string
  ) {}

  async create(book: Book): Promise<Book> {
    const params = {
      TableName: this.tableName,
      Item: book,
    };

    await this.client.put(params).promise();
    return book;
  }

  async getById(id: string): Promise<Book | null> {
    const params = {
      TableName: this.tableName,
      Key: { id },
    };

    const result = await this.client.get(params).promise();
    return result.Item as Book | null;
  }

  async getAll(): Promise<Book[]> {
    const params = { TableName: this.tableName };

    const result = await this.client.scan(params).promise();
    return result.Items as Book[];
  }

  async update(id: string, updates: Partial<Book>): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: { id },
      UpdateExpression: 'set #author = :author, #isbn = :isbn, #publicationYear = :publicationYear, #publisher = :publisher, #genre = :genre, #language = :language, #pages = :pages, #description = :description, #price = :price, #tags = :tags',
      ExpressionAttributeNames: {
        '#author': 'author',
        '#isbn': 'isbn',
        '#publicationYear': 'publicationYear',
        '#publisher': 'publisher',
        '#genre': 'genre',
        '#language': 'language',
        '#pages': 'pages',
        '#description': 'description',
        '#price': 'price',
        '#tags': 'tags',
      },
      ExpressionAttributeValues: {
        ':author': updates.author,
        ':isbn': updates.isbn,
        ':publicationYear': updates.publicationYear,
        ':publisher': updates.publisher,
        ':genre': updates.genre,
        ':language': updates.language,
        ':pages': updates.pages,
        ':description': updates.description,
        ':price': updates.price,
        ':tags': updates.tags,
      },
    };

    await this.client.update(params).promise();
  }

  async delete(id: string): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: { id },
      ReturnValues: "ALL_OLD"
    };

    const data = await this.client.delete(params).promise();
    
    if (!data.Attributes) {
      throw new Error('Book not found.');
    }    
  }
}

