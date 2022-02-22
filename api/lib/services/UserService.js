'use strict'

const collection = 'users'

const UserService = {
    createOrUpdate: async function (db, find, set) {
        db.collection(collection).updateOne(
            find,
            {$set: set},
            {upsert: true}
        )
    },
    findUser: async function (db, find, projection = {}){
       return db.collection(collection).findOne(find,
           {
               projection: projection
           })
    },
    appendStarredRepos: async function (userData, starredRepos) {
        userData["starred_repos"] = JSON.parse(starredRepos)
        userData["starred_repos_count"] = JSON.parse(starredRepos).length
        return userData
    }
}

module.exports = UserService
