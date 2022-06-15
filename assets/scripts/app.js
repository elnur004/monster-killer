const ATTACK_VALUE = 10; // Global hardcoded GAME_VALUE convention (optional)
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;

let chosenMaxLife = 100;
let currentMonsterLife = chosenMaxLife;
let currentPlayerLife = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function attackMonster(mode) {
  let maxDamage;
  if (mode === 'ATTACK') {
    maxDamage = ATTACK_VALUE;
  } else if (mode === 'STRONG_ATTACK') {
    maxDamage = STRONG_ATTACK_VALUE;
  }

  const monsterDamage = dealMonsterDamage(maxDamage);
  currentMonsterLife -= monsterDamage;

  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerLife -= playerDamage;

  if (currentMonsterLife <= 0 && currentPlayerLife > 0) {
    console.log('You won!');
  } else if (currentMonsterLife > 0 && currentPlayerLife <= 0) {
    console.log('Monster won!');
  } else if (currentMonsterLife <= 0 && currentPlayerLife <= 0) {
    console.log('You have a draw!');
  }
}

function attackHandler() {
  attackMonster('ATTACK');
}

function strongAttackHandler() {
  attackMonster('STRONG_ATTACK');
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
