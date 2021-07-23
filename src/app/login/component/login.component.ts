import { Component, OnInit,EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { User } from '../interface/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  @Input() error: boolean;
  @Output() loginRequest = new EventEmitter<User>();
  //to taki protip na szybko, bo działa <{user: string, password: string}>();
  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    this.form = this.fb.group({
      login: [null, Validators.required],
      password: [null, Validators.required]
    })
  }
  onSubmit(): void{
    const user: User = this.form.value;
    this.loginRequest.emit(user);
  }

}
