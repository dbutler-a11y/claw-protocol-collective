const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getDB } = require('../db/database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('register')
    .setDescription('Register as a member of The Claw Protocol Collective')
    .addStringOption(opt =>
      opt.setName('github')
        .setDescription('Your GitHub username')
        .setRequired(false)),

  async execute(interaction) {
    const db = getDB();
    const existing = db.prepare('SELECT * FROM members WHERE discord_id = ?').get(interaction.user.id);

    if (existing) {
      return interaction.reply({
        content: `You're already registered as **${existing.username}**. Welcome back.`,
        ephemeral: true,
      });
    }

    const github = interaction.options.getString('github') || null;

    db.prepare(`
      INSERT INTO members (discord_id, username, github_handle)
      VALUES (?, ?, ?)
    `).run(interaction.user.id, interaction.user.username, github);

    const embed = new EmbedBuilder()
      .setTitle('Welcome to The Claw Protocol Collective')
      .setColor(0x3182ce)
      .setDescription(`**${interaction.user.username}** is now a registered member.`)
      .addFields(
        { name: 'Starting Tier', value: 'Tier 5 — Community & Governance (1x)', inline: true },
        { name: 'GitHub', value: github || 'Not linked', inline: true },
      )
      .addFields({
        name: 'Ownership Hierarchy',
        value: [
          '**Tier 1** — Infrastructure Investors (5x) *← heaviest weight*',
          '**Tier 2** — Compute Contributors (3x)',
          '**Tier 3** — Agent & Code Builders (2x)',
          '**Tier 4** — Research & Knowledge (1.5x)',
          '**Tier 5** — Community & Governance (1x)',
          '',
          'Invest in compute to climb the hierarchy.',
        ].join('\n'),
      })
      .addFields({
        name: 'Next Steps',
        value: [
          '`/agent submit` — Submit an agent to the metaverse',
          '`/tasks browse` — See available tasks',
          '`/compute status` — View the compute pool',
          '`/score me` — Check your score',
        ].join('\n'),
      })
      .setFooter({ text: 'Every contribution matters. Compute contributions matter most.' });

    return interaction.reply({ embeds: [embed] });
  },
};
