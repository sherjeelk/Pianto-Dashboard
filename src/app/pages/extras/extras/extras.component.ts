import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {ToastrService} from 'ngx-toastr';
import {Extra, Extras} from '../../../models/Extras';
import {MatSort} from '@angular/material/sort';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-extras',
  templateUrl: './extras.component.html',
  styleUrls: ['./extras.component.scss']
})
export class ExtrasComponent implements OnInit, AfterViewInit {
  public extrasId;
  public totalPage: number[];
  private page: any;
  public allExtras: Extras;
  progress = false;
  pageEvent: PageEvent;


  // Mat table variables

  displayedColumns: string[] = ['_id', 'name', 'value', 'type'];
  exampleDatabase: ExampleHttpDatabase | null;
  data: GithubIssue[] = [];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;  public allExtrasResults: Extra[] = [];
  dataSource = new MatTableDataSource<Extra>(this.allExtrasResults);

  constructor(private api: ApiService, private toaster: ToastrService, private httpClient: HttpClient) { }

  ngOnInit() {
    // this.getAllExtras();
    this.getPageData(0);
    // this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
  }

  getAllExtras() {
    this.progress = true;
    this.api.getAllExtras().subscribe(data => {
      console.log('this is all users', data);
      this.allExtras = data;
      this.progress = false;
      this.getTotalPages();
      console.log('these are all users********', this.allExtras.results);
    }, error => {
      this.progress = false;
      console.log('An error Occurred', error);

    });
  }

  getTotalPages() {
    this.totalPage = Array(this.allExtras.totalPages).fill(0).map((x, i) => i);
    // console.log('**************', this.totalPage);

  }
  getPageData(index: any) {
    console.log('this page is clicked', index);
    this.page = index;
    this.api.getAllExtraByPage(this.page).subscribe( data => {
      console.log('this is user data on click', index, data);
      this.allExtras = data;
      this.allExtrasResults = data.results;
      this.dataSource = new MatTableDataSource<Extra>(this.allExtrasResults);
      console.log(this.dataSource, this.allExtrasResults);
      setTimeout(()  => {
        this.dataSource.sort = this.sort;
      });
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.allExtrasResults.filter = filterValue.trim().toLowerCase();
  }

  // ngAfterViewInit() {
  //   this.exampleDatabase = new ExampleHttpDatabase(this.httpClient);
  //
  //   // If the user changes the sort order, reset back to the first page.
  //   this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  //
  //   merge(this.sort.sortChange, this.paginator.page)
  //     .pipe(
  //       startWith({}),
  //       switchMap(() => {
  //         this.isLoadingResults = true;
  //         return this.exampleDatabase!.getRepoIssues(
  //           this.sort.active, this.sort.direction, this.paginator.pageIndex);
  //       }),
  //       map(data => {
  //         // Flip flag to show that loading has finished.
  //         this.isLoadingResults = false;
  //         this.isRateLimitReached = false;
  //         this.resultsLength = data.total_count;
  //
  //         return data.items;
  //       }),
  //       catchError(() => {
  //         this.isLoadingResults = false;
  //         // Catch if the GitHub API has reached its rate limit. Return empty data.
  //         this.isRateLimitReached = true;
  //         return observableOf([]);
  //       })
  //     ).subscribe(data => this.data = data);
  // }



}
export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDatabase {
  constructor(private httpClient: HttpClient) {
  }

  getRepoIssues(sort: string, order: string, page: number): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl =
      `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${page + 1}`;
    return this.httpClient.get<GithubApi>(requestUrl);
  }
}
