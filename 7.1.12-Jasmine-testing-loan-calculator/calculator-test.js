
it('should calculate the monthly rate correctly', function () {
  let values = {
    amount: 1000000,
    rate: 10,
    years: 30
  };
  expect(calculateMonthlyPayment(values)).toEqual('$8775.72');
  values = {
    amount: 20,
    rate: 1,
    years: 3
  };
  expect(calculateMonthlyPayment(values)).toEqual('$0.56');
  values = {
    amount: 521,
    rate: 80.25,
    years: 42
  };
  expect(calculateMonthlyPayment(values)).toEqual('$34.84');
});


it("should return a result with 2 decimal places", function() {
  let values = {
    amount: 10043,
    rate: 5.8,
    years: 8
  };
  let monthlyPayment = calculateMonthlyPayment(values);
  expect(monthlyPayment.slice(-3,-2)).toEqual('.');
});

it("should return invalid result", function() {
  document.getElementById("loan-amount").value = 'asdf';
  document.getElementById("loan-years").value = 4;
  document.getElementById("loan-rate").value = 5;
  update();
  expect(document.getElementById('monthly-payment').innerText).toEqual('Invalid input');

});
/// etc
