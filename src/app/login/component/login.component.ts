import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  someShitData: String = "blabla";
  constructor() { }

  ngOnInit(): void {
  }

}
