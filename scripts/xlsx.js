$(function () {
    GetDataXlxs();
});
function GetDataXlxs() {
        var service_data = [];
        var main_data = [];
        var idcat = [];
        var result = {}
        alasql('select * from xlsx("scripts/data/data.xlsx",{headers:true, sheetid:"Services", range:"A2:D500"})',
        [],function(data) {
        var arr;
        var cell = []
        $.each(data, function (i, v) { 
            const row = Object.values(v);
            if(row.length > 0 && row != ''){cell.push(row)}
        });
        var category; var main = [];
        for(i = 0 ; i < cell.length ; i++){
            if(cell[i].length > 3){ category = cell[i][0];  }
            else{cell[i].unshift(category)}main.push(cell[i])
        }
        $.each(main, function (i, v) { result[v[0]]=[] });
        $.each(main, function (i, v) { 
            var service = {'service':v[1], 'description':v[2],  'price':v[3],}
            result[v[0]].push(service);
        });

        console.log(result)
        $.each(result, function (indexInArray, valueOfElement) { 
            $("div").each(function() {
                $.each(this.attributes,function(i,a){
                    if(a.name == 'service' && a.value == indexInArray){  
                            var limit = $("#menu_service[service='"+a.value+"']").attr('limit');
                            var begin, end;
                            if(limit != undefined && limit != ''){
                                var limit = limit.split(",");
                                if(limit.length < 2){begin = limit[0]; end = valueOfElement.length;}else if(limit.length = 2){begin = limit[0]; end = limit[1];}else{begin = 0; end = valueOfElement.length;}
                            }else{begin = 0; end = valueOfElement.length;}
                          
                            for(var i = 0; i < valueOfElement.length; i++){
                            var temp = `
                            <div class="service_item display-row">
                                <div class="service_name display-col w-100 text-left text-dark py-3">`+valueOfElement[i].service+`</div>
                                <div class="service_price display-col width-price color-price py-3">$`+valueOfElement[i].price+`</div>
                            </div>
                            `;
                            $("#menu_service[service='"+a.value+"']").append(temp)    
                        }
                    }
                })
            })
        });
    });
}
