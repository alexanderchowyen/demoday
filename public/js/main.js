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
// });
let recipeList = document.querySelector('tbody') 
const recipeSearchs = document.querySelector(".search")
const sInput = document.querySelector("input")
recipeSearchs.addEventListener('click', function(){ 
  console.log('button action')
  var search = sInput.value 
  const url = `https://api.edamam.com/search?q=${search}&ingr=10&time=30&app_id=1e77532d&app_key=f85d1a2472b0f4835ada53850740ab5f`
fetch(url)
.then(res => res.json())
.then(data => {
  console.log("fetching data")
  console.log(data);
  recipeList.innerHTML = ""
  data.hits.forEach(currentRecipe => {
    let recipe = currentRecipe.recipe
    recipeList.innerHTML+= `
<tr>
  <td> <img src= "${recipe.image}"></td>
  <th scope="row">${recipe.label}</th>
  <td>${recipe.calories}</td>
  <td>${recipe.ingredientLines}</td>
  <td>${recipe.mealType}</td>
  <td>${recipe.cuisineType}</td>
  <td><i class = "fa fa-star"> </i></td>
</tr>`
});  
})
})
recipeList.addEventListener('click', function(event){
  event.value


})


