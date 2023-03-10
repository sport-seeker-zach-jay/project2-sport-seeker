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
        });


}

// Upon initiation, website will display a header reading: "SPORT SEEKER" and a short description: "Select your city and favourite sport from the dropdown menus below to view upcoming events in your area!"
// A form that prompts users to select both a Location ("City") and Sport from two separate dropdown menus
// Listen to the button click event below the form for Submission ('Go!)
// Upon form submission, make an AJAX request to retrieve API data based on the user's form selections
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
}

app.init();