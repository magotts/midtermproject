console.log("hello world heyy");

$(function() {
  $('.qty').change(function() {
      let total = 0;

      $('.qty').each(function() {
          if( $(this).val() != '' )
              total += parseInt($(this).val());
      });

      $('.total').html(total);
  });
});
