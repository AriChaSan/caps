module.exports.cron = {
  myFirstJob: {
    schedule: '* * * * * *',
    onTick: function () {
      /*Employee.find().exec(function(err, employee) {
      	console.log(employee)
      });*/
    }
  }
};