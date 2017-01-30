function PizzaClickerGame() {

    var pizzaCount = 0;                                         // główny licznik - liczba pizz :)
    var autoClick = 0;                                          // licznik automatycznych kliknięć na sekundę
    
    
    var upgrades = [                                                // każde z ulepszeń
        {
            name : 'pizzerman',
            id : '#pizzerman',                                  //aby móc akutalizować wyniki na stronie
            idValue : '#pizzerman-value',                       // j.w
            idCount : '#pizzaViewCount',                        // do wzoru na koszt kolejnego ulepszenia
            itemCount : 0,                                      // j.w
            currentPrice : 15,                                  // akutalna cena ulepszenia
            basePrice : 15,                                     //bazowy koszt ulepszenia
            bonus: 1                                            // ile automatycznych kliknięć daje nam kupno ulepszenia
        },
        
        {
            name : 'waitress',
            id : '#waitress',
            idValue : '#waitress-value',
            idCount : '#waitressViewCount',
            itemCount : 0,
            currentPrice : 100,
            basePrice: 100,
            bonus : 10
        },
        
        {
            name : 'deliveryboy',
            id : '#deliveryboy',
            idValue : '#deliveryboy-value',
            idCount : '#deliveryboyViewCount',
            itemCount : 0,
            currentPrice : 1000,
            basePrice: 1000,
            bonus : 100
        },
        
        {
            name : 'manager',
            id : '#manager',
            idValue : '#manager-value',
            idCount : '#managerViewCount',
            itemCount : 0,
            currentPrice : 10000,
            basePrice: 10000,
            bonus : 1000
        },
        
        {
            name : 'sszef',
            id : '#manager',
            idValue : '#manager-value',
            idCount : '#managerViewCount',
            itemCount : 0,
            currentPrice : 10000,
            basePrice: 10000,
            bonus : 1000
        }
    ];
    

    var clickClicker = function() {                            //kliknięcie w clicker...
        
        pizzaCount++;
        update();
        
    };
    
    
    var clickUpgrade = function(currentUpgrade) {              //kliknięcie w jakiekolwiek ulepszenie
        
        update();                                          //wywołanie funkcji aktualizującej wyświetlanie danych na stronie
        
        
            
        if(pizzaCount >= currentUpgrade.currentPrice) {                                                             // jeżeli mamy więcej pizz niż kosztuje ulepszenie, to:
            pizzaCount = pizzaCount - currentUpgrade.currentPrice;                                                  //aktualizujemy nasze 'saldo'
            autoClick = autoClick + currentUpgrade.bonus;                                                           // aktualizujemy liczbę automatycznych kliknięć
            currentUpgrade.itemCount++;                                                                             // inkrementujemy licznik tego konkretnego ulepszenia
            currentUpgrade.currentPrice = (currentUpgrade.basePrice * (Math.pow(1.15, currentUpgrade.itemCount)));  // Pani Partyka byłaby ze mnie dumna...
            currentUpgrade.currentPrice = Math.round(currentUpgrade.currentPrice);                                  // żeby był int a nie float
            
            update();
        }
        
    };

//    this.changeCost = function(argument) {
//
//    //pizzermancurrentPrice = (autoClick + 1) * Math.round((Math.pow(2, autoClick * autoClick / 10))); //wzór nr 1
//    //firstClickerCost = Math.round((autoClick + 1) * 1.33);
//        
//    console.log(argument);
//    argument = argument * (Math.pow(1.15, argument));
//    argument = Math.round(argument);
//    console.log(argument);
//    //this.update();
//        
//    };
    
    var checkPizza = function() {                              // metoda sprawdzająca czy można się wklikać w dane ulepszenie czy nie
        
        for(var i = 0; i < upgrades.length; i++) {
            
            if(pizzaCount >= upgrades[i].currentPrice) {
                $(upgrades[i].id).attr("disabled", false);
            }
            
            else {
                $(upgrades[i].id).attr("disabled", true);
            }
        }
    };

    var update = function() {                                      // metoda często wywoływana - odpowiedzialna za aktualizacje danych wyświetlanych na stronie
        $('title').text(pizzaCount + ' pizzas!');
        $('#counter').text(pizzaCount);
        
        for(var i = 0; i < upgrades.length; i++) {
            $(upgrades[i].idValue).text(upgrades[i].currentPrice);  // aktualizacja wyświetlenia aktualnej ceny ulepszenia
            $(upgrades[i].idCount).text(upgrades[i].itemCount);     // aktualizacja wyświetlenia aktualnej ilości posiadanych ulepszeń
        }
        $('#perSec').text(autoClick);                               // automatycznych kliknięć na sekundę
        
    };
    
    ////////@@@@@@@@@@@@@@@@@@///////// TO DO ////////////@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@///////////////////
    
    var updateAutoClicks = function() { // do poprawki: metoda odpowiedzialna za dodanie automatycznych kliknięć do całkowitej liczby pizz - w razie zmiany SetInterval z 1 sekundy, wszystko zacznya źle działać :(
        pizzaCount = pizzaCount + autoClick;
    };

    ////////@@@@@@@@@@@@@@@@@@///////// TO DO ////////////@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@///////////////////

    var save = function() {                                        //metoda zapisująca postęp gry do localStorage
        localStorage.setItem('pizzaCount', pizzaCount);
        localStorage.setItem('autoClick', autoClick);
        
        for(var i = 0; i < upgrades.length; i++) {
            localStorage.setItem(upgrades[i].name + 'Cost', upgrades[i].currentPrice);
            localStorage.setItem(upgrades[i].name + 'Count', upgrades[i].itemCount);
        }
        console.log('zapisano');

    };

    var load = function() {                                        //metoda wczytująca postęp gry z localStorage
        
        update();
        
        if(localStorage.getItem('pizzaCount')) {                    // jeżeli istnieje już jakakolwiek pizza to wczytaj dane...
            
            
            for(var i = 0; i < upgrades.length; i++) {
                
                upgrades[i].currentPrice = localStorage.getItem(upgrades[i].name + 'Cost');
                upgrades[i].currentPrice = parseInt(upgrades[i].currentPrice);
                upgrades[i].itemCount = localStorage.getItem(upgrades[i].name + 'Count');
                upgrades[i].itemCount = parseInt(upgrades[i].itemCount);
            }
            
            pizzaCount = localStorage.getItem('pizzaCount');
            pizzaCount = parseInt(pizzaCount);
            
            autoClick = localStorage.getItem('autoClick');
            autoClick = parseInt(autoClick);
            
           }
        else {                                                      // ... w przeciwnym wypadku zresetuj wynik
            reset();
        };
    
        update();
    };
    
    var reset = function() {                                       // metoda resetująca grę
        
        for(var i = 0; i < upgrades.length; i++) {
            
            localStorage.setItem('pizzaCount', 0);
            localStorage.setItem('autoClick', 0);
            
            localStorage.setItem(upgrades[i].name + 'Cost', upgrades[i].basePrice);
            localStorage.setItem(upgrades[i].name + 'Count', 0);
            
        }
    }
    
    var events = function() {

//        var ev = this;
        
        $( document ).on( 'click', '#clicker', clickClicker );

        $( document ).on( 'click', '#pizzerman', function() {
            clickUpgrade(upgrades[0]);
        } );
        
        $( document ).on( 'click', '#waitress', function() {
            clickUpgrade(upgrades[1]);
        } );

        $( document ).on( 'click', '#deliveryboy', function() {
            clickUpgrade(upgrades[2]);
        } );

        $( document ).on( 'click', '#manager', function() {
            clickUpgrade(upgrades[3]);
        } );

        $( document ).on( 'click', '#save', save );

        $( document ).on( 'click', '#load', load );

        $( document ).on( 'click', '#reset', function() {
            reset();
            load();
        });
        
    };
    
    
    
    
    var construct = function() {                                   // konstruktor
        events();
        load();                                                // wczytywanie danych z localStorage po wejściu na stronę
        setInterval(update, 1);                             // wywołanie metody aktualizującej dane na stronie co 1 sekundę
        setInterval(checkPizza, 100);                          // wywołanie metody sprawdzającej czy można się wklikać w dane ulepszenie czy nie co 0.1s
        setInterval(save, 60000);                              // autozapis co 60 sekund
        setInterval(updateAutoClicks, 1000);                   // TO DO // nie wolno zmieniać wartości, inaczej wszystko się psuje :( :( :(
        
        $('#pizzerman').attr("disabled", true);                     // buttony domyślnie ustawione na disabled
        
    }
    
    return { start: construct };
    

};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    var Clicker = new PizzaClickerGame().start();
});

