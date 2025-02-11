import type { Knex } from 'knex';

export async function up(knex: Knex) {
  await knex.schema
    .createTable('meals', (table) => {
      table.uuid('id').primary().index(); // ID único para cada refeição
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE'); // Relacionamento com usuários
      table.string('snack', 255).notNullable(); // Nome da refeição
      table.text('description'); // Descrição da refeição
      table.boolean('is_on_diet').notNullable(); // Está dentro da dieta? (true/false)
      table.timestamp('created_at').defaultTo(knex.fn.now()); // Data de criação da refeição
    })
    .then(() => {
      console.log('Tabela meals criada com sucesso!');
    });
}

export async function down(knex: Knex) {
  await knex.schema.dropTableIfExists('meals').then(() => {
    console.log('Tabela meals removida com sucesso!');
  });
}
