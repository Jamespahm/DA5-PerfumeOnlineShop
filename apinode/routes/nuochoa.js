var express = require("express");
var router = express.Router();
var db = require("./../server/server");

router.get("/", (req, res) => {
  // Thực hiện các truy vấn MySQL ở đây 
  db.query("select * from nuochoa", (error, results) => {
    if (error) {
      console.error("Error executing MySQL query: ", error);
      res.status(500).json({ error });
      return;
    }
    res.json(results);
  });
});

router.get("/get-once/:id", function (req, res) {
  var query = "select * from nuochoa where ID = " + req.params.id;
  db.query(query, function (err, result) {
    if (err) throw err;
    res.status(200).json(result);
  });
});
router.get("/get-maL/:maL", function (req, res) {
  // var query = "select * from nuochoa where MaL = " + req.params.maL;
  db.query(
    "select * from nuochoa where MaL = " + req.params.maL,
    (error, results) => {
      if (error) {
        console.error("Error executing MySQL query: ", error);
        res.status(500).json({ error });
        return;
      }
      res.json(results);
    }
  );
});

router.get("/get-maTH/:maTH", function (req, res) {
  // var query = "select * from nuochoa where MaL = " + req.params.maL;
  db.query(
    "select * from nuochoa where MaTH = " + req.params.maTH,
    (error, results) => {
      if (error) {
        console.error("Error executing MySQL query: ", error);
        res.status(500).json({ error });
        return;
      }
      res.json(results);
    }
  );
});
router.post("/update/:id", function (req, res) {
  var query =
    "update nuochoa set TenNH='" +
    req.body.TenNH +
    "',GiaBan='" +
    req.body.GiaBan +
    "',Dungtich='" +
    req.body.Dungtich +
    "',HinhAnh='" +
    req.body.HinhAnh +
    "',SoLuong='" +
    req.body.Soluong +
    "',MoTa='" +
    req.body.MoTa +
    "',MaTH='" +
    req.body.MaTH +
    "',MaL='" +
    req.body.MaL +
    "' where ID =" +
    req.params.id;
  db.query(query, function (err, result) {
    if (err) throw err;
    res.status(200).json({ message: "Da thuc hien thanh cong" });
  });
});

router.post("/add", function (req, res) {
  var query = `INSERT INTO nuochoa (TenNH,GiaBan,Dungtich,HinhAnh,Soluong,MoTa,MaTH,MaL) VALUES ('${req.body.TenNH}','${req.body.GiaBan}','${req.body.Dungtich}','${req.body.HinhAnh}','${req.body.Soluong}','${req.body.MoTa}','${req.body.MaTH}','${req.body.MaL}')`;
  db.query(query, function (err, result) {
    if (err) throw err;
    res.status(200).json({ message: "Da thuc hien thanh cong" });
  });
});

router.get("/remove/:id", function (req, res) {
  var query = "delete from nuochoa where ID = " + req.params.id;
  db.query(query, function (err, result) {
    if (err) throw err;
    res.status(200).send("Da xoa ban tin");
  });
});

// var path = require("path");
// var duongdan = path.join(__dirname, "../public");
// router.post("/create", function (req, res) {
//   var filepath = "";
//   var fileupload = null;
//   if (!req.files) res.status(400).send("Chua chon file gui len");
//   fileupload = req.files.fileanh;
//   filepath = duongdan + "/uploads/" + fileupload.name;
//   fileupload.mv(filepath, function (err) {
//     if (err) throw err;
//     var query =
//       "insert into slide(link,image) values ('" +
//       req.body.link +
//       "', '" +
//       fileupload.name +
//       "')";
//     db.query(query, function (err, result) {
//       if (err) throw err;
//       res.status(200).send("Da thuc hien thanh cong");
//     });
//   });
// });

module.exports = router;
