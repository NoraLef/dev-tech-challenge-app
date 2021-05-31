// Fonction Netlify pour récupérer tous les membres de la BDD Faunadb

// Imports du service 'member-service.js' et des configs nécessaires pour communiquer avec la BDD Faunadb
import { MemberService } from '../lib/member-service.js';
import { client, headers } from '../lib/config.js';
// Instanciation du service 'member-service'
const service = new MemberService({ client });

exports.handler = async (event, context) => {
  // Verification que la méthode de requête sois bien GET
	if (event.httpMethod !== 'GET') {
		return { statusCode: 405, headers, body: 'Method Not Allowed' };
	}

	try {
    // Appel de la fonction 'getMembers()' du service 'member-service.js'
		const members = await service.getMembers();
    // Réponse retournée si la requête est correcte
		return {
			statusCode: 200,
			headers,
			body: JSON.stringify(members),
		};
	} catch (error) {
    // Réponse retournée si la requête rencontre une erreur
		return {
			statusCode: 400,
			headers,
			body: JSON.stringify(error),
		};
	}
}
