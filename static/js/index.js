const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var addEvents = (td) => {};
var getMonthLen = (month, year) => new Date(year, month + 1, 0).getDate();
var getMonthStart = (month, year) => new Date(year, month, 1).getDay();
var today = new Date(), currentMonth, darkThemeEnabled;
const styles = {
  "darkTheme": {
    "--theme-text-color1": "white",
    "--theme-background-color1": "#3C3C3C",
    "--theme-background-color2": "#555555",
    "--theme-background-color3": "#2C2C2C"
  },
  "lightTheme": {
    "--theme-text-color1": "black",
    "--theme-background-color1": "white",
    "--theme-background-color2": "white",
    "--theme-background-color3": "white"
  }
}

function setMonth(month, year) {
  var tb = document.getElementById("month-view-tbody"), daysLeft;
  while (tb.firstChild) {
    tb.removeChild(tb.lastChild);
  }

  var monthStart = getMonthStart(month, year), prevMonthLen = getMonthLen(month - 1, year);

  document.getElementById("month-name").innerText = months[month] + " " + year;
  var tr = custom.ce("tr", {}, []), day = 0;

  for (var i = monthStart - 1; i >= 0; i--) {
    td = custom.ce(
      "td", {class: "month-view"}, [
        ["div", {class: "month-view-day grayed-out"}, [
          ["span", {class: "month-day-num"}, [
            ["__TEXT__", {}, prevMonthLen - i]
          ]]
        ]]
      ]
    );
    addEvents(td);
    tr.appendChild(td);
  }
  
  daysLeft = 8 - tr.children.length
  for (var day = 1; day < daysLeft; day++) {
    tr.appendChild(custom.ce(
      "td", {class: "month-view"}, [
        ["div", {class: "month-view-day"}, [
          ["span", {class: "month-day-num"}, [
            ["__TEXT__", {}, day]
          ]]
        ]]
      ]
    ));
  } 
  tb.appendChild(tr)


  var monthLen = getMonthLen(month, year);
  while (true) {
    tr = custom.ce(
      "tr", {}, Array.from({length: 7}, (x,i) => (
        ["td", {class: "month-view"}, [
          ["div", {class: "month-view-day"}, [
            ["span", {class: "month-day-num"}, [
              ["__TEXT__", {}, (day++)]
            ]]
          ]]
        ]]
      ))
    );
    if (day > monthLen) {
      for (var i = 1; i < (day - monthLen); i++) tr.removeChild(tr.lastChild);
      break;
    }
    tb.appendChild(tr)
  }
  daysLeft = 8 - tr.children.length;
  for (var i = 1; i < daysLeft; i++) {
    tr.appendChild(custom.ce(
      "td", {class: "month-view"}, [
        ["div", {class: "month-view-day grayed-out"}, [
          ["span", {class: "month-day-num"}, [
            ["__TEXT__", {}, i]
          ]]
        ]]
      ]
    ));
  }
  tb.appendChild(tr)
}

function changeMonth(diff) {
  currentMonth.setMonth(currentMonth.getMonth() + diff)
  setMonth(currentMonth.getMonth(), currentMonth.getFullYear())
}

window.addEventListener('DOMContentLoaded', (event) => {
  currentMonth = new Date(today.getFullYear(), today.getMonth())
  setMonth(currentMonth.getMonth(), currentMonth.getFullYear())
});



function changeTheme(darkTheme) {
  if (darkThemeEnabled) {
    custom.setCSS(document.getElementById("body"), styles.lightTheme)
  } else {
    custom.setCSS(document.getElementById("body"), styles.darkTheme)
  }
  darkThemeEnabled = !darkThemeEnabled;
}