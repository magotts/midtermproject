
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

      const tableContent =`<tr>
            <td> ${order.id} </td>
            <td> ${order.order_time} </td>
            <td> $${order.total_cost} </td>
            <td> ${order.order_status} </td>
            <td> ${order.order_status === "new" ? "<button class='btn-success accept-order' data-id=" + order.id + ">ACCEPT</button> <button class='btn-danger decline-order' data-id=" + order.id + ">DECLINE</button>" : ""}

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

//when accept order button is clicked
  $(document).on("click", '.accept-order', (event) => {
    event.preventDefault();
    const buttonId = event.target.dataset.id;
    // $(`button[data-id=${buttonId}]`).hide();
    $(`button[data-id=${buttonId}]`).replaceWith(`<form class='time'> <label>Order Will be Ready for Pickup At...</label><input type='text' name='estimatedTime'></form>`);
    //then, show the input form for order time

  });

//when decline order button is clicked
  $(document).on("click", '.decline-order', (event) => {
    event.preventDefault();
    const buttonId = event.target.dataset.id;
    $(`button[data-id=${buttonId}]`).hide().replaceWith(`<p class="declined-message">Order Declined</p>`);
    //grey out entire row
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
