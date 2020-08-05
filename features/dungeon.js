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
const foundGoldHook = new BotkitConversation('found_gold_hook', controller);
const defeatedByBandits = new BotkitConversation('defeated_by_bandits', controller);
const foundSilverHook = new BotkitConversation('found_silver_hook', controller);
const fall = new BotkitConversation('fall', controller);
const boss = new BotkitConversation('boss', controller);

dungeon.ask('You are a treasure hunter. Crawling through derelict places to acquire copious amounts of gold. You wander through a forest and stumble upon an inconspicuous dungeon. Would you like to enter?' , [
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
    pattern: 'no',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('refusing_to_enter')
    }
  }
], {key: 'dungeon'});
//parameters: dialogue to say, handle answer, name of variable to store response in

dungeon.addMessage('Very well. Take this iron sword (60% chance to defeat enemies). Also, take this bronze grappling hook (20% chance to cross chasms).', 'choosing_to_enter');

dungeon.addMessage('Alright... Nothing ventured, nothing gained.', 'refusing_to_enter');

dungeon.after(async(results, bot) => {
    if (results.dungeon.includes('yes')) {
      bot.beginDialog('chasm')
    }
    if (results.dungeon.includes('ok')) {
      bot.beginDialog('chasm')
    }
    if (results.dungeon.includes('sure')) {
      bot.beginDialog('chasm')
    }
});

chasm.ask("There is a chasm in front of you. Type 'hook' to attempt to swing across the chasm. You can also use the secret keywords you obtained from better grappling hooks. Or decide to go 'left' or 'right'.", [
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
  }
], {key: 'chasm'});

chasm.addMessage('You went left.', 'chasm_left')
chasm.addMessage('You went right.', 'chasm_right')
chasm.addMessage('You used the bronze grappling hook.', 'chasm_bronze')
chasm.addMessage('You used the silver grappling hook.', 'chasm_silver')
chasm.addMessage('You used the gold grappling hook.', 'chasm_gold')

chasm.after(async(results, bot) => {
  if (results.chasm.includes('left')) {
    bot.beginDialog('left')
  }
  if (results.chasm.includes('hook')) {
    let chance = Math.floor(Math.random() * Math.floor(10))
    if (chance >= 2) { bot.beginDialog('fall') }
    else { bot.beginDialog('boss') }
  }
  if (results.chasm.includes('indiana')) {
    let chance = Math.floor(Math.random() * Math.floor(10))
    if (chance >= 4) { bot.beginDialog('fall') }
    else { bot.beginDialog('boss') }
  }
  if (results.chasm.includes('uncharted')) {
    bot.beginDialog('boss')
  }
})

left.ask('There are two paths. On "path A", there are bandits camped out. If you defeat them, you can claim a Gold Hook with a 100% chance of crossing the chasm. Or on "path B", you can grab the Silver Hook unchallenged with a 40% chance of crossing the chasm.', [
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
    pattern: 'path a',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('bandits')
    }
  },
  {
    pattern: 'akira',
    handler: async function(answer, convo, bot) {
      await convo.gotoThread('akira_bandits')
    }
  }
], {key: 'left'});

left.addMessage('You draw your blade and head for the bandits. They grab their swords and axes and charge towards you.', 'bandits')
left.addMessage('You draw the legendary blade known as "Akira". As the bandits grab their weapons, they stumble in fear.', 'akira_bandits')

left.after(async(results, bot) => {
  let fight = false //fight bandits for gold hook
  let akira = false  //using legendary sword 'Akira' to fight the bandits
  let silver = false //avoid bandits, obtain silver hook

  if (results.left.includes('bandit')) {
    fight = true
  }
  if (results.left.includes('bandits')) {
    fight = true
  }
  if (results.left.includes('gold')) {
    fight = true
  }
  if (results.left.includes('fight')) {
    fight = true
  }
  if (results.left.includes('attack')) {
    fight = true
  }
  if (results.left.includes('kill')) {
    fight = true
  }
  if (results.left.includes('path a')) {
    fight = true
  }
  if (results.left.includes('akira')) {
    fight = true
    akira = true
  }
  if (results.left.includes('path b')) {
    silver = true
  }
  if (results.left.includes('silver')) {
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

foundGoldHook.say("You defeat the bandits and claimed the Gold Hook. 100% chance to cross the chasm. Use keyword 'uncharted'.");
defeatedByBandits.say("Defeated by bandits. Game over.");
foundSilverHook.say("You journey into a quiet room to find the Silver Hook. 70% chance to cross the chasm. Use keyword 'indiana'.");
fall.say("You fall down into the chasm. Game over.");
boss.say("You successfully cross the chasm. You press forward and under a canopy. Before you is a giant arena. Emerging from the shadows is a giant Cyclops.")

foundGoldHook.after(async(results, bot) => {
  bot.beginDialog('chasm')
})

foundSilverHook.after(async(results, bot) => {
  bot.beginDialog('chasm')
})

controller.addDialog(dungeon);
controller.addDialog(chasm);
controller.addDialog(left);
controller.addDialog(foundGoldHook);
controller.addDialog(defeatedByBandits);
controller.addDialog(foundSilverHook);
controller.addDialog(fall);
controller.addDialog(boss);

controller.hears(['hello', 'hi', 'hey', 'how', 'who', 'what', 'when', 'where', 'why'], 'message', async(bot, message) => {
    bot.beginDialog('dungeon');
});

controller.hears('start dungeon', 'message,direct_message', async(bot, message) => {
    bot.beginDialog('dungeon');
});

controller.hears('start chasm', 'message,direct_message', async(bot, message) => {
    bot.beginDialog('chasm');
});

controller.interrupts('help', 'message', async(bot, message) => {
    await bot.beginDialog('chasm');
});

controller.hears('start left', 'message,direct_message', async(bot, message) => {
    bot.beginDialog('left');
});

}
