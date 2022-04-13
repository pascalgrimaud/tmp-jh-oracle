export interface IBeer {
  id?: number;
  name?: string | null;
}

export class Beer implements IBeer {
  constructor(public id?: number, public name?: string | null) {}
}
