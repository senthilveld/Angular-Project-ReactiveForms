import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,FormArray, Validators } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { passwordValidator } from './shared/password.validators';
import { forbiddenNameValidators } from './shared/user-name.validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Reactive';
  registrationForm : FormGroup;
  
  get userName(){
    return this.registrationForm.get('userName');
  }


  get email(){
    return this.registrationForm.get('email');
  }

  
  get alternateEmails(){
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  addAlternateEmail(){
    this.alternateEmails.push(this.fb.control(''));
  }


  constructor (private fb:FormBuilder,private _registrationService: RegistrationService){}

  ngOnInit(){
    this.registrationForm = this.fb.group({
      userName:['',[Validators.required,Validators.minLength(3),forbiddenNameValidators(/password/)]],
      email:[],
      subscribe:[false],
      password:[],
      confirmPassword:[''],
      address:this.fb.group({
        city:[''],
        state:[''],
        postalCode:['']
      }),
      alternateEmails: this.fb.array([])
    },{Validator: passwordValidator});

    this.registrationForm.get('subscribe').valueChanges
    .subscribe(checkedValue => {
      const email = this.registrationForm.get('email');
      if(checkedValue){
        email.setValidators(Validators.required);
      }
      else{
        email.clearValidators();
      }
      email.updateValueAndValidity();
    })
  }



  // registrationForm = new FormGroup({
  //   userName : new FormControl('senthil'),
  //   password : new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     postalCode: new FormControl('')
  //   })
  // })

  loadApiData(){
    this.registrationForm.patchValue({
      userName:'vel',
      password:'123',
      confirmPassword:'123',
      // address:{
      //   city:'chennai',
      //   state:'Tn',
      //   postalCode:'1234'
      // }
    }

    )
  }

  onSubmit(){
    console.log("abc")

    console.log(this.registrationForm.value);
    this._registrationService.register(this.registrationForm.value).subscribe(
      (response:any) => console.log('success!', response),
      (error:any) => console.log('error', error)
    )
  }

  register(){
    console.log("abcs")

    console.log(this.registrationForm.value)

  }
}
