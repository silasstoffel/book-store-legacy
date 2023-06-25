import { Author } from "./author.entity";
import { Publisher } from "./publisher.entity";

export class Book {
    public readonly id?: string;
    public readonly author!: Author;
    public readonly isbn!: string;
    public readonly publicationYear!: string;
    public readonly publisher!: Publisher;
    public readonly genre!: string;
    public readonly language!: string;
    public readonly pages!: number;
    public readonly title!: string;
    public readonly description!: string;
    public readonly price?: number | null;
    public readonly tags?: string[] | null;

    constructor(props: Partial<Book> = {}) {
        Object.assign(this, props);
    }

    static build(props: Partial<Book> = {}): Book {
        return new Book(props)
    }
}