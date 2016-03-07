/*
Name: PNR Status Check
Description: provides a REST API for checking the PNR Status on Indian Railways
*/
var express=require('express'),
fs=require('fs'),
request=require('request'),
cheerio=require('cheerio'),
app=express();

app.get("/status/:pnr",function(req,res){
  //The url from which to scrap the information
  var $url="http://api.checkpnrstatusirctc.in/pnrajax/pnr.php?pnrno="+req.params.pnr;
  console.log(req.params.pnr);
  console.log($url);
  //var $url="http://erail.in/indian-railway-pnr-status?pnr=8144748613";
  //Make the request
  request($url,function(error,response,html){
    if(!error){
      var $=cheerio.load(html);
      res.send(html);

      var trainNo,trainName,date,boardingPoint,status;
      var json={trainNo: "",trainName: "",date: "",boardingPoint: "",status: ""};

      /*$('body').filter(function(){
        var $html=$(this);
        //trainNo=$html.children("h5").eq(0).children("a").attr("href").replace("/train/","");
        trainNo=$html;
        console.log(trainNo);
      });*/
      trainNo=$('body').children("h5").eq(0).children("a").text();
      console.log(trainNo);
      //res.send(trainNo);
    }
  });
});

app.listen("3050");
console.log("Server started at port 3050");
