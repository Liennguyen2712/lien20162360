import {
  Component, OnInit, OnDestroy, Input, AfterViewInit, ViewChild
  , forwardRef, Output, EventEmitter
} from '@angular/core';
import { ReplaySubject, Subject, BehaviorSubject } from 'rxjs';
import { take, takeUntil, first, takeWhile } from 'rxjs/operators';
import { MatSelect } from '@angular/material';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup } from '@angular/forms';
//

import { FormControl } from '@angular/forms';
import { asEnumerable } from 'linq-es2015';

@Component({
  selector: 'mat-extend-select',
  templateUrl: './extend-select.component.html',
  styleUrls: ['./extend-select.component.scss'],
})
export class ExtendSelectComponent implements OnInit, AfterViewInit, OnDestroy {

  private _items: any[];
  toolTipData = '';

  //private _itemsAreUsed :boolean;
  private _data = new BehaviorSubject<any[]>([]);
  @Input()
  set items(value) {
    this._data.next(value);
    this.refreshData();
  };
  get items() {
    // get the latest value from _data BehaviorSubject
    return this._data.getValue();
  }

  @Input()
  group: FormGroup;

  @Input()
  applyPanelOverride: boolean;

  @Input()
  ItemControl: FormControl;

  @Input()
  placeHolder: string;

  @Input()
  displayField: string;

  @Input()
  displayField2: string;

  @Input()
  valueField: string;

  @Input()
  class: string;

  @Input()
  selectedModel: any;

  @Input()
  showTooltip: boolean;

  @Input()
  disabled: boolean;

  @Output() selectedModelChange = new EventEmitter();

  @ViewChild('singleSelect') singleSelect: MatSelect;

  //using ngModel
  //   <div fxFlex="100" fxLayout.lt-lg="100">
  //   <mat-extend-select class="full" [items]="this.pricelist" [valueField]="'M_PriceList_Id'" 
  //   [displayField]="'Code'" 
  //   [displayField2]="'Name'" 
  //   [placeHolder]="'Mẫu bảng giá'" [(selectedModel)] = "this.databinding.M_PriceList_Id" >
  //   </mat-extend-select>
  //   <p>Value:{{this.databinding.M_PriceList_Id}}</p>
  // </div>

  /** control for the MatSelect filter keyword */
  //ItemCtrl : FormControl = new FormControl();
  FilterCtrl: FormControl = new FormControl();
  ItemModel: any;

  public filteredItems: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  private _onDestroy = new Subject<void>();

  constructor() {
  }

  setControlValue(value: any) {

  }

  change(newValue) {
    //console.log('newvalue:', newValue)
    this.selectedModel = newValue;
    this.selectedModelChange.emit(newValue);
    if (this.showTooltip) {
      const itm = asEnumerable(this._items).FirstOrDefault(x => x[this.valueField] === newValue);
      if (itm) {
        this.toolTipData = itm[this.displayField];
      }
    }
  }

  ngOnInit() {
    // set initial selection
    this._data
      .pipe(takeWhile(() => !this._items)) // unsubscribe once _items has value
      .subscribe(x => {
        this._items = this.items;
        this.filteredItems.next(this.items);
      });
    // listen for search field value changes
    this.FilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterItems();
        //console.log(this.FilterCtrl.value);
        //this.ItemControl.setValue(this.FilterCtrl.value);
      });
  }

  ngAfterViewInit() {
    //this.setInitialValue();
  }

  protected filterItems() {
    if (!this._items) {
      return;
    }
    // get the search keyword
    let search = this.FilterCtrl.value;
    //console.log(search);
    if (!search) {
      this.filteredItems.next(this._items.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter items
    this.filteredItems.next(
      this._items.filter(itm => {

        //tim kiem tren ca field2
        if (this.displayField2) {
          return (itm[this.displayField].toLowerCase().indexOf(search) > -1) || (itm[this.displayField2].toLowerCase().indexOf(search) > -1)
        }
        else {
          if (itm[this.displayField]) {
            return itm[this.displayField].toLowerCase().indexOf(search) > -1
          }
        }
      })
    );
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  refreshData() {
    this._data
      .subscribe(x => {
        this._items = this.items;
        this.filteredItems.next(this.items);
      });
  }
}
