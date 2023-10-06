
# BOOTUP INSTRUCTIONS AND GENERAL INFO #

See `readme.md`  for assignment requirements.

## Starting the Project ##

- Install docker compose (https://docs.docker.com/compose/install/)
- Install the latest version of node (https://nodejs.dev/en/download/)
- Run `npm i` - this installs dependencies
- Run `docker compose up` - this boots up the docker container
- Run `npx prisma migrate dev` - this applies initial migrations to the database
- Run `npx prisma db seed` - this seeds the source db

## READMEs ##

Read the readmes! They are there to help. 

For suggested edits, questions, or concerns, reach out to __jake@tenet.com__.

## Important Notes: ##

- The port for the source destination has been mapped from 5432 in the docker container to port 5433. This is to prevent common port conflicts (i.e. you're running postgres locally).

- Most directories have a readme for the ready-made template code. Please extend, refactor, delete, etc. these readmes and template code if helpful, they are designed to help you (not to get in the way).

- The docker container is set up for hot reloading - any changes you make should reflect immediately. To sense check this is working, I would suggest repeatedly hitting localhost:3000 and changing the router response.
