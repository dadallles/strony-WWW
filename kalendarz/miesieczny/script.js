var data = new Date();
var m = data.getMonth();
var r = data.getFullYear();

var tab_niedz_before = "<tr id='niedziela'><td id='niedziela'>";
var tab_niedz_after = "</td></tr> <tr id='niedziela_in'><td id='niedziela_in'></td></tr>";

var tab_sob_before = "<tr id='sobota'><td id='sobota'>";
var tab_sob_after = "</td></tr> <tr id='sobota_in'><td id='sobota_in'></td></tr>";

var tab_rob_before = "<tr id='roboczy'><td id='roboczy'>";
var tab_rob_after = "</td></tr> <tr id='roboczy_in'><td id='roboczy_in'></td></tr>";

document.addEventListener("DOMContentLoaded", function(event) {
    rysuj(m, r);

    document.querySelector("#pre").addEventListener("click", pre);
    document.querySelector("#next").addEventListener("click", next);
    document.querySelector("#print").addEventListener("click", print_cal);
});

function nazwa_miesiac(miesiac)
{
        if(miesiac === 1){return "styczeń";}
        if(miesiac === 2){return "luty";}
        if(miesiac === 3){return "marzec";}
        if(miesiac === 4){return "kwiecień";}
        if(miesiac === 5){return "maj";}
        if(miesiac === 6){return "czerwiec";}
        if(miesiac === 7){return "lipiec";}
        if(miesiac === 8){return "sierpień";}
        if(miesiac === 9){return "wrzesień";}
        if(miesiac === 10){return "październik";}
        if(miesiac === 11){return "listopad";}
        if(miesiac === 12){return "grudzień";}
}

function l_dni(miesiac, rok)
{
        if(miesiac === 1){return 31;}
        if(miesiac === 2)
        {
            if(rok % 4 == 0){return 29;}
            else{return 28;}
        }
        if(miesiac === 3){return 31;}
        if(miesiac === 4){return 30;}
        if(miesiac === 5){return 31;}
        if(miesiac === 6){return 30;}
        if(miesiac === 7){return 31;}
        if(miesiac === 8){return 31;}
        if(miesiac === 9){return 30;}
        if(miesiac === 10){return 31;}
        if(miesiac === 11){return 30;}
        if(miesiac === 12){return 31;}
}

//dni i swieta wolne od pracy
function swieta(d, m)
{
    if( d==1 && m==0  || d==6 && m==0 || d==12 && m==3 || d==13 && m==3 || d==1 && m==4 || d==3 && m==4 || d==31 && m==4 || d==11 && m==5 || d==15 && m==7 || d==1 && m==10 || d==11 && m==10 || d==25 && m==11 || d==26 && m==11 )
    {
        return true;
    }
}

function rysuj(mie, rok)
{
        var data = new Date(rok,mie,1,22,59,59,999);
        var dzien_tygodnia = data.getDay();
        var miesiac = data.getMonth() + 1;
        
        var miesiaccc = nazwa_miesiac(miesiac);
        document.querySelector("#mies").innerHTML = miesiaccc.toUpperCase() + " " + r;
        var liczba_dni = l_dni(miesiac, rok);

        var nr = 1;
        if(dzien_tygodnia == 0) 
        {
            dzien_tygodnia = 7;
        }

        var tableRef = document.querySelector("#tabelka");
        var newRow = tableRef.insertRow(-1);

        for(let i=0; i<7; ++i)
        {
            let newCell = newRow.insertCell(i);
            if(i+1 >= dzien_tygodnia)
            {
                if( i==6 || swieta(nr, m) )
                {
                    newTable = document.createElement("table");
                    newTable.innerHTML = tab_niedz_before + nr + tab_niedz_after;
                }
                else if( i==5 )
                {
                    newTable = document.createElement("table");
                    newTable.innerHTML = tab_sob_before + nr + tab_sob_after;
                }
                else
                {
                    newTable = document.createElement("table");
                    newTable.innerHTML = tab_rob_before + nr + tab_rob_after;
                }    

                newCell.appendChild(newTable);
                nr++;
                liczba_dni--;
            } 
        }

        while(liczba_dni)
        {
            let newRow = tableRef.insertRow(-1);
            for(let i=0; i<7; ++i)
            {
                let newCell = newRow.insertCell(i);
                if(liczba_dni > 0)
                {
                    if( i==6 || swieta(nr, m) )
                    {
                        newTable = document.createElement("table");
                        newTable.innerHTML = tab_niedz_before + nr + tab_niedz_after;
                    }
                    else if( i==5 )
                    {
                        newTable = document.createElement("table");
                        newTable.innerHTML = tab_sob_before + nr + tab_sob_after;
                    }
                    else
                    {
                        newTable = document.createElement("table");
                        newTable.innerHTML = tab_rob_before + nr + tab_rob_after;
                    } 
                                               
                    newCell.appendChild(newTable);
                    nr++;
                    liczba_dni--;
                }
            }
        }
}

function clear_table()
{
    var table = document.querySelector("#tabelka");
    var rowCount = table.rows.length;
    for(let i=rowCount; i>1; --i)
    {
        table.deleteRow(i - 1);
    }
}

function pre()
{
    clear_table();
    if(m == 0)
    {
        m = 11;
        r--;
    }
    else
    {
        m--;
    }
    rysuj(m, r);
}

function next()
{
    clear_table();
    if(m == 11)
    {
        m = 0;
        r++;
    }
    else
    {
        m++;
    }
    rysuj(m, r);
}

function print_cal()
{
    let footer = document.querySelector("#menu");
    footer.style.visibility = "hidden";
    window.print();
    footer.style.visibility = "visible";
}
