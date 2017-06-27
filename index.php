<!DOCTYPE HTML>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Prescriber 360</title>
</head>
<style>
	#mapSpace {
		width:100%;
		height:400px;
	}
</style>
<body>
	<input name="connect" type="button" value="connect" onclick="connect()" />
	<input name="subscribe" type="button" value="subscribe" onclick="subscribe()" />

	<div id="mapSpace">
	</div>
	<script src="mqttws31.js" type="text/javascript"></script>
	<script src="mqttClient.js" type="text/javascript"></script>
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDAr6rKg6Aug47LcUbD48mudU8J5wqtGd4&callback=initMap"></script>
</body>
</html>