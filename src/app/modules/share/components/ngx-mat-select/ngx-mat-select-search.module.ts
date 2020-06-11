/**
 * Copyright (c) 2018 Bithost GmbH All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { NgModule } from '@angular/core';
import { MatSelectSearchComponent } from './mat-select-search.component';
import {
  MatButtonModule, MatInputModule, MatIconModule, MatProgressSpinnerModule, MatCheckboxModule
  , MatSelectModule, MatFormFieldModule, MatTooltipModule
} from '@angular/material';
import { CommonModule } from '@angular/common';

import { MatSelectSearchClearDirective } from './mat-select-search-clear.directive';
import { ExtendSelectComponent } from './extend-select/extend-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const MatSelectSearchVersion = '1.8.0';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTooltipModule,
  ],
  declarations: [
    MatSelectSearchComponent,
    MatSelectSearchClearDirective,
    ExtendSelectComponent
  ],
  exports: [
    MatSelectSearchComponent,
    MatSelectSearchClearDirective,
    ExtendSelectComponent
  ]
})
export class NgxMatSelectSearchModule { }
