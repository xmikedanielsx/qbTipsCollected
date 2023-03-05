//printPapaObject accept only construction returned by papaParser (array of objects)
function printPapaObject(papa) {
    var header = "";
    var tbody = "";
    itms = calcPapaRows(papa.data);
    // for (var p in papa.meta.fields) {
    //     header += "<th>" + papa.meta.fields[p] + "</th>";
    // }
    // for (var i = 0; i < papa.data.length; i++) {
    //     var row = "";
    //     for (var z in papa.data[i]) {
    //     row += "<td>" + papa.data[i][z] + "</td>";
    //     }
    //     tbody += "<tr>" + row + "</tr>";
    // }
    // var html1 =  '<table class="table"><thead>' +
    // header +
    // "</thead><tbody>" +
    // tbody +
    // "</tbody></table>"
    

    header = "<th>user</th><th>tips collected</th>"
    tbody = ""
    
    for (var i = 0; i < itms.length; i++) {
        var row = "";
        for (var z in itms[i]) {
            row += "<td>" + itms[i][z] + "</td>";
            document.getElementById('row-5-age').value = parseInt(itms[i][z]) ? itmsp[i][z] : 0
        }
        tbody += "<tr>" + row + "</tr>";
    }

    var html2 = '<table class="table"><thead>' +
    header +
    "</thead><tbody>" +
    tbody +
    "</tbody></table>"

    //build a table
    $("output").html(
        // html1 + 
        html2
    );
    
}



function calcPapaRows (pdata) {
    var list = [];
    pdata.forEach(mel => {

        const found = list.some(el => el.user === mel.user);
        const user = list.find(x => x.user == mel.user);
        const idx = list.findIndex(x => x.user == mel.user);
        if (!found) {
            if(mel.user != ''){
                console.log("adding user", mel)
                list.push({ "user": mel.user, "tipsCollected": mel.tipsCollected });
            }
        } else {
            console.log("should add tips", user, mel)
            user.tipsCollected = user.tipsCollected + mel.tipsCollected
        }
    })
    
    
    return list;
}

function handleFileSelect(evt) {
    var file = evt.target.files[0];

    Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: function(results) {
        printPapaObject(results);
    }
    });
}

$(document).ready(function() {
    $("#csv-file").change(handleFileSelect);
});
