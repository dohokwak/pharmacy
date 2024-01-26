let express = require("express");
let axios = require("axios");

let app = express();
let port = process.env.PORT || 80;

app.use(express.static("public_html"));
app.listen(port, function(){
    console.log("HTML 서버 시작됨");
});

// http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyListInfoInqire?serviceKey=IZZGckj3W3TCPtsbRQQSADS7mFZASo0uNz58OHEtLXL4mDv3hSeSlATBPlNvhIPLhJ8X9W0cIBH%2BV1GQBgIhDA%3D%3D&Q0=서울특별시&Q1=강남구&QT=1&QN=삼성약국&ORD=NAME&pageNo=1&numOfRows=10

app.get("/pharmach_list", (req, res) => {
        let api = async() => {
            let response = null;
            try {
                response = await axios.get("http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyListInfoInqire", {
                    params: {
                        "serciceKey": "IZZGckj3W3TCPtsbRQQSADS7mFZASo0uNz58OHEtLXL4mDv3hSeSlATBPlNvhIPLhJ8X9W0cIBH+V1GQBgIhDA==",
                        "Q0": req.query.Q0,
                        "Q1": req.query.Q1,
                        "QT": req.query.QT,
                        "QN": req.query.QN,
                        "ORD": req.query.ORD,
                        "pageNo": req.query.pageNo,
                        "numOfRows": req.query.numOfRows
                    }
                })
            }
            catch(e) {
                console.log(e);
            }
            return response;
        }
        api().then((response) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.json(response.data.response?.body);
        });
});