#### greenGUI

> Don't touch me with those nasty hands.

For now this project encapsulates (at least) two separate node instances, including
a third if you're running Mongo locally. As of this writing, we're in the early
alpha stages so all development requires a local running instance of Mongo. Soon,
we will set up a dedicated mongo instance, either on-site (at my house) or using
one of the plethora of DBAAS that've been sprouting up everywhere.

Until then, we must run the local mongos.

- Install Mongo ([instructions](https://docs.mongodb.com/manual/installation/#tutorials))
- note: I recommend using the version management tool `m` ([found here](https://github.com/aheckmann/m))
- Either, `mongod` or `m use 3.2.0` (NOTE: may require preceding `sudo`)
- `<sudo> mongo` to access the shell
- Mongo should be running on its default port (27017) for now.

##### Simple shell instructions:

- `show dbs` - list available mongo databases
- `use <dbname>` - indicate to the shell which database you want to access
- `show collections` - list all collections associated with that db
- `db.<collection>.<query>` - run find, remove or any other CRUD operation from the shell.

#### Connecting HAPI

We're using [HapiJS](http://hapijs.com/) as our bridge between data producers and
the Mongo database. The Hapi community is very active and a lot of love has gone into
making this RESTful framework easy to use and highly extensible. Take a look at their
[github repo](https://github.com/hapijs/hapi) for more info. They even offer a mentoring program.

Our HAPI code is kept in the `/hapi` directory and is a separate service from our client-side app.
To run the server, `cd hapi` and `node server/server` -- this will initialize hapi
and listen to requests over port `1337`.

You should be able to interface via http like so,
- [http://localhost:1337/sensor/all](http://localhost:1337/sensor/all) - should dump all
of the sensor data from the database as a json object.

##### HTTP Clients

I've been using [HTTPie](https://github.com/jkbrzt/httpie), a Python program :snake:.

Usage:
- `http PUT http://localhost:1337/sensor/add type=temp description=72`

You can also use cURL:
- `curl --data "type=temp&&description=72" http://localhost:1337/sensor/add`

NOTE: those commands might not be right.

Further pertinent information can be found in the
[server readme](https://github.com/GreenfinityFarms/green_gui/tree/master/hapi/server/readme.md).

#### Connecting Meteor

The 'UI' part of our app is to be built with Meteor, this allows us a nice developer
experience with minimal build-step blunderings and toiling over the how and whens
of code preprocessing (since we're using .jsx and .scss files). Other bundler options
like [Webpack](https://webpack.github.io/), nice as they may be, would require significantly
more set-up. With Meteor, we don't even need Babel. (but still <3 Babel)

Meteor is now a full part of the greater Node/NPM ecosystem, so you can use any module
from NPM within your Meteor app. Since this is the case, and since both Meteor and the
HAPI server will more than likely be running in separate environments, both of them
will have their own `package.json` and `node_modules` folder (even though it's highly likely
that they'll be sharing many of the same libraries).

To start the app, simply [have Meteor installed](https://www.meteor.com/install) then `cd /meteor && meteor`.

If this is the first time it's ran, run `npm install` prior to the `meteor` command.

Meteor will attempt to start its own Mongo instance, so we have to make sure it connects
to the external instance that's already running, otherwise you won't have access to any of
the data from Hapi.

Additionally, we get access to Meteor's rich reactivity model which provides a pub/sub
interface for keeping client screens up-to-date. `Minimongo` let's use write client-side
code (`Collection.find({ "name": "Temp" })`) as if it were running on the server, and vice versa.

TODO: connect Meteor to external Mongo instance. Set the `MONGO_URL` environment variable to
something similar to:

`MONGO_URL='mongodb://user:password@paulo.mongohq.com:12345/' meteor`
