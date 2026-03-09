const issuesContainer = document.getElementById("issuesContainer");
const loadingSpinner = document.getElementById("loadingSpinner");

// modal
const modalTitle = document.getElementById("modalTitle");
const modalStatus = document.getElementById("modalStatus");
const modalAuthor = document.getElementById("modalAuthor");
const modalDate = document.getElementById("modalDate");
const modalLabels = document.getElementById("modalLabels");
const modalDescription =document.getElementById("modalDescription");
const modalAssignee = document.getElementById("modalAssignee");
const modalPriority = document.getElementById("modalPriority");


let allIssues = [];

// spinner function
function showLoading(){
    console.log(loadingSpinner);
    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("flex");
    issuesContainer.innerHTML = "";
}

function hideLoading(){
    loadingSpinner.classList.add("hidden");
    loadingSpinner.classList.remove("flex");
}


// all button function()
async function loadIssues() {
    showLoading();

   const res =  await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();

    allIssues = data.data;
    console.log(data);
    loadingSpinner.classList.add("hidden");
    displayIssues(allIssues);    
}

// toggle function is used here
function toggle(tab){
    const allBtn = document.getElementById("allBtn");
    const openBtn = document.getElementById("openBtn");
    const closedBtn = document.getElementById("closedBtn");

    allBtn.classList.remove("bg-[#4A00FF]",);
    allBtn.classList.add("text-[#64748B]");
    openBtn.classList.remove("bg-[#4A00FF]", "text-white");
    closedBtn.classList.remove("bg-[#4A00FF]", "text-white");

    const currentTab = document.getElementById(tab);
    currentTab.classList.add("bg-[#4A00FF]", "text-white");

    // here filtering is used
    let filteredIssues = [];

    if(tab === "allBtn"){
        filteredIssues = allIssues;
    }
    else if(tab === "openBtn"){
        filteredIssues = allIssues.filter(issue => issue.status === "open");
    }
    else if(tab === "closedBtn"){
        filteredIssues = allIssues.filter(issue => issue.status === "closed");
    }

    issuesContainer.innerHTML = "";
    displayIssues(filteredIssues);
}


// {
//     "id": 11,
//     "title": "Create API documentation",
//     "description": "Generate comprehensive API documentation using Swagger or similar tool.",
//     "status": "open",
//     "labels": [
//         "documentation",
//         "help wanted"
//     ],
//     "priority": "medium",
//     "author": "mike_docs",
//     "assignee": "",
//     "createdAt": "2024-01-22T09:30:00Z",
//     "updatedAt": "2024-01-22T09:30:00Z"
// }


// display issue part
function displayIssues(issues){
    console.log(issues);
    const issueContainer = document.getElementById("issuesContainer");
    issueContainer.innerHTML = "";
    issues.forEach(issue => {
        const div =document.createElement("div");

        const borderColor = issue.status === 'open' ? 'border-t-[#00A96E]' : 'border-t-[#A855F7]';
        div.innerHTML = ` <div class="CardContainerHIGH w-full h-full border border-[#64748B]  border-t-4 ${borderColor}  px-4">

            <div class="HIGHcard flex items-center mt-4 justify-between w-full ">
               <div class="cardHeaderImg">
              <img src="${issue.status === 'open' ? 'assets/Open-Status.png' : 'assets/Closed-Status.png'}" 
                    alt="${issue.status}" class="w-6 h-6">
                </div>
                <div class="btnHigh">
                    <button class="cardButton bg-[#FEECEC] text-[#EF4444] text-center font-medium text-xs rounded-xl px-4 py-1">
                   ${issue.priority}
                </button>
                </div>

            </div>
            <div class="HIGHcardMain">
                <p class="font-semibold text-[14px] text-[#1F2937] mt-2 mb-1" onclick="openIssueModal(${issue.id})">
                ${issue.title}</p>
                <p class="font-normal text-[12px] text-[#64748B]">
                    ${issue.description}
                </p>
            </div>

            <div class="MainButtonContainer flex justify-start gap-2 mt-3">
            
                <div class="HIGHcardMainButton1 flex items-center gap-1 rounded-full border border-[#EF4444] px-1 py-1">
                <div class="HIGHcardMainButton1Icon text-[#EF4444] ">
                     <i class="fa-solid fa-bug"></i>
                </div>
                <div class="HIGHcardMainButton1Name text-[#EF4444] text-xs font-medium">
                    <p>${issue.labels[0]}</p>
                </div>
            </div>
            <div class="HIGHcardMainButton2 flex items-center gap-1 rounded-full border border-[#D97706] px-2 py-1">
                <div class="HIGHcardMainButton2Icon text-[#D97706]">
                    <i class="fa-solid fa-life-ring"></i>
                </div>
                <div class="HIGHcardMainButton2Name text-[#D97706] text-xs font-medium">
                    <p>${issue.labels[1]}</p>
                </div>
            </div>
            </div>

            <div class="HIGHcardMainBottom mt-5 mb-5">
                <p class="pb-1 text-xs text-[#64748B] ">${issue.author}</p>
                <p class="text-xs text-[#64748B]">${issue.createdAt}</p>
            </div>     
        </div>`
        div.querySelector('.CardContainerHIGH').addEventListener('click', () => {
        openIssueModal(issue.id);});
        
    issueContainer.append(div);
    });
}

async function openIssueModal(issueId){

    console.log(issueId,"issueId");
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`);
    
    const data = await res.json();
    const issueDetails = data.data;
    issueDetailsModal.showModal();
    
    modalTitle.textContent = issueDetails.title;
    modalDescription.textContent = issueDetails.description;
    modalAuthor.textContent = issueDetails.author;
    modalDate.textContent = issueDetails.createdAt;
    modalAssignee.textContent = issueDetails.assignee || "Not Assigned";
    modalPriority.textContent = issueDetails.priority;
    modalStatus.textContent = issueDetails.status;

    // Open vs closed bg

    if(issueDetails.status === 'open') {
        modalStatus.className = "bg-[#00A96E] text-white px-3 py-1 rounded-full text-xs font-medium";
        } else {
        modalStatus.className = "bg-[#A855F7] text-white px-3 py-1 rounded-full text-xs font-medium";
    }

    // High , Medium, Low
    modalPriority.className = "text-white text-xs px-3 py-1 rounded-full font-medium";
    if(issueDetails.priority === 'high') {
        modalPriority.classList.add("bg-[#EF4444]");
        } else if(issueDetails.priority === 'medium') {
        modalPriority.classList.add("bg-[#F59E0B]");
         } else {
        modalPriority.classList.add("bg-[#64748B]");
        }

    console.log(issueDetails);
    }
    
    //search function
    async function handleSearch(event) {
    event.preventDefault();

    const searchInput = document.getElementById("searchInput");
    const searchText = searchInput.value.trim();

    if (searchText === "") {
        loadIssues();
        return;
    }

    showLoading();

    try {
        const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`);
        const data = await res.json();
        
        if (data.data.length > 0) {
            displayIssues(data.data);
        } else {
            issuesContainer.innerHTML = `<p class="col-span-full text-center py-10 text-gray-500">No issues found for "${searchText}"</p>`;
        }
    } catch (error) {
        console.log("Error searching issues:", error);
    } finally {
        hideLoading();
    }
    }

    document.getElementById("searchForm").addEventListener("submit", handleSearch);

    loadIssues();

 

