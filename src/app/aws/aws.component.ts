import { Component, OnInit } from '@angular/core';
import * as joint from 'jointjs';

@Component({
  selector: 'app-aws',
  templateUrl: './aws.component.html',
  styleUrls: ['./aws.component.css']
})
export class AwsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var graph = new joint.dia.Graph;
    new joint.dia.Paper({ el: $('#paper-parent-restriction'), width: 1000, height: 1000, gridSize: 1, model: graph });

    var r1 = new joint.shapes.basic.Rect({

      position: { x: 200, y: 50 },
      size: { width: 900, height: 700 },
      attrs: {
        rect: { fill: 'grey' },

      }
    });

    r1.addTo(graph)

    var r2 = new joint.shapes.basic.Rect({

      position: { x: 250, y: 100 },
      size: { width: 500, height: 600 },
      attrs: {
        rect: { fill: 'white' },

      }
    });

    r2.embed(r1);
    graph.addCells([r1, r2])
    var client = new joint.shapes.standard.Image();
    client.resize(150, 100);

    client.position(20, 300);
    client.attr('root/title', 'joint.shapes.standard.Image');
    client.attr('label/text', 'Client');
    client.attr('image/xlinkHref', '/assets/PC.png');
    client.addTo(graph);

    var user = new joint.shapes.standard.Image();
    user.resize(150, 100);

    user.position(20, 450);
    user.attr('root/title', 'joint.shapes.standard.Image');
    user.attr('label/text', 'User');
    user.attr('image/xlinkHref', '/assets/User.png');
    user.addTo(graph);

    var elastic = new joint.shapes.standard.Image();
    elastic.resize(150, 100);

    elastic.position(250, 300);
    elastic.attr('root/title', 'joint.shapes.standard.Image');
    elastic.attr('label/text', 'Elastic Load Balancer');
    elastic.attr('image/xlinkHref', '/assets/Elastic load balancer.png');


    elastic.embed(r2);
    graph.addCells([r1, r2, elastic]);
    var ec2Instance1 = new joint.shapes.standard.BorderedImage();
    ec2Instance1.resize(150, 100);

    ec2Instance1.position(400, 150);
    ec2Instance1.attr('root/title', 'joint.shapes.standard.BoarderedImage');
    ec2Instance1.attr('label/text', 'Amazon ec2 Instance');
    ec2Instance1.attr('border/rx', 5);
    ec2Instance1.attr('image/xlinkHref', '/assets/Amazon ec2 instance.png');
    ec2Instance1.addTo(graph)

    var ec2Instance2 = new joint.shapes.standard.BorderedImage();
    ec2Instance2.resize(150, 100);
    ec2Instance2.position(400, 500);
    ec2Instance2.attr('root/title', 'joint.shapes.standard.BoarderedImage');
    ec2Instance2.attr('label/text', 'Amazon ec2 Instance');
    ec2Instance2.attr('border/rx', 5);
    ec2Instance2.attr('image/xlinkHref', '/assets/Amazon ec2 instance.png');
    ec2Instance2.addTo(graph);
    var autoScaling = new joint.shapes.standard.Image();
    autoScaling.resize(150, 100);

    autoScaling.position(400, 300);
    autoScaling.attr('root/title', 'joint.shapes.standard.Image');
    autoScaling.attr('label/text', 'Auto Scaling');
    autoScaling.attr('image/xlinkHref', '/assets/Auto scaling.png');
    autoScaling.addTo(graph);
    var amazonS3 = new joint.shapes.standard.Image();
    amazonS3.resize(150, 100);

    amazonS3.position(600, 300);
    amazonS3.attr('root/title', 'joint.shapes.standard.Image');
    amazonS3.attr('label/text', 'Amazon s3');
    amazonS3.attr('image/xlinkHref', '/assets/Amazon s3 Bucket.png');
    amazonS3.addTo(graph);
    var amazonDynamo = new joint.shapes.standard.Image();
    amazonDynamo.resize(150, 100);

    amazonDynamo.position(800, 150);
    amazonDynamo.attr('root/title', 'joint.shapes.standard.Image');
    amazonDynamo.attr('label/text', 'Amazon Dynamodb');
    amazonDynamo.attr('image/xlinkHref', '/assets/Amazon Dynamodb.png');
    amazonDynamo.addTo(graph);
    var amazonSns = new joint.shapes.standard.Image();
    amazonSns.resize(150, 100);

    amazonSns.position(800, 500);
    amazonSns.attr('root/title', 'joint.shapes.standard.Image');
    amazonSns.attr('label/text', 'Amazon SNS');
    amazonSns.attr('image/xlinkHref', '/assets/Amazon sns.png');
    amazonSns.addTo(graph);
    var link = new joint.shapes.standard.Link();
    link.source(client)
    link.target(elastic)


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




    link.addTo(graph);
    var link2 = new joint.shapes.standard.Link();
    link2.source(elastic)
    link2.target(ec2Instance1)
    link2.vertices([{ x: 325, y: 215 }])

    link2.attr({
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
    link2.connector('jumpover', { size: 10 });




    link2.addTo(graph);

    var link3 = new joint.shapes.standard.Link();
    link3.source(elastic)
    link3.target(ec2Instance2)
    link3.vertices([{ x: 330, y: 560 }])

    link3.attr({
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
    link3.connector('jumpover', { size: 10 });




    link3.addTo(graph);
    var link4 = new joint.shapes.standard.Link();
    link4.source(ec2Instance1)
    link4.target(amazonDynamo)


    link4.attr({
      attrs: {
        line: {
          stroke: '#222138',
          sourceMarker: {
            'fill': '#31d0c6',
            'stroke': 'none',
            'd': 'M 5 -10 L -15 0 L 5 10 Z'
          }
        }
      }
    })
    link4.connector('jumpover', { size: 10 });




    link4.addTo(graph);
    var link5 = new joint.shapes.standard.Link();
    link5.source(ec2Instance2)
    link5.target(amazonSns)


    link5.attr({
      attrs: {
        line: {
          stroke: '#222138',
          sourceMarker: {
            'fill': '#31d0c6',
            'stroke': 'none',
            'd': 'M 5 -10 L -15 0 L 5 10 Z'
          }
        }
      }
    })
    link5.connector('jumpover', { size: 10 });




    link5.addTo(graph);
    var link5 = new joint.shapes.standard.Link();
    link5.source(ec2Instance2)
    link5.target(amazonSns)


    link5.attr({
      attrs: {
        line: {
          stroke: '#222138',
          sourceMarker: {
            'fill': '#31d0c6',
            'stroke': 'none',
            'd': 'M 5 -10 L -15 0 L 5 10 Z'
          }
        }
      }
    })
    link5.connector('jumpover', { size: 10 });




    link5.addTo(graph);
    var link6 = new joint.shapes.standard.Link();
    link6.source(ec2Instance1)
    link6.target(amazonS3)
    link6.vertices([{ x: 670, y: 212 }])

    link6.attr({
      attrs: {
        line: {
          stroke: '#222138',
          sourceMarker: {
            'fill': '#31d0c6',
            'stroke': 'none',
            'd': 'M 5 -10 L -15 0 L 5 10 Z'
          }
        }
      }
    })
    link6.connector('jumpover', { size: 10 });




    link6.addTo(graph);
    var link7 = new joint.shapes.standard.Link();
    link7.source(ec2Instance2)
    link7.target(amazonS3)
    link7.vertices([{ x: 670, y: 560 }])

    link7.attr({
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
    link7.connector('jumpover', { size: 10 });




    link7.addTo(graph);

    graph.on('change:position', function (cell) {

      var parentId = cell.get('parent');
      if (!parentId) return;

      var parent = graph.getCell(parentId);
      var parentBbox = parent.getBBox();
      var cellBbox = cell.getBBox();

      if (parentBbox.containsPoint(cellBbox.origin()) &&
        parentBbox.containsPoint(cellBbox.topRight()) &&
        parentBbox.containsPoint(cellBbox.corner()) &&
        parentBbox.containsPoint(cellBbox.bottomLeft())) {
        return;
      }

      cell.set('position', cell.previous('position'));
    });
  }

}
