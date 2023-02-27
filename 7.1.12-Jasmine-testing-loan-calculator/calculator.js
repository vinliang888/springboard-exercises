window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  document.getElementById("loan-amount").value = 100000;
  document.getElementById("loan-years").value = 15;
  document.getElementById("loan-rate").value = 5;
  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  let values = getCurrentUIValues();
  if (isNaN(parseFloat(values.amount)) || isNaN(parseFloat(values.rate)) ||isNaN(parseFloat(values.years))) {
    updateMonthly('Invalid input');
  } else {
    updateMonthly(calculateMonthlyPayment(values));
  }
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  console.log(values);
  let monthlyInterestRate = values.rate / 12 / 100;
  let months = values.years * 12;
  let monthlyPayment = (values.amount * monthlyInterestRate / (1-((1+monthlyInterestRate)**(-1*months)))).toFixed(2);
  return '$'+ monthlyPayment.toString();
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  document.getElementById("monthly-payment").innerText = monthly;
}
