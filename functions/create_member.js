// Fonction Netlify pour créer un membre et l'ajouter à la BDD Faunadb

// Imports du service 'member-service.js' et des configs nécessaires pour communiquer avec la BDD Faunadb
import { MemberService } from '../lib/member-service.js';
import { client, headers } from '../lib/config.js';
// Instanciation du service 'member-service'
const service = new MemberService({ client });

exports.handler = async (event, context) => {
  // Verification que la méthode de requête sois bien POST
  if (event.httpMethod !== 'POST') {
		return { statusCode: 405, headers, body: 'Method Not Allowed' };
	}

  try {
    // Appel de la fonction 'addMember()' du service 'member-service.js'
		const membreData = await service.addMember(event.body);
    // Réponse retournée si la requête est correcte
		return {
			statusCode: 200,
			headers,
			body: JSON.stringify(membreData),
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
