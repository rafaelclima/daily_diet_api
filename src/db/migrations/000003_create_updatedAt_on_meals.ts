import type { Knex } from 'knex';

export async function up(knex: Knex) {
  await knex.schema
    .table('meals', (table) => {
      table.timestamp('updated_at');
    })
    .then(() => {
      console.log("Campo 'updated_at' adicionado à tabela 'meals' com sucesso!");
    });
}

export async function down(knex: Knex) {
  await knex.schema
    .table('meals', (table) => {
      table.dropColumn('updated_at');
    })
    .then(() => {
      console.log("Campo 'updated_at' removido da tabela 'meals' com sucesso!");
    });
}
