interface DatabaseUser {
  id: string;
  name: string;
  role: 'user' | 'admin';
}

const data: Record<string, DatabaseUser> = {
  'user-1': { id: 'user-1', name: 'Alice', role: 'user' },
  'user-2': { id: 'user-2', name: 'Bob', role: 'admin' },
};

export class UsersService {
  private data: Record<string, DatabaseUser>;
  constructor() {
    this.data = data;
  }

  getUserById(id: string): DatabaseUser | null {
    return this.data[id] ?? null;
  }
}

export type { DatabaseUser };
