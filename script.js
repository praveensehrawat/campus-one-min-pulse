const today = new Date();
document.getElementById("todayDate").innerText = today.toDateString();

// ---------- Mess Menu (Dynamic by Day) ----------
const menuByDay = {
    Monday: "Dal, Rice, Roti",
    Tuesday: "Rajma, Rice",
    Wednesday: "Pulao, Raita",
    Thursday: "Chole, Bhature",
    Friday: "Fried Rice, Manchurian",
    Saturday: "Paneer Curry, Roti",
    Sunday: "Special Thali"
};

const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
document.getElementById("menuText").innerText = menuByDay[dayName];
// ---------- Snapshot Priority Tag ----------
const snapshotText = document.getElementById("snapshotNotice").innerText.toLowerCase();
const snapshotTag = document.getElementById("snapshotTag");

if (snapshotText.includes("submit") || snapshotText.includes("deadline")) {
    snapshotTag.innerText = "Urgent";
    snapshotTag.className = "tag urgent";
}
else if (snapshotText.includes("meeting") || snapshotText.includes("event")) {
    snapshotTag.innerText = "Important";
    snapshotTag.className = "tag important";
}
else {
    snapshotTag.innerText = "FYI";
    snapshotTag.className = "tag fyi";
}


// ---------- Personalization ----------
const studentType = document.getElementById("studentType");
const messMenu = document.getElementById("messMenu");
const messIntelligence = document.getElementById("messIntelligence");

studentType.addEventListener("change", () => {
    if (studentType.value === "dayscholar") {
        messMenu.style.display = "none";
        messIntelligence.style.display = "none";
    } else {
        messMenu.style.display = "block";
        messIntelligence.style.display = "block";
    }
});


// ---------- Mail Summarizer ----------
let currentTagClass = "fyi";

function summarizeEmail() {
    const text = document.getElementById("emailInput").value.toLowerCase();
    const output = document.getElementById("summaryOutput");
    const editor = document.getElementById("priorityEditor");

    if (!text.trim()) {
        output.innerHTML = "<p>Please paste an email first.</p>";
        editor.classList.add("hidden");
        return;
    }

    // --- Action extraction ---
    let action = "Read the notice";
    if (text.includes("submit")) action = "Submit assignment";
    else if (text.includes("exam")) action = "Prepare for exam";
    else if (text.includes("meeting")) action = "Attend meeting";
    else if (text.includes("event")) action = "Attend event";

    // --- Time extraction ---
    let when = "No specific time mentioned";
    if (text.includes("today")) when = "Today";
    else if (text.includes("tomorrow")) when = "Tomorrow";
    else if (text.includes("friday")) when = "By Friday";
    else if (text.includes("monday")) when = "By Monday";

    // --- Priority inference ---
    let priorityText = "FYI";
    currentTagClass = "fyi";

    if (text.includes("deadline") || text.includes("submit") || text.includes("exam")) {
        priorityText = "Urgent";
        currentTagClass = "urgent";
    } else if (text.includes("meeting") || text.includes("event")) {
        priorityText = "Important";
        currentTagClass = "important";
    }

    output.innerHTML = `
        <div class="summary-box">
            <p><strong>Action:</strong> ${action}</p>
            <p><strong>When:</strong> ${when}</p>
            <p><strong>Why:</strong> Keyword-based intent detected</p>
            <span id="summaryTag" class="tag ${currentTagClass}">${priorityText}</span>
        </div>
    `;

    // Show editor + sync dropdown
    document.getElementById("prioritySelect").value = currentTagClass;
    editor.classList.remove("hidden");

    // Category detection
let category = "General";
if (text.includes("exam") || text.includes("assignment")) category = "Academic";
else if (text.includes("event") || text.includes("fest")) category = "Event";
else if (text.includes("urgent")) category = "Urgent";

// Spam detection
let spamNote = "";
if (text.includes("buy now") || text.includes("offer")) {
    spamNote = "<p class='info-bad'>⚠️ Possible spam detected</p>";
}

// Deadline extraction (simple)
let deadline = "Not mentioned";
if (text.includes("today")) deadline = "Today";
else if (text.includes("tomorrow")) deadline = "Tomorrow";

document.getElementById("summaryOutput").innerHTML += `
    <p><strong>Category:</strong> ${category}</p>
    <p><strong>Deadline:</strong> ${deadline}</p>
    ${spamNote}
`;
}

// --- Editable Priority ---
function updatePriority() {
    const select = document.getElementById("prioritySelect");
    const tag = document.getElementById("summaryTag");

    currentTagClass = select.value;

    tag.className = `tag ${currentTagClass}`;
    tag.innerText =
        currentTagClass === "urgent" ? "Urgent" :
        currentTagClass === "important" ? "Important" : "FYI";
}


// ---------- Emergency ----------
function toggleEmergency() {
    document.getElementById("emergencyBox").classList.toggle("hidden");
}
function updateMealInsights() {
    const diet = document.getElementById("dietFilter").value;

    document.getElementById("nutritionInfo").innerText =
        diet === "protein"
        ? "Nutrition: High Protein (650 kcal)"
        : "Nutrition: Balanced Meal (500 kcal)";

    document.getElementById("allergenInfo").innerText =
        "Allergens: Contains dairy";

    document.getElementById("popularityInfo").innerText =
        "Popularity: 🔥 Trending Today";

    document.getElementById("crowdInfo").innerHTML =
        "Predicted Crowd: <span class='info-warn'>Medium</span>";

    document.getElementById("mealRecommendation").innerHTML =
        "Recommended for you: Eat before <strong>1 PM</strong> to avoid rush";
}

// Auto-run on load
updateMealInsights();
// ===============================
// 🏫 Campus Live Pulse Logic
// ===============================

// Weather & Utilities (Mock Data)
document.getElementById("weatherStatus").innerText = "Sunny, 28°C";
document.getElementById("wifiStatus").innerHTML = "<span class='info-good'>Stable</span>";
document.getElementById("powerStatus").innerHTML = "<span class='info-good'>Available</span>";

// Announcements Feed
const announcements = [
    "Mid-term exams start next week",
    "Cultural fest registrations open",
    "Library closed on Sunday"
];

const list = document.getElementById("announcementList");

announcements.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item;
    list.appendChild(li);
});

// Event Countdown Timer
const eventDate = new Date();
eventDate.setDate(eventDate.getDate() + 3); // Event in 3 days

setInterval(() => {
    const now = new Date();
    const diff = eventDate - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    document.getElementById("eventTimer").innerText =
        `${days} days left for Cultural Fest 🎉`;
}, 1000);

