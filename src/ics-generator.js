var ICSGenerator = function(options) {
    this.init(options);
};

ICSGenerator.prototype.init = function(options) {
    if (typeof options === 'object') {
        this.setOptions(options);
        return;
    }
    return false;
};

ICSGenerator.prototype.setOptions = function(options) {
    this.options = options;
    this.options.summary = options.summary || '';
    this.options.description = options.description || '';
    return this.options;
};

ICSGenerator.prototype.beginFile = function() {
    var file = [];
    file.push('BEGIN:VCALENDAR');
    file.push('VERSION:2.0');
    file.push('PRODID:-//Apple Inc.//Mac OS X 10.8.2//EN');
    file.push('CALSCALE:GREGORIAN');
    file.push('BEGIN:VEVENT');
    
    file = file.join("\n\r");

    return file;
};

ICSGenerator.prototype.endFile = function() {
    var arr = [];
    arr.push('SUMMARY:' + this.options.summary);
    arr.push('DESCRIPTION:' + this.options.description);
    arr.push('END:VEVENT');
    arr.push('END:VCALENDAR');

    arr = arr.join("\n\r");

    return arr;
};

ICSGenerator.prototype.getStartTimeDate = function(appointment) {
    var date = new Date(appointment.date).toJSON();
    date = date.substring(0, 10).split('-').join('');

    return date;
};

ICSGenerator.prototype.getStartTimeHour = function(appointment) {
    var time;
    if(appointment.timeSlot.search('pm') !== -1 && 
        parseInt(appointment.timeSlot) !== 12) {
        var time = String(12 + parseInt(appointment.timeSlot));
    } else {
        var time = String(parseInt(appointment.timeSlot));
        if(time.length === 1) {
            time = '0' + time;
        }
    }

    return time;
};

ICSGenerator.prototype.getStartTimeMinutes = function(appointment) {
    var start = appointment.timeSlot.search(':');
    var minutes = appointment.timeSlot.substring(start+1, start+3);

    return minutes;
};

ICSGenerator.prototype.formatDTStart = function(appointment) {
    var date = this.getStartTimeDate(appointment);
    var hours = this.getStartTimeHour(appointment);
    var minutes = this.getStartTimeMinutes(appointment);
    var result = "DTSTART;VALUE='DATE-TIME':" + date + 'T' + hours + minutes + '00';

    return result;
};

ICSGenerator.prototype.formatDTEnd = function(appointment) {
    var date = this.getStartTimeDate(appointment);
    var hours = parseInt(this.getStartTimeHour(appointment));
    var minutes = parseInt(this.getStartTimeMinutes(appointment));

    if(minutes > 29) {
        minutes -= 30;
        hours += 1;
    } else {
        minutes += 30;
    }
    minutes = String(minutes);
    if(hours.length === 1) {
        hours = '0' + hours;
    }
    if(minutes.length === 1) {
        minutes = '0' + minutes;
    }
    var result = "DTEND;VALUE='DATE-TIME':" + date + 'T' + hours + minutes + '00';
    
    return result;        
};

ICSGenerator.prototype.setICS = function(appointment) {
    var file = [];
    file.push(this.beginFile());
    file.push(this.formatDTStart(appointment));
    file.push(this.formatDTEnd(appointment));
    file.push(this.endFile(appointment));
    file = file.join("\n\r");

    return file;
};