import { Component, OnInit } from "@angular/core";

import { ChartDataSets, ChartOptions } from "chart.js";
import { Color, Label } from "ng2-charts";
import { CovidService } from "src/app/services/covid.service";

@Component({
  selector: "app-social-distancing",
  templateUrl: "./social-distancing.page.html",
  styleUrls: ["./social-distancing.page.scss"],
})

/*
lineChartData,lineChartLabels,lineChartOptions: to use in line chart
timeLine: to show travel history
*/

export class SocialDistancingPage implements OnInit {
  public lineChartData: ChartDataSets[];
  public dataLoaded = false;
  public mallNames = ["Dmart", "Reliance", "HyberMart", "Big Bazar", "More"];
  public timeLine: object;
  public currentCases: any[];
  public lineChartLabels: Label[] = this.mallNames;
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: "#007bffad",
      backgroundColor: "#007bffad",
    },
    {
      borderColor: "pink",
      backgroundColor: "pink",
    },
    {
      borderColor: "yellow",
      backgroundColor: "yellow",
    },
  ];
  public lineChartLegend = true;
  public lineChartType = "line";
  public lineChartPlugins = [];

  constructor(private covidService: CovidService) {}

  ngOnInit() {
    this.lineChartData = [{ data: [3, 12, 0, 10, 3], label: "July" }];
    this.covidService.fetchHistoricalData(1).subscribe((value: any[]) => {
      this.dataLoaded = true;
      this.lineChartData = value["nearby_cases"];
      this.currentCases = value["nearby_cases"][0]["data"];
      this.timeLine = value["timeline"];
    });
  }
}
