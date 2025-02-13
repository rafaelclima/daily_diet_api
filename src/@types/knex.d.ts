declare module 'knex/types/tables' {
  interface Tables {
    users: {
      id: string;
      name: string;
    };
    meals: {
      id: string;
      snack: string;
      description: string;
      createdAt: string;
      is_on_diet: boolean;
      userId: string;
      updated_at?: string;
    };
  }
}
