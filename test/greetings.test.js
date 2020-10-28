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
    it('should be able to add more one name', async function(){
        let name = "Lilitha";
        let name2 = "Siphiwe";
    
            await greet.add(name);
            await greet.add(name2);
            let greetedAll = await greet.getAll();
            assert.deepEqual([{name : "Lilitha"}, {name : "Siphiwe"}], greetedAll);
        });
        it('should be able to greet in IsiXhosa', async function(){
            let name = "Lilitha";
            // let name2 = "Siphiwe";
        
                await greet.greetLang(name);
                // await greet.add(name2);
                let greetedAll = await greet.getAll();
                assert.deepEqual([{name : "Lilitha"}, {name : "Siphiwe"}], greetedAll);
            });

    it("should able to delete a person's name", async function(){
        
        let name = "Lilitha";
        let name2 = "Siphiwe"
    
            await greet.deleteValues(name);
            await greet.deleteValues(name2);
            let greetedAll = await greet.getAll();
            assert.deepEqual([], greetedAll);
        
    });

    // after(function(){
    //     pool.end();
    // })
 
 
});
