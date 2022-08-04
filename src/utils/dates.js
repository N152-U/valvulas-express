const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  // eslint-disable-next-line arrow-body-style
  getDatesRange:(startDate, stopDate) =>{
    Date.prototype.addDays = function(days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
  }
  Date.prototype.subtractDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() - days);
    return date;
}
    let dateArray = new Array();
    let currentDate = (new Date(startDate)).addDays(1) ;
    let lastDate= (new Date(stopDate)) ;
    while (currentDate<= lastDate) {
        dateArray.push(new Date (currentDate));
        currentDate = currentDate.addDays(1);
    }
    console.log("mydates",dateArray)
    return dateArray;
}
  
};
