// Array of courses for the Web and Computer Programming Certificate
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to programming concepts using Python.',
        technology: ['Python'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to web design and development using HTML and CSS.',
        technology: ['HTML', 'CSS'],
        completed: false
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Learn to write, call, debug, and test functions in Python.',
        technology: ['Python'],
        completed: false
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces object-oriented programming with C#.',
        technology: ['C#'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Learn to create dynamic websites using JavaScript.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Focus on user experience, accessibility, and performance optimization.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

// Function to Display Current Year and Last Modified Date
function displayDates() {
    const currentYear = new Date().getFullYear();
    const lastModified = document.lastModified;
    document.getElementById("currentYear").textContent = currentYear;
    document.getElementById("lastModified").textContent = `Last Modified: ${lastModified}`;
}

// Function to Render Course List
function renderCourseList(filter = "all") {
    const courseList = document.getElementById("course-list");
    const totalCreditsSpan = document.getElementById("totalCredits");
    courseList.innerHTML = "";

    let totalCredits = 0;

    // Loop through the courses and filter based on the subject
    courses.forEach(course => {
        const subjectMatch = filter === "all" || course.subject.toLowerCase() === filter.toLowerCase();

        if (subjectMatch) {
            const li = document.createElement("li");
            li.innerHTML = `
                <h3>${course.subject} ${course.number}: ${course.title}</h3>
                <p><strong>Certificate:</strong> ${course.certificate}</p>
                <p><strong>Description:</strong> ${course.description}</p>
                <p><strong>Credits:</strong> ${course.credits}</p>
                <p><strong>Technologies:</strong> ${course.technology.join(', ')}</p>
            `;

            if (course.completed) {
                li.classList.add("completed");
            }

            courseList.appendChild(li);
            totalCredits += course.credits;
        }
    });

    // Update total credits
    totalCreditsSpan.textContent = totalCredits;
}

// Add Event Listeners for Filter Buttons
document.getElementById("all-courses").addEventListener("click", () => renderCourseList("all"));
document.getElementById("wdd-courses").addEventListener("click", () => renderCourseList("WDD"));
document.getElementById("cse-courses").addEventListener("click", () => renderCourseList("CSE"));

// Initialize the page
displayDates();
renderCourseList("all");

// Render Course List with Completed Courses Marked
function renderCourseList(filter = "all") {
    const courseList = document.getElementById("course-list");
    courseList.innerHTML = "";
    let totalCredits = 0;

    courses.forEach(course => {
        if (filter === "all" || course.subject === filter) {
            const li = document.createElement("li");
            li.innerHTML = `
                <h3>${course.subject} ${course.number}: ${course.title}</h3>
                <p><strong>Credits:</strong> ${course.credits}</p>
            `;
            if (course.completed) li.classList.add("completed");
            courseList.appendChild(li);
            totalCredits += course.credits;
        }
    });

    document.getElementById("totalCredits").textContent = totalCredits;
}

// Hamburger Menu Toggle
document.getElementById("menu-toggle").addEventListener("click", () => {
    document.getElementById("main-nav").classList.toggle("active");
});

renderCourseList("all");