import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ResetPasswordModel } from 'src/app/models/base/utilities';
import { CommonDialogService } from '../../../../services/utilities/dialog/dialog.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.css']
})
export class ChangePasswordDialogComponent implements OnInit {
  username: string;
  pwModel: ResetPasswordModel = {};

  constructor(public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,private _authService: AuthService, private _dialogService: CommonDialogService) { }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.username = this._authService.getUsername();
  }

  async submit() {
    const rs = await this._authService.changePassword(this.pwModel);
    if (rs.isSuccess) {
      await this._dialogService.alert('Thay đổi thành công');
      this.close();
    } else {
      this._dialogService.alert(rs.message);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
