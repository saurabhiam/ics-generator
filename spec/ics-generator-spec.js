describe("ICSGenerator", function() {

  beforeEach(function() {
    ics = new ICSGenerator();
  });

  it("returns false unless an options object is passed", function() {
    expect(ics.init(1)).toBe(false);
    expect(ics.init('abc')).toBe(false);
    expect(ics.init(function(){})).toBe(false);
    expect(ics.init({})).toBeTruthy;
  });

  it("sets options if options are passed", function() {
    var options = {
      summary: 'A summary',
      description: 'A description'
    };
    var actual = ics.setOptions(options);
    expect(actual.summary).toBe('A summary');
    expect(actual.description).toBe('A description');
  });

  it("begins an ICS file", function() {
    var output = "BEGIN:VCALENDAR\n\rVERSION:2.0\n\rPRODID:-//Apple Inc.//Mac OS X 10.8.2//EN\n\rCALSCALE:GREGORIAN\n\rBEGIN:VEVENT";
    expect(ics.beginFile()).toBe(output);
  });

  // it("ends an ICS file", function() {
  //   var output = "SUMMARY:A summary\n\rEND:VEVENT\n\rEND:VCALENDAR"
  //   expect(ics.endFile()).toBe(output);
  // });

  it("gets a start date", function() {
    var appointment = {date: 'Sat Mar 01 2014 00:00:00 GMT-0800 (PST)'};
    expect(ics.getStartTimeDate(appointment)).toBe("20140301");
  });

  it("gets a start time hour", function() {
    expect(ics.getStartTimeHour({timeSlot: '5:00am'})).toBe('05');
    expect(ics.getStartTimeHour({timeSlot: '10:00am'})).toBe('10');
    expect(ics.getStartTimeHour({timeSlot: '12:00pm'})).toBe('12');
    expect(ics.getStartTimeHour({timeSlot: '10:00pm'})).toBe('22');
  });

  it("gets the start time minutes", function() {
    expect(ics.getStartTimeMinutes({timeSlot: '5:00am'})).toBe('00');
    expect(ics.getStartTimeMinutes({timeSlot: '5:15am'})).toBe('15');
    expect(ics.getStartTimeMinutes({timeSlot: '5:30am'})).toBe('30');
  });

  it("formats the event start time", function() {
    var appointment = {
      date: 'Sat Mar 08 2014 00:00:00 GMT-0800 (PST)',
      timeSlot: '1:00pm'
    };
    var expected = "DTSTART;VALUE='DATE-TIME':20140308T130000";
    expect(ics.formatDTStart(appointment)).toBe(expected);
  });

  it("formats the event end time", function() {
    var appointment = {
      date: 'Sat Mar 08 2014 00:00:00 GMT-0800 (PST)',
      timeSlot: '1:00pm'
    };
    var expected = "DTEND;VALUE='DATE-TIME':20140308T133000";
    expect(ics.formatDTEnd(appointment)).toBe(expected);
  });

  xit("generates an ICS file", function() {
    var appointment = {
      date: 'Sat Mar 08 2014 00:00:00 GMT-0800 (PST)',
      timeOfDay: 'afternoon',
      timeSlot: '1:00pm'
    };

    var expected = [];
    expected.push("BEGIN:VCALENDAR");
    expected.push("VERSION:2.0");
    expected.push("PRODID:-//Apple Inc.//Mac OS X 10.8.2//EN");
    expected.push("CALSCALE:GREGORIAN");
    expected.push("BEGIN:VEVENT");
    expected.push("DTSTART;VALUE='DATE-TIME':20140308T130000");
    expected.push("DTEND;VALUE='DATE-TIME':20140308T133000");
    expected.push('SUMMARY:A summary');
    expected.push('DESCRIPTION:Your Move Captain will contact you at your scheduled appointment time.');
    expected.push('END:VEVENT');
    expected.push('END:VCALENDAR');
    expected = expected.join("\n\r");

    expect(ics.setICS(appointment)).toBe(expected);

  });

});
