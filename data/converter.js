/**
 * Created by haihoang on 2015-03-08.
 *
 *
 * Converter class to parse .csv file and convert to JSON.
 * Parser selects for only 'Theft Of Auto Under $5000' and 'Theft Of Auto Over $5000'
 * and only displays TYPE and HUNDRED_BLOCK
 *
 * Parser source code: https://github.com/Keyang/node-csvtojson
 * Help for filter: http://stackoverflow.com/questions/25514876/how-to-filter-json-data-in-node-js
 * String help: http://stackoverflow.com/questions/6108812/node-js-string-contains-another-string
 * Replace string help: http://stackoverflow.com/questions/21162097/node-js-string-replace-doesnt-work
 */

var _ = require("underscore");


//Converter Class
var Converter=require("csvtojson").core.Converter;
var fs=require("fs");

var csvFileName="../download_data/temp/crime_2014.csv";
var fileStream=fs.createReadStream(csvFileName);
//new converter instance
var param={};
var csvConverter=new Converter(param);

function filtr(jArray){
    for (var i = 0; i< jArray.length; i++){
        delete jArray[i].YEAR;
        //delete jArray[i].MONTH; //comment out to keep MONTH element
        jArray[i].HUNDRED_BLOCK = jArray[i].HUNDRED_BLOCK.replace("XX", "00");
        jArray[i].HUNDRED_BLOCK = jArray[i].HUNDRED_BLOCK.replace("/", "AND");
    }
}

//end_parsed will be emitted once parsing finished
csvConverter.on("end_parsed",function(jsonObj){
    var filtered = _.filter(jsonObj, function(item){
        return (item.TYPE == "Theft Of Auto Under $5000" || item.TYPE == "Theft Of Auto Over $5000");
    });
    filtr(filtered);
    console.log(filtered);

});

//delete this later
fileStream.pipe(csvConverter);

//read from file
function parseData(){
    fileStream.pipe(csvConverter);
}

module.exports = parseData;