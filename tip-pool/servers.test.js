describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  it('should add a new row to the table with the id of server + serverId and the value of "Alice"', function () {
    submitServerInfo();
    let addedServer = document.querySelector("#server1 td");

    expect(addedServer).not.toBeNull();
    expect(addedServer.innerText).toEqual("Alice");
  });  

  afterEach(function() {
    // teardown logic
    let serverTableRows = document.querySelectorAll("#serverTable > tbody > tr")
    for (serverRow of serverTableRows ) {
      serverRow.remove();
    }
    
    //reset allServers object
    allServers = {};
    serverId = 0;

  });
});

describe("Tests with multiple servers and multiple bills", function () {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
    submitServerInfo();
    serverNameInput.value = 'Barry';
    submitServerInfo();
    serverNameInput.value = 'Carl';
    submitServerInfo();
    billAmtInput.value = 100;
    tipAmtInput.value = 20;
    submitPaymentInfo();
    billAmtInput.value = 1340;
    tipAmtInput.value = 76;
    submitPaymentInfo();
  });  

  it("should display three server rows in the serverTable", function () {
    let server1 = document.querySelector('#server1 td');
    let server2 = document.querySelector('#server2 td');
    let server3 = document.querySelector('#server3 td');

    expect(server1).not.toBeNull();
    expect(server1.innerText).toEqual("Alice");
    expect(server2).not.toBeNull();
    expect(server2.innerText).toEqual("Barry");
    expect(server3).not.toBeNull();
    expect(server3.innerText).toEqual("Carl");
  });

  it("should display the amount of the tip total averaged amongst the servers", function () {
    let average = (sumPaymentTotal('tipAmt') / 3).toFixed(2);
    let dispAvg = '$' + average;

    let earnings1 = document.querySelector('#server1 td + td');
    let earnings2 = document.querySelector('#server2 td + td');
    let earnings3 = document.querySelector('#server3 td + td');
    
    expect(earnings1.innerText).toEqual(dispAvg);
    expect(earnings2.innerText).toEqual(dispAvg);
    expect(earnings3.innerText).toEqual(dispAvg);

  });

  afterEach(function() {
    // teardown logic
    let serverTableRows = document.querySelectorAll("#serverTable > tbody > tr")
    for (serverRow of serverTableRows ) {
      serverRow.remove();
    }
    
    let paymentTableRows = document.querySelectorAll("#paymentTable > tbody > tr")
    for (paymentRow of paymentTableRows ) {
      paymentRow.remove();
    }

    for (summaryTd of summaryTds) {
      summaryTd.innerText = '';
    }

    //reset allServers object
    allServers = {};
    serverId = 0;

    //reset allPayments obj

    allPayments= {};
    paymentId = 0;

  });

});