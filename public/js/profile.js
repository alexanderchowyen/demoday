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
    sendEmail()
    

  };
});

function sendEmail(label,ingredients){
window.open(`mailto:someonesEmail?subject=TreatYourSelfRecipe-${label}&body=${ingredients}`)
}

