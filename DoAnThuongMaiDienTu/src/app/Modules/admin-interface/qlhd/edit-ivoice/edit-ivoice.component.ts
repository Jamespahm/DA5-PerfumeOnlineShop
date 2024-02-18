// edit-ivoice.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QlhdService } from '../qlhd.service';
import { DatePipe } from '@angular/common'; // Import DatePipe


@Component({
  selector: 'app-edit-ivoice',
  templateUrl: './edit-ivoice.component.html',
  styleUrls: ['./edit-ivoice.component.scss'],
})

export class EditIvoiceComponent implements OnInit {
String(arg0: any) {
throw new Error('Method not implemented.');
}
  productId!: number;
  formData: any = {};
  khList: any[] = [];
  nhList: any[]=[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private qlhdService: QlhdService,
    private datePipe: DatePipe // Inject DatePipe

  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.productId = idParam ? +idParam : 0;
    this.loadIvoiceData();
    this.loadKHList();
    this.loadNHList();

  }

  loadKHList() {
    this.qlhdService.getAllCustomers().subscribe(
      (data) => {
        this.khList = data;
        console.log(this.khList)
      },
      (error) => {
        console.error('Lỗi khi lấy danh sách loại', error);
      }
    );
  }
  loadNHList() {
    this.qlhdService.getAllSP().subscribe(
      (data) => {
        this.nhList = data;
        console.log(this.nhList)
      },
      (error) => {
        console.error('Lỗi khi lấy danh sách loại', error);
      }
    );
  }

  loadIvoiceData(): void {
    this.qlhdService.getIvoiceById(this.productId).subscribe(
      (product) => {
        console.log('Dữ liệu sản phẩm:', product);
        this.formData = { ...product[0] };
        console.log('Dữ liệu sau khi gán vào formData:', this.formData);
      },
      (error) => {
        console.error('Lỗi khi tải thông tin sản phẩm', error);
      }
    );
  }
  
  updateIvoice(): void {
    this.qlhdService.updateIvoice(this.productId, this.formData).subscribe(
      () => {
        console.log('Sản phẩm đã được cập nhật thành công');
        this.router.navigate(['/admin/qlhd']);
      },
      (error) => {
        console.error('Lỗi khi cập nhật sản phẩm', error);
      }
    );
  }
  private formatDate(date: any): string {
    return this.datePipe.transform(date, 'yyyy/MM/dd') || '';
  }
}