window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone')
    let temperatureSection=document.querySelector('.temperature');
    let tempSpan=document.querySelector('.temperature span')
    let tempDegree=document.querySelector('.temperature-degree')




    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const APIkey = 'b34cfe00f6f9e01d040a32272a5f6203'
            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIkey}`

            fetch(api)
                .then(resp => resp.json())
                .then(data => {
                    console.log(data)
                    const { temp } = data.main
                    const { description } = data.weather[0];
                    temperatureDegree.textContent=temp;
                    temperatureDescription.textContent=description;
                    locationTimezone.textContent=data.name;
                    
                    setIcons(description ,document.querySelector('.icon'))


                    // CONVERSION TO C
                    temperatureSection.addEventListener('click', () => {
                        if(tempSpan.textContent==='F'){
                            tempSpan.textContent='C'
                            tempDegree.textContent=Math.floor((temp-32)/1.8)
                        }
                        else{
                            tempSpan.textContent='F';
                            tempDegree.textContent=temp
                        }
                    })
                    // .catch((err) => console.log('whoooooooops',err))
                });
            });
    }
    else {
        h1.textContent = 'heydis is not working bcuz u being a doofus'
    }
    function setIcons(description, iconID){
        const skycons= new Skycons({color:'white'});
        // skycons.add(document.getElementById("icon"), Skycons.RAIN);
         const currentIcon=description.replace(/-/g, "_").toUpperCase()
        skycons.play()
     return skycons.set(iconID, Skycons[currentIcon])


      }
})