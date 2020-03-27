var data_ = new Date();
var m_ = data_.getMonth();
var r_ = data_.getFullYear();

var ruchome; //swieta ruchome

var tab_niedz_before = "<tr id='niedziela'><td id='niedziela'>";
var tab_sob_before = "<tr id='sobota'><td id='sobota'>";
var tab_rob_before = "<tr id='roboczy'><td id='roboczy'>";
var tab_all_after = "</td></tr> <tr id='tab_in'><td id='tab_in'></td></tr>";

document.addEventListener("DOMContentLoaded", function(event) {
    ruchome = swieta_ruchome(r_);
    
    rysuj(m_, r_);

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

//poniedzialek wielkanocny
//boze cialo - +60 dni od wielkanocy
function swieta_ruchome(year) 
{
    //wielkanoc
    var poniedzialek_wielkanocny_dzien, poniedzialek_wielkanocny_miesiac, boze_cialo_dzien, boze_cialo_miesiac,
        luty = l_dni(1, year), 
        dzien_roku = 31 + luty, 
        f = Math.floor,
		G = year % 19,
		C = f(year / 100),
		H = (C - f(C / 4) - f((8 * C + 13)/25) + 19 * G + 15) % 30,
		I = H - f(H/28) * (1 - f(29/(H + 1)) * f((21-G)/11)),
		J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
		L = I - J,
		month = 3 + f((L + 40)/44),
        day = L + 28 - 31 * f(month / 4);

    if( day==31 && month==3 )
    {
        poniedzialek_wielkanocny_dzien = 1;
        poniedzialek_wielkanocny_miesiac = 3;
    }
    else
    {
        poniedzialek_wielkanocny_dzien = day + 1;
        poniedzialek_wielkanocny_miesiac = month - 1;
    }

    if( month==3 )
    {
        dzien_roku += day;
    }
    else
    {
        dzien_roku = dzien_roku + 31 + day;
    }

    dzien_roku += 60;

    if( luty==28 && dzien_roku<=151)
    {
        boze_cialo_dzien = dzien_roku - 120;
        boze_cialo_miesiac = 4;
    }
    else if( luty==29 && dzien_roku<=152 )
    {
        boze_cialo_dzien = dzien_roku - 121;
        boze_cialo_miesiac = 4;
    }
    else if( luty==29 )
    {
        boze_cialo_dzien = dzien_roku - 152;
        boze_cialo_miesiac = 5;
    }
    else
    {
        boze_cialo_dzien = dzien_roku - 151;
        boze_cialo_miesiac = 5;
    }

    return [poniedzialek_wielkanocny_dzien, poniedzialek_wielkanocny_miesiac, boze_cialo_dzien, boze_cialo_miesiac];
}

//dni i swieta wolne od pracy
function swieta(d, m)
{
    if( d==1 && m==0  || d==6 && m==0 || d==ruchome[0] && m==ruchome[1] || d==1 && m==4 || d==3 && m==4 || d==ruchome[2] && m==ruchome[3] || d==15 && m==7 || d==1 && m==10 || d==11 && m==10 || d==25 && m==11 || d==26 && m==11 )
    {
        return true;
    }
    else 
    {
        return false;
    }
}

function rysuj(mie, rok)
{
        var data = new Date(rok, mie);
        var dzien_tygodnia = data.getDay();
        var miesiac = data.getMonth();
        
        var miesiac_nazwa = nazwa_miesiac(miesiac);
        document.querySelector("#mies").innerHTML = miesiac_nazwa.toUpperCase() + " " + rok;
        var liczba_dni = l_dni(miesiac, rok);

        var nr = 1;
        if(dzien_tygodnia == 0) 
        {
            dzien_tygodnia = 7;
        }

        var tableRef = document.querySelector("#tabelka");
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
    if(m_ == 0)
    {
        m_ = 11;
        r_--;

        ruchome = swieta_ruchome(r_);
    }
    else
    {
        m_--;
    }
    rysuj(m_, r_);
}

function next()
{
    clear_table();
    if(m_ == 11)
    {
        m_ = 0;
        r_++;

        ruchome = swieta_ruchome(r_);
    }
    else
    {
        m_++;
    }
    rysuj(m_, r_);
}

function print_cal()
{
    let footer = document.querySelector("#menu");
    footer.style.display = "none";
    window.print();
    footer.style.display = "block";
}
