const counter = document.querySelector("#counter-value")

var mqtt = window.mqtt;

var client = mqtt.connect("ws://54.196.218.197:9001",
{username:"proyect",
password:"lomos0291"});

client.subscribe("iot-crosswalk");
client.on("message", function(topic, payload){
    if (payload == "cruzar"){
        cruzar();
        client.publish("iot-crosswalk", "cruzando");
    }
});


function cruzar(){

    clearInterval(window.changeLightColorInterval)//parar semaforo

    //setear semaforo en rojo
    if (!redLight.classList.contains("active")){
        //change lights colors
        redLight.classList.add("active");
        yellowLight.classList.remove("active");
        greenLight.classList.remove("active");

    }
    countDown();
    agregarCruzeHistorial() //guardar cruze peatonal en DB
}

function countDown(){
    var startPoint = new Date()//get current time
    startPoint.setSeconds(startPoint.getSeconds()+10)//add 10s to time
    startPoint = startPoint.getTime()//get time in ms

    document.getElementById("crosswalk-btn").value = "Cruzando";
    document.getElementById("crosswalk-btn").classList.add("walk-btn")

    var counterinterval = setInterval(function(){
        
        var endPoint = new Date().getTime() //get current time
        var time_left = startPoint - endPoint

        var seconds = Math.floor((time_left % (1000 * 60)) / 1000);//calculate seconds left

        counter.innerHTML = "Contador <br>00:0"+seconds

        if (time_left < 0){
            clearInterval(counterinterval)
            counter.innerHTML = "Contador <br>00:00"
            alert("NO CRUZAR")
            changeLightColorInterval = setInterval(changeLightColors, 5000);
            document.getElementById("crosswalk-btn").value = "Cruzar Peaton";
            document.getElementById("crosswalk-btn").classList.remove("walk-btn");

        }


    },1000)
    
    
}

function agregarCruzeHistorial(){
    var chosenTrafficLight = document
        .querySelector(".chosen-traffic-light");

}