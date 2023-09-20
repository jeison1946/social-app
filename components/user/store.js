const {collection, getDocs} = require('./model');

async function getUser() {
  const users = await getDocs(collection);
  return await users.docs.map(doc => doc.data());
}


module.exports = {
  list: getUser,
}