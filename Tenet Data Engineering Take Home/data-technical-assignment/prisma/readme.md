## PRISMA ##

We use prisma as our ORM at Tenet, and it's important for our data engineer to be able to navigate, interact with, and contribute to how we construct our data models. The documentation is here:

| __https://pris.ly/d/prisma-schema__

You may need to modify the source database schema via the ORM. In order to do that, make any changes required in the schema.prisma file, and then run:

```
npx prisma migrate dev
```

This is also how you initialize the database and apply pre-existing migrations.

This should generate a new migration, which you can name, and apply your changes to the database.

Migrations can be found in the migration folder.

To seed the database, run:
```
npx prisma db seed
```

## TROUBLESHOOTING ##

If for some reason you get into a bad state, run:

```
npx prisma migrate reset
```

This will delete everything, reapply migrations and re-seed your database

## NOTE ON DESTINATION DB ##

Do _NOT_ use prisma when setting up your destination database.