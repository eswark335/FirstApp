import { Component, OnInit } from '@angular/core';
import * as joint from 'jointjs';

@Component({
  selector: 'app-templetes',
  templateUrl: './templetes.component.html',
  styleUrls: ['./templetes.component.css']
})
export class TempletesComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
    this.show();
  }
  show() {
    var graph = new joint.dia.Graph();

    var paper = new joint.dia.Paper({
      el: $('#myholder'),
      width: 800,
      height: 600,
      gridSize: 1,
      model: graph,
      perpendicularLinks: true,
      restrictTranslate: true
    });


    var member = function (x, y, rank, name, image, background, textColor) {

      textColor = textColor || "#000";

      var cell = new joint.shapes.org.Member({
        position: { x: x, y: y },
        attrs: {
          '.card': { fill: background, stroke: 'none' },
          image: { 'xlink:href': image, opacity: 0.7 },
          '.rank': { text: rank, fill: textColor, 'word-spacing': '-5px', 'letter-spacing': 0 },
          '.name': { text: name, fill: textColor, 'font-size': 13, 'font-family': 'Arial', 'letter-spacing': 0 }
        }
      });
      graph.addCell(cell);
      return cell;
    };

    function link(source, target, breakpoints) {

      var cell = new joint.shapes.org.Arrow({
        source: { id: source.id },
        target: { id: target.id },
        vertices: breakpoints,
        attrs: {
          '.connection': {
            'fill': 'none',
            'stroke-linejoin': 'round',
            'stroke-width': '2',
            'stroke': '#4b4a67'
          }
        }

      });
      graph.addCell(cell);
      return cell;
    }

    var Eswar = member(300, 70, 'CEO', 'Eswar Kumar', 'assets/Eswar_Pic.jpg', '#30d0c6', '#7c68fd');
    var Sai = member(90, 200, 'VP Marketing', 'Sai', 'assets/male.png', '#7c68fd', '#f1f1f1');
    var Chitti = member(300, 200, 'VP Sales', 'Chitti', 'assets/female.png', '#7c68fd', '#f1f1f1');
    var Komala = member(500, 200, 'VP Delivery', 'Komala', 'assets/female.png', '#7c68fd', '#f1f1f1');
    var Lekha = member(400, 350, 'Manager', 'Lekha', 'assets/female.png', '#feb563', '#7c68fd');
    var Rahul = member(190, 350, 'Manager', 'Rahul', 'assets/male.png', '#feb563', '#7c68fd');
    var Arpit = member(190, 500, 'Manager', 'Arpit', 'assets/male.png', '#feb563', '#7c68fd');



    link(Eswar, Chitti, [{ x: 385, y: 180 }]);
    link(Eswar, Sai, [{ x: 385, y: 180 }, { x: 175, y: 180 }]);
    link(Eswar, Komala, [{ x: 385, y: 180 }, { x: 585, y: 180 }]);
    link(Sai, Rahul, [{ x: 175, y: 380 }]);
    link(Sai, Arpit, [{ x: 175, y: 530 }]);
    link(Chitti, Lekha, [{ x: 385, y: 380 }]);
  }
}
