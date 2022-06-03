const form  = document.getElementById('cryptocurrency_form');
const input = form.elements['cryptocurrency_name'];
const number_formatter = Intl.NumberFormat()
let max_card_counter = 0; 

form.addEventListener('submit', e => {
    if (max_card_counter == 4) {
        document.getElementById("alert-d").style.display = 'block';
    }
    e.preventDefault();
    let cryptocurrency_name = input.value;
    const url = `https://api.coincap.io/v2/assets/${cryptocurrency_name}`;
    fetch(url)
    .then(response => response.json()) 
    .then(info => {
        const { data } = info;
        const cryptocurrency_icon = data['symbol'].toLowerCase();
        const cryptocurrency_price = data['priceUsd'];
        const cryptocurrency_id = data['id'];
        const change_percent = Number(data['changePercent24Hr']).toFixed(2);
        const url_icon = `https://assets.coincap.io/assets/icons/${cryptocurrency_icon}@2x.png`;
        if (elementExists(cryptocurrency_id)) {
            document.getElementById("alert-w").style.display = 'block';
        } else {
            if (max_card_counter <= 3) {
                var node = document.createElement('div');
                node.className = "col-md-3 col-sm-12";
                node.innerHTML = getCardDisplay(url_icon, cryptocurrency_id, cryptocurrency_price, change_percent);
                document.querySelector('.container .row').appendChild(node);
                max_card_counter++;
            }
        }
    })  
    .catch(err => console.log('Request Failed', err));
    form.reset();
});

function buttonColorBasedOnPercentage(change_percent) {
    if ( Number(change_percent).toFixed(2) < 0) {
        color_btn = "btn btn-danger";
    } else {
        color_btn = "btn btn-success";
    }
    return color_btn;  
}

function elementExists(cryptocurrency_id) {
    const element = document.getElementById(`${cryptocurrency_id}-card`);
    if (element) {
        return true;
    } 
    return false;  
}

function getCardDisplay(url_icon, cryptocurrency_id, cryptocurrency_price, change_percent) {
    const card_template = `
    <div class="card text-center">
        <div class="card-body">
            <img class="" src=${url_icon} alt="Card image cap">
            <h5 class="card-title" id="${cryptocurrency_id}-card">${cryptocurrency_id}</h5>
            <label for="priceHolder">price (USD)</label>
            <br>
            <a href="#" class="btn btn-primary">${number_formatter.format(cryptocurrency_price)}</a>
            <label for="percentHolder">change percent (24 Hr)</label>
            <br>
            <a href="#" class="${buttonColorBasedOnPercentage(change_percent)}">${change_percent}</a>
        </div>
    </div>
    `;
    return card_template;  
}

document.addEventListener("DOMContentLoaded", function(){
    var btn = document.getElementById("btn-close");
    var element = document.getElementById("alert-d");
    var myAlert = new bootstrap.Alert(element);

    btn.addEventListener("click", function(){
        myAlert.close();
    });
});

document.addEventListener("DOMContentLoaded", function(){
    var btn = document.getElementById("btn-close-w");
    var element = document.getElementById("alert-w");
    var myAlert = new bootstrap.Alert(element);

    btn.addEventListener("click", function(){
        myAlert.close();
    });
});