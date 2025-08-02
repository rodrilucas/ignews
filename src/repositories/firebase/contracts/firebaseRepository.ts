export interface Id {
  id: string;
}

export type FindUnique<T> = {
  field: keyof T;
  value: T[keyof T];
};

export type FindMany<T> = {
  filters: Partial<T>;
};

export type UpdateOne<T> = {
  id: string;
  data: Partial<T>;
};

export type UpdateMany<T> = {
  filters: Partial<T>;
  data: Partial<T>;
};

export type FindUserWithActiveSubscription<T> = FindUnique<T>;

export interface IFirebaseRepository<T extends Id> {
  create(data: Omit<T, "id">): Promise<void>;
  findUnique(params: FindUnique<T>): Promise<T | null>;
  findMany(params: FindMany<T>): Promise<T[]>;
  updateOne(params: UpdateOne<T>): Promise<boolean>;
  updateMany(params: UpdateMany<T>): Promise<boolean>;
  findUserWithActiveSubscription(
    params: FindUserWithActiveSubscription<T>
  ): Promise<T | null>;
}
