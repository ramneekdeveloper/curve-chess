import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

export enum Color {
  WHITE, BLACK
}

export interface Place {
  x: number;
  y: number;
  direction: Direction;
  color: Color;
}


export class Direction {
  private static currentIndex = 0;
  private static values: Direction[] = [];
  private readonly index: number;

  private constructor() {
    this.index = Direction.currentIndex++;

    Direction.values.push(this);
  }

  static readonly NORTH = new Direction();
  static readonly EAST = new Direction();
  static readonly SOUTH = new Direction();
  static readonly WEST = new Direction();

  get previous() {
    const previous: Direction = Direction.WEST;
    if (this.index > 0) {
      return Direction.values[this.index - 1];
    }
    return previous;
  }
  get next() {
    const previous: Direction = Direction.NORTH;
    if (this.index !== 3) {
      return Direction.values[this.index + 1];
    }
    return previous;
  }
}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public Color = Color;
  public Direction = Direction;
  public black = true;
  public white = true;
  public currentPlace: Place = null
  public report: Place = null
  form = this.formBuilder.group({
    xaxis: this.formBuilder.control(0,[Validators.required]),
    yaxis: this.formBuilder.control(0,[Validators.required]),
    direction: this.formBuilder.control( '',[Validators.required]),
    color: this.formBuilder.control('',[Validators.required])
  })
  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController
  ) {}

  submit(){
    var formValues = this.form.value
    this.currentPlace = {
      x: formValues.xaxis,
      y: formValues.yaxis,
      direction: formValues.direction,
      color: formValues.color,
    }
  }
  move(steps){
    var {direction,x,y} = this.currentPlace
    if(direction == Direction.NORTH && (7 - x) >= steps){
      this.currentPlace.x = x + steps;
    }else if(direction == Direction.EAST && (7 - y) >= steps  ){
      this.currentPlace.y = y + steps;
    }else if(direction == Direction.SOUTH && (x - steps) >= 0 ){
      this.currentPlace.x = x - steps;
    }else if(direction == Direction.WEST && (y - steps) >= 0){
      this.currentPlace.y = y - steps;
    }else{
      this.throwError();
    }
  }
  setReport(){
    this.form.controls.xaxis.setValue(this.currentPlace.x)
    this.form.controls.yaxis.setValue(this.currentPlace.y)
    this.form.controls.direction.setValue(this.currentPlace.direction)
    this.form.controls.color.setValue(this.currentPlace.color)
  }

  async throwError() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'This is not valid command, you are on edge of board',
      buttons: ['OK']
    });

    await alert.present();
  }
}
