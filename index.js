const arrayWithElements = [];
let objectData;
let itemFromLocalStorage;

document.onclick = clickListener;

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

function clickListener(e) {
    e.preventDefault();

    let clickedElement = e.target;
    const link = e.target.ownerDocument.activeElement.href;

    const isValidUrl = validURL(link);

    // let name = clickedElement.innerHTML;
    // name = name.replace(/\n/g, '');
    // name = name.trim();

    const name = clickedElement.innerText;

    const element = arrayWithElements.find(item => item.name === name && item.name !== "");

    // if (element?.name === "") { element.name = "icon" }

    console.log("element", element);

    if (element) {
        element.clicks += 1;
    } else {
        isValidUrl ?
            arrayWithElements.push({ name, clicks: 1, type: "Button" }) :
            arrayWithElements.push({ name, clicks: 1, type: "Text/ Image/ Icon" })
    }

    // arrayWithElements.push({ name, clickedElement });

    localStorage.setItem("userclicks", JSON.stringify(arrayWithElements));

    itemFromLocalStorage = localStorage.getItem("userclicks")

    // console.log(itemFromLocalStorage)

    const convertArrayToObject = (array, key) => {
        const initialValue = {};
        return array.reduce((obj, item) => {
            return {
                ...obj,
                [item[key]]: item,
            };
        }, initialValue);
    };

    objectData = convertArrayToObject(arrayWithElements, "name")
    // console.log("object data ", JSON.stringify(objectData))
    console.log("localStorage data ", itemFromLocalStorage)
    // console.log("array data ", arrayWithElements)
}

document.addEventListener('visibilitychange', function logData() {
    if (document.visibilityState === 'hidden') {
        let blob = new Blob([(localStorage.getItem("userclicks"))], { type: 'text/plain' });
        navigator.sendBeacon('http://localhost:5000/userclicks', blob);
    }
})
