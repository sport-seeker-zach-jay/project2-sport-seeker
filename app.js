const app = {};

app.key = "bGfNSJ0SadLnnsgq82qJA8KXoy4bsOhM";
app.url = "https://proxy.junocollege.com/https://app.ticketmaster.com/discovery/v2/events";

app.getData = () => {
    const url = new URL(app.url);
    url.search = new URLSearchParams({
        apikey: app.key,
        classificationName: "Sports"
    });
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(jsonResult => {     
            console.log(jsonResult._embedded.events);
            app.displayData(jsonResult._embedded.events);
        });  
}

// A form that prompts users to select both a Location ("City") and Sport from two separate dropdown menus


// Upon form submission, make an AJAX request to retrieve API data based on the user's form selections

// create a method that displays data 
app.displayData = (data) => {
    // target form
    app.form = document.querySelector('form');
    // Listen to the button click event below the form for Submission ('Go!)
    app.form.addEventListener('submit', function (e) {
        // prevent the browser from refreshing (preventDefault)
        e.preventDefault();
        // Toggle H2 to display
        const h2 = document.querySelector('h2')
        h2.style.display = 'block';
        // store the user's choice of location
        const city = document.getElementById('city').value;
        // store the chosen type of sport
        const sport = document.getElementById('sport').value;
        
        // Append results below Form Submit button
        data.forEach((game) => {
            const results = document.querySelector('.results');
            const listItem = document.createElement('li');
            listItem.innerHTML = `
            <p>${game.name}</p>`
            // results.appendChild(listItem);       
        })
    })
}



// Display all upcoming sporting events in user's selected city

    // NAME = console.log(game.name)
    // CITY = console.log(game._embedded.venues[0].city.name)
    // ARENA = console.log(game._embedded.venues[0].name)
    // DATE = console.log(game.dates.start.localDate) / console.log(game.dates.start.localTime)
    // TICKET purchase (link) = console.log(game.url)
    // Seating Map (link) = console.log(game.seatmap.staticUrl)
    // LOGOS (pictures) = console.log(game._embedded.attractions[0].images[0].url) / console.log(game._embedded.attractions[1].images[0].url)




app.init = () => {
    app.getData();
}

app.init();