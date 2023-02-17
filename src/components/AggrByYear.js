import { aggregation } from "../HOCs/aggregation";
import { YearTable } from "./YearTable";

export const AggrByYear = aggregation(YearTable, 'year');