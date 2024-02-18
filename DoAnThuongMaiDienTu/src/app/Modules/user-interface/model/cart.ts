export class carts{
    ProductID:number;
    ProductName: string;
    ProductPrice: number;
    DungTich: string;
    Quantity: number;
    UserID: number;
    BandID:number;
    LID:number;
    TongTien:number;

    constructor(id:number,name:string,price:number,dungtich:string,quantity:number,userid:number,bandid:any,Lid:any,tongtien:any){
        this.ProductID = id;
        this.ProductName = name;
        this.ProductPrice = price;
        this.DungTich = dungtich;
        this.Quantity = quantity;
        this.UserID = userid;
        this.BandID = bandid;
        this.LID = Lid;
        this.TongTien = tongtien;
    }
}