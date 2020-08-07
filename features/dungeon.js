/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const { BotkitConversation } = require('botkit');
// var Status = require("../attributes/status.js");

module.exports = function(controller) {

const dungeon = new BotkitConversation('dungeon', controller);
const chasm = new BotkitConversation('chasm', controller);
const left = new BotkitConversation('left', controller);
const right = new BotkitConversation('right', controller);
const foundGoldHook = new BotkitConversation('found_gold_hook', controller);
const defeatedByBandits = new BotkitConversation('defeated_by_bandits', controller);
const foundSilverHook = new BotkitConversation('found_silver_hook', controller);
const fall = new BotkitConversation('fall', controller);
const boss = new BotkitConversation('boss', controller);
const win = new BotkitConversation('win', controller);
const defeatedByBoss = new BotkitConversation('defeated_by_boss', controller);

dungeon.ask('DUNGEON: You are a treasure hunter. Crawling through derelict places to acquire copious amounts of gold. You wander through a forest and stumble upon an inconspicuous dungeon. Would you like to enter?' , [
  {
    pattern: 'yes',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('choosing_to_enter')
    }
  },
  {
    pattern: 'ok',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('choosing_to_enter')
    }
  },
  {
    pattern: 'sure',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('choosing_to_enter')
    }
  },
  {
    pattern: 'enter',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('choosing_to_enter')
    }
  },
  {
    pattern: 'no',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('refusing_to_enter')
    }
  },
  {
    pattern: 'Yes',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('choosing_to_enter')
    }
  },
  {
    pattern: 'Ok',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('choosing_to_enter')
    }
  },
  {
    pattern: 'Sure',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('choosing_to_enter')
    }
  },
  {
    pattern: 'Enter',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('choosing_to_enter')
    }
  },
  {
    pattern: 'No',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('refusing_to_enter')
    }
  }
], {key: 'dungeon'});
//parameters: dialogue to say, handle answer, name of variable to store response in

dungeon.addMessage('Very well. Take this iron sword (MEDIUM chance to defeat enemies). Also, take this bronze grappling hook (LOW chance to cross chasms). When prompted, use keyword "sword" and "hook" respectively.', 'choosing_to_enter');

dungeon.addMessage("Alright... Nothing ventured, nothing gained. Type 'reset' to start over.", 'refusing_to_enter');

dungeon.after(async(results, bot) => {
    if (results.dungeon.toLowerCase().includes('yes')) {
      bot.beginDialog('chasm')
    }
    if (results.dungeon.toLowerCase().includes('ok')) {
      bot.beginDialog('chasm')
    }
    if (results.dungeon.toLowerCase().includes('sure')) {
      bot.beginDialog('chasm')
    }
    if (results.dungeon.toLowerCase().includes('enter')) {
      bot.beginDialog('chasm')
    }
});

chasm.ask("CHASM: There is a chasm in front of you. Type 'hook' to attempt to swing across the chasm. You can also use the secret keywords you can obtain from better grappling hooks. Or decide to go 'left' or 'right'.", [
  {
    pattern: 'left',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('chasm_left')
    }
  },
  {
    pattern: 'right',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('chasm_right')
    }
  },
  {
    pattern: 'hook',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('chasm_bronze')
    }
  },
  {
    pattern: 'indiana',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('chasm_silver')
    }
  },
  {
    pattern: 'uncharted',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('chasm_gold')
    }
  },
  {
    pattern: 'Left',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('chasm_left')
    }
  },
  {
    pattern: 'Right',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('chasm_right')
    }
  },
  {
    pattern: 'Hook',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('chasm_bronze')
    }
  },
  {
    pattern: 'Indiana',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('chasm_silver')
    }
  },
  {
    pattern: 'Uncharted',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('chasm_gold')
    }
  }
], {key: 'chasm'});

chasm.addMessage('You went left.', 'chasm_left')
chasm.addMessage('You went right.', 'chasm_right')
chasm.addMessage('You used the bronze grappling hook.', 'chasm_bronze')
chasm.addMessage('You used the silver grappling hook.', 'chasm_silver')
chasm.addMessage('You used the gold grappling hook.', 'chasm_gold')

chasm.after(async(results, bot) => {
  if (results.chasm.toLowerCase().includes('left')) {
    bot.beginDialog('left')
  }
  if (results.chasm.toLowerCase().includes('right')) {
    bot.beginDialog('right')
  }
  if (results.chasm.toLowerCase().includes('hook')) {
    let chance = Math.floor(Math.random() * Math.floor(10))
    if (chance >= 2) { bot.beginDialog('fall') }
    else { bot.beginDialog('boss') }
  }
  if (results.chasm.toLowerCase().includes('indiana')) {
    let chance = Math.floor(Math.random() * Math.floor(10))
    if (chance >= 4) { bot.beginDialog('fall') }
    else { bot.beginDialog('boss') }
  }
  if (results.chasm.toLowerCase().includes('uncharted')) {
    bot.beginDialog('boss')
  }
})

left.ask('PATHS: On "path A", there are bandits camped out. If you defeat them, you can claim a Gold Hook with a 100% chance of crossing the chasm. Type keyword "sword" to attack the bandits. Perhaps there is a legendary blade to easily win this fight. Or on "path B", you can grab the Silver Hook unchallenged with a MEDIUM chance of crossing the chasm. Type "back" to head back to the chasm.', [
  {
    pattern: 'akira',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('akira_bandits')
    }
  },
  {
    pattern: 'bandit',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('bandits')
    }
  },
  {
    pattern: 'bandits',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('bandits')
    }
  },
  {
    pattern: 'gold',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('bandits')
    }
  },
  {
    pattern: 'fight',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('bandits')
    }
  },
  {
    pattern: 'attack',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('bandits')
    }
  },
  {
    pattern: 'kill',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('bandits')
    }
  },
  {
    pattern: 'sword',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('bandits')
    }
  },
  {
    pattern: 'path a',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('bandits')
    }
  },
  {
    pattern: 'Akira',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('akira_bandits')
    }
  },
  {
    pattern: 'Bandit',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('bandits')
    }
  },
  {
    pattern: 'Bandits',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('bandits')
    }
  },
  {
    pattern: 'Gold',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('bandits')
    }
  },
  {
    pattern: 'Fight',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('bandits')
    }
  },
  {
    pattern: 'Attack',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('bandits')
    }
  },
  {
    pattern: 'Kill',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('bandits')
    }
  },
  {
    pattern: 'Sword',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('bandits')
    }
  },
  {
    pattern: 'Path a',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('bandits')
    }
  }
], {key: 'left'});

left.addMessage('You draw your blade and head for the bandits. They grab their swords and axes and charge towards you.', 'bandits')
left.addMessage('You draw the legendary blade known as "Akira". As the bandits grab their weapons, they stumble in fear.', 'akira_bandits')

left.after(async(results, bot) => {
  let fight = false //fight bandits for gold hook
  let akira = false  //using legendary sword 'Akira' to fight the bandits
  let silver = false //avoid bandits, obtain silver hook

  if (results.left.toLowerCase().includes('bandit')) {
    fight = true
  }
  if (results.left.toLowerCase().includes('bandits')) {
    fight = true
  }
  if (results.left.toLowerCase().includes('gold')) {
    fight = true
  }
  if (results.left.toLowerCase().includes('fight')) {
    fight = true
  }
  if (results.left.toLowerCase().includes('attack')) {
    fight = true
  }
  if (results.left.toLowerCase().includes('kill')) {
    fight = true
  }
  if (results.left.toLowerCase().includes('sword')) {
    fight = true
  }
  if (results.left.toLowerCase().includes('path a')) {
    fight = true
  }
  if (results.left.toLowerCase().includes('akira')) {
    fight = true
    akira = true
  }
  if (results.left.toLowerCase().includes('path b')) {
    silver = true
  }
  if (results.left.toLowerCase().includes('silver')) {
    silver = true
  }

  if (fight) {
    if (akira) { bot.beginDialog('found_gold_hook') }
    else {
      let chance = Math.floor(Math.random() * Math.floor(10))
      if (chance >= 4) { bot.beginDialog('found_gold_hook') }
      else { bot.beginDialog('defeated_by_bandits') }
    }
  } else if (silver) {
    bot.beginDialog('found_silver_hook')
  }

})

right.say('CAVE: You walk into a cave. Before you is a giant, stone slab. Carved into the material is a message. "Decipher and enter the secret code to obtain the legendary blade." Type "back" to head back to the chasm.')
right.say("The riddle is...")
right.ask('P raise, O mniscient W arriors, E loquent R adiance.', async(response, convo, bot, full_message) => {
  if (response === "power" || response === "Power" || response === "POWER") {
    await bot.reply(full_message, 'The stone slab rises to reveal a small room. You peer into the darkness and find a vibrant blade besides a corpse and broken armor. Beside is a letter that reads "A monster shattered my bones. My weapons were too weak. By the time I found this blade, I already lost so much blood. Take this sword and defeat the beast." You return to the chasm.');
    await bot.reply(full_message, 'Use keyword "akira" to defeat bandits (100% chance) and stand your ground against the boss (HIGH chance).');
    await bot.beginDialog('chasm')
  } else {
    await bot.reply(full_message, 'The stone slab does not tremor at all. A chill breezes past and the dungeon feels more eerie. The code you entered did not work. You head back half-hearted.')
    await bot.beginDialog('chasm')
  }
}, {key: 'right'});

foundGoldHook.say("You defeat the bandits and claimed the Gold Hook. 100% chance to cross the chasm. Use keyword 'uncharted'. You head back.");
foundGoldHook.addGotoDialog('chasm')

foundSilverHook.say("You journey into a quiet room to find the Silver Hook. MEDIUM chance to cross the chasm. Use keyword 'indiana'. You head back.");
foundSilverHook.addGotoDialog('chasm');

defeatedByBandits.say("Defeated by bandits. Game over. Type 'reset' to start over.");
fall.say("You fall down into the chasm. Game over. Type 'reset' to start over.");

boss.ask('ARENA: You successfully cross the chasm. You press forward and under a canopy. Before you is a giant arena. Emerging from the shadows is a giant Cyclops. Attack with your "sword" for a MEDIUM chance to slay the beast. Or use the legendary blade keyword for a HIGH chance.', [
  {
    pattern: 'akira',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('akira_boss')
    }
  },
  {
    pattern: 'sword',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('sword_boss')
    }
  },
  {
    pattern: 'cyclops',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('sword_boss')
    }
  },
  {
    pattern: 'fight',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('sword_boss')
    }
  },
  {
    pattern: 'attack',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('sword_boss')
    }
  },
  {
    pattern: 'kill',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('sword_boss')
    }
  },
  {
    pattern: 'Akira',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('akira_boss')
    }
  },
  {
    pattern: 'Sword',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('sword_boss')
    }
  },
  {
    pattern: 'Cyclops',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('sword_boss')
    }
  },
  {
    pattern: 'Fight',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('sword_boss')
    }
  },
  {
    pattern: 'Attack',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('sword_boss')
    }
  },
  {
    pattern: 'Kill',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('sword_boss')
    }
  },
  {
    pattern: 'run',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('run_away')
    }
  },
  {
    pattern: 'Run',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('run_away')
    }
  }
], {key: 'boss'});

boss.addMessage('The Cyclops howls and shakes the arena. Your iron sword wavers in the sound and your feet stumble. You engage in battle.', 'sword_boss')
boss.addMessage('The Cyclops howls and shakes the arena. You draw Akira and its radiance silences the beast. You hold fast and engage in battle.', 'akira_boss')
boss.addMessage("You run away from the beast. In your haste, you fail to notice the chasm. Game Over. Type 'reset' to start over.", "run_away")

boss.after(async(results, bot) => {
  let akira = false  //using legendary sword 'Akira' to fight the Cyclops

  if (results.boss.toLowerCase().includes('akira')) {
    akira = true
  }

  if (akira) {
    let chance = Math.floor(Math.random() * Math.floor(10))
    if (chance >= 2) { bot.beginDialog('win') }
    else { bot.beginDialog('defeated_by_boss') }
  }
  else if (!results.boss.toLowerCase().includes('run')) {
    let chance = Math.floor(Math.random() * Math.floor(10))
    if (chance >= 5) { bot.beginDialog('win') }
    else { bot.beginDialog('defeated_by_boss') }
  }

})

win.say("You dodge the swing of its fist, leap into the air, and pierce into the beast's chest. The Cyclops is defeated. Beyond its corpse, a treasure chest. You open the chest and find 20,000 gold. You win. Type 'reset' to start over.");

defeatedByBoss.say("You fall to your knees. You cannot carry your blade any longer. The beast takes a moment to brush off the wounds you inflicted. It gains composure and stares at you. You are unable to move. The Cyclops punches you into the ground. Game Over. Type 'reset' to start over.")

controller.addDialog(dungeon);
controller.addDialog(chasm);
controller.addDialog(left);
controller.addDialog(right);
controller.addDialog(foundGoldHook);
controller.addDialog(foundSilverHook);
controller.addDialog(defeatedByBandits);
controller.addDialog(fall);
controller.addDialog(boss);
controller.addDialog(win);
controller.addDialog(defeatedByBoss);

controller.hears(['hello', 'hi', 'hey', 'how', 'who', 'what', 'when', 'where', 'why', 'start', 'begin', 'enter'], 'message', async(bot, message) => {
    bot.beginDialog('dungeon');
});

controller.interrupts('reset', 'message', async(bot, message) => {
    await bot.reply(message, 'The game resets.');
    await bot.cancelAllDialogs();
    await bot.beginDialog('dungeon');
});

controller.interrupts('dungeon', 'message', async(bot, message) => {
    await bot.reply(message, 'You head back to the entrance of the dungeon.');
    await bot.cancelAllDialogs();
    await bot.beginDialog('dungeon');
});

controller.interrupts('chasm', 'message', async(bot, message) => {
    await bot.reply(message, 'You head back to the chasm.');
    await bot.cancelAllDialogs();
    await bot.beginDialog('chasm');
});

controller.interrupts('back', 'message', async(bot, message) => {
    await bot.reply(message, 'You head back to the chasm.');
    await bot.cancelAllDialogs();
    await bot.beginDialog('chasm');
});

controller.interrupts('paths', 'message', async(bot, message) => {
    await bot.reply(message, 'You head to the paths to the left of the chasm.');
    await bot.cancelAllDialogs();
    await bot.beginDialog('left');
});

controller.interrupts('cave', 'message', async(bot, message) => {
    await bot.reply(message, 'You head to the cave to the right of the chasm.');
    await bot.cancelAllDialogs();
    await bot.beginDialog('right');
});

controller.interrupts('arena', 'message', async(bot, message) => {
    await bot.reply(message, 'You head to the arena.');
    await bot.cancelAllDialogs();
    await bot.beginDialog('boss');
});

}
