export type FindManyData<T> = {
  data: {
    field: keyof T;
    value: string;
  };
};

export type UpdateData<T extends { id: string }> = {
  data: T;
};

export interface IFirebaseRepository<T extends { id: string }> {
  create(data: Omit<T, "id">): Promise<void>;
  findUnique(data: FindManyData<T>): Promise<T | null>;
  update(data: UpdateData<T>): Promise<void>;
}
