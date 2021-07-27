const arrayWithElements = [];
let objectData;
let itemFromLocalStorage;

document.onclick = clickListener;

function clickListener(e) {
    e.preventDefault();

    let clickedElement = e.target;
    console.log("clicked ", e.target.ownerDocument.activeElement.href);

    // let name = clickedElement.innerHTML;
    // name = name.replace(/\n/g, '');
    // name = name.trim();

    const name = clickedElement.innerText;

    const element = arrayWithElements.find(item => item.name === name && item.name !== "");

    // if (element?.name === "") { element.name = "icon" }

    console.log("element", element);

    if (element) {
        element.count += 1;
    } else {
        arrayWithElements.push({ name, count: 1 })
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
