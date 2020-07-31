new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },

    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
            
        },

        attack : function() {

            var damage = this.calculateDamage(3,10);
           
            this.monsterHealth -= damage
            this.turns.unshift({
                isPlayer: true,
                text: "player hits Monster for " + damage

            });
            if(this.checkWin()){
                return;
            }

            this.monsterAttack();
            
            this.checkWin();

        },

        specialAttack: function() {
            var damage = this.calculateDamage(8,15);
            this.monsterHealth -= damage;

            this.turns.unshift({
                isPlayer: true,
                text: "player hits Monster hard for " + damage

            });
            if(this.checkWin()){
                return;
            }

            this.monsterAttack();

        },
        giveUp: function() {
            
            this.gameIsRunning = false;
            this.turns = [];
            
            
            


        },

        heal: function() {
            if(this.playerHealth <= 90) {
                this.playerHealth += 8;
            } else {
                this.playerHealth = 100;
            }

            this.turns.unshift({
                isPlayer: true,
                text: "player heals for " + 10

            });

            this.monsterAttack();
        },

        calculateDamage: function(min, max){
            return Math.max(Math.floor(Math.random() * max) + 1 , min);

        },

        checkWin: function() {
            if(this.monsterHealth <= 0){
                if(confirm("you won! new Game")){
                    this.startGame();
                }
                else{
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if(confirm("you lost! new Game")){
                    this.startGame();
                }
                else{
                    this.gameIsRunning = false;
                }

                return true;
            }

            return false;

            
        },

        monsterAttack: function() {
            var damage = this.calculateDamage(5,12);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: "monster hits player for " + damage

            })
            
            this.checkWin();
        }
    }
})