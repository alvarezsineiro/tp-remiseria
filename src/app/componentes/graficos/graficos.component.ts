import { Component, OnInit } from '@angular/core';
import { EncuestaService } from '../../servicios/encuesta.service';
import { Encuesta } from "../../clases/encuesta";
import { Chart } from 'chart.js';
@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit {

  listaEncuesta: Array<Encuesta> = [];

  tipo = "";
  ChartLabelsGrafico1: Array<string> = ["Si", "No"];
  ChartLabelsGrafico2: Array<string> = ["Si", "No", "Maso Menos"];
  ChartLabelsGrafico3: Array<string> = ["Si", "No", "Menos de 15 minutos T","Mas de 15 minutos T"];
  ChartLabelsGrafico4: Array<string> = ["Fue incomodo","Se paro durante el viaje","No se sintio seguro"];
  ChartLabelsGrafico5: Array<string> = ["Buen estilo","Buena funcionalidad"];
  ChartLabelsGrafico6: Array<string> = ["Si a todos mis amigos","Solo a conocido","NO"];
  ChartLabelsGrafico7: Array<string> = ["1","2","3","4","5","6","7","8","9","10"];
  ChartDataGrafico1: Array<number> = [0, 0];
  ChartDataGrafico2: Array<number> = [0, 0, 0];
  ChartDataGrafico3: Array<number> = [0, 0, 0, 0];
  ChartDataGrafico4: Array<number> = [0, 0, 0, 0];
  ChartDataGrafico5: Array<number> = [0, 0, 0];
  ChartDataGrafico6: Array<number> = [0, 0, 0];
  ChartDataGrafico7: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  pieChartType: string = 'pie';

  constructor(public miEncuestaservicio: EncuestaService) { }
  public llamaServicePromesa() {
    this.miEncuestaservicio.listarEncuestaPromesa().then(
      (listadoPromesa) => {
        this.listaEncuesta = listadoPromesa;
        this.mostrarGraficos();
      }
    );
  }
  public mostrarGraficos() {
    for (let i = 0; i < this.listaEncuesta.length; i++) {

      //Datos grafico 1
      if (this.listaEncuesta[i].pregunta1 == "Si")
        this.ChartDataGrafico1[0]++;
      else
        this.ChartDataGrafico1[1]++;

      //Datos grafico 2  
      if (this.listaEncuesta[i].pregunta2 == "Si")
        this.ChartDataGrafico2[0]++;
      else if (this.listaEncuesta[i].pregunta2 == "No")
        this.ChartDataGrafico2[1]++;
      else
        this.ChartDataGrafico2[2]++;

      //Datos grafico 3  
      if (this.listaEncuesta[i].pregunta3 == "Si")
        this.ChartDataGrafico3[0]++;
      else if (this.listaEncuesta[i].pregunta3 == "No")
        this.ChartDataGrafico3[1]++;
      else if (this.listaEncuesta[i].pregunta3 == "SiMenos")
        this.ChartDataGrafico3[2]++;
      else
        this.ChartDataGrafico3[3]++;

      //Datos grafico 4
      if(this.listaEncuesta[i].pregunta4 != "")
      { 
        var data = this.listaEncuesta[i].pregunta4.split("-");

        for(let y=0; y<data.length;y++)
        {
          if(data[y] == "Fue incomodo")
            this.ChartDataGrafico4[0]++
          else if(data[y] == "Se paro durante el viaje")
            this.ChartDataGrafico4[1]++
          else if(data[y] == "No se sintio seguro")
            this.ChartDataGrafico4[2]++
        } 
      }  
      //Datos grafico 5
      if(this.listaEncuesta[i].pregunta5 != "")
      { 
        var data = this.listaEncuesta[i].pregunta5.split("-");

        for(let y=0; y<data.length;y++)
        {
          if(data[y] == "Buen estilo")
            this.ChartDataGrafico5[0]++
          else if(data[y] == "Buena funcionalidad")
            this.ChartDataGrafico5[1]++
        } 
      }
      //Datos grafico 6  
      if (this.listaEncuesta[i].pregunta6 == "Si")
        this.ChartDataGrafico6[0]++;
      else if (this.listaEncuesta[i].pregunta6 == "So")
        this.ChartDataGrafico6[1]++;
      else
        this.ChartDataGrafico6[2]++;

      //Datos grafico 7  
      switch(this.listaEncuesta[i].pregunta7){
        case "1":
          this.ChartDataGrafico7[0]++;
          break;
        case "2":
          this.ChartDataGrafico7[1]++;
          break;
        case "3":
          this.ChartDataGrafico7[2]++;
          break;
        case "4":
          this.ChartDataGrafico7[3]++;
          break;
        case "5":
          this.ChartDataGrafico7[4]++;
          break;
        case "6":
          this.ChartDataGrafico7[5]++;
          break;
        case "7":
          this.ChartDataGrafico7[6]++;
          break;
        case "8":
          this.ChartDataGrafico7[7]++;
          break;
        case "9":
          this.ChartDataGrafico7[8]++;
          break;
        case "10":
          this.ChartDataGrafico7[9]++;
          break;
      }
      
    }

    var graf1 = document.getElementById("grafico1");
    var myGraf1 = new Chart(graf1, {
      type: this.pieChartType,
      //type: "pie",
      data: {
        //labels: this.pieChartLabels,
        labels: this.ChartLabelsGrafico1,
        datasets: [{
          data: this.ChartDataGrafico1,
          //data: this.pieChartData,
          backgroundColor: [
            'rgba(221, 71, 71, 0.3)',
            'rgba(255, 221, 31, 0.4)'
            ],
          borderColor: [
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
          ],
          borderWidth: 2
        }]
      },
    });
    var graf2 = document.getElementById("grafico2");
    var myGraf2 = new Chart(graf2, {
      type: this.pieChartType,
      //type: "pie",
      data: {
        //labels: this.pieChartLabels,
        labels: this.ChartLabelsGrafico2,
        datasets: [{
          data: this.ChartDataGrafico2,
          //data: this.pieChartData,
          backgroundColor: [
            'rgba(78, 68, 223, 0.4)',
            'rgba(235, 151, 56, 0.2)',
            'rgba(170, 170, 170, 0.2)'
          ],
          borderColor: [
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
          ],
          borderWidth: 2
        }]
      },
    });
    var graf3 = document.getElementById("grafico3");
    var myGraf3 = new Chart(graf3, {
      type: this.pieChartType,
      //type: "pie",
      data: {
        //labels: this.pieChartLabels,
        labels: this.ChartLabelsGrafico3,
        datasets: [{
          data: this.ChartDataGrafico3,
          //data: this.pieChartData,
          backgroundColor: [
            'rgba(192, 52, 118, 0.4)',
            'rgba(66, 170, 211, 0.2)',
            'rgba(40, 172, 139, 0.4)',
            'rgba(173, 161, 52, 0.2)'
          ],
          borderColor: [
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
          ],
          borderWidth: 2
        }]
      },
    });
    var graf4 = document.getElementById("grafico4");
    var myGraf4 = new Chart(graf4, {
      type: "bar",
      //type: "pie",
      data: {
        //labels: this.pieChartLabels,
        labels: this.ChartLabelsGrafico4,
        datasets: [{
          data: this.ChartDataGrafico4,
          //data: this.pieChartData,
          backgroundColor: [
            'rgba(130, 61, 151, 0.3)',
            'rgba(221, 71, 71, 0.4)',
            'rgba(255, 221, 31, 0.2)',
            ],
          borderColor: [
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
          ],
          borderWidth: 2
        }]
      },
    });
    var graf5 = document.getElementById("grafico5");
    var myGraf5 = new Chart(graf5, {
      type: "bar",
      data: {
        labels: this.ChartLabelsGrafico5,
        datasets: [{
          data: this.ChartDataGrafico5,
          //data: this.pieChartData,
          backgroundColor: [
            'rgba(78, 68, 223, 0.3)',
            'rgba(235, 151, 56, 0.4)'
            ],
          borderColor: [
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
          ],
          borderWidth: 2
        }]
      },
    });
    var graf6 = document.getElementById("grafico6");
    var myGraf6 = new Chart(graf6, {
      type: "doughnut",
      //type: "pie",
      data: {
        //labels: this.pieChartLabels,
        labels: this.ChartLabelsGrafico6,
        datasets: [{
          data: this.ChartDataGrafico6,
          //data: this.pieChartData,
          backgroundColor: [
            'rgba(170, 170, 170, 0.3)',
            'rgba(192, 52, 118, 0.4)',
            'rgba(66, 170, 211, 0.2)'
            ],
          borderColor: [
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
          ],
          borderWidth: 2
        }]
      },
    });
    var graf7 = document.getElementById("grafico7");
    var myGraf7 = new Chart(graf7, {
      type: "doughnut",
      //type: "pie",
      data: {
        //labels: this.pieChartLabels,
        labels: this.ChartLabelsGrafico7,
        datasets: [{
          data: this.ChartDataGrafico7,
          //data: this.pieChartData,
          backgroundColor: [
            'rgba(221, 71, 71, 0.3)',
            'rgba(255, 221, 31, 0.4)',
            'rgba(78, 68, 223, 0.2)',
            'rgba(235, 151, 56, 0.4)',
            'rgba(170, 170, 170, 0.4)',
            'rgba(192, 52, 118, 0.4)',
            'rgba(66, 170, 211, 0.4)',
            'rgba(40, 172, 139, 0.4)',
            'rgba(173, 161, 52, 0.4)',
            'rgba(130, 61, 151, 0.4)',
            ],
          borderColor: [
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
          ],
          borderWidth: 2
        }]
      },
    });
  }
  ngOnInit() {
    this.llamaServicePromesa();
  }

}
