
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
            <td> ${order.order_status === "new" ? "<button class='btn-success accept-order'>ACCEPT</button> <button class='btn-danger decline-order'>DECLINE</button>" : ""}
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


  $('.accept-order').on("click", (event) => {
    console.log('hello accept button');
    event.preventDefault();
    $(".accept-order").hide();
  });

    loadOrders();

});
