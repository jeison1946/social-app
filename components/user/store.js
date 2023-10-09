const Model = require('./model');
jwt = require('jsonwebtoken');

async function addUser(user) {
  const exist = await Model.find({email: {$regex: user.email, $options: 'i'}});
  if (exist.length > 0) {
    return `El usuario  ${user.email} ya existe`;
  }
  else {
    const newUser = new Model(user);
    return newUser.save();
  }
}

async function loginUser(data) {
  let flag = {
    status: false,
    message: 'Información invalida11'
  };
  return new Promise(async (resolve, reject) => {
    await Model.findOne({email: data.email}).then(user => {

      if (user) {
        if(!data.soacial_auth && !user.comparePassword(data.password)) {
          flag.message = 'Contraseña invalida';
        }
        else {
          const userInfo = {
            user: user,
            token: jwt.sign(JSON.stringify(user), 'apilogin'),
          }
          flag.status = true;
          flag.message = userInfo;
        }
        
      }else {
        flag.message = 'Usuario no existe por favor registrese';
      }
      if(flag.status) {
        resolve(flag.message);
      }
      else {
        reject(flag.message)
      }

    });
  });
  
}

async function getUser(filter) {
  const filters = {};
  if(filter && filter.email) {
    filters.email = {
      $regex: filter.email,
      $options: 'i'
    }
  }

  if(filter && filter.excluid_user) {
    filters._id = {
      $nin: [filter.excluid_user]
    }
  }
  return await Model.find(filters).select(['-password']).limit(10);
}

async function updateUser(id, name) {
  const findUser = await Model.findById(id);
  findUser.name = name;
  return await findUser.save();
}

async function deleteUser(id) {
  const findUser = await Model.findById(id);
  if(findUser) {
    return `Se ha eliminado con exito el usuario ${id}`;
  }
  else {
    return `No se encontró el usuario ${id}`;
  }
  
}


module.exports = {
  add: addUser,
  list: getUser,
  update: updateUser,
  delete: deleteUser,
  login: loginUser
}