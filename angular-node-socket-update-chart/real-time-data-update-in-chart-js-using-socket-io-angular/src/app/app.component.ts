import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";

// import socket.io-client - 10
import * as io from "socket.io-client";
// invoke the io with node backend url as socket - 11
const socket = io("http://localhost:3000");

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})

// implements OnInit - 1
export class AppComponent implements OnInit {
  title = "dashboard";

  // create variavble for barChart - 3
  barChart;
  // create variavble for barChart - 5
  pieChart;
  // create variavble for barChart - 7
  doughnutChart;

  data1 = [];

  // create ngOnInit() method - 2
  ngOnInit() {
    // create new Chart for bar - 4
    this.barChart = new Chart("bar", {
      type: "bar",
      options: {
        responsive: true,
        title: {
          display: true,
          text: "Combo Bar and line Chart",
        },
      },
      data: {
        labels: ["a", "b", "c", "d", "e", "f", "g", "h"],
        datasets: [
          {
            type: "bar",
            label: "My First dataset",
            data: [243, 156, 365, 30, 156, 265, 356, 543],
            backgroundColor: "rgba(255,0,255,0.4)",
            borderColor: "rgba(255,0,255,0.4)",
            fill: false,
          },
          {
            type: "bar",
            label: "My Second dataset",
            data: [243, 156, 365, 30, 156, 265, 356, 543].reverse(),
            backgroundColor: "rgba(0,0,255,0.4)",
            borderColor: "rgba(0,0,255,0.4)",
            fill: false,
          },
        ],
      },
    });

    // create new Chart for bar - 8
    this.doughnutChart = new Chart("doughnut", {
      type: "doughnut",
      options: {
        responsive: true,
        title: {
          display: true,
          text: "Doughnut Chart",
        },
        legend: {
          position: "top",
        },
        animation: {
          animateScale: true,
          animateRotate: true,
        },
      },
      data: {
        datasets: [
          {
            data: [45, 10, 5, 25, 15],
            backgroundColor: ["red", "orange", "yellow", "green", "blue"],
            label: "Dataset 1",
          },
        ],
        labels: ["Red", "Orange", "Yellow", "Green", "Blue"],
      },
    });

    // create new Chart for bar - 6
    this.pieChart = new Chart("pie", {
      type: "pie",
      options: {
        responsive: true,
        title: {
          display: true,
          text: "Pie Chart",
        },
        legend: {
          position: "top",
        },
        animation: {
          animateScale: true,
          animateRotate: true,
        },
      },
      data: {
        datasets: [
          {
            data: [45, 10, 5, 25, 15].reverse(),
            backgroundColor: ["red", "orange", "yellow", "green", "blue"],
            label: "Dataset 1",
          },
        ],
        labels: ["Red", "Orange", "Yellow", "Green", "Blue"],
      },
    });

    // socket turn on the invoke update method - 12
    socket.on("data1", (res) => {
      this.updateChartData(this.barChart, res, 0);
      this.updateChartData(this.pieChart, res.slice(0, 5), 0);
      this.updateChartData(this.doughnutChart, res.slice(0, 5), 0);
    });
    // socket turn on the invoke update method - 13
    socket.on("data2", (res) => {
      this.updateChartData(this.barChart, res, 1);
    });
  }

  // update method - 9
  updateChartData(barChart, data, dataSetIndex) {
    barChart.data.datasets[dataSetIndex].data = data;
    barChart.update();
  }
}
