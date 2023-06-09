# plantpal-backend-tools

## Description
Exploration for tools that we might use in the backend for Plant Pal.

* Socket
  * Server socket for Raspberry Pi to listen for state change.
  * Client socket that broadcasts a state change to the Raspberry Pi.

* Lambdas
  * Lambda functions for AWS.

## Socket

This basic socket server was initially planned to be used to allow the EC2 server to communicate with the Raspberry Pi. However, we were unable to have a consistent endpoint for the Raspberry Pi, so we instead used it as a reference for setting up AWS SNS and SQS to act as a substitute.

## Lambdas

The Lambdas interface with Dynamoose to perform operations on our database. Because DynamoDB doesn't seem to have a straightforward way of querying sorted results, we instead try to minimize the amount of data we retrieve and have the clientside do some of the sorting. To get around issues of conflicting time zones, we used Moment.js to convert our timestamps to PST.

* getCurrentStatus
  * This function retrieves the most "recent" database entry. This reflects the last measurement posted by the Raspberry Pi.

* getDay
  * This function retrieves all of the "days" we have database entries, within the past 10 days.
  * This function also retrieves all of the database entries for a single "day" belonging to the given timestamp.

* postPlantStatus
  * This function allows for the creation of a database entry for Pi measurements.