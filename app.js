const app = {};

app.key = "bGfNSJ0SadLnnsgq82qJA8KXoy4bsOhM";
app.url = "https://proxy.junocollege.com/https://app.ticketmaster.com/discovery/v2/events";

app.getData = () => {
    const url = new URL(app.url);
    url.search = new URLSearchParams({
        apikey: app.key
    });
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(jsonResult => {
            console.log(jsonResult);
            app.displayData(jsonResult);
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
        const location = document.getElementById('city').value;
        // store the chosen type of sport
        const sport = document.getElementById('sport').value;
    })
    const ul = document.querySelector('.results');
    // app.data.forEach((game) => {
    //     const listItem = document.createElement('li');
    //     listItem.innerHTML = `
    //     <p>${game.name}</p>`
    // })
}


// Append results below Form Submit button
// Display all upcoming sporting events in user's selected city
    // Team Names (who vs. who) - NAME
    // Location (Stadium Name & City) -> embedded -> venues --> 0 --> name (ARENA) & city, name, country
    // Date of the event - DATES - START --> LOCAL DATE & START TIME
    // Link to Purchase tickets  --> url
    // Seat Map *(stretch goal) - seatmap
    // Team Logos --> embedded --> attractions --> 0 and 1

app.init = () => {
    app.getData();
    app.displayData();
}

app.init();