console.log("Trello List Label Time Totals.");

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

$(document).ready(function(){
  setInterval(function(){
    $('.js-list-content').each(function(){
      var labelRegex = /([0-9|.]+(\s)*(minutes|minute|min|m|hours|hour|h))/gi;
      var currentList = $(this);
      var listTitle = $(this).find('.list-header-name');
      var totalMinutes = 0;
      var timeLabelCount = 0;
      
      $(this).find('.card-label')
        .each(function(){
          var labelText = $(this).text()
          var timeLabelArray = labelText.match(labelRegex);
          // Do nothing if the label doesn't contain a time duration
          if(timeLabelArray) {
            timeLabelCount++;
            
            
            var minutesRegex = /([0-9|.]+(\s)*(minutes|minute|min|m))/gi;
            var hoursRegex = /([0-9|.]+(\s)*(hours|hour|h))/gi;

            timeLabelArray.forEach(function(label){
              if(label.match(minutesRegex)) {
                // Convert minutes string into to int
                var minutes = parseInt(label);
                totalMinutes += minutes;
              } else if(label.match(hoursRegex)) {
                // Convert hours string into to int and then minutes
                var hours = parseInt(label);
                var minutes = hours*60;
                totalMinutes += minutes;
              }

            });

          }
        });
      
      // Remove the old time string
      currentList.find(".list-label-time-total").remove();

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
        
        // Add the new time string
        listTitle.after( '<span class="list-label-time-total" style="padding-left:8px;">'+finalString+'</span>' );
      }

    });
  }, 1000);
});
