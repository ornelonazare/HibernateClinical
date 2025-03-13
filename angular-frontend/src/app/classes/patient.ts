
export type Patient = {
  id: number;
  name: string;
  entrydate?: Date; // Use camelCase for properties
  dob?: Date; // Date of Birth
  age: number;
  gender: string;
  occupation: string;
  healthinsuranceno: string; // Use camelCase for consistency
  healthcareprovider: string; // Use camelCase
  patientaddress: string; // Use camelCase
  contact: number;
  patient_doctor : number; // Use camelCase
}
 /* constructor(
    id: number,
    name: string,
    entryDate: Date,
    dob: Date,
    age: number,
    gender: string,
    occupation: string,
    healthInsuranceNo: string,
    healthcareProvider: string,
    patientAddress: string,
    contact: number,
    doctorid: number
  ) {
    this.id = id;
    this.name = name;
    this.entryDate = entryDate;
    this.dob = dob;
    this.age = age;
    this.gender = gender;
    this.occupation = occupation;
    this.healthInsuranceNo = healthInsuranceNo;
    this.healthcareProvider = healthcareProvider;
    this.patientAddress = patientAddress;
    this.contact = contact;
    this.doctorid = doctorid;
  }
}
*/
