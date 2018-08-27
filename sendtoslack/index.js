'use strict' 


 function toSlackGet(dt, st, msg,s_token){ 

  const { WebClient } = require('@slack/client'); 

  //console.log ( 'Msg To Sending' )

  const conversationId = st;

  const token=s_token;
 
  if (!token) { console.log('You must specify a token ');

   process.exitCode = 1; return; }
 
 const web = new WebClient(token);

 web.chat.postMessage({ channel: conversationId, text: 'ВНИМАНИЕ!'+' '+dt+' '+msg })
 
 .then((res) => {

    console.log('Message sent: ', res.ts);

  })

  .catch(console.error);

 }

 module.exports=toSlackGet