
var redLight = document.getElementById("red-light");
var yellowLight = document.getElementById("yellow-light");
var greenLight = document.getElementById("green-light");
var tlLocation = document.getElementById("traffic-light-location");
var trafficLights = document.querySelector(".traffic-light");
var submitBtn = document.getElementById("crosswalk-btn");


//funcion de localizacion random para semaforo
var randomIP = (Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255));
var API_url = "https://ipapi.co/"+randomIP+"/json/"
console.log(randomIP)

fetch(API_url)
.then(function(response){
    response.json().then(jsonData => {
        tlLocation.innerHTML = jsonData['city']+', '+jsonData['country_name']
    });
});


//cambio automatico e infinito de color de semaforo
var changeLightColorInterval = 
    setInterval(changeLightColors, 5000);

function changeLightColors(){

    var className = document.querySelector(".active").className;

    switch (className){
        case "green active":
            greenLight.classList.remove("active");
            yellowLight.classList.add("active");
            break;

        case "yellow active":
            yellowLight.classList.remove("active");
            redLight.classList.add("active");
            break;

        case "red active":
            redLight.classList.remove("active");
            greenLight.classList.add("active");
            break;

    }
}

//seleccion de semaforo a cruzar
trafficLights.addEventListener("click", function(){
    if (!trafficLights.classList.contains("chosen-traffic-light")){
        trafficLights.classList.add("chosen-traffic-light");
        submitBtn.disabled = false;
    } else {
        trafficLights.classList.remove("chosen-traffic-light")
        submitBtn.disabled = true;
    }

})