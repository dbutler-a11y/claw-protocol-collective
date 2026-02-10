const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getDB } = require('../db/database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('tasks')
    .setDescription('Browse and claim tasks in the metaverse')
    .addSubcommand(sub =>
      sub.setName('browse')
        .setDescription('See available tasks')
        .addStringOption(opt =>
          opt.setName('initiative')
            .setDescription('Filter by initiative')
            .setRequired(false)
            .addChoices(
              { name: 'Assistive Robotics', value: 'robotics' },
              { name: 'Cancer Research', value: 'cancer' },
              { name: 'Biofeedback', value: 'biofeedback' },
              { name: 'Satellite Connectivity', value: 'satellite' },
              { name: 'Infrastructure', value: 'infrastructure' },
            )))
    .addSubcommand(sub =>
      sub.setName('claim')
        .setDescription('Claim a task')
        .addIntegerOption(opt =>
          opt.setName('id')
            .setDescription('Task ID to claim')
            .setRequired(true)))
    .addSubcommand(sub =>
      sub.setName('complete')
        .setDescription('Mark a task as completed')
        .addIntegerOption(opt =>
          opt.setName('id')
            .setDescription('Task ID to complete')
            .setRequired(true))),

  async execute(interaction) {
    const sub = interaction.options.getSubcommand();

    if (sub === 'browse') return handleBrowse(interaction);
    if (sub === 'claim') return handleClaim(interaction);
    if (sub === 'complete') return handleComplete(interaction);
  },
};

async function handleBrowse(interaction) {
  const db = getDB();
  const initiative = interaction.options.getString('initiative');

  let query = 'SELECT * FROM tasks WHERE status = ?';
  const params = ['open'];

  if (initiative) {
    query += ' AND initiative = ?';
    params.push(initiative);
  }

  query += ' ORDER BY created_at DESC LIMIT 10';

  const tasks = db.prepare(query).all(...params);

  if (tasks.length === 0) {
    return interaction.reply({
      content: initiative
        ? `No open tasks for **${initiative}**. Check back soon or create one!`
        : 'No open tasks right now. The metaverse is quiet... for now.',
      ephemeral: true,
    });
  }

  const lines = tasks.map(t => {
    const tag = t.initiative ? ` \`${t.initiative}\`` : '';
    return `**#${t.id}** — ${t.title}${tag}`;
  });

  const embed = new EmbedBuilder()
    .setTitle('Available Tasks')
    .setColor(0x3182ce)
    .setDescription(lines.join('\n'))
    .setFooter({ text: 'Use /tasks claim <id> to pick up a task' });

  return interaction.reply({ embeds: [embed] });
}

async function handleClaim(interaction) {
  const db = getDB();
  const taskId = interaction.options.getInteger('id');

  const member = db.prepare('SELECT * FROM members WHERE discord_id = ?').get(interaction.user.id);
  if (!member) {
    return interaction.reply({ content: 'Register first with `/register`.', ephemeral: true });
  }

  const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(taskId);
  if (!task) {
    return interaction.reply({ content: `Task #${taskId} not found.`, ephemeral: true });
  }
  if (task.status !== 'open') {
    return interaction.reply({ content: `Task #${taskId} is already ${task.status}.`, ephemeral: true });
  }

  db.prepare('UPDATE tasks SET status = ?, claimed_by = ? WHERE id = ?')
    .run('claimed', interaction.user.id, taskId);

  return interaction.reply({
    embeds: [
      new EmbedBuilder()
        .setTitle(`Task #${taskId} Claimed`)
        .setColor(0x38a169)
        .setDescription(`**${task.title}**\n\n${task.description || 'No description'}`)
        .addFields({ name: 'Claimed by', value: interaction.user.username })
        .setFooter({ text: 'Use /tasks complete <id> when done' }),
    ],
  });
}

async function handleComplete(interaction) {
  const db = getDB();
  const taskId = interaction.options.getInteger('id');

  const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(taskId);
  if (!task) {
    return interaction.reply({ content: `Task #${taskId} not found.`, ephemeral: true });
  }
  if (task.claimed_by !== interaction.user.id) {
    return interaction.reply({ content: `You didn't claim task #${taskId}.`, ephemeral: true });
  }

  db.prepare("UPDATE tasks SET status = ?, completed_at = datetime('now') WHERE id = ?")
    .run('completed', taskId);

  return interaction.reply({
    embeds: [
      new EmbedBuilder()
        .setTitle(`Task #${taskId} Completed`)
        .setColor(0x38a169)
        .setDescription(`**${task.title}** — marked as done by ${interaction.user.username}.`)
        .setFooter({ text: 'Contribution score will be calculated after review.' }),
    ],
  });
}
