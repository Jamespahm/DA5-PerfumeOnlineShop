var express = require("express");
var router = express.Router();
var db = require("./../server/server");

router.get("/", (req, res) => {
  var query = "Select * from khachhang";
  db.query(query, (error, result) => {
    if (error) res.status(500).send("Loi ket noi CSDL");
    res.json(result);
  });
});

router.get("/get-once/:id", function (req, res) {
  var query = "select * from khachhang where id =" + req.params.id;
  db.query(query, function (err, result) {
    if (err) res.status(500).send("Loi ket noi CSDL");
    res.json(result);
  });
});


router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const query = `SELECT * FROM khachhang WHERE Email='${email}' AND MatKhau='${password}'`;

  db.query(query, (error, result) => {
    if (error) {
      console.error('Lỗi khi kiểm tra đăng nhập:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(result);
    }
  });
});

router.post("/update/:id", function (req, res) {
  var query =
    "UPDATE khachhang SET TenKH=?, SoDienThoai=?, Email=?, MatKhau=? WHERE ID=?";
  var values = [
    req.body.TenKH,
    req.body.SoDienThoai,
    req.body.Email,
    req.body.MatKhau,
    req.params.id,
  ];

  db.query(query, values, function (err, result) {
    if (err) {
      console.error("Lỗi khi cập nhật thông tin khách hàng:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json({ message: "Đã thực hiện thành công" });
    }
  });
});

router.post("/add", function (req, res) {
  var query =
    "INSERT INTO khachhang (TenKH, SoDienThoai, Email, MatKhau) VALUES ('" +
    req.body.TenKH +
    "','" +
    req.body.SoDienThoai +
    "','" +
    req.body.Email +
    "','" +
    req.body.MatKhau +
    "')";
  db.query(query, function (err, result) {
    if (err) throw err;
    res.status(200).json({ message: "Da thuc hien thanh cong" });
  });
});

router.get("/remove/:id", function (req, res) {
  var query = "delete from khachhang where ID = " + req.params.id;
  db.query(query, function (err, result) {
    if (err) throw err;
    res.status(200).send("Da xoa ban tin");
  });
});

module.exports = router;
