const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getDB } = require('../db/database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('compute')
    .setDescription('Community compute pool')
    .addSubcommand(sub =>
      sub.setName('status')
        .setDescription('View the compute pool dashboard'))
    .addSubcommand(sub =>
      sub.setName('invest')
        .setDescription('Log an infrastructure investment')
        .addStringOption(opt =>
          opt.setName('description')
            .setDescription('What did you invest in? (e.g., "Funded 1U rack at Equinix")')
            .setRequired(true))
        .addNumberOption(opt =>
          opt.setName('amount')
            .setDescription('Dollar amount invested')
            .setRequired(true))
        .addStringOption(opt =>
          opt.setName('recurring')
            .setDescription('Is this a recurring investment?')
            .setRequired(true)
            .addChoices(
              { name: 'One-time', value: 'onetime' },
              { name: 'Monthly', value: 'monthly' },
              { name: 'Annual', value: 'annual' },
            ))),

  async execute(interaction) {
    const sub = interaction.options.getSubcommand();

    if (sub === 'status') return handleStatus(interaction);
    if (sub === 'invest') return handleInvest(interaction);
  },
};

async function handleStatus(interaction) {
  const db = getDB();

  const memberCount = db.prepare('SELECT COUNT(*) as count FROM members').get().count;
  const agentCount = db.prepare("SELECT COUNT(*) as count FROM agents WHERE status = 'live'").get().count;
  const totalScore = db.prepare('SELECT COALESCE(SUM(final_score), 0) as total FROM contributions').get().total;

  const infraInvestments = db.prepare(`
    SELECT COALESCE(SUM(final_score), 0) as total, COUNT(*) as count
    FROM contributions WHERE tier = 1
  `).get();

  const computeDonations = db.prepare(`
    SELECT COALESCE(SUM(final_score), 0) as total, COUNT(*) as count
    FROM contributions WHERE tier = 2
  `).get();

  const embed = new EmbedBuilder()
    .setTitle('Compute Pool Dashboard')
    .setColor(0x1a365d)
    .addFields(
      { name: 'Members', value: `${memberCount}`, inline: true },
      { name: 'Live Agents', value: `${agentCount}`, inline: true },
      { name: 'Total Score Pool', value: `${totalScore.toFixed(1)}`, inline: true },
    )
    .addFields(
      {
        name: 'Infrastructure Investments (Tier 1 — 5x)',
        value: `${infraInvestments.count} investments | ${infraInvestments.total.toFixed(1)} total score`,
        inline: false,
      },
      {
        name: 'Compute Donations (Tier 2 — 3x)',
        value: `${computeDonations.count} donations | ${computeDonations.total.toFixed(1)} total score`,
        inline: false,
      },
    )
    .addFields({
      name: 'How to Contribute',
      value: [
        '**Tier 1 (5x):** `/compute invest` — Fund infrastructure for the collective',
        '**Tier 2 (3x):** Register your GPU/CPU in the compute pool',
        '',
        '*Compute investment earns the most tokens and the strongest governance voice.*',
      ].join('\n'),
    })
    .setFooter({ text: 'The Claw Protocol Collective — Compute is King' });

  return interaction.reply({ embeds: [embed] });
}

async function handleInvest(interaction) {
  const db = getDB();

  const member = db.prepare('SELECT * FROM members WHERE discord_id = ?').get(interaction.user.id);
  if (!member) {
    return interaction.reply({ content: 'Register first with `/register`.', ephemeral: true });
  }

  const description = interaction.options.getString('description');
  const amount = interaction.options.getNumber('amount');
  const recurring = interaction.options.getString('recurring');

  // Normalize investment value to 0-10 scale
  let investmentValue;
  if (amount < 100) investmentValue = 2.0;
  else if (amount < 500) investmentValue = 4.0;
  else if (amount < 1000) investmentValue = 6.0;
  else if (amount < 2500) investmentValue = 7.0;
  else if (amount < 5000) investmentValue = 8.0;
  else if (amount < 10000) investmentValue = 9.0;
  else investmentValue = 10.0;

  // Sustainability factor
  const sustainFactor = recurring === 'monthly' ? 2.0 : recurring === 'annual' ? 1.5 : 1.0;

  const baseScore = investmentValue;
  const multiplier = 5.0;
  const finalScore = baseScore * multiplier * sustainFactor;

  db.prepare(`
    INSERT INTO contributions (discord_id, type, tier, description, base_score, multiplier, final_score)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(interaction.user.id, 'infrastructure-investment', 1, `$${amount} — ${description}`, baseScore, multiplier * sustainFactor, finalScore);

  // Upgrade member tier if this is their first Tier 1 contribution
  if (member.tier > 1) {
    db.prepare('UPDATE members SET tier = 1 WHERE discord_id = ?').run(interaction.user.id);
  }

  const embed = new EmbedBuilder()
    .setTitle('Infrastructure Investment Logged')
    .setColor(0xdd6b20)
    .addFields(
      { name: 'Investment', value: description, inline: false },
      { name: 'Amount', value: `$${amount.toLocaleString()}`, inline: true },
      { name: 'Type', value: recurring === 'monthly' ? 'Monthly (2x sustain)' : recurring === 'annual' ? 'Annual (1.5x sustain)' : 'One-time', inline: true },
    )
    .addFields(
      { name: 'Score Calculation', value: `Base: ${baseScore} × Tier 1 (5x) × Sustain (${sustainFactor}x) = **${finalScore.toFixed(1)}**`, inline: false },
    )
    .addFields({
      name: 'Your New Tier',
      value: 'Tier 1 — Infrastructure Investor (5x) — *Top of the ownership hierarchy*',
    })
    .setFooter({ text: 'This investment will be verified by community governance. Thank you for building the backbone.' });

  return interaction.reply({ embeds: [embed] });
}
