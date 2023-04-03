import { AfterViewInit, Component, Injectable, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { ColumnTableMaterialLayout, TableEvent } from './interfaces/table.interfaces';

@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  // For internationalization, the `$localize` function from
  // the `@angular/localize` package can be used.
  firstPageLabel = `First page`;
  itemsPerPageLabel = `Items per page:`;
  lastPageLabel = `Last page`;

  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  nextPageLabel = 'Next page';
  previousPageLabel = 'Previous page';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return `Page 1 of 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Page ${page + 1} of ${amountPages}`;
  }
}

@Component({
  selector: 'app-table-material-layout',
  templateUrl: './table-material-layout.component.html',
  styleUrls: ['./table-material-layout.component.css'],
  providers: [{ provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl }],
})
export class TableMaterialLayoutComponent implements OnInit, AfterViewInit {
  @Input() displayedColumns: ColumnTableMaterialLayout[] = []
  @Output() eventEmmiter = new EventEmitter<TableEvent>()
  dataSource = new MatTableDataSource<any[]>([]);
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any[]>;
  isCheckedAll = false
  constructor() { }
  ngOnInit() { }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /**
   * EVENTS
   */
  emmitEvent(element: any, action: string){
    const event: TableEvent = {
      data: element,
      action: action
    }
    this.eventEmmiter.emit(event)
  }
  triggerAllCheckbox() {
    // if (this.dataSource.paginator) {
    //   const page = this.dataSource.paginator.pageIndex
    //   const data = this.dataSource.data
    //   const take = this.dataSource.paginator.pageSize * page
    //   console.log(data.slice(take, take + this.dataSource.paginator.pageSize))
    // }
    this.emmitEvent(this.isCheckedAll, 'triggerAllCheckbox')
  }
  triggerCheckbox(idx: number) {
    console.log(idx)
    this.emmitEvent(idx, 'triggerCheckbox')
  }

  /**
   * TABLE METHODS
  */
 renderRows(rows: any[]){
   this.dataSource.data = rows
   this.table.renderRows()
 }
 applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * COMPUTED METHODS
   */

  /**
   * get value from object with custom property
   * @param obj
   * @param value
   * @returns
   */
  getValueFromProperty(obj: any, value: string) {
    return obj[value]
  }

  /**
   * get all columns
   * @returns
   */
  getColumns() {
    return this.displayedColumns.map(x => x.nameVar)
  }
}
