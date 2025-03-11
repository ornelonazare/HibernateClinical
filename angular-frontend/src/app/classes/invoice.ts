import {Item} from "./item";

export type Invoice = {
  id: number;
  patientid: number;
  items: Item[];
  quantity: number;
  salesprice: number;
}
/*    constructor(id: number, patientid:number, items :Item[], quantity: number, salesprice: number) {
      this.id = id;
      this.patientid = patientid;
      this.items = items;
      this.quantity = quantity;
      this.salesprice = salesprice;
    }
  }*/
