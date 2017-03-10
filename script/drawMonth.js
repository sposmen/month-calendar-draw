/**
 * Created by SPOSMEN on 3/10/17.
 */
(function (win) {

    /**
     *
     * @param id
     * @param opts  : {date,months,days}
     * @constructor
     */
    function DrawMonthCalendar(id, opts) {
        if (!opts) {
            opts = {};
        }
        this.today = opts.date || new Date();
        this.todayDate = this.today.getDate();
        this.theYear = this.today.getFullYear();
        this.theMonth = this.today.getMonth(); // for index into our array
        this.monthDays = new Date(this.theYear, this.theMonth + 1, 0).getDate();
        this.months = opts.months || ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.days = opts.days || ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        document.getElementById(id).appendChild(this.drawMonth())
    }


    DrawMonthCalendar.prototype.drawMonth = function () {
        var month = document.createElement('table');
        month.setAttribute('border', 'true');
        var i = 1 - new Date(this.theYear, this.theMonth, 1).getDay();
        month.innerHTML = this.drawHeader();
        while (i < this.monthDays) {
            month.appendChild(this.drawWeek(i));
            i += 7;
        }
        return month;
    };

    DrawMonthCalendar.prototype.drawHeader = function () {
        return "<tr><th colspan='7'>" + this.months[this.theMonth] + " " + this.theYear + "</th></tr>" +
            "<tr><th>" + this.days.join('</th><th>') + "</th></tr>";

    };

    DrawMonthCalendar.prototype.drawWeek = function (from) {
        var week = document.createElement('tr');
        week.setAttribute('class', 'week');
        for (var i = 0; i < 7; i++) {
            week.appendChild(this.drawDay(from + i));
        }
        return week;

    };

    DrawMonthCalendar.prototype.drawDay = function (number) {
        var day = document.createElement('td');
        if (number < 1 || number > this.monthDays) {
            day.setAttribute('class', 'gray');
        }
        if (number == this.todayDate) {
            day.setAttribute('class', 'today');
        }
        day.innerHTML = String(new Date(this.theYear, this.theMonth, number).getDate());

        return day;

    };

    win.DrawMonthCalendar = DrawMonthCalendar;
})(window);

