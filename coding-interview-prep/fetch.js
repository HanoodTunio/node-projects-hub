async function readingData() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users/");
        const data = await response.json(); // Convert response to JSON
        return data;
    } catch (error) {
        console.error("Error occurred while fetching data:", error);
        return [];
    }
}

readingData().then(data => console.log(data.map(user => user.name)));
