import { Component, OnInit } from '@angular/core';
declare var particlesJS: any
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  myStyle: object = {};
  myParams: object = {};
  width: number = 100;
  height: number = 100;
  show: boolean;
  ngOnInit(): void {
    //   this.show = true;
    //   this.myStyle = {
    //     'position': 'fixed',
    //     'width': '100%',
    //     'height': '100%',
    //     'z-index': -1,
    //     'top': 0,
    //     'left': 0,
    //     'right': 0,
    //     'bottom': 0,
    //   };

    //   this.myParams = {
    //     particles: { 
    //       number: {
    //         value: 200,
    //       },
    //       color: {
    //         value: '#ff00ff'
    //       },
    //       shape: {
    //         type: 'triangle',
    //       },
    //     }
    //   };
    particlesJS.load('particles-js', 'assets/particlesjs-config.json', function () { console.log('callback - particles.js config loaded'); });
  }

}
