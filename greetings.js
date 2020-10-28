module.exports = function Greetings(pool) {

    var storedNames = {};
    const pg = require("pg")
    const Pool = pg.Pool;

    const connectionString = process.env.DATABASE_URL || 'postgresql://lilithangele:pg123@localhost:3011/greetings';

    function greetLang(name, language) {
        let regex = /[^A-Za-z]/g;
        let lettersOnly = name.replace(regex, "")
        let upperCaseName = lettersOnly.toUpperCase().charAt(0) + lettersOnly.slice(1).toLowerCase()
        if (language === "isixhosa") {
            return "Molo, " + upperCaseName;
        }
        else if (language === "english") {
            return "Hello, " + upperCaseName;
        }
        else if (language === "afrikaans") {
            return "More, " + upperCaseName;
        }
    }

    async function getAll() {

        let getName = await pool.query('SELECT name from greet');
        return await getName.rows;
    }
    async function add(name) {
    let regex = /[^A-Za-z]/g;
    let lettersOnly = name.replace(regex, "")
    let upperCaseName = lettersOnly.toUpperCase().charAt(0) + lettersOnly.slice(1).toLowerCase()
        let results = await pool.query(`select id from greet where name = $1 `, [upperCaseName]);
        if (results.rowCount === 0) {
            return await pool.query(`insert into greet (name, counter) values($1, $2)`, [upperCaseName, 1])
        }
        await pool.query(`update greet set counter = counter+1 where name = $1`, [upperCaseName])
    }
 function displayCounter(){
     return Object.keys(storedNames).length
 }

    async function countTimes(name) {
        var getCounter = await pool.query(`SELECT counter from greet where name=$1`, [name]);
        return getCounter.rows[0].counter;
    }

    async function deleteValues() {
        await pool.query("delete from greet")
    }


    return {
        greetLang,
        displayCounter,
        countTimes,
        getAll,
        add,
        deleteValues
    }
}
