const urlData1 =
    "https://brasil.io/dataset/covid19/caso/?is_last=True&place_type=city&state=PB&format=csv";
const urlData2 = "https://api.covid19api.com/total/country/brazil";
let dataAtu;
let dataAt;

getData();
getDataBr(urlData2);

async function getDataBr(url) {
    const response = await fetch(url);
    const json = await response.json();
    showContent(json);
}

async function getData() {
    const response = await fetch(urlData1);
    const data = await response.text();
    let totalConfirmado = 0;
    let totalObitos = 0;

    const table = data.split("\n").slice(1, -1);

    table.forEach((row) => {
        const columns = row.split(",");
        dataAtu = columns[0];
        const cidade = columns[2];
        const casosConfirmados = columns[4];
        const obitosConfirmados = columns[5];

        const tBody = `<tr>
        <td class="bg-info"><b><i class="fas fa-map-marker-alt"></i>&nbsp&nbsp${cidade}</b></td>
        <td class="bg-warning text-center"><b>${casosConfirmados}</b></td>
        <td class="bg-danger text-center"><b>${obitosConfirmados}</b></td>
        </tr>`;

        $("#main-dados2 > table > tbody").append(tBody);

        totalConfirmado += parseInt(casosConfirmados);
        totalObitos += parseInt(obitosConfirmados);
    });
    $(
        "#main-dados1 > ul:nth-child(2) > li.list-group-item.d-flex.justify-content-between.align-items-center.bg-warning.shadow > span"
    ).append(totalConfirmado);
    $(
        "#main-dados1 > ul:nth-child(2) > li.list-group-item.d-flex.justify-content-between.align-items-center.bg-danger.shadow > span"
    ).append(totalObitos);
    $("#main-dados1 > ul:nth-child(3) > li:nth-child(3) > span").append(
        formatDate(dataAtu, "pt-br")
    );
}

function showContent(dataBr) {

    dataBr.forEach((element) => {
        dataAt = formatDate(element.Date);
    });

    dataBr.forEach((element) => {
        if (formatDate(element.Date) == dataAt) {
            $(
                "#main-dados1 > ul.list-group.ml-4.mb-4.shadow > li.list-group-item.d-flex.justify-content-between.align-items-center.bg-warning > span"
            ).append(element.Confirmed);
            $(
                "#main-dados1 > ul.list-group.ml-4.mb-4.shadow > li.list-group-item.d-flex.justify-content-between.align-items-center.bg-danger > span"
            ).append(element.Deaths);
            $(
                "#main-dados1 > ul.list-group.ml-4.mb-4.shadow > li.list-group-item.d-flex.justify-content-between.align-items-center.bg-success > span"
            ).append(element.Recovered);
        }
    });

    $('#main-dados1 > ul:nth-child(3) > li:nth-child(2) > span').append(formatDate(dataAt, 'pt-br'));
}

function formatDate(data, formato) {
    if (formato == "pt-br") {
        return data.substr(0, 10).split("-").reverse().join("/");
    } else {
        return data.substr(0, 10).split("/").reverse().join("-");
    }
}