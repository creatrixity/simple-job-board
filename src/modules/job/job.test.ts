import { createServer } from "src/createServer";
import request from "supertest";
import { Express } from "express";
import knex, { Knex } from "knex";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";
import { jobData } from "../../../seeds/jobs";

const knexConfig = require("../../../knexfile");

describe("/jobs", () => {
  // -------------------------------------------------------------------------
  // Setup up
  // -------------------------------------------------------------------------

  let app: Express;
  let knexSetup: Knex;
  let databaseName: string;

  beforeAll(async () => {
    databaseName = uniqueNamesGenerator({
      dictionaries: [colors, adjectives, animals],
    });
    knexSetup = knex(knexConfig.testing);

    await knexSetup.raw(`CREATE DATABASE ${databaseName}`);

    knexSetup = knex({
      ...knexConfig.testing,
      database: databaseName,
    });

    await knexSetup.migrate.latest();
    await knexSetup.seed.run();
    app = createServer(knexSetup);
  });

  // -------------------------------------------------------------------------
  // Tear Down
  // -------------------------------------------------------------------------
  afterAll(async () => {
    await knexSetup.raw(`DROP DATABASE ${databaseName}`);
    await knexSetup.destroy();
  });

  // -------------------------------------------------------------------------
  // Test cases
  // -------------------------------------------------------------------------

  test("GET: / should return a success status", async () => {
    await request(app).get("/").expect("Content-Type", /json/).expect(200);
  });

  test("GET: /jobs should return a list of jobs", async () => {
    const result = await request(app).get("/jobs");
    expect(
      result.get("Content-Type").includes("application/json")
    ).toBeTruthy();
    expect(result.statusCode).toEqual(200);
    expect(result.body.results).toEqual(
      expect.arrayContaining(jobData.map((job) => expect.objectContaining(job)))
    );
  });

  test("POST: /jobs should create a new job", async () => {
    const jobCreationData = {
      role: "Virtual Reality Designer",
      location: "Seattle",
      organization: "Microsoft",
      description: "Reimagine virtual reality experiences",
    };

    const jobCreationResponse = await request(app)
      .post("/jobs")
      .send(jobCreationData)
      .set("Accept", "application/json");

    expect(jobCreationResponse.statusCode).toEqual(201);

    const jobsResponse = await request(app).get("/jobs");
    const jobs = jobsResponse.body.results;

    expect(jobs[jobs.length - 1]).toMatchObject(jobCreationData);
  });
});
