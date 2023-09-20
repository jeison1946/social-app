const store = require('./store');

function getUser() {
  return new Promise((resolve, reject) => {
    resolve(store.list());
  });
}

module.exports = {
  getUser,
}