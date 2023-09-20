const db = require('../../db');
const { getFirestore, collection, getDocs } = require('firebase/firestore/lite');



module.exports = {
  collection: collection(db, 'users'),
  getDocs
}