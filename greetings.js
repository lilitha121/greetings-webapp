module.exports = function Greetings(pool) {

    var storedNames = {};

    function greetLang(name, language) {
        let regex = /[^A-Za-z]/g;
        let lettersOnly = name.replace(regex, "")
        let upperCaseName = lettersOnly.toUpperCase().charAt(0) + lettersOnly.slice(1).toLowerCase()
        if (language === "isixhosa") {
            return "Molo, " + upperCaseName;
        } else if (language === "english") {
            return "Hello, " + upperCaseName;
        } else if (language === "afrikaans") {
            return "More, " + upperCaseName;
        }
    }

    async function getAll() {
        try {
            let getName = await pool.query('SELECT name from greet');
            return getName.rows;
        } catch (error) {
            console.log(error)
        }
    }
    async function add(name) {
        try {
            let regex = /[^A-Za-z]/g;
            let lettersOnly = name.replace(regex, "")
            let upperCaseName = lettersOnly.toUpperCase().charAt(0) + lettersOnly.slice(1).toLowerCase()
            let results = await pool.query(`select id from greet where name = $1 `, [upperCaseName]);
            if (results.rowCount === 0) {
                return await pool.query(`insert into greet (name, counter) values($1, $2)`, [upperCaseName, 1])
            }
            await pool.query(`update greet set counter = counter+1 where name = $1`, [upperCaseName])
        } catch (error) {

        }

    }
    async function displayCounter() {
        try {
            var getCount = await pool.query(`SELECT name from greet `);

            return getCount.rowCount;

        } catch (error) {
          
        }

    }

    async function countTimes(name) {

        try {
            var getCounter = await pool.query(`SELECT counter from greet where name=$1`, [name]);
            return getCounter.rows[0].counter;
        } catch (error) {
            
            return 0;
        }
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