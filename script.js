const addUserBtn = document.getElementById('addUser');
const btnText = addUserBtn.innerText;
const usernameText = document.getElementById('username');
const display = document.getElementById('records');
let userArray = [];
let edit_id = null;

let object = localStorage.getItem('users');

if (object != null) {
   userArray = JSON.parse(object);
}

DisplayInfo();
addUserBtn.onclick = () => {
   
   const name = usernameText.value;
   if (edit_id != null) {
    
      userArray.splice(edit_id, 1, {
         'name': name
      });
      edit_id = null;
   } else {
      
      userArray.push({
         'name': name
      });
   }

   SaveInfo(userArray);
   usernameText.value = '';
   addUserBtn.innerText = btnText;
}


function SaveInfo(userArray) {
   let str = JSON.stringify(userArray);
   localStorage.setItem('users', str);
   DisplayInfo();
}

function DisplayInfo() {
   let statement = '';
   userArray.forEach((user, i) => {
      statement += `<tr>
           <th scope="row">${i+1}</th>
           <td>${user.name}</td>
           <td><button class="edt" onclick='EditInfo(${i})'>edit</button>
           
           
           
           <button class="edt2" onclick='DeleteInfo(${i})'>delete</button></td>
         </tr>`;
   });
   display.innerHTML = statement;
}

function EditInfo(id) {
   edit_id = id;
   usernameText.value = userArray[id].name;
   addUserBtn.innerText = 'Save Changes';
}


function DeleteInfo(id) {
   userArray.splice(id, 1);
   SaveInfo(userArray);

}