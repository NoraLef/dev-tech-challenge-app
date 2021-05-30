import { MemberService } from '../lib/member-service.js'
import { client, headers } from '../lib/config.js'

const service = new MemberService({ client })

exports.handler = async (event, context) => {

  if (event.httpMethod !== 'POST') {
		return { statusCode: 405, headers, body: 'Method Not Allowed' }
	}

  try {
		service.deleteMember(event.body);
		return {
			statusCode: 200,
			headers,
			body: event.body,
		}
	} catch (error) {
		console.log('error', error)

		return {
			statusCode: 400,
			headers,
			body: event.error,
		}
	}

}
