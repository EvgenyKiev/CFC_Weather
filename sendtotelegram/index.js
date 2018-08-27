
'use strict'

const axios=require('axios')

function toTelegram(dt, st, msg,t_token) {

 var sendtext = dt + ' ' + msg;

 var theUrl = 'https://api.telegram.org/'+ t_token +'/sendMessage'


 axios.post(theUrl, {
   
    chat_id:st,
   
    text:sendtext,
  
 })
  
 .then(function (response) {
  
    //console.log(response);
  
 })
  
  .catch(function (error) {
 
    console.log(error);

  });

}

module.exports=toTelegram