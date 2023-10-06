# SCRIPTS #

### trigger_event ###

To hit the router with an event, run trigger_event with an event name and a payload. These shouldn't be string escaped.

ex.
```
./scripts/trigger_event.sh
Enter event name: HELLO
Enter JSON payload: { "destination": "world" }
```

### example_create_user ###

This script includes an example of how to use prisma, for people who haven't used prisma before. You can also check out the documentation here:

| __https://www.prisma.io/docs/concepts/components/prisma-client/crud__

Make sure you have ts-node or npx installed. If this doesn't work for you, install the latest version of node (__https://nodejs.dev/en/download/__).

To run the script, copy paste the following into your command line:
```
npx ts-node scripts/example_create_user.ts
```