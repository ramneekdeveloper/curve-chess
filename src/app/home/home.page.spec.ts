import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Color, Direction, HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [IonicModule.forRoot(), ReactiveFormsModule, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  fit('should create set place', () => {
    expect(component).toBeTruthy();
    const form = component.form;
    const placeButton = getPlaceButton(fixture);
    expect(placeButton.disabled).toBeTrue();
    fillInValidForm(form);
    fixture.detectChanges();
    expect(placeButton.disabled).toBeFalse();
  });
  
  fit('case 1', () => {
    expect(component).toBeTruthy();
    const form = component.form;
    const placeButton = getPlaceButton(fixture);
    expect(placeButton.disabled).toBeTrue();
    fillInValidForm(form);
    fixture.detectChanges();
    expect(placeButton.disabled).toBeFalse();
    placeButton.click();
    fixture.detectChanges();

    const moveButton = getMove1Button(fixture);
    expect(placeButton.disabled).toBeFalse();
    moveButton.click();
    fixture.detectChanges();


    report(fixture);

    expect(form.controls.xaxis.value).toEqual(1);
    expect(form.controls.yaxis.value).toEqual(0);
    expect(form.controls.direction.value).toEqual(Direction.NORTH);
    expect(form.controls.color.value).toEqual(Color.WHITE);
  });

  fit('case 2', () => {
    expect(component).toBeTruthy();
    const form = component.form;
    
    form.controls.xaxis.setValue(0);
    form.controls.yaxis.setValue(0);
    form.controls.direction.setValue(Direction.NORTH);
    form.controls.color.setValue(Color.BLACK);
    fixture.detectChanges();
    expect(form.valid).toBeTrue();
    const placeButton = getPlaceButton(fixture);
    fixture.detectChanges();
    expect(placeButton.disabled).toBeFalse();
    placeButton.click();
    fixture.detectChanges();

    const leftButton = getLeftButton(fixture);
    expect(leftButton).toBeDefined();
    leftButton.click();
    fixture.detectChanges();


    report(fixture);

    expect(form.controls.xaxis.value).toEqual(0);
    expect(form.controls.yaxis.value).toEqual(0);
    expect(form.controls.direction.value).toEqual(Direction.WEST);
    expect(form.controls.color.value).toEqual(Color.BLACK);
  });

  function getPlaceButton(fixture: ComponentFixture<HomePage>) {
    return fixture.nativeElement.querySelector('.place-button');
  }

  function getMove1Button(fixture: ComponentFixture<HomePage>) {
    return fixture.nativeElement.querySelector('.move1');
  }

  function getMove2Button(fixture: ComponentFixture<HomePage>) {
    return fixture.nativeElement.querySelector('.move2');
  }

  function report(fixture: ComponentFixture<HomePage>) {
    var reportButton =  fixture.nativeElement.querySelector('.report');
    expect(reportButton).toBeDefined();
    reportButton.click();
    fixture.detectChanges();
  }
  function getLeftButton(fixture: ComponentFixture<HomePage>) {
    return fixture.nativeElement.querySelector('.left');
  }

  function getRightButton(fixture: ComponentFixture<HomePage>) {
    return fixture.nativeElement.querySelector('.right');
  }


  function fillInValidForm(form: FormGroup) {
    form.controls.xaxis.setValue(0);
    form.controls.yaxis.setValue(0);
    form.controls.direction.setValue(Direction.NORTH);
    form.controls.color.setValue(Color.WHITE);
    fixture.detectChanges();
    expect(form.valid).toBeTrue();
  }
});
