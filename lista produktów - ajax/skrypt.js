var gridDataQueryAjax = []
var gridDataFetch = []

window.onload = async function fun1()
{
    await fetch("https://raw.githubusercontent.com/wedeploy-examples/supermarket-web-example/master/products.json")
        .then(response => {
            response.json().then(json => {
                gridDataFetch = json;
                gridDataQueryAjax = gridDataFetch;
                console.log("data downloaded by fetch");
                console.log(gridDataFetch);

                for(let i=0; i<gridDataFetch.length; ++i)
                    $("#tab").append("<tr><td>" + gridDataFetch[i].title + "<td>" + gridDataFetch[i].type + "</td>" + "<td>" + gridDataFetch[i].description + "</td>" + "<td>" + gridDataFetch[i].filename + "</td>" + "<td>" + gridDataFetch[i].height + "</td>" + "<td>" + gridDataFetch[i].width + "</td>" + "<td>" + gridDataFetch[i].price + "</td>" + "<td>" + gridDataFetch[i].rating + "</td></tr>");
            })
        })
        .catch((err) => console.error(err))
}

function clear_table()
{
    let tab = document.querySelector("#content");
    while(tab.lastChild)
    {
        tab.lastChild.remove();
    }
}

var button1 = document.querySelector("#b1");
button1.addEventListener("click", function search()
{
    clear_table();
    gridDataQueryAjax = [];

    let text = $("#search").val();
    let iter = 0;
    for(let i=0; i<gridDataFetch.length; ++i)
    {
        if(gridDataFetch[i].title.toLowerCase().includes(text.toLowerCase()) || gridDataFetch[i].type.toLowerCase().includes(text.toLowerCase()) || gridDataFetch[i].description.toLowerCase().includes(text.toLowerCase()) || gridDataFetch[i].filename.toLowerCase().includes(text.toLowerCase()) || gridDataFetch[i].height == text || gridDataFetch[i].width == text || gridDataFetch[i].price == text || gridDataFetch[i].rating == text )
        {
            gridDataQueryAjax[iter] = gridDataFetch[i];
            $("#tab").append("<tr><td>" + gridDataQueryAjax[iter].title + "<td>" + gridDataQueryAjax[iter].type + "</td>" + "<td>" + gridDataQueryAjax[iter].description + "</td>" + "<td>" + gridDataQueryAjax[iter].filename + "</td>" + "<td>" + gridDataQueryAjax[iter].height + "</td>" + "<td>" + gridDataQueryAjax[iter].width + "</td>" + "<td>" + gridDataQueryAjax[iter].price + "</td>" + "<td>" + gridDataQueryAjax[iter].rating + "</td></tr>");
            iter++;
        }
    }
});

var button1 = document.querySelector("#btitle");
button1.addEventListener("click", function search()
{
    clear_table();
    gridDataQueryAjax = [];

    let text = $("#search").val();
    let iter = 0;
    for(let i=0; i<gridDataFetch.length; ++i)
    {
        if(gridDataFetch[i].title.toLowerCase().includes(text.toLowerCase()))
        {
            gridDataQueryAjax[iter] = gridDataFetch[i];
            $("#tab").append("<tr><td>" + gridDataQueryAjax[iter].title + "<td>" + gridDataQueryAjax[iter].type + "</td>" + "<td>" + gridDataQueryAjax[iter].description + "</td>" + "<td>" + gridDataQueryAjax[iter].filename + "</td>" + "<td>" + gridDataQueryAjax[iter].height + "</td>" + "<td>" + gridDataQueryAjax[iter].width + "</td>" + "<td>" + gridDataQueryAjax[iter].price + "</td>" + "<td>" + gridDataQueryAjax[iter].rating + "</td></tr>");
            iter++;
        }
    }
});

$("#title").on("click", async function(){
    clear_table();
    
    for(let i=1; i<gridDataQueryAjax.length; ++i)
    {
        for(let j=1; j<gridDataQueryAjax.length; ++j)
        {
            if(gridDataQueryAjax[j-1].title > gridDataQueryAjax[j].title)
            {
                let temp = gridDataQueryAjax[j-1];
                gridDataQueryAjax[j-1] = gridDataQueryAjax[j];
                gridDataQueryAjax[j] = temp;
            }
        }
    }

    for(let i=0; i<gridDataQueryAjax.length; ++i)
        $("#tab").append("<tr><td>" + gridDataQueryAjax[i].title + "<td>" + gridDataQueryAjax[i].type + "</td>" + "<td>" + gridDataQueryAjax[i].description + "</td>" + "<td>" + gridDataQueryAjax[i].filename + "</td>" + "<td>" + gridDataQueryAjax[i].height + "</td>" + "<td>" + gridDataQueryAjax[i].width + "</td>" + "<td>" + gridDataQueryAjax[i].price + "</td>" + "<td>" + gridDataQueryAjax[i].rating + "</td></tr>");
});

$("#height").on("click", async function(){
    clear_table();
    
    for(let i=1; i<gridDataQueryAjax.length; ++i)
    {
        for(let j=1; j<gridDataQueryAjax.length; ++j)
        {
            if(gridDataQueryAjax[j-1].height > gridDataQueryAjax[j].height)
            {
                let temp = gridDataQueryAjax[j-1];
                gridDataQueryAjax[j-1] = gridDataQueryAjax[j];
                gridDataQueryAjax[j] = temp;
            }
        }
    }

    for(let i=0; i<gridDataQueryAjax.length; ++i)
        $("#tab").append("<tr><td>" + gridDataQueryAjax[i].title + "<td>" + gridDataQueryAjax[i].type + "</td>" + "<td>" + gridDataQueryAjax[i].description + "</td>" + "<td>" + gridDataQueryAjax[i].filename + "</td>" + "<td>" + gridDataQueryAjax[i].height + "</td>" + "<td>" + gridDataQueryAjax[i].width + "</td>" + "<td>" + gridDataQueryAjax[i].price + "</td>" + "<td>" + gridDataQueryAjax[i].rating + "</td></tr>");
});

$("#width").on("click", async function(){
    clear_table();
    
    for(let i=1; i<gridDataQueryAjax.length; ++i)
    {
        for(let j=1; j<gridDataQueryAjax.length; ++j)
        {
            if(gridDataQueryAjax[j-1].width > gridDataQueryAjax[j].width)
            {
                let temp = gridDataQueryAjax[j-1];
                gridDataQueryAjax[j-1] = gridDataQueryAjax[j];
                gridDataQueryAjax[j] = temp;
            }
        }
    }

    for(let i=0; i<gridDataQueryAjax.length; ++i)
        $("#tab").append("<tr><td>" + gridDataQueryAjax[i].title + "<td>" + gridDataQueryAjax[i].type + "</td>" + "<td>" + gridDataQueryAjax[i].description + "</td>" + "<td>" + gridDataQueryAjax[i].filename + "</td>" + "<td>" + gridDataQueryAjax[i].height + "</td>" + "<td>" + gridDataQueryAjax[i].width + "</td>" + "<td>" + gridDataQueryAjax[i].price + "</td>" + "<td>" + gridDataQueryAjax[i].rating + "</td></tr>");
});

$("#price").on("click", async function(){
    clear_table();
    
    for(let i=1; i<gridDataQueryAjax.length; ++i)
    {
        for(let j=1; j<gridDataQueryAjax.length; ++j)
        {
            if(gridDataQueryAjax[j-1].price > gridDataQueryAjax[j].price)
            {
                let temp = gridDataQueryAjax[j-1];
                gridDataQueryAjax[j-1] = gridDataQueryAjax[j];
                gridDataQueryAjax[j] = temp;
            }
        }
    }

    for(let i=0; i<gridDataQueryAjax.length; ++i)
        $("#tab").append("<tr><td>" + gridDataQueryAjax[i].title + "<td>" + gridDataQueryAjax[i].type + "</td>" + "<td>" + gridDataQueryAjax[i].description + "</td>" + "<td>" + gridDataQueryAjax[i].filename + "</td>" + "<td>" + gridDataQueryAjax[i].height + "</td>" + "<td>" + gridDataQueryAjax[i].width + "</td>" + "<td>" + gridDataQueryAjax[i].price + "</td>" + "<td>" + gridDataQueryAjax[i].rating + "</td></tr>");
});

$("#rating").on("click", async function(){
    clear_table();
    
    for(let i=1; i<gridDataQueryAjax.length; ++i)
    {
        for(let j=1; j<gridDataQueryAjax.length; ++j)
        {
            if(gridDataQueryAjax[j-1].rating > gridDataQueryAjax[j].rating)
            {
                let temp = gridDataQueryAjax[j-1];
                gridDataQueryAjax[j-1] = gridDataQueryAjax[j];
                gridDataQueryAjax[j] = temp;
            }
        }
    }

    for(let i=0; i<gridDataQueryAjax.length; ++i)
        $("#tab").append("<tr><td>" + gridDataQueryAjax[i].title + "<td>" + gridDataQueryAjax[i].type + "</td>" + "<td>" + gridDataQueryAjax[i].description + "</td>" + "<td>" + gridDataQueryAjax[i].filename + "</td>" + "<td>" + gridDataQueryAjax[i].height + "</td>" + "<td>" + gridDataQueryAjax[i].width + "</td>" + "<td>" + gridDataQueryAjax[i].price + "</td>" + "<td>" + gridDataQueryAjax[i].rating + "</td></tr>");
});

document.querySelector("#b2").addEventListener("click", async function(){
    clear_table();
    
    await fetch("https://raw.githubusercontent.com/wedeploy-examples/supermarket-web-example/master/products.json")
        .then(response => {
            response.json().then(json => {
                gridDataFetch = json;
                gridDataQueryAjax = gridDataFetch;
                console.log("data downloaded by fetch");
                console.log(gridDataFetch);

                for(let i=0; i<gridDataFetch.length; ++i)
                    $("#tab").append("<tr><td>" + gridDataFetch[i].title + "<td>" + gridDataFetch[i].type + "</td>" + "<td>" + gridDataFetch[i].description + "</td>" + "<td>" + gridDataFetch[i].filename + "</td>" + "<td>" + gridDataFetch[i].height + "</td>" + "<td>" + gridDataFetch[i].width + "</td>" + "<td>" + gridDataFetch[i].price + "</td>" + "<td>" + gridDataFetch[i].rating + "</td></tr>");
            })
        })
        .catch((err) => console.error(err))
});

$( "td:contains('dairy')" ).css( "text-decoration", "underline" );



