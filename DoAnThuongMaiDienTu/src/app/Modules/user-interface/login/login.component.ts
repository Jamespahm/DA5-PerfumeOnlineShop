// login.component.ts
import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email!: string;
  password!: string;

  constructor(private authService: LoginService, private router: Router) {}

  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      (result) => {
        // Xử lý khi đăng nhập thành công hoặc kiểm tra kết quả từ API
        if (result && result.length > 0) {
          console.log('Đăng nhập thành công', result);
          // Lưu ID vào localStorage
          localStorage.setItem('userId', result[0].ID);

          this.router.navigate(['/user/home']); // Thay thế '/dashboard' bằng đường dẫn mong muốn
        } else {
          console.error('Đăng nhập thất bại');
        }
      },
      (error) => {
        console.error('Đăng nhập thất bại', error);
      }
    );
  }
}
