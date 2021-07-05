import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup();
  }
  ngOnSubmit(): void{
    console.log(login);
    console.log(password)
  }

}
