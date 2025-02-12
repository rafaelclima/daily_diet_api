import { app } from './app';

// Iniciando o servidor
app.listen({ port: 3200 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Servidor rodando em ${address}`);
});
