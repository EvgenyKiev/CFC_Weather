tbotinform

t.bot notificator informator
Бот для отправки сообщений в группы каналы
Мессенджеров Telegram  или Slack
с помощью интерфейса обмена  формата JSON

по формату
yyyyMMDDHHMMSS.json,

где
"datetime": [поле для сообщения],
"channel": [код групы],
"message": [поле для сообщения]}




Настройки
telebotcfg.json

           1 - telegramm
           2 - slack 


        CONFIG OPTIONS
        
        deleteFile
         false  - will not delete file after handle      
         true - will be deleted file after handle   

        messenger
        option use messenger
           1 - telegramm
           2 - slack 


        t_token
        telegram token
        "bot484777140:XXXXXXXX.....XXXXX",
        
        s_token
        slack token
        "bot484777140:XXXXXXXX.....XXXXX",
        
        interval
        time interval for handled
        
                
        pathLog
        src for JSON,
        
        parsedPath
        move to parsed JSON

        failedPath
        move to failed JSON

