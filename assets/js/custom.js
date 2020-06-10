var ctx = document.getElementById('error_log_chart');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: JSON.parse(document.getElementById('filter_dates').value),
        datasets: JSON.parse(document.getElementById('data_sets').value),
    },options: {
        barValueSpacing: 20,
        scales: {
            yAxes: [{
                ticks: {
                    min: 0,
                }
            }]
        }
    }
});

$('#logs').DataTable({
    "searching": true,
    "bPaginate": true,
    "bLengthChange": true,
    "bInfo": true,
    "pageLength": 25,
    "responsive": true,
    "ordering": false
});

$('.datepicker').datepicker({
    format: 'dd-mm-yyyy',
    endDate: "today"
});

function filterLogs() {
    filter = $('.select-filter').val();
    if (filter) {
        localStorage.setItem('filter', filter);
    }
    filter = localStorage.getItem('filter') ? localStorage.getItem('filter') : null;
    var fromDate = $('#from_date').val();
    var toDate = $('#to_date').val();
    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        url: baseUrl + '/' + sptLogUrl,
        method: 'GET',
        data: {
            from_date: fromDate,
            to_date: toDate,
            filter: filter
        },
        success: function(response) {
            $('body').html('');
            $('body').append(response.dashboard);
            $(".filter").removeClass('active');
            $(".select-filter option[value=" + filter + "]").prop('selected', true);
        }
    });
}

function viewException(exceptionId) {
    $('#viewException').modal('toggle');
    $('#viewException textarea').html(document.getElementById('detailed_message_' + exceptionId).value);
}

$(document).on('click', '.delete-log', function() {
    fileName = $(this).data('file');
    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        url: sptLogUrl + '/delete/' + fileName,
        method: 'GET',
        success: function(response) {
            window.location.reload();
        }
    });
});
