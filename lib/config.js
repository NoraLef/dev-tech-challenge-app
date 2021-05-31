// Fichier comportant les configs nécessaires au requêtage avec la BDD Faunadb

// Imports du module faunadb et du fichier comportant la clé pour se connecter à la BDD Faunadb
import faunadb from 'faunadb';
require('dotenv').config();
// En-tête ,écessaire au requêtage
const headers = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Headers': 'Content-Type',
	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
}
// Accès à la BDD Faunadb grâce à la clé
const client = new faunadb.Client({
	secret: process.env.FAUNADB_SERVER_SECRET,
})
// Export aux fonctions Netlify des données nécessaires au requêtage
export { client, headers }
