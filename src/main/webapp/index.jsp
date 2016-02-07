<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page contentType="text/html; charset=UTF-8"%>
<html>
<head>
<title>User Management</title>
<spring:url value="/resources/css/style.css" var="styleCSS" />
<spring:url value="/resources/js/script.js" var="scriptJS" />
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<link href="${styleCSS}" rel="stylesheet" />
<script src="${scriptJS}"></script>
</head>
<body>
	<input type="button" value="Add Row" onclick="showAddDialog()" />
	<table class="dataTable" id="tblUsers">	
			<tr>
				<th scope="col">User ID</th>
				<th scope="col">First Name</th>
				<th scope="col">Last Name</th>
				<th scope="col">Phone</th>
				<th scope="col">Edit</th>
				<th scope="col">Delete</th>
			</tr>			
	</table>

	<!-- Add Dialog -->
	<div id="addDialog">
		<div id="dialogContent">
			<!-- Dialog Form -->
			<form action="#" id="dialogForm" method="post" name="form">
				<h2>Add User</h2>
				<hr>
				<input id="inpFirstName" class="formInput" name="inpFirstName" placeholder="First Name" type="text"> 
				<input id="inpLastName" class="formInput" name="inpLastName" placeholder="Last Name" type="text"> 
				<input id="inpPhone" class="formInput" name="inpPhone" maxlength="14" placeholder="Phone: (XXX) XXX-XXXX" type="text"> 
				<img src="/usermanagement/captchaImg" class="formInput"/>
			    <form action="" method="post">
        		<input id="inpAnswer" class="formInput" name="inpAnswer" placeholder="Type the word above..." type="text"/>
    			<br><br>
    			<label id="lblMessage" ></label>	
				<table cellspacing=4>
				<tr>
				<td><a id="btnSave" class="formButton" href="javascript:onAddSave()">Save</a></td>
				<td><a id="btnCancel" class="formButton" href="javascript:onCancel()">Cancel</a></td>		
				</tr>
				</table>				
    			
    			</form>			   		    							
			</form>
		</div>
	</div>

		<div id="editDialog">
		<div id="dialogContent">
			<!-- Dialog Form -->
			<form action="#" id="dialogForm" method="post" name="form">
				<h2>Edit User</h2>
				<hr>
				<input id="inpEditUserId" class="formInput" name="inpEditUserId"  type="hidden"> 				
				<input id="inpEditFirstName" class="formInput" name="inpEditFirstName" placeholder="First Name" type="text"> 
				<input id="inpEditLastName" class="formInput" name="inpEditLastName" placeholder="Last Name" type="text"> 
				<input id="inpEditPhone" class="formInput" name="inpEditPhone" maxlength="14" placeholder="Phone: (XXX) XXX-XXXX" type="text"> 
				<br><br>
    			<label id="lblEditMessage" ></label>			
				<table cellspacing=12>
				<tr>
				<td><a id="btnSave" class="formButton" href="javascript:onEditSave()">Save</a></td>
				<td><a id="btnCancel" class="formButton" href="javascript:onCancel()">Cancel</a></td>		
				</tr>
				</table>				
			</form>
		</div>
	</div>

</body>
</html>
