const form = document.querySelector('form')
const form2 = document.querySelector('.form2')



//обработчик событии на нажатие кнопки
form.addEventListener('submit',(event1)=>{
event1.preventDefault();

let query = form.querySelector('input').value;
console.log(query);

// if(query==''){
//     alert('пустое поле поиска')
//    // query="nothing";
// }

getResponse(query);

})




form2.addEventListener('submit',(event2)=>{
  event2.preventDefault();
  
  let query2 = form2.querySelector('input').value;
  // let query1 = 'john';

  getResponse2(query2);
  console.log(query2);
  
  })





//для кнопки Очистки фильмов
document.getElementById("clean").onclick = function(event) {

   // alert('Button clicked')
    document.getElementById("textInput").value = "";
//makeContent2=null;
}
 
//для кнопки Очистки актеров
document.getElementById("clean2").onclick = function(event) {

  // alert('Button clicked')
   document.getElementById("textInput2").value = "";
//makeContent2=null;
}




 //подключение базы где ищем данные 
 

async function getResponse(query) {

    try {
    // получение response ответа состояния сервера
    let response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`)

    //получение самих данных  переобразованных в читаемый json
    let content = await response.json()
    //console.log(content.splice(0.10))
    console.log(content);

    makeContent(content);

     //удаление error если запрос успешный
 document.getElementById("errorMessage").innerHTML = "";
 

    //поймать на ошибки/ (errorMessage из страницы)
    } catch (error) {
        document.getElementById("errorMessage").innerHTML = error;
        // ничего не выводит, обнуляет массив посика если error, к примеру нет интернета
       // makeContent();
    }
  }


/////
async function getResponse2(query2) {

  try {
  // получение response ответа состояния сервера
  let response2 = await fetch(`https://api.tvmaze.com/search/people?q=${query2}`)

  //получение самих данных  переобразованных в читаемый json
  let content2 = await response2.json()
  //console.log(content.splice(0.10))
  console.log(content2);

  makeContent2(content2);

   //удаление error если запрос успешный
document.getElementById("errorMessage").innerHTML = "";


  //поймать на ошибки/ (errorMessage из страницы)
  } catch (error) {
      document.getElementById("errorMessage").innerHTML = error;
      // ничего не выводит, обнуляет массив посика если error, к примеру нет интернета
     // makeContent();
  }

}



////
function makeContent2(content2){
  // получить id reultsList через (DOM) getElementById из страницы и привести в константу list
    let list2 = document.querySelector('.posts2')    
          
    // удаление предыдущих результатов поиска в списке через innerHTML, для уменьшения вывода списка и корректности вывода
    list2.innerHTML="";

   // создаем ключ key, приравниваем его с ключем массива с данными и извлекаем сопоставляя их 
let key2;

for (key2 in content2) {
    //console.log(key)
    //console.log(content[key])
    for (key2 in content2) {
        list2.innerHTML += ` 
        <div class="post">
        <div> <h3> Название: ${content2[key2].person.name} </div>
        <div> <h4> Жанр: ${content2[key2].person.gender} </div> 
          <div> <h4> Страна: ${content2[key2].person.country.name} </div>
            <div> <h4> Дата рождения: ${content2[key2].person.birthday} </div>
           <div> <h4> Дата смерти: ${content2[key2].person.deathday} </div>
             <div> <h4> Подробнее: <a href="${content2[key2].person.url}">${content2[key2].person.name} </a> </div>          
      <hr>
      </div>
        `
    }

}

}



//создание контента, по запросу

function makeContent(content){
  // получить id reultsList через (DOM) getElementById из страницы и привести в константу list
    let list = document.querySelector('.posts')    
          
    // удаление предыдущих результатов поиска в списке через innerHTML, для уменьшения вывода списка и корректности вывода
    list.innerHTML="";

   // создаем ключ key, приравниваем его с ключем массива с данными и извлекаем сопоставляя их 
let key;

for (key in content) {
    //console.log(key)
    //console.log(content[key])
    for (key in content) {
        list.innerHTML += ` 
        <div class="post">
        <div> <h3> Название: ${content[key].show.name} </div>
        <div> <h4> Жанр: ${content[key].show.genres} </div>
        <div>  <img src ="${content[key].show.image.medium}" width="300"> </div>
       
      <br>
      <div class="rateCont">
        <div class="before"> <button class="rate">Рейтинг</button> </div>
        <div class="after"> ${content[key].show.rating.average} </div> 
      </div>
      <hr>
      </div>
        `
    }

}

}




//getResponse()


