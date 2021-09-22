// const sendSms = require('../../twilio');

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
            "<p>Order In Progress</p> <button class='btn btn-outline-info'>Complete Order</button>" : ""}</td>


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
    $(`div[data-id=${buttonId}]`).replaceWith(`<form data-id=${buttonId} id='order-time-${buttonId}' class='preparation-time'>
    <label>Order Ready In </label>
    <input type='text' name='estimatedTime' placeholder='minutes'><button class="btn-sm btn-outline-success submit-time">Submit</button></form>`);
    //call change status function to change the order_status once accepted
  });


// $(document).on('submit', '.preparation-time', function (event) {
//   event.preventDefault();
//   console.log('submit form 2');
// })

$(document).on('submit', '.preparation-time', function(event) {
    console.log('form submission');
    event.preventDefault();
    //const data = this.serialize(); // This will cause issues because this is not defined the same with arrow
    const data = $(this).serialize();
    const orderId = ($(this).data('id'));
    console.log('data:', data);

    $.post('/admins/orders/' + orderId, data)
    .then((response) => {
      //response is estimated_time
      const duration = (response.rows[0].order_estimation);
      // return sendSms(response);

      //pass response to the api function
      //get the object that matches the order id of the clicked order on admins page
      //enter the value from the text form into db under orders.estimated_time where id = orderId
    })

  });


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
