import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .alterTable('meals', (table) => {
      table.index('user_id', 'user_id_index');
      table.index('created_at', 'created_at_index');
      table.index('is_on_diet', 'is_on_diet_index');
    })
    .then(() => {
      console.log("Índices adicionados à tabela 'meals' com sucesso!");
    });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema
    .alterTable('meals', (table) => {
      table.dropIndex('user_id_index');
      table.dropIndex('created_at_index');
      table.dropIndex('is_on_diet_index');
    })
    .then(() => {
      console.log("Índices removidos da tabela 'meals' com sucesso!");
    });
}
