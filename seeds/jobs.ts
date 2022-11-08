import { Knex } from "knex";
import Job from "src/modules/job/job.model";

export const jobData: Omit<Job, "id" | "createdAt" | "updatedAt">[] = [
  {
    role: "Senior Product Designer",
    location: "San Francisco, California",
    organization: "Atlas",
    description: "Craft and design great product experiences!",
  },
  {
    role: "Intermediate Backend Developer",
    location: "Jakarta",
    organization: "Orange Inc",
    description: "Build server-side software.",
  },
];

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("jobs").del();

  // Inserts seed entries
  await knex("jobs").insert(jobData);
}
