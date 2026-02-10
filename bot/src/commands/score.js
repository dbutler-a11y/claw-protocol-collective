const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getDB } = require('../db/database');

const TIER_INFO = {
  1: { name: 'Infrastructure Investor', multiplier: 5.0, emoji: '🏗️' },
  2: { name: 'Compute Contributor', multiplier: 3.0, emoji: '⚡' },
  3: { name: 'Agent & Code Builder', multiplier: 2.0, emoji: '🤖' },
  4: { name: 'Research & Knowledge', multiplier: 1.5, emoji: '📚' },
  5: { name: 'Community & Governance', multiplier: 1.0, emoji: '🤝' },
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('score')
    .setDescription('View contribution scores')
    .addSubcommand(sub =>
      sub.setName('me')
        .setDescription('View your contribution score breakdown'))
    .addSubcommand(sub =>
      sub.setName('leaderboard')
        .setDescription('Top contributors this month')),

  async execute(interaction) {
    const sub = interaction.options.getSubcommand();

    if (sub === 'me') {
      return handleScoreMe(interaction);
    }
    if (sub === 'leaderboard') {
      return handleLeaderboard(interaction);
    }
  },
};

async function handleScoreMe(interaction) {
  const db = getDB();
  const member = db.prepare('SELECT * FROM members WHERE discord_id = ?').get(interaction.user.id);

  if (!member) {
    return interaction.reply({
      content: 'You haven\'t registered yet. Use `/register` to join The Claw Protocol Collective.',
      ephemeral: true,
    });
  }

  const contributions = db.prepare(`
    SELECT type, tier, SUM(final_score) as total, COUNT(*) as count
    FROM contributions
    WHERE discord_id = ?
    GROUP BY tier
    ORDER BY tier ASC
  `).all(interaction.user.id);

  const totalScore = db.prepare(`
    SELECT COALESCE(SUM(final_score), 0) as total
    FROM contributions
    WHERE discord_id = ?
  `).get(interaction.user.id);

  const tierInfo = TIER_INFO[member.tier] || TIER_INFO[5];

  const embed = new EmbedBuilder()
    .setTitle(`${tierInfo.emoji} ${interaction.user.username}'s Score`)
    .setColor(0x3182ce)
    .addFields(
      { name: 'Current Tier', value: `**Tier ${member.tier}** — ${tierInfo.name} (${tierInfo.multiplier}x)`, inline: false },
      { name: 'Total Score', value: `**${totalScore.total.toFixed(1)}**`, inline: true },
    );

  if (contributions.length > 0) {
    const breakdown = contributions.map(c => {
      const t = TIER_INFO[c.tier] || TIER_INFO[5];
      return `${t.emoji} Tier ${c.tier}: ${c.total.toFixed(1)} pts (${c.count} contributions)`;
    }).join('\n');
    embed.addFields({ name: 'Breakdown by Tier', value: breakdown, inline: false });
  } else {
    embed.addFields({ name: 'Contributions', value: 'No contributions yet. Start building!', inline: false });
  }

  embed.setFooter({ text: 'The Claw Protocol Collective — Compute is King' });

  return interaction.reply({ embeds: [embed] });
}

async function handleLeaderboard(interaction) {
  const db = getDB();

  const leaders = db.prepare(`
    SELECT m.username, m.tier, COALESCE(SUM(c.final_score), 0) as total
    FROM members m
    LEFT JOIN contributions c ON m.discord_id = c.discord_id
    GROUP BY m.discord_id
    ORDER BY total DESC
    LIMIT 10
  `).all();

  if (leaders.length === 0) {
    return interaction.reply({ content: 'No contributors yet. Be the first!', ephemeral: true });
  }

  const medals = ['🥇', '🥈', '🥉'];
  const lines = leaders.map((l, i) => {
    const prefix = medals[i] || `${i + 1}.`;
    const tierInfo = TIER_INFO[l.tier] || TIER_INFO[5];
    return `${prefix} **${l.username}** — ${l.total.toFixed(1)} pts ${tierInfo.emoji}`;
  });

  const embed = new EmbedBuilder()
    .setTitle('Contribution Leaderboard')
    .setColor(0xdd6b20)
    .setDescription(lines.join('\n'))
    .addFields({
      name: 'Tier Multipliers',
      value: 'Infra Investment (5x) > Compute (3x) > Agents/Code (2x) > Research (1.5x) > Community (1x)',
    })
    .setFooter({ text: 'The Claw Protocol Collective — Infrastructure is Ownership' });

  return interaction.reply({ embeds: [embed] });
}
