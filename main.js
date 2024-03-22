// ELEMAN ÇEKME

const spendingInput = document.querySelector("#spending-input");
const priceInput = document.querySelector("#price-input");
const formBtn = document.querySelector(".btn");
const list = document.querySelector(".list");
const totalInfo = document.querySelector("#total-info");
const statusCheck = document.querySelector("#status-input");
const selectFilter = document.querySelector("#filter-select");

formBtn.addEventListener("click", addExpense);
list.addEventListener("click", handleClick);
selectFilter.addEventListener("change", handleFilter);

let total = 0;
function updateTotal(price) {
  //TOTAL VE GİRİLEN DEĞERİ TOPLAMA
  total += Number(price);
  totalInfo.textContent = total;
}

//GİDER OLUŞTURMA
function addExpense(e) {
  e.preventDefault();

  //INPUTLAR BOŞSA
  if (!priceInput.value || !spendingInput.value) {
    alert("Boş Gider Eklenemez!");
    return; //fonksiyonu durdurur
  }

  //VERİ GİRDİKTEN SONRA DİV OLUŞTURMA
  const spendingDiv = document.createElement("div");

  //CLASS EKLEME
  spendingDiv.classList.add("spending");

  if (statusCheck.checked) {
    spendingDiv.classList.add("paid");
  }

  //İÇERİĞİ GETİRME
  spendingDiv.innerHTML = `
    <h2>${spendingInput.value}=</h2>
    <h2 id="value">${priceInput.value}</h2>
    <div class="buttons">
        <img id="payment" src="images/payment.png" alt="">
        <img id="remove" src="images/delete.png" alt="">
    </div>`;

  //LİSTEYE ELEMAN EKLEME
  list.appendChild(spendingDiv);

  //TOPLAMI GÜNCELLEME
  updateTotal(priceInput.value);

  //FORMU TEMİZLEME
  priceInput.value = "";
  spendingInput.value = "";
}

function handleClick(e) {
  const element = e.target;

  if (element.id === "remove") {
    //TIKLANAN ELEMANIN KAPSAYICISINA ULAŞMA
    const wrapper = element.parentElement.parentElement;

    //SİLİNEN ELEMANIN FİYATINI ALMA
    const deletedPrice = wrapper.querySelector("#value").innerText;
    Number(deletedPrice.innerText);

    //SİLİNEN FİYATI TOTALDEN ÇIKARTMA
    updateTotal(-Number(deletedPrice));

    //KAPSAYICIYI KALDIR
    wrapper.remove();
  }
}

//FİLTRELEME
function handleFilter(e) {
  //console.log(e.target.value);

  //CHILDNODES : parentelement gibi kapsayıcıya değil TAM TERSİ elemana doğru gider
  const items = list.childNodes;
  items.forEach((item) => {
    switch (e.target.value) {
      case "all":
        item.style.display = "flex";
        break;
      case "paid":
        if (!item.classList.contains("paid")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;
      case "not-paid":
        if (!item.classList.contains("not-paid")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;
    }
  });
}
