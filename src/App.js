import {h, Component} from 'preact';
import './App.css';

const venues = {
    "venue-02": {
        _id: "venue-02",
        type: "venue",
        title: "The Angel Inn",
        media: {
            logo: "http://example.com/avatar"
        },
        menuItems: ["item-03"],
        location: {
            lat: 52.953353,
            lng: -1.143487,
            city: "Nottingham",
            walk: "0.5 min walk"
        }
    },
    "venue-01": {
        _id: "venue-01",
        type: "venue",
        title: "Hungry Pumpkin",
        tagline: "Italian deli",
        media: {
            logo: "http://example.com/avatar"
        },
        menuItems: ["item-01", "item-02", "item-02-1"],
        location: {
            lat: 52.950865,
            lng: -1.143302,
            city: "Nottingham",
            walk: "1.5 min walk"
        }
    },
    "pret-01": {
        _id: "pret-01",
        type: "venue",
        title: "Pret - Market Square",
        media: {
            logo: "http://example.com/avatar"
        },
        menuItems: ["item-02"],
        location: {
            lat: 52.953353,
            lng: -1.143487,
            city: "Nottingham",
            walk: "2.5 min walk"
        }
    }
};


const menuItems = {
    "item-01": {
        _id: "item-01",
        _venue_id: "venue-01",
        type: "menuItem",
        title: "Humous & Roast Pepper Sandwich",
        subtitle: 'On white or Brown Bread',
        price: 5.60,
        tags: ["vegan"]
    },
    "item-02": {
        _id: "item-02",
        _venue_id: "venue-01",
        type: "menuItem",
        title: "Humous & Roast Veg  Salad",
        subtitle: 'With hot veg + base salad',
        price: 4.0,
        tags: ["vegan", "gluten-free"]
    },
    "item-02-1": {
        _id: "item-02-1",
        _venue_id: "venue-01",
        type: "menuItem",
        title: "Spinach Pasta",
        subtitle: 'With optional cream cheese',
        price: 4.0,
        tags: ["vegetarian"]
    },
    "item-03": {
        _id: "item-03",
        _venue_id: "venue-02",
        type: "menuItem",
        title: "Mushroom and Spinach Pie",
        subtitle: "Served with chips + Onions rings",
        price: 8.9,
        tags: ["vegetarian"]
    }
};
console.log(JSON.stringify(menuItems));

const venuesWithItems = Object.keys(venues)
    .map(key => {
        const venue = venues[key];
        return Object.assign({}, venue, {menuItems: venue.menuItems.map(id => menuItems[id])});
    });

function geoToDistance (location) {
    return '3.2m';
}

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>VV Lunch</h2>
                </div>
                <ul class="menu-items">
                    {venuesWithItems.map(x => <Venue venue={x} />)}
                </ul>
            </div>
        );
    }
}

function Venue (props) {
    const venue = props.venue;
    return <div class="venue">
        <div class="venue__info">
            <div class="venue__title">{venue.title}</div>
            <div class="venue__location">
                <span class="venue__location__walk">{venue.location.walk}</span>
            </div>
        </div>
        <div class="venue__items">
            {venue.menuItems.map(x => <Dish menuItem={x} />)}
        </div>
        <footer class="venue__footer">
            <div class="venue__footer__contact">Call: 01623 863132</div>
            <div class="venue__footer__map">Open in Maps</div>
        </footer>
    </div>
}

function Dish(props) {
    const item = props.menuItem;

    return <li class="menu-item">
        <div class="menu-item__info">
            <span className="menu-item__title">{item.title}</span>
            <span className="menu-item__subtitle">{item.subtitle}</span>
            <div className="menu-item__tags">
                {item.tags.map(x => <span class="menu-item__tag">{x}</span>)}
            </div>
        </div>
        <div class="menu-item__price">£{item.price.toFixed(2)}</div>
    </li>
}

export default App;
