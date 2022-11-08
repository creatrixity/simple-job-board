import knex from "knex";
import config from "./config";
import { createServer } from "./createServer";

const knexConfig = require("../knexfile");
const knexSetup = knex(knexConfig.development);

createServer(knexSetup, config.server.port);
