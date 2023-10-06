#!/bin/bash

# Prompt the user for the event name
read -p "Enter event name: " event_name

# Prompt the user for the JSON payload
read -p "Enter JSON payload: " json_payload

# Construct the JSON data with event name and payload
data="{\"event\": \"$event_name\", \"payload\": $json_payload}"

# Send the POST request to localhost:3000
curl -X POST -d "$data" -H 'Content-Type: application/json' http://localhost:3000
