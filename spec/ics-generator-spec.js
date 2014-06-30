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
    var output = "BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Apple Inc.//Mac OS X 10.8.2//EN\r\nCALSCALE:GREGORIAN\r\nBEGIN:VEVENT";
    expect(ics.beginFile()).toBe(output);
  });

  it("gets a start date", function() {
    expect(ics.formatStartDate('2014-04-20')).toBe('20140420');
  });

  it("gets a start time", function() {
    expect(ics.formatStartTime('21%3A01')).toBe('210100');
  });

  it("sets a formatted event start date-time", function() {
    var expected = "DTSTART;VALUE='DATE-TIME':20140420T210100";
    var actual = ics.setEventStart('2014-04-20', '21%3A01');
    expect(actual).toBe(expected);
  });

  it("ends an ICS file", function() {
    var output = "END:VEVENT\r\nEND:VCALENDAR"
    expect(ics.endFile()).toBe(output);
  });

  it("generates an ICS file", function() {

    var expected = [];
    expected.push("BEGIN:VCALENDAR");
    expected.push("VERSION:2.0");
    expected.push("PRODID:-//Apple Inc.//Mac OS X 10.8.2//EN");
    expected.push("CALSCALE:GREGORIAN");
    expected.push("BEGIN:VEVENT");
    expected.push("DTSTART;VALUE='DATE-TIME':20140420T210100");
    // expected.push("DTEND;VALUE='DATE-TIME':20140308T133000");
    // expected.push('SUMMARY:A summary');
    // expected.push('DESCRIPTION:A description');
    expected.push('END:VEVENT');
    expected.push('END:VCALENDAR');
    expected = expected.join("\r\n");

    expect(ics.setICS("DTSTART;VALUE='DATE-TIME':20140420T210100")).toBe(expected);

  });

});
