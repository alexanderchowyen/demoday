// var thumbUp = document.getElementsByClassName("fa-thumbs-up");
// var trash = document.getElementsByClassName("fa-trash");
// console.log('hello im here and linked')
// Array.from(thumbUp).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//         fetch('messages', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg,
//             'thumbUp':thumbUp
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });
// });

// Array.from(trash).forEach(function(element) {
//       element.addEventListener('click', function(){
//         fetch('messages', {
//           method: 'delete',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg
//           })
//         }).then(function (response) {
//         })
//       });
// });

// Array.from(trash).forEach(function(element) {
//   element.addEventListener('click', function(){
//     const name = this.parentNode.parentNode.childNodes[1].innerText
//     const msg = this.parentNode.parentNode.childNodes[3].innerText
//     fetch('messages', {
//       method: 'delete',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         'name': name,
//         'msg': msg
//       })
//     }).then(function (response) {
//       window.location.reload()
//     })
//   });
// // });

// var ban = document.getElementsByClassName("fa-ban")

let recipeList = document.querySelector('tbody') 

recipeList.addEventListener('click', function(event){
  if (event.target.classList.contains("fa-ban")){
    // const id = this.event.target.parentNode.parentNode
    const id = event.target.parentNode.parentNode.children[0].innerHTML
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
    const ingredients = row.children[3].innerHTML.split(" ").join("+")
    console.log(ingredients)
    let url = `https://api.edamam.com/api/nutrition-data?app_id=542df651&app_key=77fa76cd15e1911cfda979e6b134e224&nutrition-type=cooking&ingr=${ingredients}`
    fetch(url).then(res=>res.json())
    .then(data=>{
      console.log(data)
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
  let locales = [pos.coords.longitude,pos.coords.latitude].join(',')
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

