# Simple-Job-Board

Simple-Job-Board is a code project demonstrating test isolation as a solution to test flakiness. We utilize Docker containers to prevent cross-contamination between tests.

## Setup

To setup this application, please install the required packages via NPM:

```bash
npm install
```

This application has PostgreSQL as a service dependency. You may run a Docker container for `PostgreSQL`:

```sh
# We need to create an isolated bridge network to allow us connect to our instances
docker create network simple-job-board --driver bridge
docker pull postgres
docker run --name simple-job-board-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=5uperIn5ecurePa55word -e POSTGRES_DB=simple-job-board -p 5432:5432 -d postgres
```

## Running the application

You may run the application locally in development mode by executing `npm start`

Run the integration test with `npm test`
