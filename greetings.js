module.exports = function greetings() {

    var storedNames = {};

    function namesStored(name) {
        if (storedNames[name] === undefined) {
            storedNames[name] = 0;
            
        }
        storedNames[name]++

    }

    function greetLang(name, language) {

        if (language === "isixhosa") {
            return "Molo, " + name;
        }
        else if (language === "english") {
            return "Hello, " + name;
        }
        else if (language === "afrikaans") {
            return "More, " + name;
        }
    }
    
    function greeted(){
        return storedNames;
    }

    function countTimes(name){
        
        return "hello, " + name + " you have been  greeted " + storedNames[name] + " times."
    }


    return {
        greetLang,
        namesStored,
        greeted,
        countTimes
    }
}
