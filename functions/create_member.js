import { MemberService } from '../lib/member-service.js';
import { client, headers } from '../lib/config.js';

const service = new MemberService({ client });

exports.handler = async (event, context) => {

  if (event.httpMethod !== 'POST') {
		return { statusCode: 405, headers, body: 'Method Not Allowed' };
	}

  try {
		const membreData = await service.addMember(event.body);
		return {
			statusCode: 200,
			headers,
			body: JSON.stringify(membreData),
		};
	} catch (error) {
		return {
			statusCode: 400,
			headers,
			body: JSON.stringify(error),
		};
	}

}
