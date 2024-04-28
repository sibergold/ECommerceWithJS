let products = [];
let baskets = [];
getProducts();
showBasketCount();
//Ürün listesini apiden getiriyor
async function getProducts()
{
    products = await fetch("http://localhost:3000/products").then(response => response.json());
createProductsElement();
}

//Ürünlerin elementlerini oluşturuyor
function createProductsElement()
{
    let text="";
    for (let i = 0; i < products.length; i++) {
        const element = products[i];
        text+=`
        <div class="col-md-3 mt-2">
            <div class="card">
                <img src="${element.imageUrl}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${element.name} </h5>
                  <button type="button" onclick="addBasket(${i})" class="btn btn-success">Sepete Ekle</button>
                </div>
              </div>
        </div>
        `
    }
    document.getElementById("row").innerHTML=text;
}

//Sepet adedini göster
async function showBasketCount()
{
   baskets=await fetch("http://localhost:3000/baskets").then(res=>res.json());
   document.getElementById('basketBtn').innerText="Sepet:" +baskets.length;
}

//Sepete Ürün Ekliyor
function addBasket(index){
    let model = products[index];

    fetch("http://localhost:3000/baskets",{
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(model)
    }).then();
};
//Sepet modaldaki listenin elementlerini oluşturuyor
function showBasketModal()
{
let element=document.getElementById("tbody");
element.remove();
let tableElement=document.getElementById("table");
let text=`<tbody id="tbody">`;
for (let i = 0; i < baskets.length; i++) {
    const element = baskets[i];
    text+=`
    <tr>
        <td>${i+1}</td>
        <td>${element.name}</td>
        <td>
           <img src="${element.imageUrl}" width:"100"/>
        </td>
        <td>
            <button class="btn btn-outline-danger btn-sm" onclick="removeBasketItem(${element.id})">Sil</button> 
            </td>
    </tr>
        `
}
text+="</tbody>";
tableElement.innerHTML=text;
}
//Sepetten ürün siliyor
async function removeBasketItem(id)
{
await fetch(`http://localhost:3000/baskets/${id}`,{
    method: "DELETE",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
});
showBasketCount();
showBasketModal();
}