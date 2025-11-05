import type { Database } from "../database/interfaces/Database";
import type { User } from "../types/User";

export class UserRepository {
  constructor(private db: Database) {}

  async findById(id: string): Promise<User | undefined> {
    const users = await this.db.query<User>(
      "SELECT * FROM users WHERE id = $1",
      [id],
    );

    return users[0];
  }

  async create(user: Omit<User, "id">): Promise<User> {
    const users = await this.db.query<User>(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [user.name, user.email, user.password],
    );

    return users[0];
  }

  async update(id: string, user: Partial<User>): Promise<User | undefined> {
    const setClause = Object.keys(user)
      .map((key, index) => `${key} = ${index + 2}`)
      .join(", ");

    const values = [id, ...Object.values(user)];

    const users = await this.db.query<User>(
      `UPDATE users SET ${setClause} WHERE id = $1 RETURNING *`,
      values,
    );

    return users[0];
  }

  async delete(id: string): Promise<void> {
    await this.db.execute("DELETE FROM users WHERE id=$1", [id]);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const users = await this.db.query<User>(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );
    return users[0];
  }
}
