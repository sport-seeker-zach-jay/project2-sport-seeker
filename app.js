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
            return response.json();
        
        })
        .then(jsonResult => {     
            // console.log(jsonResult._embedded.events);
            app.displayData(jsonResult._embedded.events);
        });  
}

// Method that Displays Data
app.displayData = (sportsArray) => {
        // Toggle H2 to display
        const h2 = document.querySelector(`h2`)
        h2.style.display = 'block';
        // Target the node to attach to
        const results = document.querySelector(`.results`);
        // Fresh search query with each selection
        results.innerHTML = '';
        // Build HTML using the data
        sportsArray.forEach((game) => {
            // Container for each event
            const listItem = document.createElement(`li`);
            // Event Name
            const event = document.createElement(`p`);
            event.innerText = game.name;
            // City / State
            const city = document.createElement(`p`);
            city.innerText = `${game._embedded.venues[0].city.name}, ${game._embedded.venues[0].state.name}`;
            // Arena Name
            const arena = document.createElement(`p`);
            arena.innerText = game._embedded.venues[0].name;
            // Event Date
            const date = document.createElement(`p`);
            date.innerText = game.dates.start.localDate
            // Event Time
            const time = document.createElement(`p`);
            time.innerText = game.dates.start.localTime;
            // Purchase Tickets
            const tickets = document.createElement(`a`);
            tickets.innerText = `Purchase Tickets`;
            tickets.href = game.url;

            // Collect all elements together
            listItem.appendChild(event);
            listItem.appendChild(city);
            listItem.appendChild(arena);
            listItem.appendChild(date);
            listItem.appendChild(time);
            listItem.appendChild(tickets);

            // Append to container
            results.appendChild(listItem);
        }); 
        
    // });
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
        // Pass those selections to the GetData function
        app.getData(selectCity, selectSport);
    });
}

app.init = () => {
    app.getUserInput();
}

app.init();    

    // NAME = console.log(game.name)
    // CITY = console.log(game._embedded.venues[0].city.name)
    // ARENA = console.log(game._embedded.venues[0].name)
    // DATE = console.log(game.dates.start.localDate) / console.log(game.dates.start.localTime)
    // TICKET purchase (link) = console.log(game.url)
    // Seating Map (link) = console.log(game.seatmap.staticUrl)
    // LOGOS (pictures) = console.log(game._embedded.attractions[0].images[0].url) / console.log(game._embedded.attractions[1].images[0].url)
