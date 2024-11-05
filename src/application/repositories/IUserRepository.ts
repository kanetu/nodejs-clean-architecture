import { User } from "../../domain/entities";

export interface IUserRepository {
  findUserByEmail(
    email: string | undefined
  ): Promise<User | undefined>;
  update(user: User): Promise<unknown>;
}
