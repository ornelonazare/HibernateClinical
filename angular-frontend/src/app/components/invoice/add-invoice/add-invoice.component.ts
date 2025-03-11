import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Observable } from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import { Patient} from "../../../classes/patient";
import { Invoice} from "../../../classes/invoice";
import { InvoiceService } from "../../../services/invoice.service";
import { ItemService } from "../../../services/item.service";
import { Item } from "../../../classes/item";
import { PatientService } from "../../../services/patient.service";
import { DoctorService } from "../../../services/doctor.service";

declare module 'rxjs';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit {

  invoice: Invoice =
{
  id: 0,
  patientid: 0,
  items: null,
  quantity: 0,
  salesprice: 0
}
  submitted = false;
  reportID: number = 0;
  patient: Patient = new Patient(0, '', new Date(), new Date(), 0, '', '', '', '', '', 0, 0);
  patientid: number = 0;
  patients: Observable<Patient[]>;
  items: Observable<Item[]>;

  // Build Report Form
  invoiceForm = this.fb.group({
    patientid: 0,
    itemes: this.fb.array([this.buildItem()]),
    quantity: 0,
    salesprice: 0,
  });

  constructor(private patientService: PatientService,
              private doctorService: DoctorService,
              private invoiceService: InvoiceService,
              private itemService: ItemService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.items = this.itemService.getAll();
    this.patients = this.patientService.getAll();
    this.patientid = this.route.snapshot.params['patientid'];
    this.patient = new Patient(0, '', new Date(), new Date(), 0, '', '', '', '', '', 0, 0);
    if (this.patientid) {
      try {
        this.patientService.get(this.patientid).subscribe(
          (patientData: any) => {
            this.patient = patientData;
            this.invoiceForm.patchValue({
              patientname: this.patient.name,
              doctorname: this.patient.doctorid
            });
            console.log(this.patient);
          }
        );
      } catch ( e ) {
        console.log('Failed to load patient data');
      }
    }
  }

  save() {
    this.invoice = this.invoiceForm.value;
    console.log(this.invoice);
    this.invoiceService
      .create(this.invoice).subscribe((data: any) => {
        this.invoice = data;
        console.log(data);
        this.invoice = new Invoice(0, 0, null, 0, 0);
        this.gotoList();
      },
      (error: any) => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    this.router.navigate(['invoices']);
  }

  cancelAdd() {
    this.router.navigate(['invoices']);
  }

  get itemes() {
    return this.invoiceForm.get('itemes') as FormArray;
  }

  addItems() {
    this.itemes.push(this.buildItem());
  }

  removeItems(i: number) {
    this.itemes.removeAt(i);
  }

  private buildItem(): FormGroup {
    return this.fb.group({
      itemno: [''],
      itemname: [''],
      testsortname: [''],
      samname: [''],
      unitprice: [''],
    });
  }
}
