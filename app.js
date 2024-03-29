// API DATA SETS 
// NAME = game.name
// CITY = game._embedded.venues[0].city.name
// ARENA = game._embedded.venues[0].name
// DATE = game.dates.start.localDate) / game.dates.start.localTime)
// TICKET purchase (link) = game.url)
// Seating Map (link) = game.seatmap.staticUrl)
// LOGOS (pictures) = game._embedded.attractions[0].images[0].url / game._embedded.attractions[1].images[0].url

const app = {};

// Method that grabs Data from API
app.getData = (city, sport) => {
    app.key = `bGfNSJ0SadLnnsgq82qJA8KXoy4bsOhM`;
    app.url = new URL(`https://proxy.junocollege.com/https://app.ticketmaster.com/discovery/v2/events`);
    app.url.search = new URLSearchParams({
        apikey: app.key,
        city: city,
        classificationName: sport
    });
    fetch(app.url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        })
        .then(jsonResult => {     
            app.displayData(jsonResult._embedded.events);
        })
        .catch((error) => {
            if (error.message === `jsonResult._embedded is undefined` || `Cannot read properties of undefined(reading 'events')` || `Unhandled Promise Rejection: TypeError: undefined is not an object (evaluating 'jsonResult._embedded.events')`) {
                const results = document.querySelector(`.results`);
                results.innerHTML = ``;
                const errorMessage = document.createElement(`h2`);
                errorMessage.innerText = `Sorry, no tickets for your selected options! Please try again :)`;
                results.appendChild(errorMessage);
            } 
        });
}

// Method that Displays Data
app.displayData = (sportsArray) => {
        const h2 = document.createElement(`h2`);
        h2.innerText = `Tickets available in your area`;
        // Target the node to attach to
        const results = document.querySelector(`.results`);
        // Fresh search query with each selection
        results.innerHTML = ``;
        results.appendChild(h2);
        // Build HTML using the data
        sportsArray.forEach((game) => {
            // Container for each event
            const listItem = document.createElement(`li`);
            
            // TIME CONTAINER
            const timeContainer = document.createElement(`div`);
            timeContainer.classList.add(`timeContainer`);
            // Event Date
            const date = new Date(game.dates.start.localDate);
            const options = {
                weekday: `short`,
                month: `short`,
                day: `numeric`,
                year: `numeric`
            }
            const userFriendlyDate = date.toLocaleDateString(`en-US`, options);
            const convertedDate = document.createElement(`p`);
            convertedDate.innerText = userFriendlyDate;
            // Event Time
            const time = app.tConvert(game.dates.start.localTime); // Calls the tConvert Method
            const convertedTime = document.createElement(`p`);
            convertedTime.innerText = time;
            convertedTime.classList.add(`bottomText`);
            // Append to timeContainer
            timeContainer.appendChild(convertedDate);
            timeContainer.appendChild(convertedTime);

            // DETAIL CONTAINER
            const detailContainer = document.createElement(`div`);
            detailContainer.classList.add(`detailContainer`);
            // Event Name
            const event = document.createElement(`p`);
            event.classList.add(`event`);
            event.innerText = game.name;
            // City / State
            const city = document.createElement(`p`);
            city.innerText = `${game._embedded.venues[0].city.name}, ${game._embedded.venues[0].state.name}`;
            // Arena Name
            const arena = document.createElement(`p`);
            arena.innerText = game._embedded.venues[0].name;
            // Location Text
            const locationText = document.createElement(`p`);
            locationText.classList.add(`locationText`);
            locationText.innerText = `${game._embedded.venues[0].city.name}, ${game._embedded.venues[0].state.name} | ${game._embedded.venues[0].name}`;
            // Append to detailContainer
            detailContainer.appendChild(event);
            detailContainer.appendChild(locationText);   
          
            // TICKET CONTAINER
            const ticketContainer = document.createElement(`div`);
            ticketContainer.classList.add(`ticketContainer`);
            // Purchase Tickets
            const tickets = document.createElement(`a`);
            tickets.classList.add(`purchaseTickets`);
            tickets.innerText = `Purchase Tickets >`;
            tickets.href = game.url;
            tickets.target =`_blank`
            // Dislay Home Team Logo
            const homeTeam = document.createElement(`img`);
            homeTeam.src = game.images[6].url;
            homeTeam.alt = `Home Team Logo`;
            // Append to ticketContainer
            ticketContainer.appendChild(tickets);
            ticketContainer.appendChild(homeTeam)

            // Collect all elements together
            listItem.appendChild(timeContainer);
            listItem.appendChild(detailContainer);
            listItem.appendChild(ticketContainer);

            // Append to container
            results.appendChild(listItem);
        }); 
}

// Method which converts Event times in API Data (24-hour clock) to a more standard, user-friendly 12-hour clock
app.tConvert = (time) => {
    time = time.toString().match (/^([01]\d|2[0-3])(:)([0-5]\d)/) || [time];
    if (time.length > 1) {
        time = time.slice (1);
        time[5] =+ time[0] < 12 ? `AM` : ` PM`;
        time[0] =+ time[0] % 12 || 12;
    }
    return time.join (``);
}

// Method that grabs User's Dropdown menu selections
app.getUserInput = () => {
    // target form
    app.form = document.querySelector(`form`);
    // Listen to the button click event below the form for Submission ('Go!)
    app.form.addEventListener(`submit`, function (e) {
        // prevent the browser from refreshing (preventDefault)
        e.preventDefault();
        // Grab User's Sport Selection
        const selectSport = document.querySelector(`#sport`).value;
        // Grab User's City Selection 
        const selectCity = document.querySelector(`#city`).value;
        // Display data upon submit ONLY if User has selected both options
        if (selectSport === `` || selectCity === ``) {
            alert (`Please select both options!`) ;
        }   else {
            app.getData(selectCity, selectSport);
        }
    });
}

app.init = () => {
    app.getUserInput();
}

app.init();    

