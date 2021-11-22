// var ban = document.getElementsByClassName("fa-ban")

let recipeList = document.querySelector('tbody') 

recipeList.addEventListener('click', function(event){
  if (event.target.classList.contains("fa-ban")){
    // const id = this.event.target.parentNode.parentNode
    const row = event.target.parentNode.parentNode.children
    const id = row[row.length].innerHTML
    console.log("clicking on ban")
    fetch('removeRecipe', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
      })
    }).then(function (response) {
      window.location.reload()
    })
  };
});

recipeList.addEventListener('click', function(event){
  if (event.target.classList.contains("fa-envelope")){
    // const id = this.event.target.parentNode.parentNode
    const row = event.target.parentNode.parentNode
    const label = row.children[1].innerHTML
    const ingredients = row.children[3].innerHTML
    sendEmail(label,ingredients)
  };
});

recipeList.addEventListener('click', function(event){
  if (event.target.classList.contains("fa-apple")){
    const row = event.target.parentNode.parentNode
    const ingredients = row.children[3].innerHTML.split(". ").join("+")
    console.log(ingredients)
    let url = `https://api.edamam.com/api/nutrition-data?app_id=542df651&app_key=77fa76cd15e1911cfda979e6b134e224&nutrition-type=cooking&ingr=${ingredients}`
    fetch(url).then(res=>res.json())
    .then(data=>{
      console.log(data)
	    let nutrientList = []
	    let nutrientString = ""
	    Object.keys(data.totalNutrients).forEach(vitamin=>{
	    let currentNutrients = data.totalNutrients[vitamin]
		    nutrientList.push(currentNutrients)
		    nutrientString+=`${currentNutrients.label} ${currentNutrients.quantity}${currentNutrients.unit}\n`
	    })
	    alert(nutrientString)
    })
  };
});

recipeList.addEventListener('click', function(event){
  if (event.target.classList.contains("fa-shopping-cart")){
    console.log("shopping")
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success)
    } else {
        console.log("Geolocation is not supported by this browser.")
    }
  };
});

function success(pos) {
  let locales = `${pos.coords.longitude},${pos.coords.latitude}`
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${locales}.json?access_token=pk.eyJ1IjoieHNoYXduY3giLCJhIjoiY2tlams1YTNnMDZ3MDJycXNsNGlxbzJlYyJ9.yhpBv07FJ2TZfJW62fs7sA`)
          .then(response => response.json())
          .then(data => {
            let zipCode = data.features[0].context[1].text
            console.log(zipCode)
            fetch(`https://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipsearch?zip=${zipCode}`)
            .then(res=>res.json())
            .then(data=>{
              console.log(data)
              let markets = data.results.reduce((a,b)=>a+b.marketname+"\n","")
              console.log(markets)
              alert(markets)
            })
          })
          .catch(err => console.log(err))
}

function sendEmail(label,ingredients){
window.open(`mailto:someonesEmail?subject=TreatYourSelfRecipe-${label}&body=${ingredients}`)
}

