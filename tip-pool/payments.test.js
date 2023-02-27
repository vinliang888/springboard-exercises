describe("submitPaymentInfo tests", function () {
  beforeEach(function () {
    billAmtInput.value = 100;
    tipAmtInput.value = 20;
    submitPaymentInfo();

  });

  it("should add the payment to the allPayments object", function () {
    console.log(allPayments);
    expect(allPayments['payment1']).toEqual({billAmt: '100', tipAmt: '20', tipPercent:20});
  });

  it("should add a payment to the payment table", function () {
    let newPaymentTr = document.querySelector('#payment1');
    expect(newPaymentTr.children[0].innerText).toEqual('$100');
    expect(newPaymentTr.children[1].innerText).toEqual('$20');
    expect(newPaymentTr.children[2].innerText).toEqual('20%');
  });


  it("should clear out the inputs", function () {
    expect(billAmtInput.value).toEqual('');
    expect(tipAmtInput.value).toEqual('');
  });

  afterEach(function () {
    allPayments = {};
    paymentId = 0;

    let paymentTableRows = document.querySelectorAll("#paymentTable > tbody > tr")
    for (paymentRow of paymentTableRows ) {
      paymentRow.remove();
    }

    for (summaryTd of summaryTds) {
      summaryTd.innerText = '';
    }
  });

});

describe("createCurPayment tests", function () {
  it("should return an object using the values from the input", function() {
    billAmtInput.value = 100;
    tipAmtInput.value = 20;
    expect(createCurPayment()).toEqual({billAmt: '100', tipAmt: '20', tipPercent:20});
  });
  it("should do nothing when bill amount input is empty", function () {
    tipAmtInput.value = 20;
    expect(createCurPayment()).nothing();
  });
  it("should do nothing when tip amount input is empty", function () {
    billAmtInput.value = 123123;
    expect(createCurPayment()).nothing();
  });

  it("should do nothing when bill amount input is less than 0", function () {
    billAmtInput.value = -1;
    tipAmtInput.value = 20;
    expect(createCurPayment()).nothing();
  });
  it("should do nothing when tip amount input is less than 0", function () {
    billAmtInput.value = 3421;
    tipAmtInput.value = -20;
    expect(createCurPayment()).nothing();
  });

  afterEach(function () {
    billAmtInput.value = '';
    tipAmtInput.value = '';
  })
});

describe("appendPaymentTable tests", function () {
  beforeEach(function () {
    let newPayment = {billAmt: '100', tipAmt: '20', tipPercent:20};
    paymentId = 100;
    appendPaymentTable(newPayment);
  });
  
  it("should append a table row to the payment tbody with id of 'payment100'", function () {
    expect(paymentTbody.children[0]).toBe(document.querySelector('#payment100'));
    expect(document.querySelector('#payment100').children[0].innerText).toEqual('$100');
    expect(document.querySelector('#payment100').children[1].innerText).toEqual('$20');
    expect(document.querySelector('#payment100').children[2].innerText).toEqual('20%');
  });

  afterEach(function () {
    paymentId = 0;

    let paymentTableRows = document.querySelectorAll("#paymentTable > tbody > tr")
    for (paymentRow of paymentTableRows ) {
      paymentRow.remove();
    }
  })
});

describe("updateSummary tests", function () {
  beforeEach(function () {
    allPayments = {
      payment1: {billAmt: '100', tipAmt: '20', tipPercent:20}, 
      payment2: {billAmt: '50', tipAmt: '12', tipPercent:24},
      payment3: {billAmt: '142', tipAmt: '65', tipPercent:46}
    };
    updateSummary();
  });

  it("should update the summary table", function () {
    expect(summaryTds[0].innerText).toEqual('$292');
    expect(summaryTds[1].innerText).toEqual('$97');
    expect(summaryTds[2].innerText).toEqual('30%');
  });
  afterEach(function() {
    allPayments= {};
  })

});