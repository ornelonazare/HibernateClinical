import {Report} from "./report";
import {Diet} from "./diet";
import {Medicin} from "./medicin";

export type ReportDTO = {
  allergies: string[],
  disabilities: string[],
  diets: Diet[],
  medicins: Medicin[],
  report : Report
}

