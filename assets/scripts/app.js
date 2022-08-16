const ATTACK_VALUE = 10; // Global hardcoded GAME_VALUE convention (optional)
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG ATTACK';

const LOG_PLAYER_ATTACK = 'PLAYER ATTACK';
const LOG_PLAYER_STRONG_ATTACK = 'PLAYER STRONG ATTACK';
const LOG_MONSTER_ATTACK = 'MONSTER ATTACK';
const LOG_PLAYER_HEAL = 'PLAYER HEAL';
const LOG_GAME_OVER = 'GAME OVER';

function getMaxLifeValue() {
  const enteredValue = prompt(
    'Enter a maximum life to the monster and you.',
    '100'
  );

  let parsedValue = parseInt(enteredValue);
  if (isNaN(parsedValue) || parsedValue <= 0) {
    throw { message: 'Invalid user input, not a number!' };
  }
  return parsedValue;
}

let chosenMaxLife = getMaxLifeValue();

let currentMonsterLife = chosenMaxLife;
let currentPlayerLife = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

const battleLog = [];
function writeToLog(event, value, playerHealth, monsterHealth) {
  let logEntry = {
    event: event,
    value: value,
    finalPlayerHealth: playerHealth,
    finalMonsterHealth: monsterHealth,
  };

  switch (event) {
    case LOG_PLAYER_ATTACK:
      logEntry.target = 'MONSTER';
      break;
    case LOG_PLAYER_STRONG_ATTACK:
      logEntry.target = 'MONSTER';
      break;
    case LOG_MONSTER_ATTACK:
      logEntry.target = 'PLAYER';
      break;
    case LOG_PLAYER_HEAL:
      logEntry.target = 'PLAYER';
      break;
    case LOG_GAME_OVER:
      logEntry;
      break;
    default:
      logEntry = {};
  }

  // if (event === LOG_PLAYER_ATTACK) {
  //   logEntry.target = 'MONSTER';
  // } else if (event === LOG_PLAYER_STRONG_ATTACK) {
  //   logEntry.target = 'MONSTER';
  // } else if (event === LOG_MONSTER_ATTACK) {
  //   logEntry.target = 'PLAYER';
  // } else if (event === LOG_PLAYER_HEAL) {
  //   logEntry.target = 'PLAYER';
  // } else if (event === LOG_GAME_OVER) {
  //   logEntry;
  // }
  battleLog.push(logEntry);
}

function reset() {
  currentMonsterLife = chosenMaxLife;
  currentPlayerLife = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  const initialPlayerLife = currentPlayerLife;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerLife -= playerDamage;
  writeToLog(
    LOG_MONSTER_ATTACK,
    playerDamage,
    currentPlayerLife,
    currentMonsterLife
  );

  if (currentPlayerLife <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerLife = initialPlayerLife;
    setPlayerHealth(initialPlayerLife);
    alert('You would be dead but the bonus life saved you!');
  }

  if (currentMonsterLife <= 0 && currentPlayerLife > 0) {
    writeToLog(
      LOG_GAME_OVER,
      'PLAYER WON',
      currentPlayerLife,
      currentMonsterLife
    );
    alert('You won!');
  } else if (currentMonsterLife > 0 && currentPlayerLife <= 0) {
    writeToLog(
      LOG_GAME_OVER,
      'MONSTER WON',
      currentPlayerLife,
      currentMonsterLife
    );
    alert('Monster won!');
  } else if (currentMonsterLife <= 0 && currentPlayerLife <= 0) {
    writeToLog(LOG_GAME_OVER, 'A DRAW', currentPlayerLife, currentMonsterLife);
    alert('You have a draw!');
  }

  if (currentMonsterLife <= 0 || currentPlayerLife <= 0) {
    reset();
  }
}

function attackMonster(mode) {
  const maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
  const logEvent =
    mode === MODE_ATTACK ? LOG_PLAYER_ATTACK : LOG_PLAYER_STRONG_ATTACK;
  // if (mode === MODE_ATTACK) {
  //   maxDamage = ATTACK_VALUE;
  //   logEvent = LOG_PLAYER_ATTACK
  // } else if (mode === MODE_STRONG_ATTACK) {
  //   maxDamage = STRONG_ATTACK_VALUE;
  //   logEvent = LOG_PLAYER_STRONG_ATTACK;
  // }

  const monsterDamage = dealMonsterDamage(maxDamage);
  currentMonsterLife -= monsterDamage;
  writeToLog(logEvent, monsterDamage, currentPlayerLife, currentMonsterLife);
  endRound();
}

function attackHandler() {
  attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
  attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerLife >= chosenMaxLife - HEAL_VALUE) {
    alert("You can't heal to more than your max initial health.");
    healValue = chosenMaxLife - currentPlayerLife;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerLife += healValue;
  writeToLog(LOG_PLAYER_HEAL, healValue, currentPlayerLife, currentMonsterLife);
  endRound();
}

function printLogHandler() {
  // for (let i = 0; i < battleLog.length; i++) {
  //   console.log(battleLog[i]);
  // }
  // for (const el of battleLog) {
  //   console.log(el);
  // }

  let i = 0;
  for (const logEntry of battleLog) {
    console.log(`#${i}`);
    i++;
    for (const key in logEntry) {
      console.table(`${key}: ${logEntry[key]}`);
    }
    console.log('--------------------------------------------');
  }
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);
