let companies=[
{id:1,name:"TCS"},
{id:2,name:"Infosys"},
{id:3,name:"Wipro"},
{id:4,name:"L&T"},
{id:5,name:"Google"}
];

let jobs=[

{id:1,companyId:1,title:"Software Engineer",cgpa:7,branches:["CSE","IT"],salary:"6 LPA"},

{id:2,companyId:2,title:"System Engineer",cgpa:6.5,branches:["CSE","ECE"],salary:"5 LPA"},

{id:3,companyId:3,title:"Backend Developer",cgpa:7,branches:["CSE"],salary:"7 LPA"},

{id:4,companyId:4,title:"Mechanical Engineer",cgpa:7,branches:["MECH"],salary:"7 LPA"}

];

let student=JSON.parse(localStorage.getItem("student"));
let applications=JSON.parse(localStorage.getItem("applications"))||[];


/* SAVE PROFILE */

function saveProfile(){

let name=document.getElementById("name").value;
let branch=document.getElementById("branch").value.toUpperCase();
let cgpa=parseFloat(document.getElementById("cgpa").value);

student={name,branch,cgpa};

localStorage.setItem("student",JSON.stringify(student));

showProfile();

}


/* SHOW PROFILE */

function showProfile(){

if(!student) return;

document.getElementById("profilePreview").innerHTML=

`<p><b>${student.name}</b></p>
<p>Branch: ${student.branch}</p>
<p>CGPA: ${student.cgpa}</p>`;

}


/* SHOW COMPANIES */

if(document.getElementById("companyList")){

displayCompanies(companies);

}


function displayCompanies(list){

let container=document.getElementById("companyList");

container.innerHTML="";

list.forEach(c=>{

let div=document.createElement("div");

div.className="card";

div.innerHTML=

`
<h3>${c.name}</h3>
<button onclick="openJobs(${c.id})">View Jobs</button>
`;

container.appendChild(div);

});

}


/* SEARCH COMPANY */

function searchCompany(){

let key=document.getElementById("search").value.toLowerCase();

let filtered=companies.filter(c=>c.name.toLowerCase().includes(key));

displayCompanies(filtered);

}


/* OPEN JOB PAGE */

function openJobs(id){

localStorage.setItem("companyId",id);

window.location="jobs.html";

}


/* JOB PAGE */

if(document.getElementById("jobs")){

let companyId=localStorage.getItem("companyId");

let container=document.getElementById("jobs");

let companyJobs=jobs.filter(j=>j.companyId==companyId);

companyJobs.forEach(job=>{

let eligible=false;

if(student){

if(student.cgpa>=job.cgpa && job.branches.includes(student.branch))
eligible=true;

}

let div=document.createElement("div");

div.className="card";

div.innerHTML=

`
<h3>${job.title}</h3>

<p>Salary: ${job.salary}</p>

<p class="${eligible?'eligible':'noteligible'}">
${eligible?'Eligible':'Not Eligible'}
</p>

<button ${!eligible?'disabled':''} onclick="apply(${job.id})">
Apply
</button>
`;

container.appendChild(div);

});

showApplications();

}


/* APPLY */

function apply(id){

if(applications.some(a=>a.jobId===id)){

alert("Already applied");
return;

}

let job=jobs.find(j=>j.id===id);

applications.push({jobId:id,title:job.title});

localStorage.setItem("applications",JSON.stringify(applications));

showApplications();

alert("Application submitted");

}


/* SHOW APPLICATIONS */

function showApplications(){

let list=document.getElementById("applications");

if(!list) return;

list.innerHTML="";

applications.forEach(a=>{

let li=document.createElement("li");

li.innerText=a.title;

list.appendChild(li);

});

}

showProfile();