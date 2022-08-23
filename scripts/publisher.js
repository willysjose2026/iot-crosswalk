var mqtt = window.mqtt

var client = mqtt.connect("ws://54.196.218.197:9001",
{username:"proyect",
password:"lomos0291"});

document.getElementById("crosswalk-btn").addEventListener("click", function(){
    client.publish("iot-crosswalk", "cruzar")
});

