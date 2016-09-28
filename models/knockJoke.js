const Sequelize = require('sequelize');
//export a function that takes db as a parameter
module.exports = (db)=>{
  return (
    //defined our knockJoke table/model(for ORM) with two columns, keyword and joke
    db.define('knockJoke', {
      keyWord: {
        //The keyword is a string
        type: Sequelize.STRING,
        defaultValue: 'luke'
      },
      joke: {
        //The joke is also a string
        type: Sequelize.STRING,
        defaultValue: 'Luke through the keyhole and you\'ll find out!'
      }
    })
  )
}
