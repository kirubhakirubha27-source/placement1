// Student
let student = JSON.parse(localStorage.getItem("student")) || {name:"Kirubha",branch:"CSE",cgpa:8.2};

// Companies with logos

let companies = [
  {name:"TCS",logo:"https://upload.wikimedia.org/wikipedia/commons/6/65/Tata_Consultancy_Services_Logo.svg"},
  {name:"Infosys",logo:"https://upload.wikimedia.org/wikipedia/commons/1/10/Infosys_logo.svg"},
  {name:"Wipro",logo:"https://upload.wikimedia.org/wikipedia/commons/5/51/Wipro_logo.svg"},
  {name:"Amazon",logo:"https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"},
  {name:"Google",logo:"https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"},
  {name:"Microsoft",logo:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"},
  {name:"Oracle",logo:"https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg"},
  {name:"Capgemini",logo:"https://upload.wikimedia.org/wikipedia/commons/3/3a/Capgemini_logo.svg"},
  {name:"Cognizant",logo:"https://upload.wikimedia.org/wikipedia/commons/3/3f/Cognizant_logo.svg"},
  {name:"SAP",logo:"https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg"}
];


// Jobs
let jobs = [
  {company:"TCS", role:"Software Engineer", cgpa:6, branches:["CSE","IT"]},
  {company:"Amazon", role:"Data Analyst", cgpa:8, branches:["CSE"]},
  {company:"Wipro", role:"System Engineer", cgpa:7, branches:["CSE","ECE","IT"]},
  {company:"Google", role:"ML Engineer", cgpa:9, branches:["CSE","IT"]},
  {company:"Infosys", role:"Backend Developer", cgpa:7, branches:["CSE","ECE"]},
  {company:"Microsoft", role:"Cloud Engineer", cgpa:7.5, branches:["CSE","IT"]},
  {company:"Oracle", role:"Database Admin", cgpa:7, branches:["CSE","IT"]},
  {company:"Capgemini", role:"Frontend Developer", cgpa:6.5, branches:["CSE","IT"]},
  {company:"Cognizant", role:"Backend Developer", cgpa:7, branches:["CSE","ECE"]},
  {company:"SAP", role:"Business Analyst", cgpa:8, branches:["CSE","IT","ECE"]}
];

// Show profile
document.getElementById("studentName").innerText=student.name;
document.getElementById("studentBranch").innerText=student.branch;
document.getElementById("studentCGPA").innerText=student.cgpa;

// Sections
function showSection(id){
document.querySelectorAll('.section').forEach(s=>s.style.display='none');
document.getElementById(id).style.display='block';
if(id==='jobs') filterJobs();
}

// Companies display with logos
let companyList=document.getElementById("companyList");
function displayCompanies(list){
companyList.innerHTML="";
list.forEach(c=>{
let div=document.createElement("div");
div.className="companyCard";
div.innerHTML=`<img src="${c.logo}" alt="${c.name}"><br>${c.name}`;
companyList.appendChild(div);
});
}
displayCompanies(companies);

// Company search
function searchCompany(){
let key=document.getElementById("searchCompany").value.toLowerCase();
let filtered=companies.filter(c=>c.name.toLowerCase().includes(key));
displayCompanies(filtered);
}

// Edit profile
function editProfile(){
document.getElementById("editForm").style.display='block';
document.getElementById("editName").value=student.name;
document.getElementById("editBranch").value=student.branch;
document.getElementById("editCGPA").value=student.cgpa;
}
function saveProfile(){
student.name=document.getElementById("editName").value;
student.branch=document.getElementById("editBranch").value.toUpperCase();
student.cgpa=parseFloat(document.getElementById("editCGPA").value);
localStorage.setItem("student",JSON.stringify(student));
document.getElementById("studentName").innerText=student.name;
document.getElementById("studentBranch").innerText=student.branch;
document.getElementById("studentCGPA").innerText=student.cgpa;
document.getElementById("editForm").style.display='none';
showNotification("Profile updated successfully");
filterJobs();
}

// Jobs display with AI suggestions
let jobContainer=document.getElementById("jobContainer");
function filterJobs(){
let branch=document.getElementById("filterBranch")?.value || "";
let minCgpa=parseFloat(document.getElementById("filterCGPA")?.value) || 0;

jobContainer.innerHTML="";
let filtered=jobs.filter(j=>{
let eligible=(student.cgpa>=j.cgpa && j.branches.includes(student.branch));
let branchFilter=branch? j.branches.includes(branch):true;
let cgpaFilter=j.cgpa>=minCgpa;
return branchFilter && cgpaFilter;
});
// AI suggested: eligible jobs on top
filtered.sort((a,b)=>{
let scoreA=(student.cgpa>=a.cgpa && a.branches.includes(student.branch))?1:0;
let scoreB=(student.cgpa>=b.cgpa && b.branches.includes(student.branch))?1:0;
return scoreB-scoreA;
});
filtered.forEach((job,index)=>{
let eligible=(student.cgpa>=job.cgpa && job.branches.includes(student.branch));
let div=document.createElement("div");
div.className="jobCard"+(index<3 && eligible?" top-suggestion":""); // top 3 eligible AI suggested
div.innerHTML=`
<h3>${job.role}</h3>
<p><b>Company:</b> ${job.company}</p>
<p><b>Required CGPA:</b> ${job.cgpa}</p>
<p class="${eligible?'eligible':'notEligible'}">${eligible?'Eligible':'Not Eligible'}</p>
<button class="applyBtn" ${!eligible?'disabled':''} onclick="applyJob('${job.role}')">Apply</button>
`;
jobContainer.appendChild(div);
});
}

// Apply job with notification
function applyJob(role){
showNotification("Applied for "+role+" successfully!");
}

// Notification popup
function showNotification(msg){
let notif=document.getElementById("notification");
notif.innerText=msg;
notif.style.display="block";
setTimeout(()=>{notif.style.display="none";},3000);
}

// Placement stats (bar chart)
let ctx=document.getElementById("chart");
if(ctx){
let chart=new Chart(ctx,{type:'bar',data:{
labels:companies.map(c=>c.name),
datasets:[{label:'Jobs Available',data:companies.map(c=>Math.floor(Math.random()*5)+1),backgroundColor:'rgba(54, 162, 235, 0.7)'}]
},options:{responsive:true,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true}}}});
}

function logout() {
  // Clear stored student data
  localStorage.removeItem("student");

  // Redirect to login page
  window.location.href = "login.html";
}

function showNotification(message){
    // Create notification div
    let notif = document.createElement("div");
    notif.className = "notification";
    notif.innerText = message;
    
    document.body.appendChild(notif);
    
    // Remove after 3 seconds (matches animation)
    setTimeout(() => {
        notif.remove();
    }, 3000);
}
// Initialize jobs section
showSection('profile');

console.log(job); 


function applyJob(job){
    if(!job || !job.company || !job.role){
        console.error("Job object is invalid", job);
        return;
    }

    showNotification(`Applied to ${job.role} at ${job.company} successfully!`);

    let applications = JSON.parse(localStorage.getItem("applications")) || [];
    applications.push(job);
    localStorage.setItem("applications", JSON.stringify(applications));
}

filtered.forEach((job,index)=>{
    let eligible=(student.cgpa>=job.cgpa && job.branches.includes(student.branch));
    let div=document.createElement("div");
    div.className="jobCard"+(index<3 && eligible?" top-suggestion":""); // top 3 eligible AI suggested
    
    // Job details
    let title = document.createElement("h3");
    title.innerText = job.role;
    div.appendChild(title);

    let company = document.createElement("p");
    company.innerHTML = `<b>Company:</b> ${job.company}`;
    div.appendChild(company);

    let cgpa = document.createElement("p");
    cgpa.innerHTML = `<b>Required CGPA:</b> ${job.cgpa}`;
    div.appendChild(cgpa);

    let eligibility = document.createElement("p");
    eligibility.className = eligible?'eligible':'notEligible';
    eligibility.innerText = eligible?'Eligible':'Not Eligible';
    div.appendChild(eligibility);

    // Apply button
    let btn = document.createElement("button");
    btn.innerText = "Apply";
    btn.className = "applyBtn";
    if(!eligible) btn.disabled = true;

    btn.onclick = () => applyJob(job); // ✅ pass the whole job object
    div.appendChild(btn);

    jobContainer.appendChild(div);
});
function showNotification(msg){
    // Create notification div
    let notif = document.createElement("div");
    notif.className = "notification"; // make sure this class exists in CSS
    notif.innerText = msg;

    document.body.appendChild(notif);

    // Remove after 3 seconds
    setTimeout(() => {
        notif.remove();
    }, 3000);
}