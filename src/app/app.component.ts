import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'eight_reactiveforms';
  genders = ['male','female'];
  forbiddenUsernames = ['Chris', 'Anna'];
  signupform : FormGroup;

  ngOnInit() {
    this.signupform = new FormGroup({
      'userData' : new FormGroup({
        'username' : new FormControl(null,[Validators.required,this.forbiddenNames.bind(this)]),
        'email' : new FormControl(null,[Validators.required,Validators.email],this.forbiddenEmails)
      }),
      'gender' : new FormControl('male'),
      'hobbies' : new FormArray([])
    });

     /*this.signupform.valueChanges.subscribe(
       (value) => console.log(value)
     );*/

     this.signupform.statusChanges.subscribe((status) => console.log(status));
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
  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null;
  }
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
