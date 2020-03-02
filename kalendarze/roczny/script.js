var data_ = new Date();
var r_ = data_.getFullYear();

var tab_niedz_before = "<tr id='niedziela'><td id='niedziela'>";
var tab_sob_before = "<tr id='sobota'><td id='sobota'>";
var tab_rob_before = "<tr id='roboczy'><td id='roboczy'>";
var tab_all_after = "</td></tr> <tr id='tab_in'><td id='tab_in'></td></tr>";

document.addEventListener("DOMContentLoaded", function(event) {
    var tab_div = document.querySelector(".tabela");

    for(let i=0; i<12; ++i)
    {
        let newDiv = document.createElement("div");
        if(i%2 == 0)
        {
            newDiv.className = "tabela_div_left";
        }
        else
        {
            newDiv.className = "tabela_div_right";
        }
        newDiv.innerHTML = "<p class='miesiac'>" + nazwa_miesiac(i) + "</p>";

        let newTable = document.createElement("table");
        newTable.className = "tabelka";
        newTable.id = i;
        newTable.innerHTML = "<tr id='t1'><td>Poniedziałek</td><td>Wtorek</td><td>Środa</td><td>Czwartek</td><td>Piątek</td><td id='niedziela_first'>Sobota</td><td id='sobota_first'>Niedziela</td></tr>";

        newDiv.appendChild(newTable);
        tab_div.appendChild(newDiv);

        rysuj(i, r_);
    }

    document.querySelector("#pre").addEventListener("click", pre);
    document.querySelector("#next").addEventListener("click", next);
    document.querySelector("#print").addEventListener("click", print_cal);
});

function nazwa_miesiac(miesiac)
{
        if(miesiac === 0){return "styczeń";}
        if(miesiac === 1){return "luty";}
        if(miesiac === 2){return "marzec";}
        if(miesiac === 3){return "kwiecień";}
        if(miesiac === 4){return "maj";}
        if(miesiac === 5){return "czerwiec";}
        if(miesiac === 6){return "lipiec";}
        if(miesiac === 7){return "sierpień";}
        if(miesiac === 8){return "wrzesień";}
        if(miesiac === 9){return "październik";}
        if(miesiac === 10){return "listopad";}
        if(miesiac === 11){return "grudzień";}
}

function l_dni(miesiac, rok)
{
        if(miesiac === 0){return 31;}
        if(miesiac === 1)
        {
            if(((rok%4 == 0) && (rok%100 != 0)) || (rok%400 == 0)){return 29;}
            else{return 28;}
        }
        if(miesiac === 2){return 31;}
        if(miesiac === 3){return 30;}
        if(miesiac === 4){return 31;}
        if(miesiac === 5){return 30;}
        if(miesiac === 6){return 31;}
        if(miesiac === 7){return 31;}
        if(miesiac === 8){return 30;}
        if(miesiac === 9){return 31;}
        if(miesiac === 10){return 30;}
        if(miesiac === 11){return 31;}
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
        var data = new Date(rok, mie);
        var dzien_tygodnia = data.getDay();
        
        var liczba_dni = l_dni(mie, rok);
        document.querySelector("#rok").innerHTML = r_;

        var nr = 1;
        if(dzien_tygodnia == 0) 
        {
            dzien_tygodnia = 7;
        }

        var tableRef = document.getElementById(mie);
        var newRow = tableRef.insertRow(-1);
        var newCell, newTable;

        for(let i=0; i<7; ++i)
        {
            newCell = newRow.insertCell(i);
            if(i+1 >= dzien_tygodnia)
            {
                if( i==6 || swieta(nr, mie) )
                {
                    newTable = document.createElement("table");
                    newTable.innerHTML = tab_niedz_before + nr + tab_all_after;
                }
                else if( i==5 )
                {
                    newTable = document.createElement("table");
                    newTable.innerHTML = tab_sob_before + nr + tab_all_after;
                }
                else
                {
                    newTable = document.createElement("table");
                    newTable.innerHTML = tab_rob_before + nr + tab_all_after;
                }    

                newCell.appendChild(newTable);
                nr++;
                liczba_dni--;
            } 
        }

        while(liczba_dni)
        {
            newRow = tableRef.insertRow(-1);
            for(let i=0; i<7; ++i)
            {
                let newCell = newRow.insertCell(i);
                if(liczba_dni > 0)
                {
                    if( i==6 || swieta(nr, mie) )
                    {
                        newTable = document.createElement("table");
                        newTable.innerHTML = tab_niedz_before + nr + tab_all_after;
                    }
                    else if( i==5 )
                    {
                        newTable = document.createElement("table");
                        newTable.innerHTML = tab_sob_before + nr + tab_all_after;
                    }
                    else
                    {
                        newTable = document.createElement("table");
                        newTable.innerHTML = tab_rob_before + nr + tab_all_after;
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
    for(let i=0; i<12; ++i)
    {
        var table = document.getElementById(i);
        var rowCount = table.rows.length;
        for(let i=rowCount; i>1; --i)
        {
            table.deleteRow(i - 1);
        }
    }
}

function pre()
{
    clear_table();
    r_--;
    for(let i=0; i<12; ++i)
    {
        rysuj(i, r_);
    }
}

function next()
{
    clear_table();
    r_++;
    for(let i=0; i<12; ++i)
    {
        rysuj(i, r_);
    }
}

function print_cal()
{
    let footer = document.querySelector("#menu");
    footer.style.display = "none";
    window.print();
    footer.style.display = "block";
}
