console.log("Trello List Label Time Totals.");

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

$(document).ready(function(){
  $('.js-list-content').each(function(){
    var listTitle = $(this).find('.list-header-name');
    var totalMinutes = 0;
    if(listTitle.text().endsWith("Time:")) {
      $(this).find('.card-label')
        .each(function(){
          var labelText = $(this).text()
            
          if(typeof labelText === 'string') {
            labelText = labelText.replaceAll("\\s","");

            if(
              labelText.startsWith("(") &&
              labelText.endsWith("m)")
            ) {
              // Convert minutes string into to int
              var minutes = parseInt(labelText.replace("(", "").replace("m)",""));
              totalMinutes += minutes;
            }
          }
        });

      var finalHours = Math.floor(totalMinutes / 60);
      var finalMinutes = totalMinutes % 60;
      var finalString = "";

      if(finalHours > 0) {
        finalString += finalHours + "h "
      }

      if(finalMinutes > 0) {
        finalString += finalMinutes + "m "
      }

      if(finalString === "") {
        finalString = "0m"
      }

      listTitle.text(listTitle.text() + " " + finalString);
    }

  });
});
