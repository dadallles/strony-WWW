var data_ = new Date();
var d_ = data_.getDate();
var m_ = data_.getMonth();
var r_ = data_.getFullYear();
var t_;

var tab_niedz_before = "<tr id='niedziela'><td id='niedziela'>";
var tab_sob_before = "<tr id='sobota'><td id='sobota'>";
var tab_rob_before = "<tr id='roboczy'><td id='roboczy'>";
var tab_all_after = "</td></tr> <tr id='tab_in'><td id='tab_in'>8</td></tr>  <tr id='tab_in'><td id='tab_in'>9</td></tr>  <tr id='tab_in'><td id='tab_in'>10</td></tr>  <tr id='tab_in'><td id='tab_in'>11</td></tr>  <tr id='tab_in'><td id='tab_in'>12</td></tr>  <tr id='tab_in'><td id='tab_in'>13</td></tr>  <tr id='tab_in'><td id='tab_in'>14</td></tr>  <tr id='tab_in'><td id='tab_in'>15</td></tr>  <tr id='tab_in'><td id='tab_in'>16</td></tr>  <tr id='tab_in'><td id='tab_in'>17</td></tr>  <tr id='tab_in'><td id='tab_in'>18</td></tr>  <tr id='tab_in'><td id='tab_in'>19</td></tr>  <tr id='tab_in'><td id='tab_in'>20</td></tr>";

document.addEventListener("DOMContentLoaded", function(event) {
    rysuj(d_, m_, r_);

    document.querySelector("#pre").addEventListener("click", pre);
    document.querySelector("#next").addEventListener("click", next);
    document.querySelector("#print").addEventListener("click", print_cal);
});
/*
function nr_tygodnia(dzien, miesiac, rok)
{
    var liczba_dni = dzien;
    var nr_miesiaca = miesiac;
    while(nr_miesiaca > 0)
    {
        liczba_dni += l_dni(nr_miesiaca+1, rok);
        nr_miesiaca--;
    }

    return Math.floor(liczba_dni/7) + 1;
}
*/
function ISO8601_week_no(dt) 
{
    var tdt = new Date(dt.valueOf());
    var dayn = (dt.getDay() + 6) % 7;
    tdt.setDate(tdt.getDate() - dayn + 3);
    var firstThursday = tdt.valueOf();
    tdt.setMonth(0, 1);
    if (tdt.getDay() !== 4) 
    {
      tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - tdt) / 604800000);
}

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

function rysuj(dzien, mie, rok)
{
        var data = new Date(rok, mie, dzien);
        var dzien_tygodnia = data.getDay();
        var miesiac = data.getMonth() + 1;
        var liczba_dni = l_dni(miesiac, rok);

        if(dzien_tygodnia == 0) 
        {
            dzien_tygodnia = 7;
        }

        t_ = ISO8601_week_no(data);

        var tableRef = document.querySelector("#tabelka");
        var newRow = tableRef.insertRow(-1);
        var newCell, newTable;

        if(dzien-dzien_tygodnia+1 > 0 && dzien+7-dzien_tygodnia <= liczba_dni)
        {
            document.querySelector("#mies").innerHTML = "TYDZIEŃ " + t_ + " - " + nazwa_miesiac(miesiac) + " " + rok;
            let nr = dzien-dzien_tygodnia+1;

            for(let i=0; i<5; ++i)
            {
                newCell = newRow.insertCell(i);
                if( swieta(nr, mie) )
                {
                    newTable = document.createElement("table");
                    newTable.innerHTML = tab_niedz_before + nr + tab_all_after;
                }
                else
                {
                    newTable = document.createElement("table");
                    newTable.innerHTML =  tab_rob_before + nr + tab_all_after;
                } 
                newCell.appendChild(newTable);
                nr++;
            }

            newCell = newRow.insertCell(5);
            newTable = document.createElement("table");
            if( swieta(nr, mie) )
            {
                newTable.innerHTML = tab_niedz_before + nr + tab_all_after;
            }
            else
            {
                newTable.innerHTML = tab_sob_before + nr + tab_all_after;
            }
            newCell.appendChild(newTable);
            nr++;

            newCell = newRow.insertCell(6);
            newTable = document.createElement("table");
            newTable.innerHTML = tab_niedz_before + nr + tab_all_after;
            newCell.appendChild(newTable);
        }
        else if(dzien-dzien_tygodnia+1 < 1)
        {
            let liczba_dni_poprz;
            if(mie == 0)
            {
                mie = 12;
                liczba_dni_poprz = 31;
                document.querySelector("#mies").innerHTML = "TYDZIEŃ " + t_ + " - " + "grudzień " + (rok-1) + " / " + " styczeń " + rok;
            }
            else
            {
                liczba_dni_poprz = l_dni(miesiac-1, rok);
                document.querySelector("#mies").innerHTML = "TYDZIEŃ " + t_ + " - " + nazwa_miesiac(miesiac-1) + " / " + nazwa_miesiac(miesiac) + " " + rok;
            }
            let nr_poprzedni = liczba_dni_poprz - Math.abs(dzien-dzien_tygodnia+1);
            let i=0;

            while(nr_poprzedni <= liczba_dni_poprz)
            {
                newCell = newRow.insertCell(i);
                if( i==6 || swieta(nr_poprzedni, mie-1) )
                {
                    newTable = document.createElement("table");
                    newTable.innerHTML = tab_niedz_before + nr_poprzedni + tab_all_after;
                }
                else if( i==5 )
                {
                    newTable = document.createElement("table");
                    newTable.innerHTML = tab_sob_before + nr_poprzedni + tab_all_after;
                }
                else
                {
                    newTable = document.createElement("table");
                    newTable.innerHTML = tab_rob_before + nr_poprzedni + tab_all_after;
                } 
                newCell.appendChild(newTable);
                nr_poprzedni++;
                i++;
            }

            if(mie == 12)
            {
                mie=0;
            }
            let nr=1;
            while(i < 7)
            {
                newCell = newRow.insertCell(i);
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
                i++;
            }
        }
        else
        {
            if(mie == 11)
            {
                document.querySelector("#mies").innerHTML = "TYDZIEŃ " + t_ + " - " + "grudzień " + rok + " / " + " styczeń " + (rok+1);
            }
            else
            {
                document.querySelector("#mies").innerHTML = "TYDZIEŃ " + t_ + " - " + nazwa_miesiac(miesiac) + " / " + nazwa_miesiac(miesiac+1) + " " + rok;
            }
            let nr = dzien - dzien_tygodnia + 1;
            let i=0;

            while(nr <= liczba_dni)
            {
                newCell = newRow.insertCell(i);
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
                i++;
            }

            if(mie == 11)
            {
                mie = 0;
            }
            nr=1;
            while(i < 7)
            {
                newCell = newRow.insertCell(i);
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
                i++;
            }
        }
}

function clear_table()
{
    var table = document.querySelector("#tabelka");
    table.deleteRow(-1);
}

function pre()
{
    clear_table();
    if(d_ <= 7 && m_ == 0)
    {
        d_ = 31 + d_ - 7;
        m_ = 11;
        r_--;
    }
    else if(d_ <= 7)
    {
        d_ = l_dni(m_, r_) + d_ - 7;
        m_--;
    }
    else
    {
        d_ -= 7;
    }
    rysuj(d_, m_, r_);
}

function next()
{
    clear_table();
    if(d_ > 24 && m_ == 11)
    {
        d_ = Math.abs(24 - d_);
        m_ = 0;
        r_++;
    }
    else if(d_ > l_dni(m_+1, r_)-7)
    {
        d_ = Math.abs(l_dni(m_+1, r_) - 7 - d_);
        m_++;
    }
    else
    {
        d_ += 7;
    }
    rysuj(d_, m_, r_);
}

function print_cal()
{
    let footer = document.querySelector("#menu");
    footer.style.display = "none";
    window.print();
    footer.style.display = "block";
}
