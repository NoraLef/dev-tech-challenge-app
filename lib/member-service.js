import faunadb from 'faunadb'
const q = faunadb.query

export class MemberService {
	constructor(data) {
		this.client = data.client
	}

	async getMembers() {
		return new Promise((resolve, reject) => {
			this.client
				.query(q.Paginate(q.Match(q.Ref('indexes/all_members'))))
				.then((response) => {
					const memberRefs = response.data
					const getAllMemberDataQuery = q.Map(memberRefs, q.Lambda(['ref'], q.Get(q.Var('ref'))))

					this.client.query(getAllMemberDataQuery).then((ret) => {
						resolve(ret)
					})
				})
				.catch((error) => {
					console.log('error', error)

					reject(error)
				})
		})
	}

  async addMember(memberName) {
    this.client.query(
      q.CreateIndex({
        name: memberName,
        source: q.Collection('members')
      })
    )
    .then((ret) => console.log(ret))
  }
}
