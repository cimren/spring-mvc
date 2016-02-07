/**
 * Author : Cihan İmren
 * Date   : 06.02.2016
 */

var TABLE_ID = "tblUsers"; 

$(document).ready(function() {
	hideAddDialog();
	hideEditDialog();	

	getList();		

	//handle edit
	$('body').on("click",".btnEdit",function(){				 				 
		//Get selected row
		var selectedRow = $(this).closest('tr');
		//Find first element in the selected row
		var firstElement = selectedRow.find('td:first');
		//Get user ID of the selected row
		var userId=firstElement.html();

		var firstName=selectedRow[0].childNodes[1].childNodes[0].data;
		var lastName=selectedRow[0].childNodes[2].childNodes[0].data;
		var phone="";
		if(selectedRow[0].childNodes[3].childNodes[0] != undefined){
			phone=selectedRow[0].childNodes[3].childNodes[0].data;
		}

		document.getElementById('inpEditUserId').value = userId;		        
		document.getElementById('inpEditFirstName').value = firstName;
		document.getElementById('inpEditLastName').value = lastName;
		document.getElementById('inpEditPhone').value = phone;
		showEditDialog();
	}
	);

	//handle delete
	$('body').on("click",".btnDelete",function(){		
		var answer = confirm("Do you want to delete this row?");
		if(answer==true){
			//Get selected row
			var selectedRow = $(this).closest('tr');
			//Find first element in the selected row
			var firstElement = selectedRow.find('td:first');
			//Get user ID of the selected row
			var userId=firstElement.html();

			deleteUser(userId);
		}
	});
	
	//Busy indicator for ajax requests
	$.ajaxSetup({
		beforeSend:function(){
			//show gif
			$("#loading").show();
		},
		complete:function(){
			$("#loading").hide();
		}
	});

	//Phone field with input mask
	$('#inpPhone').keydown(function (e) {
		var key = e.charCode || e.keyCode || 0;
		$phone = $(this);

		// Auto-format- do not expose the mask as the user begins to type
		if (key !== 8 && key !== 9) {
			if ($phone.val().length === 4) {
				$phone.val($phone.val() + ')');
			}
			if ($phone.val().length === 5) {
				$phone.val($phone.val() + ' ');
			}			
			if ($phone.val().length === 9) {
				$phone.val($phone.val() + '-');
			}
		}

		// Allow numeric (and tab, backspace, delete) keys only
		return (key == 8 || 
				key == 9 ||
				key == 46 ||
				(key >= 48 && key <= 57) ||
				(key >= 96 && key <= 105));	
	})
	.bind('focus click', function () {
		$phone = $(this);
		
		if ($phone.val().length === 0) {
			$phone.val('(');
		}
		else {
			var val = $phone.val();
			$phone.val('').val(val); // Ensure cursor remains at the end
		}
	})
	.blur(function () {
		$phone = $(this);
		
		if ($phone.val() === '(') {
			$phone.val('');
		}
	});

});


function deleteRow(userId){
	var table = document.getElementById(TABLE_ID);
	var rows = table.rows;

	for(var i=0; i<rows.length; i++) {
		var row = rows[i];
		var rowId = row.cells[0].childNodes[0].nodeValue;
		if(rowId == userId) {
			table.deleteRow(i);
			break;
		}
	}
}

function editRow(data){
	var table = document.getElementById(TABLE_ID);
	var rows = table.rows;

	for(var i=0; i<rows.length; i++) {
		var row = rows[i];
		var rowId = row.cells[0].childNodes[0].nodeValue;
		if(rowId == data.userId) {
			//row.cells[0].childNodes = data;
			row.cells[1].childNodes[0].data=data.firstName;
			row.cells[2].childNodes[0].data=data.lastName;
			row.cells[3].childNodes[0].data=data.phone;
			break;
		}
	}
}


function showAddDialog(){
	document.getElementById('addDialog').style.display = "block";	
}

function hideAddDialog(){
	document.getElementById('addDialog').style.display = "none";
	clearAddDialog();
}

function showEditDialog(){
	document.getElementById('editDialog').style.display = "block";	
}

function hideEditDialog(){
	document.getElementById('editDialog').style.display = "none";	
	clearEditDialog();
}

function onAddSave(){
	validateForm();
}

function validateForm(captchaValue){
	var inpFirstName = document.getElementById('inpFirstName').value;
	var inpLastName = document.getElementById('inpLastName').value;
	var inpPhone = document.getElementById('inpPhone').value;
	var inpAnswer = document.getElementById('inpAnswer').value;

	var message = "";

	if(inpFirstName == ""){
		message="First Name is required!";
	}
	else if(inpLastName =="")
	{
		message="Last Name is required!";
	}
	else{
		if(inpAnswer == ""){
			message = "Captcha is required!";
		}		
		else{
			$.ajax({
				type: 'GET',
				url:  '/usermanagement/validate/' + inpAnswer,		
				//data: JSON.stringify(userData),
				async: true,
				success: function(data,result) {
					if(data == false){
						message = "Captcha is wrong!";
						document.getElementById("lblMessage").innerHTML = message;	
					}
					else{
						var data = {
								userId: "",
								firstName: inpFirstName, 
								lastName: inpLastName, 
								phone: inpPhone			
						}; 
						addUser(data);
					}

				},
				error: function(jqXHR, textStatus, errorThrown) {
					alert(jqXHR.status + ' ' + jqXHR.responseText);
				}
			});
		}
	}

	document.getElementById("lblMessage").innerHTML = message;	

}

function onEditSave(){
	var inpUserId = document.getElementById('inpEditUserId').value;
	var inpFirstName = document.getElementById('inpEditFirstName').value;
	var inpLastName = document.getElementById('inpEditLastName').value;
	var inpPhone = document.getElementById('inpEditPhone').value;

	var message = "";
	
	if(inpFirstName == ""){
		message="First Name is required!";
	}
	else if(inpLastName =="")
	{
		message="Last Name is required!";
	}
	else {		
		var data = {
				userId: inpUserId,
				firstName: inpFirstName, 
				lastName: inpLastName, 
				phone: inpPhone			
		}; 
		editUser(data);		
	}
	
	document.getElementById("lblEditMessage").innerHTML = message;	
}

function addUser(userData){
	$.ajax({
		type: 'POST',
		url:  '/usermanagement/user/add',
		headers: { 
			'Accept': 'application/json',
			'Content-Type': 'application/json' 
		},
		data: JSON.stringify(userData),
		dataType: 'json',
		async: true,
		success: function(data,result) {
			addNewRow(data);			
			hideAddDialog();
		},
		error: function(jqXHR, textStatus, errorThrown) {
			alert(jqXHR.status + ' ' + jqXHR.responseText);
		}
	});
}

function editUser(userData){
	$.ajax({
		type: 'PUT',
		url:  '/usermanagement/user/' + userData.userId,
		headers: { 
			'Accept': 'application/json',
			'Content-Type': 'application/json' 
		},
		data: JSON.stringify(userData),
		dataType: 'json',
		async: true,
		success: function(data,result) {
			editRow(data);
			clearEditDialog();
			hideEditDialog();
		},
		error: function(jqXHR, textStatus, errorThrown) {
			alert(jqXHR.status + ' ' + jqXHR.responseText);
		}
	});
}

function deleteUser(userId){
	$.ajax({
		type: 'DELETE',
		url:  '/usermanagement/user/' + userId,
		async: true,
		success: function(data,result) {
			deleteRow(userId);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			alert(jqXHR.status + ' ' + jqXHR.responseText);
		}
	});	
}

function clearAddDialog(){
	document.getElementById('inpFirstName').value = "";
	document.getElementById('inpLastName').value = "";
	document.getElementById('inpPhone').value = "";	
	document.getElementById('inpAnswer').value = "";	
}

function clearEditDialog(){
	document.getElementById('inpEditFirstName').value = "";
	document.getElementById('inpEditLastName').value = "";
	document.getElementById('inpEditPhone').value = "";	
}

function onCancel(){
	hideAddDialog();
	hideEditDialog();
}

function getList() {
	$.ajax({
		type: 'GET',
		url:  '/usermanagement/users/',
		headers: { 
			'Accept': 'application/json',
			'Content-Type': 'application/json' 
		},
		dataType: 'json',
		async: true,
		success: function(data,result) {
			for(var i=0; i<data.length; i++){
				addNewRow(data[i]);
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
			alert(jqXHR.status + ' ' + jqXHR.responseText);
		}
	});
}

function addNewRow(rowData) {

	var table = document.getElementById(TABLE_ID);

	var rowCount = table.rows.length;
	var row = table.insertRow(rowCount);

	var cell1 = row.insertCell(0);
	cell1.innerHTML = rowData.userId;

	var cell2 = row.insertCell(1);
	cell2.innerHTML = rowData.firstName;

	var cell3 = row.insertCell(2);
	cell3.innerHTML = rowData.lastName;

	var cell4 = row.insertCell(3);
	cell4.innerHTML= rowData.phone;

	var cell5 = row.insertCell(4);
	var editButton = document.createElement("button");
	editButton.classList.add("btnEdit");
	editButton.innerHTML = "Edit";
	cell5.appendChild(editButton);

	var cell6 = row.insertCell(5);
	var deleteButton = document.createElement("button");
	deleteButton.classList.add("btnDelete");
	deleteButton.innerHTML = "Delete";
	cell6.appendChild(deleteButton);
}
