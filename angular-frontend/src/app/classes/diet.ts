export  class Diet  {
  dietid?: number;
  name: string;
  description: string;

  constructor(/*dietid: number,*/ name: string, description: string) {
   //this.dietid = dietid;
    this.name = name;
    this.description = description;
  }
}
