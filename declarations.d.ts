import { knex } from "knex";

import { Job } from "src/modules/job/job.model";

declare module "knex/types/tables" {
  interface Tables {
    jobs: Job;
    jobs_composite: Knex.CompositeTableType<
      Job,
      Partial<Pick<Job, "created_at" | "updated_at">>,
      Partial<Omit<Job, "id">>
    >;
  }
}
