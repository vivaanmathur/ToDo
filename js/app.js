const baseURL = "./server";

// Authentication management
// Check if session storage contains the value email 
if(sessionStorage.getItem('email') != null){
    // If it does, set the value of the email input to the value of the email session storage
    var email = sessionStorage.getItem("email");
  $("#email").html(email);
  console.log("Welcome, " + email + "!");
  console.log($("#email").html() + " profile column created!");
  }
  else{
    console.log("Warning! Not signed in. Redirecting to the auth page.");
    window.location.href="../";
  }
  
  $("#logoutbtn").click(function(e){
    e.preventDefault();
    sessionStorage.clear();
    console.log("Logging out. Deleting the cookie.");
    window.location.href="../";
  
  });


    
  
  $(document).ready(function(){
    showslists();
    
    
    });

  // Preventing default forms from submitting.
  
  // New List Form

  
  $("#createbtn").click(function(e){
    e.preventDefault();
    var newlistname = $("#newlistid").val();
  
    console.log("Creating a new list...");
    if(validate(newlistname)){
     
   createnewlist(newlistname);
    } 
  });

  // New Task Form


  
  $("#newTaskForm").submit(function(e){
    e.preventDefault();
  
    iqwerty.toast.toast("Please click the Create Task button to proceed.");
    console.log("The incorrect button was pressed to create a new task.")
  });

  //  Edit the Task Form

  
  $("#editTaskForm").submit(function(e){
    e.preventDefault();
  
    iqwerty.toast.toast("Please click the Edit Task button to proceed.");
    console.log("The incorrect button was pressed to edit an existing task.")
  });

  //  Edit the List Form

  
  $("#editListModalForm").submit(function(e){
    e.preventDefault();
  
    iqwerty.toast.toast("Please click the Edit List button to proceed.");
    console.log("The incorrect button was pressed to edit an existing list.")
  });

  // Validate fields
  
  
  function validate(listname){
  console.log("Validating...")
    if(listname == ""){
      iqwerty.toast.toast("Please make you have filled all boxes..");
      console.log("Could not validate..")
      return false;
    }
    else{
    console.log("Validation successful..");
    return true;
    }
    }
    
  // Reads

  // Show all lists
  
    function showslists(){
      var email = sessionStorage.getItem("email");
  
  console.log("Showing all lists....");
  $.ajax({
  url: baseURL + "/showslists.php",
  method: "POST",
  data: {
    email: email
  }, async : true,
  beforeSend: function(){
  
    $('#spinner').addClass('show');
  
  console.log("Loading spinner.");
  }
  }).then(function(data){
  
    $('#spinner').removeClass('show');
  if(data == "No lists. Please create a new list."){
    $("#userlists").html(data);
    console.log("Error loading lists." + data);
  
  }
  else{
   
  $('#newForm').removeClass('show');
  
  const dataray = JSON.parse(data);
  console.log(dataray);
  $("#userlists").html("");
  
  dataray.forEach(function(rowdata){
  
  let str = `
  <li class="nav-item">
                          <span  class="nav-link align-middle px-0" >
                          <a href="#" onClick="loadData(${rowdata.ID})">
                              <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline text-white"><b>
                                ${rowdata.Name}
                                </b></span>
                        </a>
                      <a href="#" onClick="EditList(${rowdata.ID})">  <ion-icon name="pencil" class="text-warning  " ></ion-icon></a>
                 
                 <a href="#"  onClick="deleteList(${rowdata.ID})">       <ion-icon name="trash" class="text-danger "></ion-icon></a>
              
                          </span>
                               </li>
    `;
    $("#userlists").append(str);
  console.log(rowdata + " Appended.");
  })
  
  
  
  }
  });
  
  }

  // Reads all the tasks.

  function loadData(listid){
    var email = sessionStorage.getItem("email");
  
  console.log("Showing all tasks....");
  $.ajax({
  url: baseURL + "/showstasks.php",
  method: "POST",
  data: {
    email: email,
    list: listid
  }, async : true,
  beforeSend: function(){
    console.log("removing task form.")
    $("#newTaskForm").removeClass("show");
    $('#spinnertwo').addClass('show');
  console.log("Loading spinner.");
  }
  }).then(function(data){
  
    $('#spinnertwo').removeClass('show');
  if(data == "No tasks. Please create a new task."){
    $("#contentlists").html(data);
    console.log("Error loading tasks.." + data);
  
  }
  else{
   
  console.log(data);
  const dataray = JSON.parse(data);
  console.log(dataray);
  $("#contentlists").html("");
  let tab = `
  <h3>Your tasks</h3>
  <ol class="list-group" id="listBody">
  
  
  </ol>
<div id="moretasks">
 <a onClick="showMoreTasks();" href="#" class="text-right"> Show more tasks..</a>
 </div>
      `
  $("#contentlists").html(tab);
  dataray.forEach(function(rowdata){
  
  let str = `
          <li  class="list-group-item" >
               ${rowdata.Name} <button class="btn btn-warning" onClick="EditTask(' ${rowdata.ID} ')"><ion-icon name="pencil"></ion-icon></button> 
                 <button onClick="cDelete(' ${rowdata.ID} ')" class="btn btn-danger "><ion-icon name="trash"></ion-icon></button> 
          <br><span class="text-muted"> Due:
   ${rowdata.DueDate} </span> 
  <input type="range" class="form-range" min="0" max="100" value="${rowdata.PROGRESS}" onChange="ChangeProgress('${rowdata.ID}',this.value)">
        
                 
          </li> 
    `;
    $("#listBody").append(str);
  console.log(rowdata + "Appended.");
  });
  
  
  
  
  }
  
  window.listID = listid;
  console.log("Showing task form.")
  $("#newTaskForm").collapse("show");
  });
  
    
  
  
  }

  
// Shows more tasks...

function showMoreTasks(){
  var email = sessionStorage.getItem("email");
  var listid = window.listID;

  console.log("Showing more tasks....");

  $.ajax({
    url: baseURL + "/showsmoretasks.php",
    method: "POST",
    data: {
      email: email,
      list: listid
    }, async : true,
    beforeSend: function(){
      $('#spinnertwo').addClass('show');
    console.log("Loading spinner.");
    }
    }).then(function(data){
    
      $('#spinnertwo').removeClass('show');
    if(data == "No more tasks."){
      console.log("No More Tasks!.." + data);
    
    }
    else{
     
    console.log(data);
    const dataray = JSON.parse(data);
    console.log(dataray);
    $("#moretasks").html("");
    let tab = `
    <h5>Completed / Expired tasks</h5>
    <a onClick="hideMoreTasks();" href="#" class="text-right">Hide other tasks</a>
    <ol class="list-group" id="moreBody">
    
    
    </ol>
        `
    $("#moretasks").html(tab);
    dataray.forEach(function(rowdata){
    
    let str = `
            <li  class="list-group-item" >
                 ${rowdata.Name} <button class="btn btn-warning" onClick="EditTask(' ${rowdata.ID} ')"><ion-icon name="pencil"></ion-icon></button>   
                 <button onClick="cDelete(' ${rowdata.ID} ')" class="btn btn-danger "><ion-icon name="trash"></ion-icon></button> 
            <br><span class="text-muted"> Due:
     ${rowdata.DueDate} </span> 
    <input type="range" class="form-range" min="0" max="100" value="${rowdata.PROGRESS}" onChange="ChangeProgress('${rowdata.ID}',this.value)">
          
                   
            </li> 
      `;
      $("#moreBody").append(str);
    console.log(rowdata + " Other task Appended.");
    });
    
    
    
    
    }
  });


}
// Hide other tasks
function hideMoreTasks(){
  $("#moretasks").html(' <a onClick="showMoreTasks();" href="#" class="text-right"> Show more tasks..</a>');
}
  // Creates a new list
  
    function createnewlist(newlistname){
      var email = sessionStorage.getItem("email");
      var newlistname = $("#newlistid").val();
  console.log("Creating a new list....")
  $.ajax({
  url: baseURL + "/newlist.php",
  method: "POST",
  data: {
    newlistname: newlistname,
    email: email
  }, async : true,
  beforeSend: function(){
  
    $('#spinner').addClass('show');
  console.log("Loading spinner.");
  }
  }).then(function(data){
  
    $('#spinner').removeClass('show');
  if(data == "List created successfully."){
    iqwerty.toast.toast("List was created successfully.");
  $('#newForm').removeClass('show');
  console.log("New list created!");
  $("#newlistid").val("");
  showslists();
  console.log("Make sure to open that list.");
  }
  else if(data =="A list with this name already exists. Please try again."){
    iqwerty.toast.toast(data);
    console.log("Error creating a list lists." + data);
  }
  else{
    iqwerty.toast.toast("Error.");
    console.log("Error creating new list." + data);
  }
  }).fail(function(data){
    $('#spinner').removeClass('show');
    iqwerty.toast.toast("Something went wrong. Please try again later.");
  console.log("An internal error occured.");
  });
  
  
  }

  // Creates a new task

  
  
  function createnewtask(newtaskname){
      var email = sessionStorage.getItem("email");
      var newtaskname = $("#newTaskName").val();
      var listID = window.listID;
  var description = $("#newTaskDescription").val();
  var dueDate = $("#dueDate").val();
  console.log("Creating a new task....")
  
  $.ajax({
  url: baseURL + "/newtask.php",
  method: "POST",
  data: {
    newtaskname: newtaskname,
    email: email,
    listID: listID,
    description: description,
    dueDate: dueDate
  }, async : true,
  beforeSend: function(){
  
    $('#spinnertwo').addClass('show');
  console.log("Loading spinner.");
  }
  }).then(function(data){
  
    $('#spinnertwo').removeClass('show');
  if(data == "Task created successfully."){
    iqwerty.toast.toast("Task was created successfully.");
  $('#newForm').removeClass('show');
  console.log("New task created!");
  $("#newTaskName").val("");
  $("#newTaskDescription").val("");
  $("#dueDate").val("");
  
  loadData(listID);
  }
  else{
    iqwerty.toast.toast("Error.");
    console.log("Error creating new task." + data);
  }
  }).fail(function(data){
    $('#spinnertwo').removeClass('show');
    iqwerty.toast.toast("Something went wrong. Please try again later.");
  console.log("An internal error occured.");
  });
  
  
  }
  
  

  
  $("#newTaskBtn").click(function(e){
    e.preventDefault();
    var newTaskName = $("#newTaskName").val();
  
    console.log("Creating a new task...");
    if(validate(newTaskName)){
     
   createnewtask(newTaskName);
    } 
  });

  // Loads the particular list in the edit column.
function EditList(listid){
  var email = sessionStorage.getItem("email");
  console.log("Loading list...");
  $.ajax({
  url: baseURL + "/showlist.php",
  method: "POST",
  data: {
    listid: listid,
    email: email
  }, async : true,
  beforeSend: function(){
    console.log("showing modal.");
  
    
    var listModal = new bootstrap.Modal(document.getElementById('editListModal'))
    listModal.show()
  
    $("#editListModalForm").removeClass("show");


      $('#spinnerfour').addClass('show');
    console.log("Loading spinner.");
    }
  }).then(function(data){
    $('#spinnerfour').removeClass('show');
  if(data == "No list found."){
    iqwerty.toast.toast("An error occured. Please reload the page..");
    console.log("Error loading list." + data);
  }
  else{
    console.log(data);
    const dataray = JSON.parse(data);
    console.log(dataray);
    
    $("#editListModalForm").addClass("show");
    console.log("Setting list data..");
    $("#editListName").val(dataray.Name);
    $("#editListID").val(dataray.ID);
    

  }
  console.log("Showing edit list form.")
  $("#editListModalForm").collapse('show');

  }).fail(function(data){
    $('#spinnerfour').removeClass('show');
    iqwerty.toast.toast("Something went wrong. Please try again later.");
  console.log("An internal error occured.");
  });

}

  // Loads the particular task in the edit column.
  function EditTask(taskid){
    var email = sessionStorage.getItem("email");
  
  console.log("Showing this particular task....");
  $.ajax({
  url: baseURL + "/showtask.php",
  method: "POST",
  data: {
    email: email,
    taskid: taskid
  }, async : true,
  beforeSend: function(){
  
    console.log("showing modal.");
  
    var myModal = new bootstrap.Modal(document.getElementById('editModal'))
    myModal.show()
  
    $("#editTaskForm").removeClass("show");
    $('#spinnerthree').addClass('show');
  console.log("Loading spinner.");
  }
  }).then(function(data){
  
  
    $('#spinnerthree').removeClass('show');
  if(data == "No task found. Please create a new task."){
    iqwerty.toast.toast(data);
    var modal = bootstrap.Modal.getInstance(document.querySelector('#editModal'));   
    modal.hide();

    console.log("Error loading task.." + data);
  
  
  }
  else{
   
    $("#editTaskForm").addClass("show");
  console.log(data);
  const dataray = JSON.parse(data);
  console.log(dataray);
  
    console.log("Setting data..");
  $("#editTaskName").val(dataray.Name);
  $("#editTaskDescription").val(dataray.Description);
  $("#editDueDate").val(dataray.DueDate);
  
  $("#editID").val(taskid);
  
  
  }
  
  console.log("Showing edit task form.")
  $("#editTaskForm").collapse("show");
  });
  
    
  }

    // Edits a task.
  
  
  
    function cTask(){
      var email = sessionStorage.getItem("email");
      var name = $("#editTaskName").val();
      var description = $("#editTaskDescription").val();
      var duedate = $("#editDueDate").val();
      var taskid = $("#editID").val();
      
    console.log("Editing task...");
    console.log(email+name+description+duedate+taskid);
    
    $.ajax({
    url: baseURL + "/updatetask.php",
    method: "POST",
    data: {
      taskid: taskid,
      email: email,
      name: name,
      description: description,
      duedate: duedate
    }, async : true,
    beforeSend: function(){
      $('#editTaskForm').removeClass('show');
      $('#spinnerthree').addClass('show');
    console.log("Loading spinner.");
    }
    }).then(function(data){
    
      $('#spinnerthree').removeClass('show');
      
    if(data == "Updated successfully."){
      iqwerty.toast.toast("The change was updated successfully.");
      
    $('#editTaskForm').removeClass('show');
    

      var modal = bootstrap.Modal.getInstance(document.querySelector('#editModal'));   
      modal.hide();
    
    console.log("Changed and updated successfully!");
    loadData(listID);
    }
    else{
      iqwerty.toast.toast("Error.");
      $('#editTaskForm').addClass('show');
      console.log("Error updating the progress. Please reload." + data);
    }
    }).fail(function(data){
      $('#editTaskForm').addClass('show');
      $('#spinnerthree').removeClass('show');
      iqwerty.toast.toast("Something went wrong. Please try again later.");
    console.log("An internal error occured.");
    });
    
    }


  
  $("#editTaskBtn").click(function(e){
    e.preventDefault();
  
    cTask();
  });

 // Edits a particular list .

  function cList(){
    var email = sessionStorage.getItem("email");
    var name = $("#editListName").val();
var listid = $("#editListID").val();

    
  console.log("Editing list...");

  
  $.ajax({
  url: baseURL + "/updatelist.php",
  method: "POST",
  data: {
    listid: listid,
    email: email,
    name: name
  }, async : true,
  beforeSend: function(){
    $('#editListModalForm').removeClass('show');
    $('#spinnerfour').addClass('show');
  console.log("Loading spinner.");
  }
  }).then(function(data){
  
    $('#spinnerfour').removeClass('show');
    
  if(data == "Updated list successfully."){
    iqwerty.toast.toast("The list was updated successfully.");
    var modal = bootstrap.Modal.getInstance(document.querySelector('#editListModal'));   
    modal.hide();


  
  console.log("List updated successfully!");
 showslists();
  }
  else{
    iqwerty.toast.toast("Error.");
    $('#editListModalForm').addClass('show');
    console.log("Error making this change. Please reload." + data);
  }
  }).fail(function(data){
    $('#editListModalForm').addClass('show');
    $('#spinnerfour').removeClass('show');
    iqwerty.toast.toast("Something went wrong. Please try again later.");
  console.log("An internal error occured.");
  });
  
  }



$("#editListBtn").click(function(e){
  e.preventDefault();

  cList();
});

  // Edit the progress.

  function ChangeProgress(taskid, progress){
    var email = sessionStorage.getItem("email");
  console.log("Changing progress...");
  
  
  $.ajax({
  url: baseURL + "/updateprogress.php",
  method: "POST",
  data: {
    taskid: taskid,
    email: email,
    progress: progress
  }, async : true,
  beforeSend: function(){
  
    $('#spinnertwo').addClass('show');
  console.log("Loading spinner.");
  }
  }).then(function(data){
  
    $('#spinnertwo').removeClass('show');
  if(data == "Progress updated successfully."){
    iqwerty.toast.toast("Progress was updated successfully.");
  $('#newForm').removeClass('show');
  console.log("Progress deleted!");
  loadData(listID);
  }
  else{
    iqwerty.toast.toast("Error.");
    console.log("Error updating the progress. Please reload." + data);
  }
  }).fail(function(data){
    $('#spinnertwo').removeClass('show');
    iqwerty.toast.toast("Something went wrong. Please try again later.");
  console.log("An internal error occured.");
  });
  
  }

  // Deletes a list.

  function deleteList(listid){

    if(confirm("Are you sure you wish to delete this list and all the tasks within it?")){
    var email = sessionStorage.getItem("email");
  
  
  console.log("Deleting a list....")
  
  
  
  $.ajax({
  url: baseURL + "/deletelist.php",
  method: "POST",
  data: {
    listid: listid,
    email: email
  }, async : true,
  beforeSend: function(){
  
    $('#spinnertwo').addClass('show');
  console.log("Loading spinner.");
  }
  }).then(function(data){
  
    $('#spinnertwo').removeClass('show');
  if(data == "List deleted successfully."){
    iqwerty.toast.toast("List was deleted successfully.");
  $('#newForm').removeClass('show');
  console.log("List deleted!");
  showslists();
  if(listid == window.listID){
    $("#contentlists").html("The list was deleted successfully.");
    $("#newTaskForm").collapse("hide");
    window.listID = "";
  }
  }
  else{
    iqwerty.toast.toast("Error.");
    console.log("Error deleting this list." + data);
  }
  }).fail(function(data){
    $('#spinnertwo').removeClass('show');
    iqwerty.toast.toast("Something went wrong. Please try again later.");
  console.log("An internal error occured.");
  });
}
else{
iqwerty.toast.toast("List was not deleted.");
}
  }

  // Deletes a task.
  

  function cDelete(taskid){

  
    

    if(confirm("Are you sure you wish to delete this task?")){
    var email = sessionStorage.getItem("email");
  
  
  console.log("Deleting a task....")
  
  $.ajax({
  url: baseURL + "/deletetask.php",
  method: "POST",
  data: {
    taskid: taskid,
    email: email
  }, async : true,
  beforeSend: function(){
  
    $('#spinnertwo').addClass('show');
  console.log("Loading spinner.");
  }
  }).then(function(data){
  
    $('#spinnertwo').removeClass('show');
  if(data == "Task deleted successfully."){
    iqwerty.toast.toast("Task was deleted successfully.");
  $('#newForm').removeClass('show');
  console.log("New task deleted!");
  loadData(listID);
  }
  else{
    iqwerty.toast.toast("Error.");
    console.log("Error deleting this task." + data);
  }
  }).fail(function(data){
    $('#spinnertwo').removeClass('show');
    iqwerty.toast.toast("Something went wrong. Please try again later.");
  console.log("An internal error occured.");
  });
}
else{
iqwerty.toast.toast("Task was not deleted.");
}
  }