const assert = require("assert");
const Greet = require('../greetings');
const pg = require("pg");
const Pool = pg.Pool
	const connectionString = process.env.DATABASE_URL || 'postgresql://lilithangele:pg123@localhost:5432/greetings_tests';
	const pool = new Pool({
		connectionString
    });
    let greet = Greet(pool);
//  const INSERT_QUERY = "insert results = await pool.query('select name,counter from greetings where id = $1,$2', [name, 1]);"

describe("The greetings-webapp", function () {

    beforeEach(async function(){
await pool.query("delete from greet;");
	
});
   
it('should be able to add one name', async function(){
    let name = "Lilitha";

        await greet.add(name);
        let greetedAll = await greet.getAll();
        assert.deepEqual([{name : "Lilitha"}], greetedAll);
    });
    it('should be able to add more than one name', async function(){
        let name = "Lilitha";
        let name2 = "Siphiwe";
    
            await greet.add(name);
            await greet.add(name2);
            let greetedAll = await greet.getAll();
            assert.deepEqual([{name : "Lilitha"}, {name : "Siphiwe"}], greetedAll);
        });
        it('should be able to count the times a person was greeted', async function(){
            
            await greet.add("Lilitha");
            await greet.add("Lilitha");
            await greet.add("Lilitha");
            await greet.add("Lilitha");

                assert.equal(4, await greet.countTimes("Lilitha"));
            });

        it('should be able to greet a person in IsiXhosa', async function(){
        let name = "Lilitha"
        let name2 = "Sinesipho"
        let language = "isixhosa"
        let language2 = "english"

        assert.equal("Molo, Lilitha", await greet.greetLang(name,language));
        assert.equal("Hello, Sinesipho", await greet.greetLang(name2,language2));
            });

    it("should able to delete a person's name", async function(){
    
            
            await greet.deleteValues();
            let greetedAll = await greet.getAll();
            assert.equal("", greetedAll);
 
    });

    // after(function(){
    //     pool.end();
    // })
 
 
});
