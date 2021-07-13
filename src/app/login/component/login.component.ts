import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  @Output() loginRequest = new EventEmitter<{user: string, password: string}>();
  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    this.form = this.fb.group({
      login: [null, Validators.required],
      password: [null, Validators.required]
    })
  }
  onSubmit(): void{
    const {login, password} = this.form.value;
    this.loginRequest.emit({user: login, password: password});
  }

}
