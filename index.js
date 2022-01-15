globaldetails=[];
const cardinsert=()=>{
    const formdetails={
        id:`${Date.now()}`,
        url: document.getElementById("imageURL").value,
        title: document.getElementById("Tasktitle").value,
        type: document.getElementById("taskType").value,
        description:document.getElementById("textar").value
    };
    taskContents=document.getElementById("taskContents");
    taskContents.insertAdjacentHTML('beforeend',makecard(formdetails))   

    globaldetails.push(formdetails);
    localstoragesave(globaldetails);    
}

const makecard=({id,url,title,type,description})=>
        `<div class="col-md-6 col-lg-4 mt-3" id="${id}" key="${id}">
    <div class="card">
        <div class="card-header">
            <div class="d-flex justify-content-end" >
                <button class="btn btn-outline-info" onclick="editTask(this)" name=${id}><i class="fas fa-pencil-alt" onclick="editTask(this)" name=${id}></i></button>
                <button class="btn btn-outline-danger" onclick="removeTask(this) saveEditTask(this)" name=${id}><i class="fas fa-trash-alt" onclick="removeTask(this)" name=${id}></i></button>
            </div>
        </div>
        <img src=${url} alt="image" class="card-img-top" height="200px">
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${description}</p>
            <span class="badge bg-primary">${type}</span>
        </div>
        <div class="card-footer">
            <button class="btn btn-outline-primary float-end">OPEN TASK</button>
        </div>
    </div>
</div>`
const localstoragesave=()=>{
    localStorage.setItem("Items",JSON.stringify({details:globaldetails}));
}
const reloadstoragesave=()=>{
    const lstrcopy=JSON.parse(localStorage.getItem("Items"));
    if(lstrcopy){
        globaldetails=lstrcopy["details"];
    }
    globaldetails.map((e)=>{
        taskContents.insertAdjacentHTML('beforeend',makecard(e));
    })
}
const removeTask=(e)=>{
    const targetid=e.getAttribute("name");
    const deleteTask=globaldetails.filter((card)=>{
        card.id!=targetid
    })
    globaldetails=deleteTask;
    localstoragesave();
    window.location.reload;
}
const editTask=(e)=>{
    const targetid=e.getAttribute("name");
    // console.log(targetid)
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable","true")
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable","true")
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5].setAttribute("contenteditable","true")
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].innerHTML="Save Changes";
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("onclick","saveEditTask(this)");
}
const saveEditTask=(e)=>{
    const target_id=e.getAttribute("name");
    console.log(target_id)
    // const tit=e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1]
    // console.log(tit)
    // const descp=e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3]
    // const typ=e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5]
    // const submit=e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1]
    // const updateddata={
    //     title:tit,
    //     type:typ,
    //     description:descp,
    // }
    //  globaldetails.foreach((e)=>{
    //      if(e.id==targetid){
    //          return {...e,...updateddata};
    //      }
    //      return e;
    //  })
    //  localstoragesave();
    //  e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable","false")
    // e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable","false")
    // e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5].setAttribute("contenteditable","false")
    // e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].innerHTML="Open Task";
}