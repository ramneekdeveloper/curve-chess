import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


enum Direction {
  NORTH, EAST, WEST, SOUTH
}

enum Color {
  WHITE, BLACK
}

interface Place {
  x: number;
  y: number;
  direction: Direction;
  color: Color;
}


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public Color = Color;
  public Direction = Direction;
  public currentPlace: Place = {
      x: 0,
      y: 0,
      direction: Direction.NORTH,
      color: Color.WHITE,
  }
  form = this.formBuilder.group({
    xaxis: this.formBuilder.control(this.currentPlace.x,[Validators.required]),
    yaxis: this.formBuilder.control(this.currentPlace.y,[Validators.required]),
    direction: this.formBuilder.control(this.currentPlace.direction,[Validators.required]),
    color: this.formBuilder.control(this.currentPlace.color,[Validators.required])
  })
  constructor(
    private formBuilder: FormBuilder
  ) {}

  submit(){
    console.log("form = ", this.form.value)
    var formValues = this.form.value
    this.currentPlace.x = formValues.xaxis
    this.currentPlace.y = formValues.yaxis
    this.currentPlace.direction = formValues.direction
    this.currentPlace.color = formValues.color
  }

}
