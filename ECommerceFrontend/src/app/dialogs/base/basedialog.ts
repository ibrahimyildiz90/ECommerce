import { MatDialogRef } from "@angular/material/dialog";

export class Basedialog<DialogComponent> {
    constructor( public dialogRef: MatDialogRef<DialogComponent>)
    {}

    close():void{
        this.dialogRef.close();
      }
}
