import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, Injectable, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { ColumnTableMaterialLayout } from '../../interfaces/table';

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
  @Input() rows: any[] = []
  @Input() displayedColumns: ColumnTableMaterialLayout[] = []
  dataSource = new MatTableDataSource<any[]>(this.rows);
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any[]>;

  constructor() { }
  ngOnInit() { }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  renderRows(rows: any[]){
    this.dataSource.data = rows
    this.table.renderRows()
  }

  /**
   * TABLE METHODS
   */
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