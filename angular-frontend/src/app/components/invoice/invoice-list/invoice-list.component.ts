import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Patient } from '../../../classes/patient';
import { Invoice } from '../../../classes/invoice';
import { InvoiceService } from '../../../services/invoice.service';
import { PatientService } from '../../../services/patient.service';
import { ActivatedRoute, Router } from '@angular/router';

declare module 'rxjs';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {

  patients: Observable<Patient[]>;
  patientList: Patient[] = [];
  invoices: Observable<Invoice[]>;
  invoiceBypatientid: Invoice = new Invoice(0, 0, null, 0, 0);
  subscription: Subscription;

  constructor(private invoiceService: InvoiceService,
              private patientService: PatientService,
              private router: Router,
              private route: ActivatedRoute,
              ) { }

  ngOnInit(): void {
    this.reloadData();
    this.subscription = this.invoiceService.getListUpdateAlert().subscribe(
      (invoiceMessage: any) => {
        if (invoiceMessage) {
          this.reloadData();
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  reloadData() {
    this.patients = this.patientService.getAll().subscribe(
      (data: Patient[]) => {
        this.patientList = data;
      }
    );
    this.invoices = this.invoiceService.getAll();
  }

  invoiceDetails(id: number) {
    this.router.navigate([ 'invoiceDetails', id ]);
  }

  getPatientName(patientID: number) {
    try {
      return this.patientList?.find(p => p.id === patientID)?.name;
    } catch ( error ) {
      return null;
    }
  }

  getPatientContact(patientID: number) {
    try {
      return this.patientList?.find(p => p.id === patientID)?.contact;
    } catch ( error ) {
      return null;
    }
  }

  updateInvoice(id: string) {
    this.router.navigate([ 'updateInvoice', id ]);
  }
}
