//cohort
const COHORT = "2403-ftb-et-web-pt";
// API URL
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

/**
 * Create an object called state that holds an array for events objects
 */
const state = {
  events: [],
};

/**
 *  Complete the function so that it:
 *    - uses `fetch` to make a GET request to the API
 *    - turns the response into json
 *    - stores the json of recipes into state
 *    - calls `renderAllEvents`
 */
const fetchAllEvents = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    state.events = data.data;

    renderAllEvents();
  } catch (error) {
    console.log(error);
  }
};

/**
 * Complete the function so that it:
 *    - uses `fetch` to make a POST request to the API sending the data passed in the body of the request
 *    - turns the response into json
 *    - calls `fetchAllEvents`
 *
 * Note: date isn't used in this API but you will need to know how to work with it in the workshop
 */

/**
 * 
 * JS  {
        name, 

 } -----

 JSON.STRINGIFY 

  --> JSON {

 }
 */
const createNewEvents = async (name, description, date, location) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name, 
        description,
        date: new Date(date).toISOString(),
        location,
      }),
    });
    await fetchAllEvents();
  } catch (error) {
    console.log(error);
  }
};

/**
 * Complete the function so that it:
 *    - uses `fetch` to make a DELETE request to the API to delete a event with the id passed to the function
 *    - calls `fetchAllEvents`
 */
const removeEvent = async (id) => {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    await fetchAllEvents();
  } catch (error) {
    console.log(error);
  }
};

// render all events on the page
const renderAllEvents = () => {
  const eventsContainer = document.getElementById("events-container");
  const eventsList = state.events;

  if (!eventsList || eventsList.length === 0) {
    eventsContainer.innerHTML = "<h3>No events found</h3>";
    return;
  }

  //resets html of all event
  eventsContainer.innerHTML = "";

  //creates a card for each event
  eventsList.forEach((event) => {
    const eventsElement = document.createElement("div");
    eventsElement.classList.add("events-card");
    eventsElement.innerHTML = `
            <h4>${event.name}</h4>
            <p>${event.description}</p>
            <p>${event.date}</p>
            <p>${event.location}</p>
            <button class="delete-button" data-id="${events.id}">Remove</button>
        `;
    eventsContainer.appendChild(recipeElement);

    const deleteButton = eventsElement.querySelector(".delete-button");
    //add event listener to the delete button so we can delete a event
    deleteButton.addEventListener("click", (event) => {
      try {
        event.preventDefault();
        removeEvent(event.id);
      } catch (error) {
        console.log(error);
      }
    });
  });
};

//  adds a listener to our form so when we submit the form we create a new event
const addListenerToForm = () => {
  const form = document.querySelector("#new-events-form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    await createNewEvents(
      form.name.value,
      form.description.value,
      form.date.value,
      form.location.value,
    );

    //clears the form after we create the new event
    form.name.value = "";
    form.description.value = "";
    form.date.value = "";
    form.location.value = "";
  });
};

//initial function when the page loads
const init = async () => {
  //gets all the events from the API
  await fetchAllEvents();
  //adds a listener to the form so we can add a event when the user submits the form
  addListenerToForm();
};

init();