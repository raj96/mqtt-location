
// Create a client instance
  client = new Paho.MQTT.Client("mqtt.blackspektro.com", 8080,"web_" + parseInt(Math.random() * 100, 10));

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;

var options = {

     //connection attempt timeout in seconds
     timeout: 3,

     //Gets Called if the connection has successfully been established
     onSuccess: function () {
         alert("Connected");
		 onConnect();
     },

     //Gets Called if the connection could not be established
     onFailure: function (message) {
         alert("Connection failed: " + message.errorMessage);
     }

 };

//Attempt to connect
client.connect(options);

  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
    client.subscribe("gps/#");
    message = new Paho.MQTT.Message("Hello CloudMQTT");
    message.destinationName = "/cloudmqtt";
    client.send(message);
  }

  function doFail(e){
    console.log(e);
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }
var json_obj;
  // called when a message arrives
  function onMessageArrived(message) {
    console.log("onMessageArrived:"+message.payloadString);
	//userid email button
	var content_string = "";
	var dcon = document.getElementById("message_content");
    if(message.payloadString!='Started')
	   json_obj = JSON.parse(message.payloadString);

	if(map) {
		var userAlias = json_obj.User_alias;
		var lat = Number(json_obj.Latitude);
		var lng = Number(json_obj.Longitude);


		if(!marker[userAlias]) {
			console.log(userAlias);
			m = new google.maps.Marker({"lat":lat,"lng":lng});
			google.maps.event.addListener(m,'click',function(){
				(new google.maps.InfoWindow({content:userAlias})).open(map,m);
			});

			marker[userAlias] = {"mark":m};
		}

        marker[userAlias].mark.setMap(null);
        marker[userAlias].mark.setPosition({"lat":lat,"lng":lng});
	}
    marker[userAlias].mark.setMap(map);

  }

  var map,marker = [];

  function _(x) {
	  return document.getElementById(x);
  }

  function initMap() {

	  map = new google.maps.Map(_('mapSpace'),{
		  center:{lat:0,lng:0},
		  zoom:2
		  });

  }

  function sendMail() {
	ajax = new XMLHttpRequest();
	ajax.open("POST","send_mail.php",true);
	ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	window.alert(JSON.stringify(json_obj));
	var data = "email="+json_obj.email+"&uid="+json_obj.uid+"&mname="+json_obj.mname+"&mqty="+json_obj.mqty;
	ajax.onreadystatechange = function() {
		if(ajax.readyState==4 && ajax.status==200)
			window.alert(ajax.responseText);
	}
	ajax.send(data);
  }
