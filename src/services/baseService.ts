import type { Repository } from "../database/interfaces/Repository";

export abstract class BaseService<T> {
  constructor(protected repository: Repository<T>) {}

  async findOne(id: string): Promise<T | null> {
    return this.repository.findOne(id);
  }

  async findAll(): Promise<T[]> {
    return this.repository.findAll();
  }

  async create(data: Partial<T>): Promise<T> {
    return this.repository.create(data);
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
