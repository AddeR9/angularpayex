var request = new XMLHttpRequest();
request.addEventListener('load', function () {
    response = JSON.parse(this.responseText);
    var script = document.createElement('script');
    var operation = response.operations.find(function (o) {
        return o.rel === 'view-checkout';
    });
    script.setAttribute('src', operation.href);
    script.onload = function () {
        // When the 'view-checkout' script is loaded, we can initialize the
        // Payment Menu inside 'checkout-container'.
        payex.hostedView.checkout({
            container: {
                checkout: "checkout"
            },
            culture: 'nb-No',
        }).open();
    };
    // Append the Checkout script to the <head>
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(script);
});
// Like before, you should replace the address here with
// your own endpoint.
request.open('GET', 'https://hej.com', true);
request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
request.send();