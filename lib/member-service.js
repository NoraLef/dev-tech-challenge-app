// Service liant les fonctions à la BDD Faunadb

import faunadb from 'faunadb';
const q = faunadb.query;

export class MemberService {
	constructor(data) {
		this.client = data.client;
	}

  // Requête pour récupérer tous les membres de la BDD Faunadb
	async getMembers() {
		return new Promise((resolve, reject) => {
			this.client
				.query(q.Paginate(q.Match(q.Ref('indexes/all_members'))))
				.then((response) => {
					const memberRefs = response.data;
					const getAllMemberDataQuery = q.Map(memberRefs, q.Lambda(['ref'], q.Get(q.Var('ref'))));

					this.client.query(getAllMemberDataQuery).then((ret) => {
						resolve(ret);
					})
				})
				.catch((error) => {
					reject(error);
				})
		})
	}

  // Requête pour ajouter un membre à la collections 'members' de la BDD Faunadb
  addMember(memberName) {
    return new Promise((resolve, reject) => {
      this.client.query(
        q.Create(
          q.Collection('members'),
          { data: { name: memberName } },
        )
      )
      .then((ret) => {
        resolve(ret);
      })
      .catch((error) => {
        reject(error);
      })
    })
  }

  // Requête pour supprimer un membre de la collection 'members' de la BDD Faunadb
  deleteMember(memberId) {
    this.client.query(
      q.Delete(
        q.Ref(q.Collection('members'), memberId)
      )
    )
    .then((ret) => console.log(ret))
  }
}
