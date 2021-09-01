import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthenticationService],
})
export class LoginComponent implements OnInit {
  public form: FormGroup = Object.create(null);
  constructor(private fb: FormBuilder, 
    private router: Router, 
    private authenticationService: AuthenticationService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
  }

  onSubmit() {
    this.authenticationService.login(this.form.value).subscribe(result =>{
      //let username = this.form.controls.username.value;
      console.log(result);
      if(result.success){
        //this.dataService(username);
        //this.router.navigate(['/dashboard']);
        if(result.user.rolePermissions.lenght == 0){
          this.toastr.error("Sin modulos asignados");
        }else{
          sessionStorage.setItem('user', JSON.stringify(result.user));
          sessionStorage.setItem('isLoggedIn','true');
          sessionStorage.setItem('roleId',result.user.id_role);
          this.router.navigate(['/dashboard']);
        }
      }else{
        this.toastr.error(result.message);
      }
    });
  }
}
