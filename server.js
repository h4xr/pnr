/*
Name: PNR Status Check
Description: provides a REST API for checking the PNR Status on Indian Railways
*/
var express=require('express'),
fs=require('fs'),
request=require('request'),
ch=require('cheerio'),
app=express();

app.get("/status/:pnr",function(req,res){
  //The url from which to scrap the information
  var $url="http://api.checkpnrstatusirctc.in/pnrajax/pnr.php?pnrno="+req.params.pnr;
  console.log(req.params.pnr);
  var json={"pnr":"","train_number":"","status":""};
  //Make the request
  request($url,function(error,response,html){
    if(!error){
      var $=ch.load(html);
      json.train_number=$('a','h5').attr('href').replace("/train/","");
      json.status=$('td','tr').eq(2).text().trim();
      json.pnr=req.params.pnr;
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(json));
    }
  });
});

app.listen("3150");
console.log("Server started at port 3150");
