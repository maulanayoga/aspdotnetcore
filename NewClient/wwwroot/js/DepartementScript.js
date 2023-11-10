

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
function SetModal(action) {
    var form_id = document.getElementById("formId");
    var inp_id = document.getElementById("Id");
    var inp_name = document.getElementById("departementName");

    var btnAdd = document.getElementById("Save");
    var btnUpdate = document.getElementById("Update");
    var title = document.getElementById("exampleModalLabel");

    if (action == 'add') {
        form_id.style.display = "none"; //set input id hidden
        inp_id.value = ""; //set value input id
        inp_name.value = ""; //set value input name

        btnUpdate.style.display = "none"; //set button Update hide
        btnAdd.style.display = "block"; //set button Add show
        title.innerHTML = "Add Department"; //set title modal
    } else if (action == 'edit') {
        form_id.style.display = "block"; //set input id hidden
        btnUpdate.style.display = "block"; //set button Update show

        btnAdd.style.display = "none"; //set button Add hide
        title.innerHTML = "Edit Department"; //set title modal
    }
}

$(document).ready(function () {
    var table = $('#tbDepartement').DataTable({
        "paging": true,
        "lengthChange": true,
        "lengthMenu": [5, 10, 15, 20],
        "filter": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "responsive": true,
        "processing": true,
        "serverSide": true,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"],
        "ajax": {
            url: "https://localhost:7181/api/Dep/page",
            type: "POST",
            "datatype": "json",
            /*"dataSrc": "data",*/
            //success: function (result) {
            //    console.log(result)
            //}

        },
        order: [[1,'asc']],
        columnDefs: [
            {
            }],
        "columns": [
            {
                "data": null,
                orderable: false,
            },
            {
                "data" : "id", name : "Id"
            },
            {
                "data": "name", name : "Name"
            },
            {
                "data": null,

                "render": function (data, type, row) {
                    return '<div class="text-center">' + '<button class="btn btn-warning btn-sm edit-button" data-toggle="modal" data-target="#exampleModal" data-tooltip="tooltip" data-placement="left" title = "Update" onclick="return GetById(\'' + row.id + '\')" > <i class="fas fa-edit"></i></button >' +
                        '&nbsp;' +
                        '<button class="btn btn-danger btn-sm remove-button" data-tooltip="tooltip" data-placement="right" title="Delete" onclick="return Delete(\'' + row.id + '\')"><i class="fas fa-trash"></i></button>' + '</div>'


                },
                orderable: false,

            }
        ]

    })
    table.on('draw.dt', function () {
        var PageInfo = $('#tbDepartement').DataTable().page.info();
        table.column(0, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });

    table.buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
})


function Save() {
    var Departement = new Object();
    Departement.Id = "";
    Departement.Name = $('#departementName').val();
    var name = $('#departementName').val();
    var message = document.getElementById('valMessage');

    if (name == '') {
        message.innerHTML = "Name can't be empty";
    } else {
        $.ajax({
            type: 'POST',
            url: 'https://localhost:7181/api/Dep/insert',
            data: JSON.stringify(Departement),
            contentType: "application/json; charset=utf-8",
        }).then((result) => {
            if (result.status_code == 200) {
                Swal.fire(
                    'Data Inserted!',
                    'Success!',
                    'success'
                )
                $('#tbDepartement').DataTable().ajax.reload();
            }
            else {
                alert("Data Gagal Dimasukkan")
            }
        })
        $("#exampleModal").modal("hide");
    }
}

function GetById(Id) {
    $.ajax({
        url: "https://localhost:7181/api/Dep/" + Id,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var obj = result.data;
            $('#Id').val(obj.id);
            $('#departementName').val(obj.name);
            $('#exampleModal').modal('show');
        }
    })
    SetModal('edit');
}

function Update() {
    var Departement = new Object();
    Departement.Id = $('#Id').val();
    Departement.Name = $('#departementName').val();

    var name = $('#departementName').val();
    var message = document.getElementById('valMessage');

    if (name == '') {
        message.innerHTML = "Name can't be empty";
    } else {
        $.ajax({
            url: "https://localhost:7181/api/Dep",
            type: "PUT",
            data: JSON.stringify(Departement),
            contentType: "application/json; charset=utf-8",
        }).then((result) => {
            if (result.status_code == 200) {
                Swal.fire(
                    'Data Updated!',
                    'Success!',
                    'success'
                )
                $('#tbDepartement').DataTable().ajax.reload();
            }
            else {
                alert(result.message);
            }

        });
        $("#exampleModal").modal("hide");
    }
}

function Delete(Id) {
    Swal.fire({
        title: 'Do you want to Delete?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "https://localhost:7181/api/Dep/" + Id,
                type: "DELETE",
                dataType: "json",
            }).then((result) => {
                if (result.status_code == 200) {
                    Swal.fire('Deleted!', '', 'success');
                    $('#tbDepartement').DataTable().ajax.reload();
                } else {
                    Swal.fire('Data cannot be Deleted!', 'There is employee data in this departement data', 'warning');
                }
            })
        } else if (result.isDenied) {
            Swal.fire('Data not be deleted', '', 'info')
        }
    })
}







