var express = require("express");
var router = express.Router();
var db = require("./../server/server");

router.get("/", (req, res) => {
  var query = "Select * from hoadon";
  db.query(query, (error, result) => {
    if (error) res.status(500).send("Loi ket noi CSDL");
    res.json(result);
  });
});

router.get("/get-once/:id", function (req, res) {
  var query = "select * from hoadon where id =" + req.params.id;
  db.query(query, function (err, result) {
    if (err) res.status(500).send("Loi ket noi CSDL");
    res.json(result);
  });
});

router.post("/update/:id", function (req, res) {
  const {
    MaKH,
    MaNH,
    NgayDat,
    SoLuong,
    TongTien,
    TrangThai,
    SDT,
    DiaChi,
    ThanhToan,
  } = req.body;
  const query =
    "UPDATE hoadon SET MaKH=?, NgayDat=?, SoLuong=?, TongTien=?, TrangThai=?, SDT=?, DiaChi=?, ThanhToan=? WHERE ID=?";
  const values = [
    MaKH,
    NgayDat,
    SoLuong,
    TongTien,
    TrangThai,
    SDT,
    DiaChi,
    ThanhToan,
    req.params.id,
  ];

  console.log(req.body);

  db.query(query, values, function (err, result) {
    if (err) {
      console.error("Lỗi khi cập nhật hóa đơn", err);
      return res.status(500).json({ error: "Lỗi khi cập nhật hóa đơn" });
    }

    res.status(200).json({ message: "Đã thực hiện thành công" });
  });
});

router.post("/add", function (req, res) {
  var query =
    "INSERT INTO hoadon (MaKH, NgayDat, SoLuong, TongTien, TrangThai, SDT, DiaChi, ThanhToan) VALUES ('" +
    req.body.MaKH +
    "','" +
    req.body.NgayDat +
    "','" +
    req.body.SoLuong +
    "','" +
    req.body.TongTien +
    "','" +
    req.body.TrangThai +
    "','" +
    req.body.SDT +
    "','" +
    req.body.DiaChi +
    "','" +
    req.body.ThanhToan +
    "')";
  db.query(query, function (err, result) {
    if (err) throw err;
    res.status(200).json({ message: "Da thuc hien thanh cong" });
  });
});
// Hàm để lấy ra bản ghi mới nhất
router.get("/latestt", function (req, res) {
  var query = "SELECT * FROM hoadon ORDER BY ID DESC LIMIT 1";
  db.query(query, function (err, result) {
    if (err) res.status(500).send("Loi ket noi CSDL");
    res.json(result);
  });
});

router.get("/remove/:id", function (req, res) {
  var query = "delete from hoadon where ID = " + req.params.id;
  db.query(query, function (err, result) {
    if (err) throw err;
    res.status(200).send("Da xoa ban tin");
  });
});
///



// Thêm hóa đơn
router.post("/add-order", function (req, res) {
  var query =
    "INSERT INTO hoadon (MaKH, NgayDat, SoLuong, TongTien, TrangThai, SDT, DiaChi, ThanhToan) VALUES ('" +
    req.body.MaKH +
    "','" +
    req.body.NgayDat +
    "','" +
    req.body.SoLuong +
    "','" +
    req.body.TongTien +
    "','" +
    req.body.TrangThai +
    "','" +
    req.body.SDT +
    "','" +
    req.body.DiaChi +
    "','" +
    req.body.ThanhToan +
    "')";
  db.query(query, function (err, result) {
    if (err) throw err;

    // Lấy mã hóa đơn vừa tạo để sử dụng khi thêm chi tiết hóa đơn
    var maHD = result.insertId;

    // Thêm chi tiết hóa đơn
    var ctQuery =
      "INSERT INTO cthoadon (MaHD,MaNH,soLuong,giaBan,tongTien) VALUES ('" +
      maHD +
      "','" +
      req.body.MaNH +
      "','" +
      req.body.soLuong +
      "','" +
      req.body.giaBan +
      "','" +
      req.body.tongTien +
      "')";
    db.query(ctQuery, function (ctErr, ctResult) {
      if (ctErr) throw ctErr;
      res.status(200).json({ message: "Da thuc hien thanh cong" });
    });
  });
});

// Thêm chức năng thanh toán
router.post("/pay/:maHD", function (req, res) {
  var maHD = req.params.maHD;

  // Cập nhật trạng thái thanh toán cho hóa đơn có mã là maHD
  var updateQuery =
    "UPDATE hoadon SET TrangThai = 'Đã thanh toán' WHERE ID = '" + maHD + "'";
  db.query(updateQuery, function (err, result) {
    if (err) throw err;
    res.status(200).json({ message: "Đã thanh toán thành công" });
  });
});
module.exports = router;
