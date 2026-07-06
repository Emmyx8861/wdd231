const courses = [
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'WDD', number: 131, title: 'Web Frontend Development I', credits: 2, completed: true },
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 3, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 3, completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 3, completed: false },
    { subject: 'WDD', number: 231, title: 'Web Frontend Development II', credits: 3, completed: false }
];

const courseGrid = document.querySelector('.course-grid');
const totalCreditsElement = document.querySelector('#total-credits');
const filterButtons = document.querySelectorAll('.filter-buttons .btn');

function displayCourses(filteredCourses) {
    courseGrid.innerHTML = '';
    
    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.textContent = `${course.subject} ${course.number}`;
        
        if (course.completed) {
            card.classList.add('completed');
        }
        
        courseGrid.appendChild(card);
    });

    calculateTotalCredits(filteredCourses);
}

function calculateTotalCredits(filteredCourses) {
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsElement.textContent = `The total credits for courses listed above is ${totalCredits}`;
}

filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        document.querySelector('.filter-buttons .btn.active').classList.remove('active');
        e.target.classList.add('active');
        
        const filterType = e.target.textContent;

        if (filterType === 'All') {
            displayCourses(courses);
        } else {
            const currentSelection = courses.filter(course => course.subject === filterType);
            displayCourses(currentSelection);
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    displayCourses(courses);
});
