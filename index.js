'use strict'

var fs = require("fs");
var find = require('find');
const path = require('path');
const  toSlackGet=require('./sendtoslack');
const  toTelegram=require('./sendtotelegram');
const setts=require('./settings');
const todel=setts.deleteFile;
const timeinterval=setts.interval;
const pathtolog=setts.pathLog;
const parsedtopath=setts.parsedPath;
const failedtopath=setts.failedPath;
const t_token=setts.t_token;
const s_token=setts.s_token;
const opt_mssngr=setts.messenger;
let datatimecreate=null;

var fileNameArr=[];
var fileNameSortArr=[];
var flag=null;

myFileOp()

function myFileOp() {
  
    let files = fs.readdirSync(__dirname+'/'+pathtolog ).filter( function( elm ) {return elm.match(/\d{14}.json/)})
      
    if (Object.keys(files).length == 0) {
       
       return console.log('файлов для обработки нет');
    }


    else if (files.length =1) {

        var fileset = path.basename(files[0], '.json')

        readOurFiles(fileset);
    }  
   
    else if (files.length>1){ 

        for (var i = 0; i < files.length; i++) {

        fileNameArr.push((path.basename(files[i], '.json')))
        
        }

        fileNameSortArr=fileNameArr.sort(function compareNumbers(a, b) {

        return a - b;

        })

      console.log(new Date()+'sorted '+fileNameSortArr);

      let lenfileNameArr= fileNameArr.length;

      for (let k=0;k<lenfileNameArr;k++) {
      
        var fileset = fileNameSortArr.shift([k]);
      
        console.log(new Date()+' get '+ fileset);
      
        readOurFiles(fileset);
      }

     }
    
    }

    function readOurFiles(fileset) {
        // Check that the file exists locally
        if(!fs.existsSync(__dirname+'/'+pathtolog+'/'+fileset+'.json', 'utf8')) {
                       
           return console.log(new Date()+' '+fileset +" File not found");
        
        }

        // The file *does* exist
        else {
            // Read the file and do anything you want
            var contents = fs.readFileSync(__dirname+'/'+pathtolog+'/'+fileset+'.json', 'utf8');
           
        }

         try {

            var jsonContent = JSON.parse(contents);

            console.log (new Date()+' '+'parse Json OK');

            ///end try jsonContent

         } catch(e) {

            console.log( new Date()+' '+ fileset +' NOT Json ');

            toPasedOrFalseOrDel(fileset,2,todel);
           }

        // Get Value from JSON

        var parsStatus=1;

        if ((fs.existsSync(__dirname + '/' + pathtolog + '/' + fileset + '.json', 'utf8')&&(jsonPars(fileset,jsonContent,parsStatus)))) {

            console.log('file here for parse ' + fileset);

            for (let id in jsonContent) {
                
                var dt = jsonContent[id].datetime;
                
                var st = jsonContent[id].channel;
                
                var msg = jsonContent[id].message;

                console.log ( 'THIS '+  dt+''+st+''+ msg+''  );

                
                if (opt_mssngr==1) {

                    toTelegram(dt, st, msg,t_token);
                }

                if (opt_mssngr==2) {
                    
                    toSlackGet(dt, st, msg,s_token);

                }
             
            }

            toPasedOrFalseOrDel(fileset,1,todel);
        }

        else toPasedOrFalseOrDel(fileset,2,todel);

    }





function jsonPars(fileset,jsonContent,parsStatus){

    jsonContent[0].hasOwnProperty("channel") ? false:  parsStatus=0 ;

    jsonContent[0].hasOwnProperty("message") ? false: parsStatus=0;
    
    jsonContent[0].hasOwnProperty("datetime") ? false: parsStatus=0;

    return parsStatus

}


function toPasedOrFalseOrDel(fileset,flag,todel){

    var currentpath=__dirname+'/'+pathtolog+'/'+fileset+'.json';

    //flag===1&&todel==='false' to parse
    //flag===2&&todel==='false' to failed
    //flag===1&&todel==='true' to deleted

    if (flag===1&&todel==='false') {

        fs.rename(currentpath, __dirname+'/'+parsedtopath+'/'+fileset+'.json', function(err) {

            if ( err ) console.log('ERROR: ' + err);

        });

        console.log(fileset+' to Parse done');
        
        return
    }

    if (flag===2 ) {

        fs.rename(currentpath, __dirname+'/'+failedtopath+'/'+fileset+'.json', function(err) {

            if ( err ) console.log('ERROR: ' + err);

        });

        console.log(fileset+' to False done');
       
        return
    }

    if (flag===1&&todel==='true') {

        try {
            fs.unlinkSync(currentpath);

            console.log(fileset+' successfully deleted');

        } 
        catch (err) {
            
            console.log(fileset+' unable deleted');
        }

    }

}