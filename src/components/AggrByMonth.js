import { aggregation } from "../HOCs/aggregation";
import { MonthTable } from "./MonthTable";

export const AggrByMonth = aggregation(MonthTable, 'month');
