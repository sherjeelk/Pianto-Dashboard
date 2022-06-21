import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from '../../variables/charts';
import {ApiService} from '../../services/api.service';
import {UserDetailsComponent} from '../User/user-details/user-details.component';
import {AllUser, User} from '../../models/UserDetail';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked = true;
  public clicked1 = false;
  public usersData: User[];

  constructor(private api: ApiService) {
  }
  ngOnInit() {

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    const chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    const ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    const chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
      type: 'line',
      options: {
        scales: {
          yAxes: [{
            gridLines: {
              color: '#212529',
              zeroLineColor: '#212529'
            },
            ticks: {
              callback(value) {
                if (!(value % 10)) {
                  return '$' + value + 'k';
                }
              }
            }
          }]
        }
      },
      data: {
        labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Performance',
          data: [0, 15, 35, 30 , 45, 40, 55 , 50]
        }]
      }
    });

    this.getAllUsers();
  }


  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }
//  Get All Users

  getAllUsers() {
    this.api.getAllUsers().subscribe(data => {
      this.usersData = data.results.reverse();
    }, error => {
      console.log('an error occurred in getting User Data', error);
    });
  }

}
