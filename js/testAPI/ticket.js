import ticketData from "./ticketData.js";

const ticketCardContainer = document.getElementById('ticket-card');

// Divide ticket data into two groups of three each
const firstRowTickets = ticketData.slice(0, 3);
const secondRowTickets = ticketData.slice(3);

// First row of cards
const firstRowHTML = firstRowTickets.map(ticket => `
    <div class="card">
        <a href="${ticket.url}" target="_blank">
            <img src="${ticket.img_url}" alt="${ticket.title}" class="ticket-img">
        </a>
    </div>
`).join('');

// Second row of cards
const secondRowHTML = secondRowTickets.map(ticket => `
    <div class="card">
        <a href="${ticket.url}" target="_blank">
            <img src="${ticket.img_url}" alt="${ticket.title}" class="ticket-img">
        </a>
    </div>
`).join('');

// Putting both rows to the container
ticketCardContainer.innerHTML = `
    <div class="row-1">${firstRowHTML}</div>
    <div class="row-2">${secondRowHTML}</div>
`;
