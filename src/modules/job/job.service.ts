import { Knex } from "knex";
import Job from "./job.model";
import JobRepository from "./job.repository";

class JobService {
  private jobRepository: JobRepository;

  constructor(knex: Knex) {
    this.jobRepository = new JobRepository(knex);
  }

  async saveJob(job: Job) {
    return this.jobRepository.create(job);
  }

  async getJobs(): Promise<Job[]> {
    return this.jobRepository.getJobs();
  }
}

export default JobService;
