
//document.ready
$(() => {
  console.log('doc ready');

  const loadOrders = () => {
    //load data
    $.get('/admins/orders')
    .done((response) => {
      console.log(response)
      renderOrders(response)
    })
    .fail((error) => {
      console.log('error in admins.js get');
    });
  };

  const createOrderElement = (order) => {

      const tableContent =`<tr class="order-row">
            <td> ${order.id} </td>
            <td> ${order.order_time} </td>
            <td> $${order.total_cost} </td>
            <td> ${order.order_status} </td>
            <td> ${order.order_status === "new" ? "<div class='admin-button-container' data-id=" + order.id + "><button class='btn-success accept-order' data-id=" + order.id + ">ACCEPT</button> <button class='btn-danger decline-order' data-id=" + order.id + ">DECLINE</button></div>" : ""}

             ${order.order_status === "accepted" ?
            "<form class='time'> <input type='text' name='estimatedTime'></form>" : ""}</td>
            </tr>`

            const $orderElement = $(tableContent) ;


    return $orderElement;

  };

    const renderOrders = (orders) => {
      const $orderTable = $("#order-container");
      $orderTable.empty();

      for (const elements of orders) {
        const $order = createOrderElement(elements);
        $orderTable.append($order);

      };

    };

    // `button[data-id=${buttonId}]`
//when accept order button is clicked
  $(document).on("click", '.accept-order', (event) => {
    event.preventDefault();
    const buttonId = event.target.dataset.id;
    // $(`button[data-id=${buttonId}]`).hide();
    $(`div[data-id=${buttonId}]`).replaceWith(`<form class='time'>
    <label>Order Ready By</label>
    <input type='text' name='estimatedTime' placeholder='hr:min'><button class="btn-sm btn-outline-success">Submit</button></form>`);
    //call change status function to change the order_status once accepted
    changeStatus(buttonId);
  });

//when time entered in form, send num to db
  //extract orderid and form content
  //post request
  //add to db
  (` `)



  //create function to change order_status on click
  const changeStatus = (buttonId) => {
    $.get('/admins/data')
    .done((response) => {
      for(const order of response) {
        if(order.id === buttonId) {
          order.order_status = 'accepted';
          //make change of status visible in document
        }
      }
    })

  }

//when decline order button is clicked
  $(document).on("click", '.decline-order', (event) => {
    event.preventDefault();
    const buttonId = event.target.dataset.id;
    $(`div[data-id=${buttonId}]`).replaceWith(`<p class="declined-message">Order Declined</p>`);
  });

  $("form .time").on('submit', (event) => {
    event.preventDefault();

    const $time = $this.serialize();

    console.log($time);
    // $.post("/admins", $time).then(() => { });
  // send form data to API to be sent to client as SMS

    });


    loadOrders();

});
