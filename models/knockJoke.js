const Sequelize = require('sequelize');

module.exports = (db)=>{
  return (
    db.define('knockJoke', {
      keyWord: {
        type: Sequelize.STRING,
        defaultValue: 'luke'
      },
      joke: {
        type: Sequelize.STRING,
        defaultValue: 'Luke through the keyhole and you\'ll find out!'
      }
    })
  )
}
