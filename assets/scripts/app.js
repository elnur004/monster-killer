const ATTACK_VALUE = 10;  // Global hardcoded GAME_VALUE convention (optional)

let chosenMaxLife = 100;
let currentMonsterLife = chosenMaxLife;
let currentPlayerLife = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function attackHandler() {
    const damage = dealMonsterDamage(ATTACK_VALUE);
    currentMonsterLife -= damage;
}

attackBtn.addEventListener('click', attackHandler);