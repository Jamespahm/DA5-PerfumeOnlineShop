// edit-ivoice.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QlcthdService } from '../qlcthd.service';
import { DatePipe } from '@angular/common'; // Import DatePipe


@Component({
  selector: 'app-edit-ivoicedetail',
  templateUrl: './edit-ivoicedetail.component.html',
  styleUrls: ['./edit-ivoicedetail.component.scss'],
})

export class EditIvoicedetailComponent implements OnInit {
String(arg0: any) {
throw new Error('Method not implemented.');
}
  productId!: number;
  formData: any = {};
  hdList: any[] = [];
  nhList: any[]=[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private qlcthdService: QlcthdService,
    private datePipe: DatePipe // Inject DatePipe

  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.productId = idParam ? +idParam : 0;
    this.loadIvoiceDetailData();
    this.loadHDList();
    this.loadNHList();
// this.formData()
  }

  loadHDList() {
    this.qlcthdService.getAllIvoices().subscribe(
      (data) => {
        this.hdList = data;
        console.log(this.hdList)
      },
      (error) => {
        console.error('Lỗi khi lấy danh sách loại', error);
      }
    );
  }
  loadNHList() {
    this.qlcthdService.getAllProducts().subscribe(
      (data) => {
        this.nhList = data;
        console.log(this.nhList)
      },
      (error) => {
        console.error('Lỗi khi lấy danh sách loại', error);
      }
    );
  }

  loadIvoiceDetailData(): void {
    this.qlcthdService.getIvoiceDetailById(this.productId).subscribe(
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
  
  updateIvoiceDetail(): void {

    this.qlcthdService.updateIvoiceDetail(this.productId, this.formData).subscribe(
      () => {
        console.log('Sản phẩm đã được cập nhật thành công');
        this.router.navigate(['/admin/qlcthd']);
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