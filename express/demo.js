
var express = require('express'),
    exphbs  = require('express3-handlebars'),
    app = express();

// Create `ExpressHandlebars` instance with a default layout.
hbs = exphbs.create({
    defaultLayout: 'main'
});

// Register `hbs` as our view engine using its bound `engine()` function.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware to expose the app's partials when rendering the view.
function exposeTemplates(req, res, next) {
    // Uses the `ExpressHandlebars` instance to get the precompiled partials.
    hbs.getPartials({precompiled: true}, function (err, partials) {
        if (err) { return next(err); }

        var templates = [];

        Object.keys(partials).forEach(function (name) {
            templates.push({
                name    : name,
                template: partials[name]
            });
        });

        // Exposes the partials during view rendering.
        res.locals.templates = templates;
        next();
    });
}

app.get('/', exposeTemplates, function (req, res, next) {
    res.render('home');
});

app.listen(3000);