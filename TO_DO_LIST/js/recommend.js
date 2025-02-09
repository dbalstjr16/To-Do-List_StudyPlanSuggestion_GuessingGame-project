const API_URL = "http://localhost:5000/recommend-course";

document.getElementById("generatePlan").addEventListener("click", async function () {
    const coursesInput = document.getElementById("completedCourses").value.trim();

    if (!coursesInput) {
        alert("Please enter at least one completed course!");
        return;
    }

    const completedCourses = coursesInput.split(",").map(course => course.trim());

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completedCourses })
    });

    const data = await response.json();

    if (data.error) {
        alert("Error fetching study plan: " + data.error);
        return;
    }

    const completedList = document.getElementById("completedList");
    completedList.innerHTML = "";
    completedCourses.forEach(course => {
        const li = document.createElement("li");
        li.textContent = course;
        completedList.appendChild(li);
    });

    const suggestionsList = document.getElementById("suggestionsList");
    suggestionsList.innerHTML = "";
    data.suggestions.forEach(course => {
        const li = document.createElement("li");
        li.textContent = course;
        suggestionsList.appendChild(li);
    });
});
