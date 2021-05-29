import { MemberService } from '../lib/member-service.js'
import { client, headers } from '../lib/config.js'

const service = new MemberService({ client })

exports.handler = async (event, context) => {
	console.log('Function `members` invoked')

	// if (event.httpMethod !== 'GET') {
	// 	return { statusCode: 405, headers, body: 'Method Not Allowed' }
	// }

	// try {
  //   console.log(event.httpMethod);
	// 	const members = await service.getMembers()
	// 	return {
	// 		statusCode: 200,
	// 		headers,
	// 		body: JSON.stringify(members),
	// 	}
	// } catch (error) {
	// 	console.log('error', error)

	// 	return {
	// 		statusCode: 400,
	// 		headers,
	// 		body: JSON.stringify(error),
	// 	}
	// }

  try {
    console.log(event.httpMethod);
		service.addMember('Memememe');
		return {
			statusCode: 200,
			headers,
			body: JSON.stringify(members),
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
