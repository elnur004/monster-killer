const ATTACK_VALUE = 10;  // Global hardcoded GAME_VALUE convention (optional)

let chosenMaxLife = 100;
let currentMonsterLife = chosenMaxLife;
let currentPlayerLife = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function attackHandler() {
    const monsterDamage = dealMonsterDamage(ATTACK_VALUE);
    currentMonsterLife -= monsterDamage;

    const playerDamage = dealPlayerDamage(ATTACK_VALUE);
    currentPlayerLife -= playerDamage;

    if(currentMonsterLife <= 0 && currentPlayerLife > 0) {
        console.log('You won!');
    } else if(currentMonsterLife > 0 && currentPlayerLife <= 0) {
        console.log('Monster won!');
    } else if(currentMonsterLife <= 0 && currentPlayerLife <= 0) {
        console.log('You have a draw!');
    }
}

attackBtn.addEventListener('click', attackHandler);