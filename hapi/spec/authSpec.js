// const server = require('../server/server.js').newServer(1337)
// const Bcrypt = require('bcrypt')
//
// describe('basic authentication', () => {
//   it('saves an user with encrypted password', () => {
//     Users.connect( db => {
//       let collection = db.collection('users')
//
//       const username = 'TestUser'
//       const password = 'password'
//       const saltRounds = 10
//       let user = {}
//
//       bcrypt.hash(password, saltRounds, (err, hash) => {
//         if (err) {
//           throw err
//         }
//
//         user = {
//           username: username,
//           password: hash
//         }
//         collection.insert(user, {})
//         // TODO: assert that user got added
//         // assert password is hash
//         // assert hash matches password
//
//       })
//     })
//   }),
//   it('verifies user and password match', done => {
//     // TODO: inject server with raw username and password
//     // verify match
//   })
// })
