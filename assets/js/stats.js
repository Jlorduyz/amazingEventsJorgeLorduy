let URLFetch = "https://aulamindhub.github.io/amazing-api/events.json";

fetch(URLFetch)
  .then((response) => response.json())
  .then((res) => {
    let events = res.events;
    let highestAssistance = { name: "", assistance: 0 };
    let lowestAssistance = { name: "", assistance: Infinity };
    let largestCapacity = { name: "", capacity: 0 };
    let upcomingCategories = {};
    let pastCategories = {};

    let currentYear = "2023";

    events.forEach((event) => {
      const eventYear = event.date.slice(0, 4);
      const percentageAssistance = (event.assistance / event.capacity) * 100;

      if (percentageAssistance > highestAssistance.percentage) {
        highestAssistance = {
          name: event.name,
          percentage: percentageAssistance,
        };
      }

      if (percentageAssistance < lowestAssistance.percentage) {
        lowestAssistance = {
          name: event.name,
          percentage: percentageAssistance,
        };
      }

      if (event.capacity > largestCapacity.capacity) {
        largestCapacity = { name: event.name, capacity: event.capacity };
      }

      if (eventYear > currentYear) {
        if (!upcomingCategories[event.category]) {
          upcomingCategories[event.category] = {
            revenue: 0,
            totalAssistance: 0,
            totalCapacity: 0,
          };
        }
        upcomingCategories[event.category].revenue +=
          event.price * event.capacity;
        upcomingCategories[event.category].totalAssistance += event.assistance;
        upcomingCategories[event.category].totalCapacity += event.capacity;
      } else {
        if (!pastCategories[event.category]) {
          pastCategories[event.category] = {
            revenue: 0,
            totalAssistance: 0,
            totalCapacity: 0,
          };
        }
        pastCategories[event.category].revenue +=
          event.price * event.assistance;
        pastCategories[event.category].totalAssistance += event.assistance;
        pastCategories[event.category].totalCapacity += event.capacity;
      }
    });

    const tableRows = document.querySelectorAll("table.table-bordered tr");
    if (tableRows.length > 2) {
      tableRows[1].children[0].textContent = highestAssistance.name;
      tableRows[1].children[1].textContent = lowestAssistance.name;
      tableRows[1].children[2].textContent = largestCapacity.name;
    }

    const upcomingStatsTable = document.querySelector("table.table-bordered");
    Object.keys(upcomingCategories).forEach((category) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${category}</td>
          <td>${upcomingCategories[category].revenue}</td>
          <td>${(
            (upcomingCategories[category].totalAssistance /
              upcomingCategories[category].totalCapacity) *
            100
          ).toFixed(2)}%</td>
        `;
      upcomingStatsTable.insertBefore(row, tableRows[7]);
    });

    const pastStatsTable = document.querySelector("table.table-bordered");
    Object.keys(pastCategories).forEach((category) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${category}</td>
          <td>${pastCategories[category].revenue}</td>
          <td>${(
            (pastCategories[category].totalAssistance /
              pastCategories[category].totalCapacity) *
            100
          ).toFixed(2)}%</td>
        `;
      pastStatsTable.insertBefore(row, tableRows[12]);
    });
  });
