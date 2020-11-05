module.exports = function sepaRoutes(greet) {

  async function home(req, res, next) {
    try {
      res.render('index')
    } catch (err) {
      next(err)
    }

  };

  async function flash(req, res) {
    try {
      req.flash('info', 'Flash Message Added');
      res.redirect('/');
    } catch (err) {
      next(err)
    }
  };

  async function greetedNames(req, res, next) {
    try {
      res.render("greeted", {
        namesStored: await greet.getAll()


      })
    } catch (err) {
      console.log(err);
      
    }

  };

  async function greetings(req, res, next) {

    try {
      let firstNames = req.body.name
      let languages = req.body.language
      let lang = await greet.greetLang(firstNames, languages)


      await greet.getAll();
      let personCounter = await greet.countTimes()

      var message = "Hello, " + firstNames + " has been greeted " + personCounter + " times."
      let counters = 0;

      if (firstNames === "") {
        req.flash('info', 'ERROR, Please enter your name');
      } else if (languages === undefined) {
        req.flash('info', 'ERROR, Please enter your language');
      } else {
        await greet.add(firstNames);
        counters = await greet.displayCounter()

      }
      res.render("index", {
        msg: lang,


        counter: counters
      })
    } catch (err) {
      // console.log({
      //   err
      // });

      next(err)
    }

  };

  async function counterNames(req, res, next) {
    try {
    let namesGreeted = req.params.name
    let personCounter = await greet.countTimes(namesGreeted)
    var message = "Hello, " + namesGreeted + " has been greeted " + personCounter + " times."
    
      res.render("count", {
        message
      })
    } catch (err) {
      next(err)
    }
  };

  async function reset(req, res) {
    try {
      await greet.deleteValues()
      res.redirect("/")
    } catch (err) {
      next(err)
    }
  };

  return {
    home,
    greetedNames,
    counterNames,
    greetings,
    flash,
    reset
  }


}