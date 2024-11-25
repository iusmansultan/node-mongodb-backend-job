import { getUsers } from '../services/userService';
import { User } from '../models/User';

jest.spyOn(User, 'find').mockReturnValue({
  sort: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
  limit: jest.fn().mockResolvedValue([
    { name: 'John Doe', age: 25, email: 'johndoe@example.com' },
  ]),
} as any);

jest.spyOn(User, 'countDocuments').mockResolvedValue(1);

describe('User Service Tests', () => {
  it('should return paginated users', async () => {
    const result = await getUsers({ limit: 10, page: 1 });

    expect(result.total).toBe(1);
    expect(result.items.length).toBeLessThanOrEqual(10);
    expect(result.items[0].name).toBe('John Doe');
  });
});
