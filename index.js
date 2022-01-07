const rateTwo = document.getElementById("rate-two");
const swap = document.getElementById("swap");
const currencyOne = document.getElementById("currency-one");
const currencyTwo = document.getElementById("currency-two");
const amountOne = document.getElementById("amount-one");
const amountTwo = document.getElementById("amount-two");

async function calculateCurrency() {
  const currency_one = currencyOne.value;
  const currency_two = currencyTwo.value;
  //console.log(currency_one, currency_two);
  try {
    const resp = await fetch(
      `https://v6.exchangerate-api.com/v6/dc778572159b869160445588/latest/${currency_one}`
    );
    const data = await resp.json();
    console.log(data);

    const rate = data.conversion_rates[currency_two];
    console.log(rate);
    rateTwo.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
    amountTwo.value = (amountOne.value * rate).toFixed(2);
  } catch (error) {
    console.log(error);
  }
}

currencyOne.addEventListener("change", calculateCurrency);
currencyTwo.addEventListener("change", calculateCurrency);
amountOne.addEventListener("input", calculateCurrency);
amountTwo.addEventListener("input", calculateCurrency);

swap.addEventListener("click", () => {
  const temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;
  calculateCurrency();
});

calculateCurrency();
