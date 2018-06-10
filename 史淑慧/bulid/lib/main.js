$.ajax({
    url: '',
    datatype: 'json',
    succsee: function(res) {
        console.log(res);
    },
    error: function(error) {
        console.log(error);
    }
})

function render(res) {
    var str = '';
    res.forEach(function(i, file) {
        console.log(i)
    })
}