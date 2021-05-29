import { MemberService } from '../lib/member-service.js'
import { client, headers } from '../lib/config.js'

const service = new MemberService({ client })

exports.handler = async (event, context) => {
	console.log('Function `members` invoked')

	if (event.httpMethod !== 'GET' || event.httpMethod !== 'POST') {
		return { statusCode: 405, headers, body: 'Method Not Allowed' }
	}

	try {
    if (event.httpMethod === 'GET') {
      const members = await service.getMembers()
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(members),
      }
    }
    if (event.httpMethod === 'POST') {
      service.addMember('test01');
      return {
        statusCode: 200,
        headers
      }
    }
	} catch (error) {
		console.log('error', error)

		return {
			statusCode: 400,
			headers,
			body: JSON.stringify(error),
		}
	}
}
