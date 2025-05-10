const API_URL = "http://localhost:5000/recommend-course";

document.getElementById("generatePlan").addEventListener("click", async function () {
    let schoolInput = document.getElementById("school").value.trim();
    let coursesInput = document.getElementById("completedCourses").value.trim();
    let interestsInput = document.getElementById("interests").value.trim();

    if (!schoolInput) {
        schoolInput = "no school";
    }
    if (!coursesInput) {
        coursesInput = "none";
    }
    if (!interestsInput) {
        interestsInput = "no particular interests";
    }

    const completedCourses = coursesInput.split(",").map(course => course.trim());
    const interests = interestsInput.split(",").map(interest => interest.trim());

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schoolInput, completedCourses, interests })
    });

    const data = await response.json();

    if (data.error) {
        alert("Error fetching study plan: " + data.error);
        return;
    }

    const suggestionsList = document.getElementById("suggestionsList");
    suggestionsList.innerHTML = "";
    const row = document.createElement("div");
    row.className = "row g-3";

    data.suggestions.forEach(course => {
        const col = document.createElement("div");
        col.className = "col-md-6 col-lg-4";

        const card = document.createElement("div");
        card.className = "card shadow-sm h-100";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const cardTitle = document.createElement("h5");
        cardTitle.className = "card-title";
        cardTitle.innerText = course;

        cardBody.appendChild(cardTitle);
        card.appendChild(cardBody);
        col.appendChild(card);
        row.appendChild(col);
    });

    suggestionsList.appendChild(row);
});
