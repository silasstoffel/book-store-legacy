export class Author {
    readonly id!: string;
    readonly name!: string;
    readonly nationality?: string;

    constructor(props: Partial<Author> = {}) {
        Object.assign(this, props);
    }

    static build(props: Partial<Author> = {}): Partial<Author> {
        return new Author(props)
    }
  }