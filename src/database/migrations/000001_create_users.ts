import type { Knex } from 'knex';

export async function up(knex: Knex) {
  await knex.schema
    .createTable('users', (table) => {
      table.uuid('id').primary().index(); // ID único para cada usuário
      table.string('name', 255).notNullable(); // Nome do usuário
    })
    .then(() => {
      console.log("Tabela 'users' criada com sucesso!");
    });
}

export async function down(knex: Knex) {
  await knex.schema.dropTableIfExists('users').then(() => {
    console.log("Tabela 'users' removida com sucesso!");
  });
}
