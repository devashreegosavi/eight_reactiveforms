import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'eight_reactiveforms';
  genders = ['male','female'];
  signupform : FormGroup;

  ngOnInit() {
    this.signupform = new FormGroup({
      'userData' : new FormGroup({
        'username' : new FormControl(null,Validators.required),
        'email' : new FormControl(null,[Validators.required,Validators.email])
      }),
      'gender' : new FormControl('male'),
      'hobbies' : new FormArray([])
    });
  }

  get hobbyControls() {
    return (this.signupform.get('hobbies') as FormArray).controls;
  }

  onSubmit(){
    console.log(this.signupform);
  }
  onAddHobby(){
    const control = new FormControl(null,Validators.required);
    (<FormArray>this.signupform.get('hobbies')).push(control);
  }
}
