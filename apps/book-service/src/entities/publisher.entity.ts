export class Publisher {
    readonly id!: string;
    readonly name!: string;

    constructor(props: Partial<Publisher> = {}) {
        Object.assign(this, props);
    }

    static build(props: Partial<Publisher> = {}): Partial<Publisher> {
        return new Publisher(props)
    }
  }