import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { AlertDialogComponent } from "src/app/modules/share/dialogs/alert-dialog/alert-dialog.component";
import { ConfirmDialogComponent } from "src/app/modules/share/dialogs/confirm-dialog/confirm-dialog.component";
import { AddDiaryDialogComponent } from "src/app/modules/share/dialogs/add-diary-dialog/add-diary-dialog.component";

@Injectable({
    providedIn: 'root'
  })
export class CommonDialogService {
    constructor(public dialog: MatDialog) { }

    async alert(msg: string): Promise<void> {
        const dialogRef = this.dialog.open(AlertDialogComponent, {
            width: '369px',
            data: { title: 'Xác nhận', msg: msg }
        });

        // dialogRef.afterClosed().subscribe(result => {
        //     console.log('The dialog was closed');
        //     alert(result);
        // });
        return dialogRef.afterClosed().toPromise();
    }

    async confirm(msg: string): Promise<boolean> {        
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '369px',
            data: { title: 'Xác nhận', msg: msg }
        });
     
        return dialogRef.afterClosed().toPromise();
    }
}