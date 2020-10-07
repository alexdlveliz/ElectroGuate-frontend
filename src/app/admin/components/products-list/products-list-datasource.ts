import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface ProductsListItem {
  name: string;
  id: number;
  description: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: ProductsListItem[] = [
  {id: 1, name: 'Hydrogen', description: 'description'},
  {id: 2, name: 'Helium', description: 'description'},
  {id: 3, name: 'Lithium', description: 'description'},
  {id: 4, name: 'Beryllium', description: 'description'},
  {id: 5, name: 'Boron', description: 'description'},
  {id: 6, name: 'Carbon', description: 'description'},
  {id: 7, name: 'Nitrogen', description: 'description'},
  {id: 8, name: 'Oxygen', description: 'description'},
  {id: 9, name: 'Fluorine', description: 'description'},
  {id: 10, name: 'Neon', description: 'description'},
  {id: 11, name: 'Sodium', description: 'description'},
  {id: 12, name: 'Magnesium', description: 'description'},
  {id: 13, name: 'Aluminum', description: 'description'},
  {id: 14, name: 'Silicon', description: 'description'},
  {id: 15, name: 'Phosphorus', description: 'description'},
  {id: 16, name: 'Sulfur', description: 'description'},
  {id: 17, name: 'Chlorine', description: 'description'},
  {id: 18, name: 'Argon', description: 'description'},
  {id: 19, name: 'Potassium', description: 'description'},
  {id: 20, name: 'Calcium', description: 'description'},
];

/**
 * Data source for the ProductsList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ProductsListDataSource extends DataSource<ProductsListItem> {
  data: ProductsListItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ProductsListItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ProductsListItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ProductsListItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
