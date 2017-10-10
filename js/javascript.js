

//start JQ
$(document).ready(function() {


        //start gps
        if (!navigator.geolocation){
            console.log("Geolocation is not supported by your browser");

        }

        function success(position) {
            var latitude  = (position.coords.latitude).toFixed(2) ;
            var longitude =  ( position.coords.longitude).toFixed(2);


            ///live coord

            console.log('Latitude is ' + latitude + 'Longitude is ' + longitude )
            ///test
            //var apisrc="https://fcc-weather-api.glitch.me/api/current?lat=50.4&lon=30.5"
            var apisrc = "https://fcc-weather-api.glitch.me/api/current?lat=" + latitude+ "&" + "lon=" + longitude;


            ///test2
            $.ajax({
                type: 'get',
                url: apisrc,
                async: true,
                cache: false,
                dataType: "json",

                success: function(json) {
                    var html = "";
                    $(".name").html( JSON.stringify(json['name']));


                    var currT= JSON.stringify(json.main['temp']);
                    var currF= (JSON.stringify(json.main['temp']*1.8+32));

                    $(".temp").html(currT+' C')

                    var CurrTT=currT+' C'
                    var CurrTF=currF+' F'

                    console.log(CurrTF)

                    function modifyT() {
                        var t2 = document.getElementById("temp");
                        if (t2.firstChild.nodeValue == CurrTT) {
                            t2.firstChild.nodeValue = CurrTF;
                        } else {
                            t2.firstChild.nodeValue = CurrTT;
                        }
                    }

                    // Добавляет слушателя событий для таблицы
                    var el = document.getElementById("temp");
                    el.addEventListener("click", modifyT, false);

                    var imageLink=JSON.stringify(json.weather[0].icon);
                    html += "<img src = " + imageLink + " " + "alt='" + 'Txt' + "'>"

                    $(".ico").html(html);



                }

            });



              ///test2
            //// live coord

        };

        function error() {
            console.log("Unable to retrieve your location")
        };


        //end gps
        navigator.geolocation.getCurrentPosition(success, error)




//end JQ
} )

//
// C ->F
// T(°F) = T(°C) × 1.8 + 32
//
// F->C
// T(°C) = (T(°F) - 32) / 1.8