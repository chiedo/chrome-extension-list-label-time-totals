console.log("Trello List Label Time Totals.");

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

$(document).ready(function(){
  setInterval(function(){
    $('.js-list-content').each(function(){
      var labelRegex = /[0-9].(\s)*(minutes|minutes|min|m|hours|hour|h)/gi;
      var currentList = $(this);
      var listTitle = $(this).find('.list-header-name');
      var totalMinutes = 0;
      var timeLabelCount = 0;

      $(this).find('.card-label')
        .each(function(){
          var labelText = $(this).text()
          
          // Do nothing if the label doesn't contain a time duration
          if(labelText.match(labelRegex)) {
            timeLabelCount++;
            
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
          }
        });

      if(timeLabelCount > 0) {
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

        // Remove the old time string:
        currentList.find(".list-label-time-total").remove();
        
        // Add the new time string
        listTitle.after( '<span class="list-label-time-total" style="padding-left:8px;">'+finalString+'</span>' );
      }

    });
  }, 1000);
});
