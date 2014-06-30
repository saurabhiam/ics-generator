var ICSGenerator = function(options) {
    this._init(options);
};

ICSGenerator.prototype._init = function(options) {
    this.startDate = options.startDate;
    this.summary = options.summary || '';
    this.description = options.description || '';
    this.location = options.location || '';
};

ICSGenerator.prototype._getStart = function() {
    var result = 'DTSTART:';
    var year, month, date, hours, minutes, seconds;
    var d = new Date(this.startDate);
    
    year = d.getFullYear();

    // Month is btwn 1-12, not 0-11
    month = String(d.getMonth() + 1);
    if (month.length == 1) { month = '0' + month; }

    date = String(d.getDate());
    if (date.length == 1) { date = '0' + date; }

    hours = '00';
    minutes = '00';
    seconds = '00';

    result += year + month + date + 'T' + hours + minutes + seconds;

    return result;
};

ICSGenerator.prototype._getSummary = function() {
    var summary = 'SUMMARY:' + this.summary;
    return summary;
};

ICSGenerator.prototype._getDescription = function() {
    var description = 'DESCRIPTION:' + this.description;
    return description;
};

ICSGenerator.prototype._getLocation = function() {
    var loc = 'LOCATION:' + this.location;
    return loc;
};

ICSGenerator.prototype.generateEvent = function() {
    var file = []
    ,   joinedFile = '';
    var summary = this._getSummary();
    var description = this._getDescription();
    var loc = this._getLocation();
    var start = this._getStart();

    file.push('BEGIN:VCALENDAR');
    file.push('VERSION:2.0');
    file.push('PRODID:-//Apple Inc.//Mac OS X 10.8.2//EN');
    file.push('BEGIN:VEVENT');
    file.push(start);
    file.push(summary);
    file.push(description);
    file.push(loc);
    file.push('END:VEVENT');
    file.push('END:VCALENDAR');
    joinedFile = file.join("\n\r");

    return joinedFile;
};
