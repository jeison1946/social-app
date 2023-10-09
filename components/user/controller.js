const store = require('./store');

function addUser(data) {
  const user = {
    username: data.username,
    email: data.email,
    password: data.password,
    social_auth: data.social_auth,
    age: data.age,
    fullName: data.fullName,
    gender: data.gender,
    genre: data.genre,
    privacity: data.privacity,
    imageProfile: data.imageProfile
  }
  return store.add(user);
}

function loginUser(data) {
  return store.login(data);
}

function getUser(filter) {
  return new Promise((resolve, reject) => {
    resolve(store.list(filter));
  });
}

function updateUser(id, data)  {
  return new Promise(async (resolve, reject) => {
    if(!id || !data.name) {
      return reject('Invalid data'); 
    }

    const result = await store.update(id, data.name);
    resolve(result)
  });
}

function deleteUser(id)  {
  return new Promise(async (resolve, reject) => {
    if(!id) {
      return reject('Invalid data'); 
    }

    const result = await store.delete(id);
    resolve(result)
  });
}

module.exports = {
  addUser,
  getUser,
  updateUser,
  deleteUser,
  loginUser
}