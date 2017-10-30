module.exports.cron = {
  dayPresent: {
    schedule: '* 15 7 * * *',
    onTick: function () {
      var moment = require('moment');
      var date = moment(new Date()).format('l');
      Employee.find({shift: 'dayTime'}).populate('timein', {where: {date: date, logIn: { '<=': '7:15:00 am'}}, limit: 1}).exec(function(err, employee) {
      	
      	_.each(employee, function(value, index) {
      		

      		if(value.timein.length != 0) {

      			var data = {
	      			attendance_status: 'present',
	      			timeIn: value.timein[0].time,
	      			employee_id: value.id,
	      			date: value.timein[0].date,
	      			status: 'progress'
	      		};
	      		
      			Employee_Attendance.create(data).exec(function(err, employee) {
	      			console.log(employee);
	      		});
      		}
      		
      	});
      	sails.hooks.cron.jobs.dayPresent.stop();
      	sails.hooks.cron.jobs.dayLate.start();
      	sails.hooks.cron.jobs.dayAbsent.start();
      	sails.hooks.cron.jobs.dayEnd.start();
      });
    },
    onComplete: function() {
      console.log('I am triggering when job is complete');
      
    }
  },

  dayLate: {
    schedule: '00 30 7 * * *',
    onTick: function () {
      var moment = require('moment');
      var date = moment(new Date()).format('l');
      Employee.find({shift: 'dayTime'}).populate('timein', {where: {date: date, logIn: { '>' : '7:15:01 am', '<' : '8:29:59 am'}}, limit: 1}).exec(function(err, employee) {
      	console.log('absent');
      	console.log(employee);
      	_.each(employee, function(value, index) {
      		

      		if(value.timein.length != 0) {

      			var data = {
	      			attendance_status: 'late',
	      			timeIn: value.timein[0].time,
	      			employee_id: value.id,
	      			date: value.timein[0].date,
	      			status: 'progress'
	      		};

      			Employee_Attendance.findOrCreate({employee_id: value.id, date: value.timein[0].date, status: 'progress'}, data).exec(function(err, employee) {
	      			console.log(employee);
	      		});
      		}
      		
      	});
      	sails.hooks.cron.jobs.dayLate.stop();
      	sails.hooks.cron.jobs.dayPresent.start();
      	sails.hooks.cron.jobs.dayAbsent.start();
      	sails.hooks.cron.jobs.dayEnd.start();
      });
    },
    onComplete: function() {
      console.log('I am triggering when job is complete');
      
    }
  },
  dayAbsent: {
    schedule: '00 31 7 * * *',
    onTick: function () {
      var moment = require('moment');
      var date = moment(new Date()).format('l');
      Employee.find({shift: 'dayTime'}).populate('timein', {where: {date: date, time: { '>=': '7:30:00 am'}}, limit: 1}).exec(function(err, employee) {
      	console.log('absent');
      	console.log(employee);
      	_.each(employee, function(value, index) {
      		

      		
      		if(value.timein.length != 0) {
      			var data = {
	      			attendance_status: 'absent',
	      			//timeIn: value.timein[0].time,
              timeIn: 'absent',
              timeOut: 'absent',
	      			employee_id: value.id,
	      			date: date,
	      			status: 'progress'
	      		};

      			Employee_Attendance.findOrCreate({employee_id: value.id, date, status: 'progress'}, data).exec(function(err, employee) {
	      			console.log(employee);
	      		});
      		} else {
      			var data = {
	      			attendance_status: 'absent',
              timeIn: 'absent',
              timeOut: 'absent',
	      			employee_id: value.id,
	      			date: date,
	      			status: 'progress'
	      		};

      			Employee_Attendance.findOrCreate({employee_id: value.id, date, status: 'progress'}, data).exec(function(err, employee) {
	      			console.log(employee);
	      		});
      		}
      			
      		
      		
      	});
      	sails.hooks.cron.jobs.dayAbsent.stop();
        sails.hooks.cron.jobs.dayAbsent2.start();
      	sails.hooks.cron.jobs.dayLate.start();
      	sails.hooks.cron.jobs.dayPresent.start();
      	sails.hooks.cron.jobs.dayEnd.start();
      });
      		
    },
    onComplete: function() {
      console.log('I am triggering when job is complete');
      
    }
  },
  dayAbsent2: {
    schedule: '00 35 7 * * *',
    onTick: function () {
      var moment = require('moment');
      var date = moment(new Date()).format('l');
      Employee.find({shift: 'dayTime'}).populate('timein', {where: {date: date, time: { '>=': '8:30:00 am'}}, limit: 1}).exec(function(err, employee) {
      	console.log('absent');
      	console.log(employee);
      	_.each(employee, function(value, index) {
      		

      		
      		if(value.timein.length != 0) {
      			var data = {
	      			attendance_status: 'absent',
	      			timeIn: 'absent',
              timeOut: 'absent',
	      			employee_id: value.id,
	      			date: date,
	      			status: 'progress'
	      		};

      			Employee_Attendance.findOrCreate({employee_id: value.id, date, status: 'progress'}, data).exec(function(err, employee) {
	      			console.log(employee);
	      		});
      		} else {
      			var data = {
	      			attendance_status: 'absent',
              timeIn: 'absent',
              timeOut: 'absent',
	      			employee_id: value.id,
	      			date: date,
	      			status: 'progress'
	      		};

      			Employee_Attendance.findOrCreate({employee_id: value.id, date, status: 'progress'}, data).exec(function(err, employee) {
	      			console.log(employee);
	      		});
      		}
      			
      	});

      	Employee_Attendance.find({attendance_status: 'absent', date: date}).populate('employee_id').exec(function(err, employee) {
	      			console.log(employee);
      				sails.sockets.blast('absentReport', {status: 200, employee_ids: employee});

	      		});

      	
      	sails.hooks.cron.jobs.dayAbsent2.stop();
        sails.hooks.cron.jobs.dayAbsent.start();
      	sails.hooks.cron.jobs.dayLate.start();
      	sails.hooks.cron.jobs.dayPresent.start();
      	sails.hooks.cron.jobs.dayEnd.start();
      });
      		
    },
    onComplete: function() {
      console.log('I am triggering when job is complete');
      
    }
  },
  dayEnd: {
    schedule: '* 00 15 * * *',
    onTick: function () {
      var moment = require('moment');
      var date = moment(new Date()).format('l');
      Employee.find({shift: 'dayTime'}).populate('timein', {where: {date: date}, sort: 'id DESC',limit: 1}).exec(function(err, employee) {
      	
      	_.each(employee, function(value, index) {
      		

      		if(value.timein.length != 0) {

      			var data = {
	      			timeOut: value.timein[0].logOut,
	      			date: date,
	      			status: 'complete'
	      		};
	      		
      			Employee_Attendance.update({employee_id: value.id},data).exec(function(err, employee) {
	      			console.log(employee);
	      		});
      		} else {
      			var data = {
	      			//timeOut: "--:--",
	      			date: date,
	      			status: 'complete'
	      		};
	      		
      			Employee_Attendance.update({employee_id: value.id},data).exec(function(err, employee) {
	      			console.log(employee);
	      		});
      		}
      		
      	});
      	sails.hooks.cron.jobs.dayEnd.stop();
      	sails.hooks.cron.jobs.dayPresent.start();
      	sails.hooks.cron.jobs.dayLate.start();
      	sails.hooks.cron.jobs.dayAbsent.start();
      	sails.hooks.cron.jobs.dayEnd2.start();
      });
    },
    onComplete: function() {
      console.log('I am triggering when job is complete');
      
    }
  },
  dayEnd2: {
    schedule: '* 59 23 * * *',
    onTick: function () {
      var moment = require('moment');
      var date = moment(new Date()).format('l');
      Employee.find({shift: 'dayTime'}).populate('timein', {where: {date: date}, sort: 'id DESC',limit: 1}).exec(function(err, employee) {
      	
      	_.each(employee, function(value, index) {
      		

      		if(value.timein.length != 0) {

      			var data = {
	      			timeOut: value.timein[0].logOut,
	      			date: date,
	      			status: 'complete'
	      		};
	      		
      			Employee_Attendance.update({employee_id: value.id},data).exec(function(err, employee) {
	      			console.log(employee);
	      		});
      		} else {
      			var data = {
	      			timeOut: "--:--",
	      			date: date,
	      			status: 'complete'
	      		};
	      		
      			Employee_Attendance.update({employee_id: value.id},data).exec(function(err, employee) {
	      			console.log(employee);
	      		});
      		}
      		
      	});
      	sails.hooks.cron.jobs.dayEnd2.stop();
      	sails.hooks.cron.jobs.dayEnd.start();
      	sails.hooks.cron.jobs.dayPresent.start();
      	sails.hooks.cron.jobs.dayLate.start();
      	sails.hooks.cron.jobs.dayAbsent.start();
      });
    },
    onComplete: function() {
      console.log('I am triggering when job is complete');
      
    }
  }
};