const Excel = require("exceljs");
const moment = require("moment");
const workbook = new Excel.Workbook();
const path = require("path");
const checkNumber = (para)=>{
    if(!isNaN(para)){
        return parseFloat(para).toFixed(2);
    }
    return para;
};
module.exports = {
    export: (filename, row, col, startAt, endAt, data) => {
        return new Promise((resolve, reject) => {
            workbook.xlsx.readFile(path.join(__dirname, `../../public/Report/${filename}`)).then((result) => {
                let Sheet1 = workbook.getWorksheet("Sheet1");
                let rowNameKey = row - 1;
                let colNameKey = col;
                Sheet1.getRow(5).getCell(3).value = moment(new Date(startAt)).format("DD-MM-YYYY HH:mm:ss");
                Sheet1.getRow(6).getCell(3).value = moment(new Date(endAt)).format("DD-MM-YYYY HH:mm:ss");
                Object.keys(data[0]).forEach((element) => {
                    if (element !== 'time') {
                        Sheet1.getRow(rowNameKey).getCell(colNameKey).value = element;
                    }
                    colNameKey = colNameKey + 1;
                })
                let rowData = row;
                let colData = col;
                data.forEach((element) => {
                    let keyOfData = Object.keys(data[0]);
                    keyOfData.forEach((key, index) => {
                        if (key === "time") {
                            Sheet1.getRow(rowData).getCell(colData + index).value = moment(new Date(element[key])).format("DD-MM-YYYY HH:mm:ss");
                        } else {
                            Sheet1.getRow(rowData).getCell(colData + index).value = checkNumber(element[key]);
                        }
                    });
                    rowData = rowData + 1;
                })
                var fileExport = path.join(__dirname, `../../public/Download/Report-${new Date().getTime()}.xlsx`);
                workbook.xlsx
                    .writeFile(fileExport)
                    .then((result) => {
                        resolve(fileExport);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }).catch((error) => {
                reject("Error")
            });
        });
    }
};