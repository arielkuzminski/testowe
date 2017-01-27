function PizzaClickerGame() {

    var pizzaCount = 0;
    var autoClick = 0;
    var n = 1;
    var firstClickerCost = 2;

    this.clickClicker = function() {
        
        pizzaCount++;
        this.update();
        
    };
    
    
    this.clickUpgrade = function() {
        
        this.update();
               
        if(pizzaCount >= firstClickerCost) {
            $('#first-clicker').attr("disabled", false);
            pizzaCount = pizzaCount - firstClickerCost;
            autoClick++;
            this.changeCost();
            this.update();
        }
    };
    
    this.checkPizza = function() {
        if(pizzaCount >= firstClickerCost) {
            $('#first-clicker').attr("disabled", false);
        }
        else {
            $('#first-clicker').attr("disabled", true);
        }
    };

    this.update = function() {
        $('title').text(pizzaCount + ' pizzas!');
        $('#counter').text(pizzaCount);
        $('.value').text(firstClickerCost);
    };
    
    this.updateAutoClicks = function() {
        pizzaCount = pizzaCount + autoClick;
    };


    this.save = function() {
        localStorage.setItem('pizzaCount', pizzaCount);
        localStorage.setItem('autoClick', autoClick);
        localStorage.setItem('firstClickerCost', firstClickerCost);
        localStorage.setItem('n', n);
        console.log('zapisano');

    };

    this.load = function() {
        
        this.update();
        
        if(localStorage.getItem('pizzaCount')) {
            
            firstClickerCost = localStorage.getItem('firstClickerCost')
            firstClickerCost = parseInt(firstClickerCost);
            
            pizzaCount = localStorage.getItem('pizzaCount');
            pizzaCount = parseInt(pizzaCount);
            
            autoClick = localStorage.getItem('autoClick');
            autoClick = parseInt(autoClick);
            
            n = localStorage.getItem('n');
            n = parseInt(n);
            
           }
        else {
            localStorage.setItem('pizzaCount', 0);
            localStorage.setItem('autoClick', 0);
            localStorage.setItem('firstClickerCost', 0);
            localStorage.setItem('n', 0);
        };
    
        this.update();
    };

    this.changeCost = function() {
        
        n++;
        firstClickerCost = (autoClick + 1) * Math.round((Math.pow(2, n * autoClick / 10))); //wzór nr 1
        //firstClickerCost = Math.round((autoClick + 1) * 1.33);
        this.update();
        
    };
    
    this.construct = function() {
        this.load();
        setInterval(this.update, 1000);
        setInterval(this.checkPizza, 100);
        setInterval(this.save, 60000);
        setInterval(this.updateAutoClicks, 1000);
        
        console.log(firstClickerCost);
        
        $('#first-clicker').attr("disabled", true);
        
    }
    
    this.construct();

};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

var Clicker = new PizzaClickerGame();

$('#clicker').on('click', function(){
    Clicker.clickClicker();
    
});

$('#first-clicker').on('click', function(){
    Clicker.clickUpgrade();
    
});

$('#save').on('click', function(){
    Clicker.save();
    
});

$('#load').on('click', function(){
    Clicker.load();
    
});

