import knex from 'knex'; // Import knex for database operations
import config from '../../knexfile'; // Import the knexfile configuration

const knexSetup = knex(config); // Create a knex instance using the configuration

export default knexSetup; // Export the knex instance for use in other parts of the application
