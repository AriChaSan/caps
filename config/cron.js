module.exports.cron = {
  dayLeave: {
    schedule: '* 00 00 * * *',
    onTick: function () {
      var moment = require('moment');
      var date = new Date;
      var day = date.getDay();
      var weekday = new Array(7);
      weekday[0] = 'sunday';
      weekday[1] = 'monday';
      weekday[2] = 'tuesday';
      weekday[3] = 'wednesday';
      weekday[4] = 'thursday';
      weekday[5] = 'friday';
      weekday[6] = 'saturday';

      Employee.find({shift: 'dayTime'}).populate('schedule').populate('leave', {status: 'accepted'}).exec(function(err, employee) {
        
        _.each(employee, function(value, index) {

          if(value.leave.length != 0) {

            var leaveWeekDay = [];
            var dateFrom = new Date(value.leave[0].date_from);
            var dateFromFirstDay = new Date(dateFrom.getFullYear(), dateFrom.getMonth(), 1);
            var dateFromLastDay = new Date(dateFrom.getFullYear(), dateFrom.getMonth() + 1, 0);

            var dateTo = new Date(value.leave[0].date_to);
            var dateToFirstDay = new Date(dateTo.getFullYear(), dateTo.getMonth(), 1);
            var dateToLastDay = new Date(dateTo.getFullYear(), dateTo.getMonth() + 1, 0);

            var dateRange = 0;
            if(dateFrom.getFullYear() == dateTo.getFullYear()) {

              if(dateFrom.getMonth() == dateTo.getMonth()) {
                dateRange = Math.abs(dateTo.getDate() - dateFrom.getDate());
              }

              if(dateFrom.getMonth() < dateTo.getMonth()) {
                var dateFromRange = Math.abs(dateFrom.getDate() - dateFromLastDay.getDate());
                var dateToRange = Math.abs(dateTo.getDate() - dateToFirstDay.getDate());

                console.log(dateFromRange);
                console.log(dateToRange);
                dateRange = Math.abs(dateToRange + dateFromRange);
              }
            }

            console.log(dateRange);
            console.log(moment(dateFrom).format('l'));
            console.log(moment(dateFromFirstDay).format('l'));
            console.log(moment(dateFromLastDay).format('l'));
            console.log(moment(dateTo).format('l'));
            console.log(moment(dateToFirstDay).format('l'));
            console.log(moment(dateToLastDay).format('l'));
          }
        });
        
        sails.hooks.cron.jobs.dayLeave.stop();
      });
    },
    onComplete: function() {
      console.log('I am triggering when job is complete');
      
    }
  },

  dayOff: {
    schedule: '* 00 7 * * *',
    onTick: function () {
      var moment = require('moment');
      var date = new Date;
      var day = date.getDay();
      var weekday = new Array(7);
      weekday[0] = 'sunday';
      weekday[1] = 'monday';
      weekday[2] = 'tuesday';
      weekday[3] = 'wednesday';
      weekday[4] = 'thursday';
      weekday[5] = 'friday';
      weekday[6] = 'saturday';

      Employee.find({shift: 'dayTime'}).populate('schedule').exec(function(err, employee) {
        
        _.each(employee, function(value, index) {
            
            console.log(value.schedule[0][weekday[day]]);

            if(value.schedule[0][weekday[day]] == 'off') {
              var data = {
                attendance_status: 'dayoff',
                timeIn: 'dayoff',
                timeOut: 'dayoff',
                employee_id: value.id,
                date: moment(date).format('l'),
                status: 'progress'
              };
              
              Employee_Attendance.findOrCreate(data).exec(function(err, employee) {
                console.log(employee);
              });
            } else if(value.schedule[0][weekday[day]] == 'leave') {
              var data = {
                attendance_status: 'leave',
                timeIn: 'leave',
                timeOut: 'leave',
                employee_id: value.id,
                date: moment(date).format('l'),
                status: 'progress'
              };
              
              Employee_Attendance.findOrCreate(data).exec(function(err, employee) {
                console.log(employee);
              });
            }
          });
        
        sails.hooks.cron.jobs.dayOff.stop();
      });
    },
    onComplete: function() {
      console.log('I am triggering when job is complete');
      
    }
  },
  dayPresent: {
    schedule: '* 15 7 * * *',
    onTick: function () {
      var moment = require('moment');
      var date = moment(new Date()).format('l');
      Employee.find({shift: 'dayTime'}).populate('timein', {where: {date: date, logIn: { '<=': '7:15:00 am'}}, limit: 1}).exec(function(err, employee) {
      	
      	_.each(employee, function(value, index) {
      		

      		if(value.timein.length != 0) {

             var late = null;
            if('7:00 am' < value.timein[0].logIn) {
              var shift = ['7', '00'];
              var logIn = value.timein[0].logIn.split(' ');
              logIn = logIn[0].split(':');

              var hour = Math.abs(logIn[0] - shift[0]);
              hour = (hour == '0') ? '00': hour;
              var minutes = Math.abs(logIn[1] - shift[1]);

              late = minutes;
            }

      			var data = {
	      			attendance_status: 'present',
	      			timeIn: value.timein[0].logIn,
              late: late,
	      			employee_id: value.id,
	      			date: value.timein[0].date,
	      			status: 'progress'
	      		};
	      		
      			Employee_Attendance.find({date: date, employee_id: value.id}).exec(function(err, employee) {

              if(employee.length == 0) {
                Employee_Attendance.create(data).exec(function(err, employee) {
                  console.log(employee);
                });
              }
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
      Employee.find({shift: 'dayTime'}).populate('timein', {where: {date: date, logIn: { '>' : '7:15:01 am', '<' : '7:29:59 am'}}, limit: 1}).exec(function(err, employee) {
      	console.log('absent');
      	console.log(employee);
      	_.each(employee, function(value, index) {
      		

      		if(value.timein.length != 0) {

            var late = null;
            if('7:00 am' < value.timein[0].logIn) {
              var shift = ['7', '00'];
              var logIn = value.timein[0].logIn.split(' ');
              logIn = logIn[0].split(':');

              var hour = Math.abs(logIn[0] - shift[0]);
              hour = (hour == '0') ? '00': hour;
              var minutes = Math.abs(logIn[1] - shift[1]);

              late = minutes;
            }

      			var data = {
	      			attendance_status: 'late',
	      			timeIn: value.timein[0].time,
              late:late,
	      			employee_id: value.id,
	      			date: value.timein[0].date,
	      			status: 'progress'
	      		};

      			Employee_Attendance.find({date: date, employee_id: value.id}).exec(function(err, employee) {

              if(employee.length == 0) {
                Employee_Attendance.create(data).exec(function(err, employee) {
                  console.log(employee);
                });
              }
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

      			Employee_Attendance.find({date: date, employee_id: value.id}).exec(function(err, employee) {

              if(employee.length == 0) {
                Employee_Attendance.create(data).exec(function(err, employee) {
                  console.log(employee);
                });
              }
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

      			Employee_Attendance.find({date: date, employee_id: value.id}).exec(function(err, employee) {

              if(employee.length == 0) {
                Employee_Attendance.create(data).exec(function(err, employee) {
                  console.log(employee);
                });
              }
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
      Employee.find({shift: 'dayTime'}).populate('timein', {where: {date: date, time: { '>=': '7:30:00 am'}}, limit: 1}).exec(function(err, employee) {
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

      			Employee_Attendance.find({date: date, employee_id: value.id}).exec(function(err, employee) {

              if(employee.length == 0) {
                Employee_Attendance.create(data).exec(function(err, employee) {
                  console.log(employee);
                });
              }
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

      			Employee_Attendance.find({date: date, employee_id: value.id}).exec(function(err, employee) {

              if(employee.length == 0) {
                Employee_Attendance.create(data).exec(function(err, employee) {
                  console.log(employee);
                });
              }
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

            var overtime = null;
            var workhours = null;
            var undertime = null;
            var late = null;
            if('7:00 am' < value.timein[0].logIn) {
              var shift = ['7', '00'];
              var logIn = value.timein[0].logIn.split(' ');
              logIn = logIn[0].split(':');

              var hour = Math.abs(logIn[0] - shift[0]);
              hour = (hour == '0') ? '00': hour;
              var minutes = Math.abs(logIn[1] - shift[1]);

              late = hour + ':' + minutes;
            }

            if('3:00 pm' < value.timein[0].logOut) {
              var shift = ['3', '00'];
              var logOut = value.timein[0].logOut.split(' ');
              logOut = logOut[0].split(':');

              var hour = Math.abs(logOut[0] - shift[0]);
              hour = (hour == '0') ? '00': hour;
              var minutes = Math.abs(logOut[1] - shift[1]);

              overtime = minutes;
            }

            var timeIn1 = value.timein[0].logIn.split(':');
              var timeOut1 = value.timein[0].logOut.split(':');
              workhours = Math.abs(Number(timeIn1[0]) - Math.abs(Number(timeOut1[0]) + 12));
              workhours -= 1;

            if('7:00 am' < value.timein[0].logIn && '3:00 pm' > value.timein[0].logOut) {
              var timeIn = value.timein[0].logIn.split(' ');
              timeIn = timeIn[0].split(':');
              var timeOut = value.timein[0].logOut.split(' ');
              timeOut = timeOut[0].split(':');
              var late1 = (late == null) ? 0 : late.split(':');
              undertime = Number(((late1.length == 0) ? 0 : late1[1])) + Number(Math.abs(Number(timeOut[1]) - 60));
            }

      			var data = {
	      			timeOut: value.timein[0].logOut,
              overtime: overtime,
              workhours: workhours,
              undertime: undertime,
	      			//date: date,
	      			status: 'complete'
	      		};
	      		
      			Employee_Attendance.update({employee_id: value.id},data).exec(function(err, employee) {
	      			console.log(employee);
	      		});
      		} else {
      			var data = {
	      			//timeOut: "--:--",
	      			//date: date,
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

      			var overtime = null;
            if('3:00 pm' < value.timein[0].logOut) {
              var shift = ['3', '00'];
              var logOut = value.timein[0].logOut.split(' ');
              logOut = logOut[0].split(':');

              var hour = Math.abs(logOut[0] - shift[0]);
              hour = (hour == '0') ? '00': hour;
              var minutes = Math.abs(logOut[1] - shift[1]);

              overtime = hour + ':' + minutes;
            }

            var data = {
              timeOut: value.timein[0].logOut,
              overtime: overtime,
              //date: date,
              status: 'complete'
            };
	      		
      			Employee_Attendance.update({employee_id: value.id},data).exec(function(err, employee) {
	      			console.log(employee);
	      		});
      		} else {
      			var data = {
	      			//timeOut: "--:--",
	      			//date: date,
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
  },

  swingPresent: {
    schedule: '* 15 15 * * *',
    onTick: function () {
      var moment = require('moment');
      var date = moment(new Date()).format('l');
      Employee.find({shift: 'swingTime'}).populate('timein', {where: {date: date, logIn: { '<=': '3:15:00 pm'}}, limit: 1}).exec(function(err, employee) {
        
        _.each(employee, function(value, index) {
          

          if(value.timein.length != 0) {

            var late = null;
            if('3:00 pm' < value.timein[0].logIn) {
              var shift = ['3', '00'];
              var logIn = value.timein[0].logIn.split(' ');
              logIn = logIn[0].split(':');

              var hour = Math.abs(logIn[0] - shift[0]);
              hour = (hour == '0') ? '00': hour;
              var minutes = Math.abs(logIn[1] - shift[1]);

              late = hour + ':' + minutes;
            }

            var data = {
              attendance_status: 'present',
              timeIn: value.timein[0].logIn,
              late: late,
              employee_id: value.id,
              date: value.timein[0].date,
              status: 'progress'
            };
            
            Employee_Attendance.find({date: date, employee_id: value.id}).exec(function(err, employee) {

              if(employee.length == 0) {
                Employee_Attendance.create(data).exec(function(err, employee) {
                  console.log(employee);
                });
              }
            });
          }
          
        });
        sails.hooks.cron.jobs.swingPresent.stop();
        sails.hooks.cron.jobs.swingLate.start();
        sails.hooks.cron.jobs.swingAbsent.start();
        sails.hooks.cron.jobs.swingEnd.start();
      });
    },
    onComplete: function() {
      console.log('I am triggering when job is complete');
      
    }
  },

  swingLate: {
    schedule: '00 30 7 * * *',
    onTick: function () {
      var moment = require('moment');
      var date = moment(new Date()).format('l');
      Employee.find({shift: 'swingTime'}).populate('timein', {where: {date: date, logIn: { '>' : '3:15:01 pm', '<' : '3:29:59 pm'}}, limit: 1}).exec(function(err, employee) {
        console.log('absent');
        console.log(employee);
        _.each(employee, function(value, index) {
          

          if(value.timein.length != 0) {

            var late = null;
            if('3:00 pm' < value.timein[0].logIn) {
              var shift = ['3', '00'];
              var logIn = value.timein[0].logIn.split(' ');
              logIn = logIn[0].split(':');

              var hour = Math.abs(logIn[0] - shift[0]);
              hour = (hour == '0') ? '00': hour;
              var minutes = Math.abs(logIn[1] - shift[1]);

              late = hour + ':' + minutes;
            }

            var data = {
              attendance_status: 'late',
              timeIn: value.timein[0].time,
              late:late,
              employee_id: value.id,
              date: value.timein[0].date,
              status: 'progress'
            };

            Employee_Attendance.find({date: date, employee_id: value.id}).exec(function(err, employee) {

              if(employee.length == 0) {
                Employee_Attendance.create(data).exec(function(err, employee) {
                  console.log(employee);
                });
              }
            });
          }
          
        });
        sails.hooks.cron.jobs.swingLate.stop();
        sails.hooks.cron.jobs.swingPresent.start();
        sails.hooks.cron.jobs.swingAbsent.start();
        sails.hooks.cron.jobs.swingEnd.start();
      });
    },
    onComplete: function() {
      console.log('I am triggering when job is complete');
      
    }
  },
  swingAbsent: {
    schedule: '00 31 15 * * *',
    onTick: function () {
      var moment = require('moment');
      var date = moment(new Date()).format('l');
      Employee.find({shift: 'swingTime'}).populate('timein', {where: {date: date, time: { '>=': '3:30:00 pm'}}, limit: 1}).exec(function(err, employee) {
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

            Employee_Attendance.find({date: date, employee_id: value.id}).exec(function(err, employee) {

              if(employee.length == 0) {
                Employee_Attendance.create(data).exec(function(err, employee) {
                  console.log(employee);
                });
              }
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

            Employee_Attendance.find({date: date, employee_id: value.id}).exec(function(err, employee) {

              if(employee.length == 0) {
                Employee_Attendance.create(data).exec(function(err, employee) {
                  console.log(employee);
                });
              }
            });
          }
            
          
          
        });
        sails.hooks.cron.jobs.swingAbsent.stop();
        sails.hooks.cron.jobs.swingAbsent2.start();
        sails.hooks.cron.jobs.swingLate.start();
        sails.hooks.cron.jobs.swingPresent.start();
        sails.hooks.cron.jobs.swingEnd.start();
      });
          
    },
    onComplete: function() {
      console.log('I am triggering when job is complete');
      
    }
  },
  swingAbsent2: {
    schedule: '00 35 15 * * *',
    onTick: function () {
      var moment = require('moment');
      var date = moment(new Date()).format('l');
      Employee.find({shift: 'swingTime'}).populate('timein', {where: {date: date, time: { '>=': '3:30:00 pm'}}, limit: 1}).exec(function(err, employee) {
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

            Employee_Attendance.find({date: date, employee_id: value.id}).exec(function(err, employee) {

              if(employee.length == 0) {
                Employee_Attendance.create(data).exec(function(err, employee) {
                  console.log(employee);
                });
              }
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

            Employee_Attendance.find({date: date, employee_id: value.id}).exec(function(err, employee) {

              if(employee.length == 0) {
                Employee_Attendance.create(data).exec(function(err, employee) {
                  console.log(employee);
                });
              }
            });
          }
            
        });

        Employee_Attendance.find({attendance_status: 'absent', date: date}).populate('employee_id').exec(function(err, employee) {
              console.log(employee);
              sails.sockets.blast('absentReport', {status: 200, employee_ids: employee});

            });

        
        sails.hooks.cron.jobs.swingAbsent2.stop();
        sails.hooks.cron.jobs.swingAbsent.start();
        sails.hooks.cron.jobs.swingLate.start();
        sails.hooks.cron.jobs.swingPresent.start();
        sails.hooks.cron.jobs.swingEnd.start();
      });
          
    },
    onComplete: function() {
      console.log('I am triggering when job is complete');
      
    }
  },
  swingEnd: {
    schedule: '* 00 23 * * *',
    onTick: function () {
      var moment = require('moment');
      var date = moment(new Date()).format('l');
      Employee.find({shift: 'swingTime'}).populate('timein', {where: {date: date}, sort: 'id DESC',limit: 1}).exec(function(err, employee) {
        
        _.each(employee, function(value, index) {
          

            if(value.timein.length != 0) {

            var overtime = null;
            if('11:00 pm' < value.timein[0].logOut) {
              var shift = ['11', '00'];
              var logOut = value.timein[0].logOut.split(' ');
              logOut = logOut[0].split(':');

              var hour = Math.abs(logOut[0] - shift[0]);
              hour = (hour == '0') ? '00': hour;
              var minutes = Math.abs(logOut[1] - shift[1]);

              overtime = hour + ':' + minutes;
            }

            var data = {
              timeOut: value.timein[0].logOut,
              overtime: overtime,
              //date: date,
              status: 'complete'
            };
            
            Employee_Attendance.update({employee_id: value.id},data).exec(function(err, employee) {
              console.log(employee);
            });
          } else {
            var data = {
              //timeOut: "--:--",
              //date: date,
              status: 'complete'
            };
            
            Employee_Attendance.update({employee_id: value.id},data).exec(function(err, employee) {
              console.log(employee);
            });
          }
          
        });
        sails.hooks.cron.jobs.swingEnd.stop();
        sails.hooks.cron.jobs.swingPresent.start();
        sails.hooks.cron.jobs.swingLate.start();
        sails.hooks.cron.jobs.swingAbsent.start();
        sails.hooks.cron.jobs.swingEnd2.start();
      });
    },
    onComplete: function() {
      console.log('I am triggering when job is complete');
      
    }
  },
  swingEnd2: {
    schedule: '* 59 23 * * *',
    onTick: function () {
      var moment = require('moment');
      var date = moment(new Date()).format('l');
      Employee.find({shift: 'swingTime'}).populate('timein', {where: {date: date}, sort: 'id DESC',limit: 1}).exec(function(err, employee) {
        
        _.each(employee, function(value, index) {
          

          if(value.timein.length != 0) {

            var overtime = null;
            if('11:00 pm' < value.timein[0].logOut) {
              var shift = ['11', '00'];
              var logOut = value.timein[0].logOut.split(' ');
              logOut = logOut[0].split(':');

              var hour = Math.abs(logOut[0] - shift[0]);
              hour = (hour == '0') ? '00': hour;
              var minutes = Math.abs(logOut[1] - shift[1]);

              overtime = hour + ':' + minutes;
            }

            var data = {
              timeOut: value.timein[0].logOut,
              overtime: overtime,
              //date: date,
              status: 'complete'
            };
            
            Employee_Attendance.update({employee_id: value.id},data).exec(function(err, employee) {
              console.log(employee);
            });
          } else {
            var data = {
              //timeOut: "--:--",
              //date: date,
              status: 'complete'
            };
            
            Employee_Attendance.update({employee_id: value.id},data).exec(function(err, employee) {
              console.log(employee);
            });
          }
          
        });
        sails.hooks.cron.jobs.swingEnd2.stop();
        sails.hooks.cron.jobs.swingEnd.start();
        sails.hooks.cron.jobs.swingPresent.start();
        sails.hooks.cron.jobs.swingLate.start();
        sails.hooks.cron.jobs.swingAbsent.start();
      });
    },
    onComplete: function() {
      console.log('I am triggering when job is complete');
      
    }
  },

  graveyardPresent: {
    schedule: '* 15 23 * * *',
    onTick: function () {
      var moment = require('moment');
      var date = moment(new Date()).format('l');
      Employee.find({shift: 'graveyardTime'}).populate('timein', {where: {date: date, logIn: { '<=': '11:15:00 pm'}}, limit: 1}).exec(function(err, employee) {
        
        _.each(employee, function(value, index) {
          

          if(value.timein.length != 0) {

            var late = null;
            if('11:00 pm' < value.timein[0].logIn) {
              var shift = ['11', '00'];
              var logIn = value.timein[0].logIn.split(' ');
              logIn = logIn[0].split(':');

              var hour = Math.abs(logIn[0] - shift[0]);
              hour = (hour == '0') ? '00': hour;
              var minutes = Math.abs(logIn[1] - shift[1]);

              late = hour + ':' + minutes;
            }

            var data = {
              attendance_status: 'present',
              timeIn: value.timein[0].time,
              late: late,
              employee_id: value.id,
              date: value.timein[0].date,
              status: 'progress'
            };
            
            Employee_Attendance.find({date: date, employee_id: value.id}).exec(function(err, employee) {

              if(employee.length == 0) {
                Employee_Attendance.create(data).exec(function(err, employee) {
                  console.log(employee);
                });
              }
            });
          }
          
        });
        sails.hooks.cron.jobs.graveyardPresent.stop();
        sails.hooks.cron.jobs.graveyardLate.start();
        sails.hooks.cron.jobs.graveyardAbsent.start();
        sails.hooks.cron.jobs.graveyardEnd.start();
      });
    },
    onComplete: function() {
      console.log('I am triggering when job is complete');
      
    }
  },

  graveyardLate: {
    schedule: '00 30 23 * * *',
    onTick: function () {
      var moment = require('moment');
      var date = moment(new Date()).format('l');
      Employee.find({shift: 'graveyardTime'}).populate('timein', {where: {date: date, logIn: { '>' : '11:15:01 pm', '<' : '11:29:59 pm'}}, limit: 1}).exec(function(err, employee) {
        console.log('absent');
        console.log(employee);
        _.each(employee, function(value, index) {
          

          if(value.timein.length != 0) {

            var late = null;
            if('11:00 pm' < value.timein[0].logIn) {
              var shift = ['11', '00'];
              var logIn = value.timein[0].logIn.split(' ');
              logIn = logIn[0].split(':');

              var hour = Math.abs(logIn[0] - shift[0]);
              hour = (hour == '0') ? '00': hour;
              var minutes = Math.abs(logIn[1] - shift[1]);

              late = hour + ':' + minutes;
            }

            var data = {
              attendance_status: 'late',
              timeIn: value.timein[0].time,
              late:late,
              employee_id: value.id,
              date: value.timein[0].date,
              status: 'progress'
            };

            Employee_Attendance.find({date: date, employee_id: value.id}).exec(function(err, employee) {

              if(employee.length == 0) {
                Employee_Attendance.create(data).exec(function(err, employee) {
                  console.log(employee);
                });
              }
            });
          }
          
        });
        sails.hooks.cron.jobs.graveyardLate.stop();
        sails.hooks.cron.jobs.graveyardPresent.start();
        sails.hooks.cron.jobs.graveyardAbsent.start();
        sails.hooks.cron.jobs.graveyardEnd.start();
      });
    },
    onComplete: function() {
      console.log('I am triggering when job is complete');
      
    }
  },
  graveyardAbsent: {
    schedule: '00 31 23 * * *',
    onTick: function () {
      var moment = require('moment');
      var date = moment(new Date()).format('l');
      Employee.find({shift: 'graveyardTime'}).populate('timein', {where: {date: date, time: { '>=': '11:30:00 pm'}}, limit: 1}).exec(function(err, employee) {
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

            Employee_Attendance.find({date: date, employee_id: value.id}).exec(function(err, employee) {

              if(employee.length == 0) {
                Employee_Attendance.create(data).exec(function(err, employee) {
                  console.log(employee);
                });
              }
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

            Employee_Attendance.find({date: date, employee_id: value.id}).exec(function(err, employee) {

              if(employee.length == 0) {
                Employee_Attendance.create(data).exec(function(err, employee) {
                  console.log(employee);
                });
              }
            });
          }
            
          
          
        });
        sails.hooks.cron.jobs.graveyardAbsent.stop();
        sails.hooks.cron.jobs.graveyardAbsent2.start();
        sails.hooks.cron.jobs.graveyardLate.start();
        sails.hooks.cron.jobs.graveyardPresent.start();
        sails.hooks.cron.jobs.graveyardEnd.start();
      });
          
    },
    onComplete: function() {
      console.log('I am triggering when job is complete');
      
    }
  },
  graveyardAbsent2: {
    schedule: '00 35 23 * * *',
    onTick: function () {
      var moment = require('moment');
      var date = moment(new Date()).format('l');
      Employee.find({shift: 'graveyardTime'}).populate('timein', {where: {date: date, time: { '>=': '11:30:00pm'}}, limit: 1}).exec(function(err, employee) {
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

            Employee_Attendance.find({date: date, employee_id: value.id}).exec(function(err, employee) {

              if(employee.length == 0) {
                Employee_Attendance.create(data).exec(function(err, employee) {
                  console.log(employee);
                });
              }
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

            Employee_Attendance.find({date: date, employee_id: value.id}).exec(function(err, employee) {

              if(employee.length == 0) {
                Employee_Attendance.create(data).exec(function(err, employee) {
                  console.log(employee);
                });
              }
            });
          }
            
        });

        Employee_Attendance.find({attendance_status: 'absent', date: date}).populate('employee_id').exec(function(err, employee) {
              console.log(employee);
              sails.sockets.blast('absentReport', {status: 200, employee_ids: employee});

            });

        
        sails.hooks.cron.jobs.graveyardAbsent2.stop();
        sails.hooks.cron.jobs.graveyardAbsent.start();
        sails.hooks.cron.jobs.graveyardLate.start();
        sails.hooks.cron.jobs.graveyardPresent.start();
        sails.hooks.cron.jobs.graveyardEnd.start();
      });
          
    },
    onComplete: function() {
      console.log('I am triggering when job is complete');
      
    }
  },
  graveyardEnd: {
    schedule: '* 00 7 * * *',
    onTick: function () {
      var moment = require('moment');
      var date = moment(new Date()).format('l');
      Employee.find({shift: 'graveyardTime'}).populate('timein', {where: {date: date}, sort: 'id DESC',limit: 1}).exec(function(err, employee) {
        
        _.each(employee, function(value, index) {
          

          if(value.timein.length != 0) {

            var overtime = null;
            if('7:00 am' < value.timein[0].logOut) {
              var shift = ['7', '00'];
              var logOut = value.timein[0].logOut.split(' ');
              logOut = logOut[0].split(':');

              var hour = Math.abs(logOut[0] - shift[0]);
              hour = (hour == '0') ? '00': hour;
              var minutes = Math.abs(logOut[1] - shift[1]);

              overtime = hour + ':' + minutes;
            }

            var data = {
              timeOut: value.timein[0].logOut,
              overtime: overtime,
              //date: date,
              status: 'complete'
            };
            
            Employee_Attendance.update({employee_id: value.id},data).exec(function(err, employee) {
              console.log(employee);
            });
          } else {
            var data = {
              //timeOut: "--:--",
              //date: date,
              status: 'complete'
            };
            
            Employee_Attendance.update({employee_id: value.id},data).exec(function(err, employee) {
              console.log(employee);
            });
          }
          
        });
        sails.hooks.cron.jobs.graveyardEnd.stop();
        sails.hooks.cron.jobs.graveyardPresent.start();
        sails.hooks.cron.jobs.graveyardLate.start();
        sails.hooks.cron.jobs.graveyardAbsent.start();
        sails.hooks.cron.jobs.graveyardEnd2.start();
      });
    },
    onComplete: function() {
      console.log('I am triggering when job is complete');
      
    }
  },
  graveyardEnd2: {
    schedule: '* 59 11 * * *',
    onTick: function () {
      var moment = require('moment');
      var date = moment(new Date()).format('l');
      Employee.find({shift: 'graveyardTime'}).populate('timein', {where: {date: date}, sort: 'id DESC',limit: 1}).exec(function(err, employee) {
        
        _.each(employee, function(value, index) {
          

          if(value.timein.length != 0) {

            var overtime = null;
            if('7:00 am' < value.timein[0].logOut) {
              var shift = ['7', '00'];
              var logOut = value.timein[0].logOut.split(' ');
              logOut = logOut[0].split(':');

              var hour = Math.abs(logOut[0] - shift[0]);
              hour = (hour == '0') ? '00': hour;
              var minutes = Math.abs(logOut[1] - shift[1]);

              overtime = hour + ':' + minutes;
            }

            var data = {
              timeOut: value.timein[0].logOut,
              overtime: overtime,
              //date: date,
              status: 'complete'
            };
            
            Employee_Attendance.update({employee_id: value.id},data).exec(function(err, employee) {
              console.log(employee);
            });
          } else {
            var data = {
              //timeOut: "--:--",
              //date: date,
              status: 'complete'
            };
            
            Employee_Attendance.update({employee_id: value.id},data).exec(function(err, employee) {
              console.log(employee);
            });
          }
          
        });
        sails.hooks.cron.jobs.graveyardEnd2.stop();
        sails.hooks.cron.jobs.graveyardEnd.start();
        sails.hooks.cron.jobs.graveyardPresent.start();
        sails.hooks.cron.jobs.graveyardLate.start();
        sails.hooks.cron.jobs.graveyardAbsent.start();
      });
    },
    onComplete: function() {
      console.log('I am triggering when job is complete');
      
    }
  }
};