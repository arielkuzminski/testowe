function PizzaClickerGame() {

    var pizzaCount = 0;                                         // główny licznik - liczba pizz :)
    var autoClick = 0;                                          // licznik automatycznych kliknięć na sekundę
    
    
    upgrades = [                                                // każde z ulepszeń
        {
            id : '#pizzerman',                                  //aby móc akutalizować wyniki na stronie
            idValue : '#pizzerman-value',                       // j.w
            idCount : '#pizzaViewCount',                        // do wzoru na koszt kolejnego ulepszenia
            itemCount : 0,                                      // j.w
            currentPrice : 15,                                  // akutalna cena ulepszenia
            basePrice : 15,                                     //bazowy koszt ulepszenia
            bonus: 1                                            // ile automatycznych kliknięć daje nam kupno ulepszenia
        },
        
        {
            id : '#waitress',
            idValue : '#waitress-value',
            idCount : '#waitressViewCount',
            itemCount : 0,
            currentPrice : 100,
            basePrice: 100,
            bonus : 10
        }
    ];
    

    this.clickClicker = function() {                            //kliknięcie w clicker...
        
        pizzaCount++;
        this.update();
        
    };
    
    
    this.clickUpgrade = function(currentUpgrade) {              //kliknięcie w jakiekolwiek ulepszenie
        
        this.update();                                          //wywołanie funkcji aktualizującej wyświetlanie danych na stronie
        
        
            
        if(pizzaCount >= currentUpgrade.currentPrice) {                                                             // jeżeli mamy więcej pizz niż kosztuje ulepszenie, to:
            pizzaCount = pizzaCount - currentUpgrade.currentPrice;                                                  //aktualizujemy nasze 'saldo'
            autoClick = autoClick + currentUpgrade.bonus;                                                           // aktualizujemy liczbę automatycznych kliknięć
            currentUpgrade.itemCount++;                                                                             // inkrementujemy licznik tego konkretnego ulepszenia
            currentUpgrade.currentPrice = (currentUpgrade.basePrice * (Math.pow(1.15, currentUpgrade.itemCount)));  // Pani Partyka byłaby ze mnie dumna...
            currentUpgrade.currentPrice = Math.round(currentUpgrade.currentPrice);                                  // żeby był int a nie float
            
            this.update();
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
    
    this.checkPizza = function() {                              // metoda sprawdzająca czy można się wklikać w dane ulepszenie czy nie
        
        for(var i = 0; i < upgrades.length; i++) {
            
            if(pizzaCount >= upgrades[i].currentPrice) {
                $(upgrades[i].id).attr("disabled", false);
            }
            
            else {
                $(upgrades[i].id).attr("disabled", true);
            }
        }
    };

    this.update = function() {                                      // metoda często wywoływana - odpowiedzialna za aktualizacje danych wyświetlanych na stronie
        $('title').text(pizzaCount + ' pizzas!');
        $('#counter').text(pizzaCount);
        
        for(var i = 0; i < upgrades.length; i++) {
            $(upgrades[i].idValue).text(upgrades[i].currentPrice);  // aktualizacja wyświetlenia aktualnej ceny ulepszenia
            $(upgrades[i].idCount).text(upgrades[i].itemCount);     // aktualizacja wyświetlenia aktualnej ilości posiadanych ulepszeń
        }
        $('#perSec').text(autoClick);                               // automatycznych kliknięć na sekundę
        
    };
    
    ////////@@@@@@@@@@@@@@@@@@///////// TO DO ////////////@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@///////////////////
    
    this.updateAutoClicks = function() { // do poprawki: metoda odpowiedzialna za dodanie automatycznych kliknięć do całkowitej liczby pizz - w razie zmiany SetInterval z 1 sekundy, wszystko zacznya źle działać :(
        pizzaCount = pizzaCount + autoClick;
    };

    ////////@@@@@@@@@@@@@@@@@@///////// TO DO ////////////@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@///////////////////

    this.save = function() {                                        //metoda zapisująca postęp gry do localStorage
        localStorage.setItem('pizzaCount', pizzaCount);
        localStorage.setItem('autoClick', autoClick);
        
        localStorage.setItem('pizzermanCost', upgrades[0].currentPrice);
        localStorage.setItem('pizzermanCount', upgrades[0].itemCount);
        
        localStorage.setItem('waitressCost', upgrades[1].currentPrice);
        localStorage.setItem('waitressCount', upgrades[1].itemCount);
        console.log('zapisano');

    };

    this.load = function() {                                        //metoda wczytująca postęp gry z localStorage
        
        //this.update();
        
        if(localStorage.getItem('pizzaCount')) {                    // jeżeli istnieje już jakakolwiek pizza to wczytaj dane...
            
            upgrades[0].currentPrice = localStorage.getItem('pizzermanCost')
            upgrades[0].currentPrice = parseInt(upgrades[0].currentPrice);
            upgrades[0].itemCount = localStorage.getItem('pizzermanCount')
            upgrades[0].itemCount = parseInt(upgrades[0].itemCount);
            
            
            upgrades[1].currentPrice = localStorage.getItem('waitressCost')
            upgrades[1].currentPrice = parseInt(upgrades[1].currentPrice);
            upgrades[1].itemCount = localStorage.getItem('waitressCount')
            upgrades[1].itemCount = parseInt(upgrades[1].itemCount);
            
            pizzaCount = localStorage.getItem('pizzaCount');
            pizzaCount = parseInt(pizzaCount);
            
            autoClick = localStorage.getItem('autoClick');
            autoClick = parseInt(autoClick);
            
           }
        else {                                                      // ... w przeciwnym wypadku zresetuj wynik
            this.reset();
        };
    
        this.update();
    };
    
    this.reset = function() {                                       // metoda resetująca grę
        localStorage.setItem('pizzaCount', 0);
        localStorage.setItem('autoClick', 0);
        localStorage.setItem('pizzermanCost', upgrades[0].basePrice);
        localStorage.setItem('waitressCost', upgrades[1].basePrice);
        localStorage.setItem('pizzermanCount', 0);
        localStorage.setItem('waitressCount', 0);
    }
    
    this.construct = function() {                                   // konstruktor
        this.load();                                                // wczytywanie danych z localStorage po wejściu na stronę
        setInterval(this.update, 1000);                             // wywołanie metody aktualizującej dane na stronie co 1 sekundę
        setInterval(this.checkPizza, 100);                          // wywołanie metody sprawdzającej czy można się wklikać w dane ulepszenie czy nie co 0.1s
        setInterval(this.save, 60000);                              // autozapis co 60 sekund
        setInterval(this.updateAutoClicks, 1000);                   // TO DO // nie wolno zmieniać wartości, inaczej wszystko się psuje :( :( :(
        
        $('#pizzerman').attr("disabled", true);                     // buttony domyślnie ustawione na disabled
        
    }
    
    this.construct();

};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

var Clicker = new PizzaClickerGame();


$('#clicker').on('click', function(){
    Clicker.clickClicker();
    
});

$('#pizzerman').on('click', function(){
    Clicker.clickUpgrade(upgrades[0]);
    
});

$('#waitress').on('click', function(){
    Clicker.clickUpgrade(upgrades[1]);
    
});

$('#save').on('click', function(){
    Clicker.save();
    
});

$('#load').on('click', function(){
    Clicker.load();
    
});

$('#reset').on('click', function(){
    Clicker.reset();
    Clicker.load();
    
});

