/**
 * Created by antonhell on 28.03.15.
 */

var userListData = [];

// DOM Ready
$(document).ready(function() {

    // Pobulate the user table in initial page load
    populateTable();
    $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);
//    $('#userList table tbody').on('click', 'td a.linkdeleteuser', showUserInfo);


})

// Fill Table with data
function populateTable() {
    // Empty content string
    var tableContent = '';

    // save returned json data//

    // jQeury AJAX call for Json
    $.getJSON('/users/userlist', function(data){
/*        tableContent += '<tr>';
        tableContent += '<td>Test</td>';
        tableContent += '<td>test</td>';
        tableContent += '<td>test</td>';
        tableContent += '</tr>';
*/
        userListData = data;

        // For each item in JSON, add a table row and cells to the content
        $.each(data, function() {
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.fullname + '">' + this.fullname + '</a></td>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';

        });


        // Inject the whole content into the table
        $('#userList table tbody').html(tableContent);

    })
};


//Show user info
function showUserInfo(event) {
    // prevent link from firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisUserName = $(this).attr('rel');
    $('#userInfoName').text(thisUserName);

    // Get index of object based on id value
    var arrayPosition = userListData.map(function(arrayItem) {
        return arrayItem.fullname;
    }).indexOf(thisUserName);
    $('#userInfoName').text(thisUserName);

/*
    var arrayPosition = userListData.map(function(arrayItem) {
        return arrayItem.username;
    }).indexOf(thisUserName);
*/

    $('#userInfoAge').text(arrayPosition);

    // Get our User Object
    var thisUserObject = userListData[arrayPosition];

    //Populate Info Box
    $('#userInfoName').text(thisUserObject.fullname);
    $('#userInfoAge').text(thisUserObject.age);
    $('#userInfoGender').text(thisUserObject.gender);
    $('#userInfoLocation').text(thisUserObject.location);

};