$(document).ready(function(){
    $.ajax({
        type:'GET',
        url:"http://localhost:8000/api/veicle/index",
    }).done(function(res){
        for(item of res){
            $('#selectCreate').append(`
                <option value="${item.id}">${item.name}</option>
            `);
        }
    });
    $.ajax({
        type:'GET',
        url:'http://localhost:8000/api/vehicle/show'
    }).done(function(data){
        var json = data.data;
        console.log(json);
        for(i = 0; i <= json.length; i++){
            $('#lista-marks').append(`
                <tr>
                    <td>${json[i].placa}</td>
                    <td>${json[i].tipo}</td>
                    <td>${json[i].usuario[0].name}</td>
                    <td>${json[i].usuario[0].identification_card}</td>
                    <td>${json[i].marca[0].name}</td>
                </tr>
            `);
        }
    });
});

// Registro de nuevo vehiculo y usuario
function crear(){
    // post
    $('#formRegisterVehicle').on('submit', function(e){
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            url:'http://localhost:8000/api/veicle/create',
            method:'post',
            data:{
                name:$('#name').val(),
                email:$('#email').val(),
                identification_card:$('#identificationCard').val(),
                phone:$('#phone').val(),
                license_plate:$('#licensePlate').val(),
                vehicle_type:$('#vehicleType').val(),
                mark_id:$('#selectCreate').val()
            }
        });
        this.reset();
        e.preventDefault();
    })
    
}