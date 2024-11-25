import { User } from '../models/User';

export async function getUsers({
  limit = 10,
  page = 1,
  sortBy = 'createdAt',
  search = {},
}: {
  limit?: number;
  page?: number;
  sortBy?: string;
  search?: any;
}) {
  const query = search ? { ...search } : {};
  const total = await User.countDocuments(query);
  const items = await User.find(query)
    .sort({ [sortBy]: 1 })
    .skip((page - 1) * limit)
    .limit(limit);

  return {
    total,
    limit,
    page,
    sortBy,
    items,
  };
}
