console.log('loading');
//document.ready
$(document).ready(() => {
  const loadOrders = () => {
    //load data
    $.get('/admins')
    .then((response) => {
      console.log(response);
      renderOrders(response);
    });
  };


    const renderOrders = (orders) => {
      const $orderTable = $('#order-container');
      $orderTable.empty();

      for (const elements of orders) {
        console.log(elements);
        const $order = createOrderElement(elements);
        $orderTable.append($order);
      };
      //must have something in the ejs that this function can reference and manipulate
      //make a variable that references the item in the ejs file
      // empty the container
      //loop through the data
      //append each item to the div/article
      //calls createOrderElement

    };

    const createOrderElement = (order) => {
      console.log(order);
      const $orderElement = $(`
      <div class="orderDisplay">
              <p> ${order.id} </p>
              <p> ${order.order_time} </p>
              <p> $${order.total_cost} </p>
              <p> ${order.order_status} </p>
            </div>
      `);

      return $orderElement;

    };

    loadOrders();

});
