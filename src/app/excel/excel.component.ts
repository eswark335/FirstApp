import { Component } from '@angular/core';
import * as joint from 'jointjs'
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { FormGroup, FormControl } from '@angular/forms';
import { component } from '../component';
import { positions } from '../positions';



@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.css']
})
export class ExcelComponent {

  showLink: boolean = false;
  showComponent: boolean;
  database: string = 'assets/database.png';
  amazonS3: string = 'assets/amazons3.png';
  deleteDatabase: string = 'assets/deletedatabase.png';
  laptop: string = 'assets/laptop.png';
  server: string = 'assets/server.png';
  willDownload: boolean = false;
  constructor(private http: HttpClient) { }
  data: any;
  graph = new joint.dia.Graph;
  componentNames: any = [];
  show: boolean;
  components: any[] = [];
  ngOnInit(): void {
    this.components.length = 1;
    this.showComponent = true;
    this.show = false;
    //this.showGraphs();

    this.show1 = true;
  }
  show1: boolean;
  onFileChange(ev) {
    this.show1 = false;
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      const dataString = JSON.stringify(jsonData);
      var data1: any = dataString;
      var data2 = JSON.parse(data1)
      this.components1 = data2.Components;
      this.links1 = data2.Links;

      this.showGraphs();
    }
    reader.readAsBinaryString(file);
  }

  submitLink() {
    this.links1.push(this.linkData.value);
    this.showLink = false;
    this.show = true;
    this.showGraphs();
  }
  flowchart = new FormGroup({
    componentName: new FormControl(''),
    componentShape: new FormControl(''),
    componentColor: new FormControl(''),
    text: new FormControl(''),
    textColor: new FormControl(''),
    position_x: new FormControl(),
    position_y: new FormControl(),


  });
  links: any[] = [];
  links1: any[] = [];
  linkData = new FormGroup({
    sourceComponent: new FormControl(''),
    targetComponent: new FormControl(''),
    linkData: new FormControl(''),

  });
  // details() {

  //   let componentName = this.flowchart.value.componentName;
  //   let componentShape = this.flowchart.value.componentShape;
  //   let componentColor = this.flowchart.value.componentColor;
  //   let text = this.flowchart.value.text;
  //   let textColor = this.flowchart.value.textColor;
  //   let position_x = this.flowchart.value.position_x;
  //   let position_y = this.flowchart.value.position_y;
  // }
  submitComponent() {
    this.components1.push(this.flowchart.value);
    this.links.length = 1;
    this.showComponent = false;
    this.showLink = true;

  }

  components1: any[] = [];
  AddLink() {
    this.links.push(this.linkData.value);
    this.links1.push(this.linkData.value)
  }
  Add() {

    this.components.length++;
    this.components1.push(this.flowchart.value);
    console.log(this.components)
  }
  x_pos: number = 0;
  y_pos: number = 0;
  count: number = 4;
  n: number = 0;
  positions: number[][];
  totalRows: number;
  sourceComponents: any[] = [];
  targetComponents: any[] = [];
  componentCounts: component[] = [];
  position: positions[] = [];
  width = 1000;
  height = 1000;

  showGraphs() {
    var paper = new joint.dia.Paper({
      el: document.getElementById('myholder'),
      model: this.graph,
      width: this.width,
      height: this.height,
      gridSize: 50,
      drawGrid: true,
      background: {
        color: 'rgba(0, 255, 0, 0.3)',
        repeat: 'watermark'
      }
    });

    for (let i = 0; i < this.links1.length; i++) {

      this.sourceComponents.push(this.links1[i].sourceComponent);
      this.targetComponents.push(this.links1[i].targetComponent);
    }
    var visited: Boolean[] = [];
    visited.length = this.sourceComponents.length;

    for (let j = 0; j < visited.length; j++) {
      visited[j] = false;

    }
    for (let i = 0; i < this.sourceComponents.length; i++) {

      if (visited[i] == true)
        continue;

      var count = 1;
      for (let j = i + 1; j < this.sourceComponents.length; j++) {
        if (this.sourceComponents[i] == this.sourceComponents[j]) {
          visited[j] = true;
          count++;
        }
      }
      var componentCount: component = new component();
      componentCount.componentName = this.sourceComponents[i];
      componentCount.componentCount = count;
      componentCount.componentType = 'sourceComponent';
      this.componentCounts.push(componentCount)

    }

    for (let i = 0; i < this.components1.length; i++) {
      let flag = 0;
      for (let j = 0; j < this.componentCounts.length; j++) {
        if (this.components1[i].componentName == this.componentCounts[j].componentName) {
          flag = 1;
          break;
        }
      }
      if (flag == 0) {
        var componentCount: component = new component();
        componentCount.componentName = this.components1[i].componentName;
        componentCount.componentCount = 0;
        componentCount.componentType = 'sourceComponent';
        this.componentCounts.push(componentCount);
      }
    }

    var temp: component = new component();
    for (let i = 0; i < (this.componentCounts.length); i++) {
      for (let j = 0; j < this.componentCounts.length - i - 1; j++) {
        if (this.componentCounts[j].componentCount < this.componentCounts[j + 1].componentCount) {
          temp = this.componentCounts[j];
          this.componentCounts[j] = this.componentCounts[j + 1];
          this.componentCounts[j + 1] = temp;
        }
      }
    }
    this.componentCounts.forEach(element => {
      console.log(element)
    });
    var x: number;
    var y: number;
    var count1 = 0;
    console.log(this.components1.length);

    for (let i = 0; i < this.componentCounts.length; i++) {
      console.log(this.componentCounts[i].componentName + "---" + this.componentCounts[i].componentCount);

      for (let j = 0; j < this.components1.length; j++) {

        if (this.componentCounts[i].componentName == this.components1[j].componentName) {
          //console.log(this.componentCounts[j].componentName + "++++++++" + this.componentCounts[j].componentCount);
          {
            if (count1 == 0) {

              console.log(count1);
              console.log(this.componentCounts[j].componentName);

              count1++;
              x = Number((this.width / 2.38).toFixed());
              y = Number((this.height / 2.38).toFixed());


              this.positionComponents(x, y, j);
              this.n++;
              break;
            } else if (count1 == 1) {

              count1++;
              x = Number((this.width / 1.72).toFixed());
              y = Number((this.height / 2.38).toFixed());
              this.positionComponents(x, y, j);


              this.n++;
              break;
            }
            else if (count1 == 2) {

              count1++;
              x = Number((this.width / 1.72).toFixed());
              y = Number((this.height / 3.84).toFixed());
              this.positionComponents(x, y, j);
              this.n++;
              break;
            }
            else if (count1 == 3) {


              count1++;
              x = Number((this.width / 2.38).toFixed());
              y = Number((this.height / 3.84).toFixed());
              this.positionComponents(x, y, j);
              this.n++;
              break;
            }
            else if (count1 == 4) {


              count1++;
              x = Number((this.width / 3.84).toFixed());
              y = Number((this.height / 3.84).toFixed());
              this.positionComponents(x, y, j);
              this.n++;
              break;
            }
            else if (count1 == 5) {

              count1++;
              x = Number((this.width / 3.84).toFixed());
              y = Number((this.height / 2.38).toFixed());
              this.positionComponents(x, y, j);
              this.n++;
              break;
            }
            else if (count1 == 6) {


              count1++;
              x = Number((this.width / 3.84).toFixed());
              y = Number((this.height / 1.72).toFixed());
              this.positionComponents(x, y, j);
              this.n++;
              break;
            }
            else if (count1 == 7) {

              count1++;
              x = Number((this.width / 2.38).toFixed());
              y = Number((this.height / 1.72).toFixed());
              this.positionComponents(x, y, j);
              this.n++;
              break;
            }
            else if (count1 == 8) {

              count1++;
              x = Number((this.width / 1.72).toFixed());
              y = Number((this.height / 1.72).toFixed());
              this.positionComponents(x, y, j);
              this.n++;
              break;
            }
            else if (count1 == 9) {

              count1++;
              x = Number((this.width / 1.35).toFixed());
              y = Number((this.height / 1.72).toFixed());
              this.positionComponents(x, y, j);
              this.n++;
              break;
            }
            else if (count1 == 10) {

              count1++;
              x = Number((this.width / 1.35).toFixed());
              y = Number((this.height / 2.38).toFixed());
              this.positionComponents(x, y, j);
              this.n++;
              break;
            }
            else if (count1 == 11) {

              count1++;
              x = Number((this.width / 1.35).toFixed());
              y = Number((this.height / 3.84).toFixed());
              this.positionComponents(x, y, j);
              this.n++;
              break;
            }
            else if (count1 == 12) {

              count1++;
              x = Number((this.width / 1.35).toFixed());
              y = Number((this.height / 10).toFixed());
              this.positionComponents(x, y, j);
              this.n++;
              break;
            }
            else if (count1 == 13) {

              count1++;
              x = Number((this.width / 1.72).toFixed());
              y = Number((this.height / 10).toFixed());
              this.positionComponents(x, y, j);
              this.n++;
              break;
            }
            else if (count1 == 14) {

              count1++;
              x = Number((this.width / 2.38).toFixed());
              y = Number((this.height / 10).toFixed());
              this.positionComponents(x, y, j);
              this.n++;
              break;
            }
            else if (count1 == 15) {

              count1++;
              x = Number((this.width / 3.84).toFixed());
              y = Number((this.height / 10).toFixed());
              this.positionComponents(x, y, j);
              this.n++;
              break;
            }
            else if (count1 == 16) {

              count1++;
              x = Number((this.width / 10).toFixed());
              y = Number((this.height / 10).toFixed());
              this.positionComponents(x, y, j);
              this.n++;
              break;
            }
            else if (count1 == 17) {

              count1++;
              x = Number((this.width / 10).toFixed());
              y = Number((this.height / 3.84).toFixed());
              this.positionComponents(x, y, j);
              this.n++;
              break;
            }
            else if (count1 == 18) {

              count1++;
              x = Number((this.width / 10).toFixed());
              y = Number((this.height / 2.38).toFixed());
              this.positionComponents(x, y, j);
              this.n++;
              break;
            }
            else if (count1 == 19) {

              count1++;
              x = Number((this.width / 10).toFixed());
              y = Number((this.height / 1.72).toFixed());
              this.positionComponents(x, y, j);
              this.n++;
              break;
            }
            else if (count1 == 20) {

              count1++;
              x = Number((this.width / 10).toFixed());
              y = Number((this.height / 1.35).toFixed());
              this.positionComponents(x, y, j);
              this.n++;
              break;
            }
            else if (count1 == 21) {

              count1++;
              x = Number((this.width / 3.84).toFixed());
              y = Number((this.height / 1.35).toFixed());
              this.positionComponents(x, y, j);
              this.n++;
              break;
            }
            else if (count1 == 22) {

              count1++;
              x = Number((this.width / 2.38).toFixed());
              y = Number((this.height / 1.35).toFixed());
              this.positionComponents(x, y, j);
              this.n++;
              break;
            }
            else if (count1 == 23) {

              count1++;
              x = Number((this.width / 1.72).toFixed());
              y = Number((this.height / 1.35).toFixed());
              this.positionComponents(x, y, j);
              this.n++;
              break;
            }
            else if (count1 == 24) {

              count1++;
              x = Number((this.width / 1.35).toFixed());
              y = Number((this.height / 1.35).toFixed());
              this.positionComponents(x, y, j);
              this.n++;
              break;
            }



            this.componentCounts[i] = new component();

          }
        }
      }
    }
    this.show = true;




    if ((this.components1.length) % 2 == 0) {
      this.totalRows = (this.components1.length / 4)
    }
    else {
      this.totalRows = ((this.components1.length) / 4) + 1
    }


    for (let i = 0; i < this.links1.length; i++) {




      this.link(this.links1[i].sourceComponent, this.links1[i].targetComponent, this.links1[i].linkData)






    }


    // }


  }
  positionComponents(x, y, n) {
    console.log(this.components1[n].componentName);

    if (this.components1[n].componentShape == 'Rectangle') {
      var pos: positions = new positions()
      pos.componentName = this.components1[n].componentShape;
      pos.x_pos = x;
      pos.y_pos = y;
      this.position.push(pos);
      console.log('dfghjk')
      // this.positions[x][y] = this.components1[this.n].componentName;
      this.componentNames.push(this.components1[n].componentName);

      this.rectangle(this.components1[n].componentName, y, x, this.components1[n].componentColor, this.components1[n].text, this.components1[n].textColor);

    }
    if (this.components1[n].componentShape == 'Circle') {
      var pos: positions = new positions()
      pos.componentName = this.components1[n].componentShape;
      pos.x_pos = x;
      pos.y_pos = y;
      this.position.push(pos);
      // this.positions[x][y] = this.components1[this.n].componentName;
      this.componentNames.push(this.components1[n].componentName);
      this.ciricle(this.components1[n].componentName, y, x, this.components1[n].componentColor, this.components1[n].text, this.components1[n].textColor);

    }
    if (this.components1[n].componentShape == 'Ellipse') {
      console.log(x, y)
      var pos: positions = new positions()
      pos.componentName = this.components1[n].componentShape;
      pos.x_pos = x;
      pos.y_pos = y;
      this.position.push(pos);
      //this.positions[x][y] = this.components1[this.n].componentName;
      this.componentNames.push(this.components1[n].componentName);
      console.log(this.components1[n].componentName, y, x, this.components1[n].componentColor, this.components1[n].text, this.components1[n].textColor);

      this.Ellipse(this.components1[n].componentName, y, x, this.components1[n].componentColor, this.components1[n].text, this.components1[n].textColor);

    }
    if (this.components1[n].componentShape == 'Database') {
      var pos: positions = new positions()
      pos.componentName = this.components1[n].componentShape;
      pos.x_pos = x;
      pos.y_pos = y;
      this.position.push(pos);
      //this.positions[x][y] = this.components1[this.n].componentName;

      this.componentNames.push(this.components1[n].componentName);
      this.image(this.components1[n].componentName, this.components1[n].text, y, x, this.database);

    }
    if (this.components1[n].componentShape == 'amazonS3') {
      var pos: positions = new positions()
      pos.componentName = this.components1[n].componentShape;
      pos.x_pos = x;
      pos.y_pos = y;
      this.position.push(pos);
      //this.positions[x][y] = this.components1[this.n].componentName;

      this.componentNames.push(this.components1[n].componentName);
      this.image(this.components1[n].componentName, this.components1[n].text, y, x, this.amazonS3);

    }
    if (this.components1[n].componentShape == 'DeleteDatabase') {
      var pos: positions = new positions()
      pos.componentName = this.components1[n].componentShape;
      pos.x_pos = x;
      pos.y_pos = y;
      this.position.push(pos);
      //this.positions[x][y] = this.components1[this.n].componentName;

      this.componentNames.push(this.components1[n].componentName);
      this.image(this.components1[n].componentName, this.components1[n].text, y, x, this.deleteDatabase);
    }
    if (this.components1[n].componentShape == 'Laptop') {
      var pos: positions = new positions()
      pos.componentName = this.components1[n].componentShape;
      pos.x_pos = x;
      pos.y_pos = y;
      this.position.push(pos);
      //this.positions[x][y] = this.components1[this.n].componentName;

      this.componentNames.push(this.components1[n].componentName);
      this.image(this.components1[n].componentName, this.components1[n].text, y, x, this.laptop);
    }
    if (this.components1[n].componentShape == 'Server') {
      var pos: positions = new positions()
      pos.componentName = this.components1[n].componentShape;
      pos.x_pos = x;
      pos.y_pos = y;
      this.position.push(pos);
      //this.positions[x][y] = this.components1[this.n].componentName;

      this.componentNames.push(this.components1[n].componentName);
      this.image(this.components1[n].componentName, this.components1[n].text, y, x, this.server);

    }
  }
  print() {
    const printContent = document.getElementById("myholder");
    const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.write('<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/jointjs/2.1.0/joint.css"/>');
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  }

  rectangle(name, x_pos: number, y_pos: number, color, text, textcolor) {

    for (let i = 0; i < this.componentNames.length; i++) {
      if (name == this.componentNames[i]) {
        this.componentNames[i] = new joint.shapes.standard.Rectangle();
        this.componentNames[i].name = name
        this.componentNames[i].position(y_pos, x_pos);
        this.componentNames[i].resize(100, 40);
        this.componentNames[i].size({ width: 100, height: 100 })
        this.componentNames[i].attr({
          body: {
            fill: color,
            rx: 20,
            ry: 20,
            bodyShadow: '10px 10px 10px black',
          },
          label: {
            text: text,
            fill: textcolor,
            fontSize: 11,
            fontVariant: 'small-caps',

            name: name
          }
        });
        this.componentNames[i].attr('border/fill', 'green')
        this.componentNames[i].addTo(this.graph);
      }
    }
  }
  ciricle(name, x_pos: number, y_pos: number, color, text, textcolor) {
    for (let i = 0; i < this.componentNames.length; i++) {
      if (name == this.componentNames[i]) {
        this.componentNames[i] = new joint.shapes.standard.Circle();
        this.componentNames[i].name = name;
        this.componentNames[i].position(y_pos, x_pos);
        this.componentNames[i].resize(100, 40);
        this.componentNames[i].attr({
          body: {
            fill: color,
            rx: 5,
            ry: 5,
          },
          label: {
            text: text,
            fill: textcolor,

          },

        });
        this.componentNames[i].addTo(this.graph);
      }
    }
  }
  Ellipse(name, x_pos: number, y_pos: number, color, text, textcolor) {
    for (let i = 0; i < this.componentNames.length; i++) {
      if (name == this.componentNames[i]) {
        this.componentNames[i] = new joint.shapes.standard.Ellipse();
        this.componentNames[i].name = name;
        this.componentNames[i].position(y_pos, x_pos);
        this.componentNames[i].resize(100, 40);
        this.componentNames[i].attr({
          body: {
            fill: color,
            rx: 5,
            ry: 5,
          },
          label: {
            text: text,
            fill: textcolor
          }
        });


        this.componentNames[i].addTo(this.graph);
      }
    }
  }
  image(name, text, pos_x: number, pos_y: number, image) {
    for (let i = 0; i < this.componentNames.length; i++) {
      if (name == this.componentNames[i]) {
        this.componentNames[i] = new joint.shapes.standard.Image();
        this.componentNames[i].resize(150, 100);
        this.componentNames[i].name = name;
        this.componentNames[i].position(pos_y, pos_x);
        this.componentNames[i].attr('root/title', 'joint.shapes.standard.Image');
        this.componentNames[i].attr('label/text', text);
        this.componentNames[i].attr('image/xlinkHref', image);
        this.componentNames[i].addTo(this.graph);
      }
    }
  }
  link(source, target, linkData) {

    var link = new joint.shapes.standard.Link();
    for (let i = 0; i < this.componentNames.length; i++) {
      if (this.componentNames[i].name == source) {
        link.source(this.componentNames[i])
      } else if (this.componentNames[i].name == target) {
        link.target(this.componentNames[i]);
      }


    }
    link.attr({
      attrs: {
        line: {
          stroke: '#222138',
          sourceMarker: {
            'fill': '#31d0c6',
            'stroke': 'none',
            'd': 'M 5 -10 L -15 0 L 5 10 Z'
          },
          targetMarker: {
            'fill': '#fe854f',
            'stroke': 'none',
            'd': 'M 5 -10 L -15 0 L 5 10 Z'
          }
        }
      }
    })
    link.connector('jumpover', { size: 10 });
    // link.attr({
    //   line: {
    //     stroke: 'blue',
    //     strokeWidth: 1,
    //     sourceMarker: {
    //       'type': 'path',

    //     },
    //     targetMarker: {
    //       'type': 'path',

    //     }
    //   }
    //});
    link.labels([{
      attrs: {
        text: {
          text: linkData
        }
      }
    }]);


    link.addTo(this.graph);

  }

}
