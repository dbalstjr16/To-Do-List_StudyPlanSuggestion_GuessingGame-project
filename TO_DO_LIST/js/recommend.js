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

    /*
    const completedList = document.getElementById("completedList");
    completedList.innerHTML = "";
    completedCourses.forEach(course => {
        const li = document.createElement("li");
        li.textContent = course;
        completedList.appendChild(li);
    });
    */

    const suggestionsList = document.getElementById("suggestionsList");
    suggestionsList.innerHTML = "";
    data.suggestions.forEach(course => {
        const li = document.createElement("li");
        li.innerText = course;
        suggestionsList.appendChild(li);
    });
});
