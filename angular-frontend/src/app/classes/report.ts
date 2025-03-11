import { Diet } from './diet';
import { Medicine } from './medicine';

export type Report = {
  id?: number;
  report_patient: { "id" :number};
  report_doctor: { "id" :number};
  bloodpressure: string;
  pulserate: number;
  weight: number;
  allergies: string[];
  disabilities: string[];
  medicines: Medicine[];
  diets: Diet[];
  patienthistory: string;
  report_followupdoctor: { "id" :number};
}
/*    constructor(
      id: number,
      patientid: number,
      doctorid: number,
      createddate: Date,
      bloodpressure: string,
      pulserate: number,
      weight: number,
      allergies: string[],
      disabilities: string[],
      mediciness: Medicine[],
      diets: Diet[],
      patienthistory: string,
      followupdoctorid: number
    ) {
      this.id = id;
      this.patientid = patientid;
      this.doctorid = doctorid;
      this.createddate = new Date();
      this.bloodpressure = bloodpressure;
      this.pulserate = pulserate;
      this.weight = weight;
      this.allergies = allergies;
      this.disabilities = disabilities;
      this.medicines = mediciness;
      this.diets = diets;
      this.patienthistory = patienthistory;
      this.followupdoctorid = followupdoctorid;
    }
  }*/
