var ICSGenerator = function(startDate, startTime, options) {

    this.initOptions(options);

    if (startDate && startTime) {
        this.setEventStart(startDate, startTime);
    }

    console.log(this.setICS(this.eventStart));

    this.setICS(this.eventStart);



};

ICSGenerator.prototype.initOptions = function(options) {

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
    // arr.push('SUMMARY:' + this.options.summary);
    // arr.push('DESCRIPTION:' + this.options.description);
    arr.push('END:VEVENT');
    arr.push('END:VCALENDAR');

    arr = arr.join("\n\r");

    return arr;
};

ICSGenerator.prototype.formatStartDate = function(startDate) {
    return startDate.replace(/-/g, '');
};

ICSGenerator.prototype.formatStartTime = function(startTime) {
    // Strip encoded colon (i.e. %3A) from HTML5 timepicker
    var startTime = startTime.replace(/%3A/, '');

    // Add seconds
    startTime += '00';

    return startTime;
};

ICSGenerator.prototype.setEventStart = function(startDate, startTime) {
    var date = this.formatStartDate(startDate);
    var time = this.formatStartTime(startTime);
    this.eventStart = "DTSTART;VALUE='DATE-TIME':" + date + 'T' + time;
    return this.eventStart;
};

// ICSGenerator.prototype.formatDTEnd = function(appointment) {

//     var result = "DTEND;VALUE='DATE-TIME':" + date + 'T' + hours + minutes + '00';
    
//     return result;           
// };

ICSGenerator.prototype.setICS = function(eventStart) {
    var file = [];
    file.push(this.beginFile());
    file.push(eventStart);
    //file.push(this.formatDTEnd(appointment));
    file.push(this.endFile());
    file = file.join("\n\r");

    return file;
};