//(function () {
//    'use strict';
//    window.addEventListener('load', function () {
//        // Fetch all the forms we want to apply custom Bootstrap validation styles to
//        var forms = document.getElementsByClassName('needs-validation');
//        // Loop over them and prevent submission
//        var validation = Array.prototype.filter.call(forms, function (form) {
//            form.addEventListener('submit', function (event) {
//                if (form.checkValidity() === false) {
//                    event.preventDefault();
//                    event.stopPropagation();
//                }
//                form.classList.add('was-validated');
//            }, false);
//        });
//    }, false);
//})();



$(function () {
    $('[data-tooltip="tooltip"]').tooltip({
        trigger: 'hover',
    });
});

$('body').tooltip({
    selector: '[data-tooltip="tooltip"]',
    container: 'body',
    trigger: 'hover'
});

//function SetModal(action) {

//    var title = document.getElementById("exampleModalLabel");

//    if (action == 'add') {
//        title.innerHTML = "Add Employee";
//        $('formNIK').hide();
//        $('formStatus').hide();
//        $('firstName').val("");
//        $('lastName').val("");
//        $('phoneNum').val("");
//        $('Address').val("");
//        $('departementId').val("");

//        msg_firstName.innerHTML = '';
//        msg_lastName.innerHTML = '';
//        msg_phoneNum.innerHTML = '';
//        msg_address.innerHTML = '';
//        msg_departementId.innerHTML = '';


//        $('firstName').removeClass("is-invalid");
//        $('lastName').removeClass("is-invalid");
//        $('phoneNum').removeClass("is-invalid");
//        $('Address').removeClass("is-invalid");
//        $('departementId').removeClass("is-invalid");

//        $('Save').show();
//        $('Update').hide();

//    } else if (action == 'edit') {
//        title.innerHTML = "Edit Employee";
//        $('formNIK').show();
//        $('formStatus').show();

//        msg_firstName.innerHTML = '';
//        msg_lastName.innerHTML = '';
//        msg_phoneNum.innerHTML = '';
//        msg_address.innerHTML = '';
//        msg_departementId.innerHTML = '';

//        $('firstName').removeClass("is-invalid");
//        $('lastName').removeClass("is-invalid");
//        $('phoneNum').removeClass("is-invalid");
//        $('Address').removeClass("is-invalid");
//        $('departementId').removeClass("is-invalid");

//        $('Save').hide();
//        $('Update').show();
//    }
//}

function ClearScreenAdd() {
    $('#Update').hide();
    $('#Save').show();
    $('#formNIK').hide();
    $('#formEmail').hide();
    $('#formStatus').show();
    $('#firstName').val("");
    $('#lastName').val("");
    $('#phoneNum').val("");
    $('#Address').val("");
    $('#departementId').val("");
    $('#Status').val("")
    $('#firstName').removeClass('is-invalid')
    $('#lastName').removeClass('is-invalid')
    $('#phoneNum').removeClass('is-invalid')
    $('#Address').removeClass('is-invalid')
    $('#Status').removeClass('is-invalid')
    $('#departementId').removeClass('is-invalid')
}

function ClearScreenUpdate() {
    $('#Update').show();
    $('#Save').hide();
    $('#formNIK').show();
    $('#formEmail').show();
    $('#formStatus').show();
    $('#firstName').removeClass('is-invalid')
    $('#lastName').removeClass('is-invalid')
    $('#phoneNum').removeClass('is-invalid')
    $('#Address').removeClass('is-invalid')
    $('#Status').removeClass('is-invalid')
    $('#departementId').removeClass('is-invalid')
}

$(document).ready(function () {
    var table = $('#tbEmployee').DataTable({
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "responsive": true,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"],
        "ajax": {
            url: "https://localhost:7181/api/Employee/Emp",
            type: "GET",
            "datatype": "json",
            "dataSrc": "data",

        },
        order: [[1, 'asc']],
        columnDefs: [
            {
            }],
        "columns": [
            {
                "data": null,
                orderable: false,
            },
            {
                "data": "nik",
            },
            {
                "data": "fullName",
            },
            {
                "data": "email",
            },
            {
                "data": "phone",
            },
            {
                "data": "address",
            },
            {
                "data": "depName",
            },
            {
                "data": "status",
                render: function (data, type, row) {
                    if (type === 'display') {
                        if (data === 0) {
                            return '<span class="badge badge-success d-flex justify-content-center">Active</span>';
                        }
                        return '<span class="badge badge-danger d-flex justify-content-center">Inactive</span>';

                        /* return data;*/
                        /*return '<span class="label label-' + (data == 0? 'success' : 'danger') + '">' + (data == 1 ? 'Active' : 'Inactive') + '</span>'*/
                    }
                    return data;
                }            
            },
            {
                "data": null,

                "render": function (data, type, row) {
                    return '<div class="text-center">' + '<button class="btn btn-warning btn-sm edit-button" data-toggle="modal" data-target="#exampleModal" data-tooltip="tooltip" data-placement="left" title = "Update" onclick="return GetById(\'' + row.nik + '\')" > <i class="fas fa-edit"></i></button >' +
                        '&nbsp;' +
                        '<button class="btn btn-danger btn-sm remove-button" data-tooltip="tooltip" data-placement="right" title="Delete" onclick="return DeleteEmp(\'' + row.nik + '\')"><i class="fas fa-trash"></i></button>' + '</div>'


                },
                orderable: false,

            }
        ]

    })
    table.on('draw.dt', function () {
        var PageInfo = $('#tbEmployee').DataTable().page.info();
        table.column(0, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });

    table.buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');

    var departmentSelect = document.getElementById('departementId');
    $.ajax({
        type: 'GET',
        url: "https://localhost:7181/api/Dep",
        dataType: 'json',
        dataSrc: 'data',
    }).then(function (result) {
        // create the option and append to Select2
        for (let i = 0; i < result.data.length; i++) {
            var option = new Option(result.data[i].name, result.data[i].id, true, false);
            departmentSelect.add(option);
        }
    });
})




var msg_phoneNum = document.getElementById("msgPhoneNum");
var msg_address = document.getElementById("msgAddress");
var msg_departementId = document.getElementById("msgDepartementId");

$('#firstName').on('input', () => {
    $('#firstName').removeClass('is-invalid')
})

$('#lastName').on('input', () => {
    $('#lastName').removeClass('is-invalid')
})

$('#phoneNum').on('input', () => {
    $('#phoneNum').removeClass('is-invalid')
})

$('#Address').on('input', () => {
    $('#Address').removeClass('is-invalid')
})

$('#Status').on('input', () => {
    $('#Status').removeClass('is-invalid')
})

$('#departementId').on('input', () => {
    $('#departementId').removeClass('is-invalid')
})

var inp_id = document.getElementById("NIK");
var inp_email = document.getElementById("Email");
var inp_Fname = document.getElementById("firstName");
var inp_Lname = document.getElementById("lastName");
var inp_num = document.getElementById("phoneNum");
var inp_address = document.getElementById("Address");
var inp_depid = document.getElementById("depId");
var inp_status = document.getElementById("Status");
function SaveEmp() {
    var msg_firstName = document.getElementById("msgFirstName");
    var msg_lastName = document.getElementById("msgLastName");
    //debugger;
    //if (inp_Fname.value == "" || inp_Lname.value == "" || inp_num.value == "" || inp_address.value == "" || inp_status.value == "" || inp_depid.value == "") {
    //    if (inp_Fname.value === "") {
    //        inp_Fname.classList.add("is-invalid");
    //    }
    //    if (inp_Lname.value === "") {
    //        inp_Lname.classList.add("is-invalid");
    //    }
    //    if (inp_num === "") {
    //        inp_num.classList.add("is-invalid");
    //    }
    //    if (inp_address.value === "") {
    //        inp_address.classList.add("is-invalid");
    //    }
    //    if (inp_status.value === "") {
    //        inp_status.classList.add("is-invalid");
    //    }
    //    if (inp_depid.value === "") {
    //        inp_depid.classList.add("is-invalid");
    //    }
    //} else {

    if (inp_Fname == '') {
        msg_firstName.innerHTML = "First Name can't be empty";
    }
    if (inp_Lname == '') {
        msg_lastName.innerHTML = "Last Name can't be empty";
    } else {
        var Employee = new Object();
        Employee.NIK = "";
        Employee.FirstName = $('#firstName').val();
        Employee.LastName = $('#lastName').val();
        Employee.Phone = $('#phoneNum').val();
        Employee.Email = "";
        Employee.Address = $('#Address').val();
        Employee.DepId = $('#departementId').val();
        Employee.Status = parseInt($('#Status').val());

        $.ajax({
            type: 'POST',
            url: 'https://localhost:7181/api/Employee',
            data: JSON.stringify(Employee),
            contentType: "application/json; charset=utf-8",
        }).then((result) => {
            if (result.status_code == 200) {
                Swal.fire(
                    'Data Inserted!',
                    'Success!',
                    'success'
                )
                $('#tbEmployee').DataTable().ajax.reload();
            }
            else {
                Swal.fire(
                    'Error!',
                    result.message,
                    'error')
            }
        })
        $("#exampleModal").modal("hide");
    }
}

function GetById(NIK) {
    $.ajax({
        url: "https://localhost:7181/api/Employee/" + NIK,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var obj = result.data;
            $('#NIK').val(obj.nik);
            $('#firstName').val(obj.firstName);
            $('#lastName').val(obj.lastName);
            $('#Email').val(obj.email);
            $('#phoneNum').val(obj.phone);
            $('#Address').val(obj.address);
            $('#departementId').val(obj.depId);
            parseInt($('#Status').val(obj.status));
            $('#exampleModal').modal('show');
        }
    })
    ClearScreenUpdate();
}

function UpdateEmp() {
    var Employee = new Object();
    Employee.NIK = $('#NIK').val();
    Employee.FirstName = $('#firstName').val();
    Employee.LastName = $('#lastName').val();
    Employee.Phone = $('#phoneNum').val();
    Employee.Email = $('#Email').val();
    Employee.Address = $('#Address').val();
    Employee.DepId = $('#departementId').val();
    Employee.Status = parseInt($('#Status').val());

    //var name = $('#departementName').val();
    //var message = document.getElementById('valMessage');

    $.ajax({
        url: "https://localhost:7181/api/Employee",
        type: "PUT",
        data: JSON.stringify(Employee),
        contentType: "application/json; charset=utf-8",
    }).then((result) => {
        if (result.status_code == 200) {
            Swal.fire(
                'Data Updated!',
                'Success!',
                'success'
            )
            $('#tbEmployee').DataTable().ajax.reload();
        }
        else {
            alert(result.message);
        }

    });
    $("#exampleModal").modal("hide");

    //if (name == '') {
    //    message.innerHTML = "Name can't be empty";
    //} else {
       
    
}

function DeleteEmp(NIK) {
    Swal.fire({
        title: 'Do you want to Delete?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "https://localhost:7181/api/Employee/" + NIK,
                type: "DELETE",
                dataType: "json",
            }).then((result) => {
                if (result.status_code == 200) {
                    Swal.fire('Deleted!', '', 'success');
                    $('#tbEmployee').DataTable().ajax.reload();
                } else {
                    Swal.fire('Data cannot be Deleted!', 'There is employee data in this departement data', 'warning');
                }
            })
        } else if (result.isDenied) {
            Swal.fire('Data not be deleted', '', 'info')
        }
    })
}