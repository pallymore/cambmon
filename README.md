Da CambMon!
===========

Simple MEAN stack app to track your heroku apps!

### Before you start...

You will need to set your heroku api key in this environment variable `HEROKU_API_KEY`

e.g.:

```
export HEROKU_API_KEY="yourawesomeherokuapikey"
```

### Development

Start your development server with:

```
grunt serve
```

### Build & Deployment

You should **build** your app first with this command:

```
grunt build
```

It's gonna create/update the **/dist** folder with production code!

Then `cd dist` and `git commit` (use `git init` if you are building for
the first time)

Push your dist folder to Heroku! (Don't forget to set **HEROKU_API_KEY** env' var there!

And...

> Profit!

### Help me improve

Hate my code? Then fix it! It's simple. Fork & pull request. :)
Here are some things you could help:

* Extract model logic from controllers to services/factories
* Clean up my poor written AngularJS code
* Utilize websocket instead of Server-Sent Events
* Add more functions!!

