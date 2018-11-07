console.log("Trello List Label Time Totals.");

$(document).ready(function(){
  console.dir($);
  console.dir(jQuery);
  $('.js-list-content').each(function(){
    var listTitle = $(this).find('.list-header-name-assist');

    var timeCount;

    if(listTitle.text().endsWith("Time :")) {
      $(this).find('.js-list-content .list-cards .list-card .list-card-labels .card-label')
        .each(function(){
          console.dir($(this).text());
        });
    }
  });
});
