describe("sumPaymentTotal helper tests", function() {
  beforeEach(function () {
    // initialization logic
    billAmtInput.value = 100;
    tipAmtInput.value = 20;
    submitPaymentInfo();
    billAmtInput.value = 1340;
    tipAmtInput.value = 76;
    submitPaymentInfo();
    billAmtInput.value = 564;
    tipAmtInput.value = 81;
    submitPaymentInfo();
  });  
  it("should sum the tips from all the payments", function () {
    expect(sumPaymentTotal('tipAmt')).toEqual(177);
  });

  it("should sum the bills from all the payments", function () {
    expect(sumPaymentTotal('billAmt')).toEqual(2004);
  });

  afterEach(function() {
    // teardown logic
 
    let paymentTableRows = document.querySelectorAll("#paymentTable > tbody > tr")
    for (paymentRow of paymentTableRows ) {
      paymentRow.remove();
    }

    for (summaryTd of summaryTds) {
      summaryTd.innerText = '';
    }

    //reset allPayments obj

    allPayments= {};
    paymentId = 0;

  });
});

describe("calculateTipPercent helper tests", function() {
  it("should correctly calculate the tip percents", function () {
    expect(calculateTipPercent(100, 20)).toEqual(20);
    expect(calculateTipPercent(250, 4)).toEqual(2);
  });

});

describe("appendTd helper tests", function() {
  let testTr = document.createElement('tr');
  beforeAll(function () {
    
    appendTd(testTr, 'abc');
  });  
  it("should add a column to the row with the value of 'abc'", function () {
    expect(testTr.children[0].nodeName).toEqual("TD");
    expect(testTr.children[0].innerText).toEqual("abc");
  });
  
});

describe("appendDeleteBtn tests", function () {
  let testTr = document.createElement('tr');

  beforeAll(function () {
    
    appendDeleteBtn(testTr);
  }); 
  it("should add a column to the row with the value of 'X'", function () {
    expect(testTr.children[0].nodeName).toEqual("TD");
    expect(testTr.children[0].innerText).toEqual("X");
  });
})