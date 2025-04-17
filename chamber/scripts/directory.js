document.getElementById("current-year").textContent = new Date().getFullYear();

const memberList = document.getElementById("member-list");
const gridViewBtn = document.getElementById("grid-view-btn");
const listViewBtn = document.getElementById("list-view-btn");

const members = [
    { name: "Business One", info: "Leading provider of tech solutions" },
    { name: "Company Two", info: "Experts in logistics and transport" }
];

function displayMembers(view) {
    memberList.innerHTML = "";
    members.forEach(member => {
        const memberCard = document.createElement("div");
        memberCard.classList.add("member-card");
        memberCard.innerHTML = `<h3>${member.name}</h3><p>${member.info}</p>`;
        memberList.appendChild(memberCard);
    });
    memberList.className = view;
}

gridViewBtn.addEventListener("click", () => displayMembers("grid"));
listViewBtn.addEventListener("click", () => displayMembers("list"));

displayMembers("grid");
