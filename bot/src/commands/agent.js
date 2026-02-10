const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getDB } = require('../db/database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('agent')
    .setDescription('Manage your agents in the metaverse')
    .addSubcommand(sub =>
      sub.setName('submit')
        .setDescription('Submit a new agent for review')
        .addStringOption(opt =>
          opt.setName('name')
            .setDescription('Agent name')
            .setRequired(true))
        .addStringOption(opt =>
          opt.setName('repo')
            .setDescription('GitHub repo URL for the agent')
            .setRequired(true))
        .addStringOption(opt =>
          opt.setName('capabilities')
            .setDescription('What does your agent do? (comma-separated)')
            .setRequired(true)))
    .addSubcommand(sub =>
      sub.setName('status')
        .setDescription('Check your agent\'s status')
        .addStringOption(opt =>
          opt.setName('name')
            .setDescription('Agent name')
            .setRequired(true)))
    .addSubcommand(sub =>
      sub.setName('list')
        .setDescription('List all your agents')),

  async execute(interaction) {
    const sub = interaction.options.getSubcommand();

    if (sub === 'submit') return handleSubmit(interaction);
    if (sub === 'status') return handleStatus(interaction);
    if (sub === 'list') return handleList(interaction);
  },
};

async function handleSubmit(interaction) {
  const db = getDB();

  const member = db.prepare('SELECT * FROM members WHERE discord_id = ?').get(interaction.user.id);
  if (!member) {
    return interaction.reply({
      content: 'Register first with `/register` before submitting agents.',
      ephemeral: true,
    });
  }

  const name = interaction.options.getString('name');
  const repo = interaction.options.getString('repo');
  const capabilities = interaction.options.getString('capabilities');

  const existing = db.prepare('SELECT * FROM agents WHERE name = ?').get(name);
  if (existing) {
    return interaction.reply({
      content: `An agent named **${name}** already exists. Choose a different name.`,
      ephemeral: true,
    });
  }

  db.prepare(`
    INSERT INTO agents (name, owner_discord_id, repo_url, capabilities)
    VALUES (?, ?, ?, ?)
  `).run(name, interaction.user.id, repo, capabilities);

  const embed = new EmbedBuilder()
    .setTitle('Agent Submitted')
    .setColor(0x38a169)
    .addFields(
      { name: 'Agent', value: `**${name}**`, inline: true },
      { name: 'Status', value: 'Pending Review', inline: true },
      { name: 'Repo', value: repo, inline: false },
      { name: 'Capabilities', value: capabilities, inline: false },
    )
    .addFields({
      name: 'Review Pipeline',
      value: '`Submit` → **Static Review** → Peer Review → Sandbox Testing → Live Deploy',
    })
    .setFooter({ text: 'A community reviewer will pick this up. Agents earn Tier 3 (2x) contribution scores.' });

  return interaction.reply({ embeds: [embed] });
}

async function handleStatus(interaction) {
  const db = getDB();
  const name = interaction.options.getString('name');

  const agent = db.prepare(`
    SELECT a.*, m.username FROM agents a
    JOIN members m ON a.owner_discord_id = m.discord_id
    WHERE a.name = ?
  `).get(name);

  if (!agent) {
    return interaction.reply({ content: `No agent found named **${name}**.`, ephemeral: true });
  }

  const statusColors = {
    pending: 0xecc94b,
    reviewing: 0x3182ce,
    sandbox: 0x805ad5,
    live: 0x38a169,
    paused: 0xe53e3e,
  };

  const embed = new EmbedBuilder()
    .setTitle(`Agent: ${agent.name}`)
    .setColor(statusColors[agent.status] || 0x718096)
    .addFields(
      { name: 'Owner', value: agent.username, inline: true },
      { name: 'Status', value: agent.status.toUpperCase(), inline: true },
      { name: 'Submitted', value: agent.submitted_at, inline: true },
      { name: 'Capabilities', value: agent.capabilities || 'None listed', inline: false },
      { name: 'Repo', value: agent.repo_url || 'Not linked', inline: false },
    );

  return interaction.reply({ embeds: [embed] });
}

async function handleList(interaction) {
  const db = getDB();

  const agents = db.prepare(`
    SELECT * FROM agents WHERE owner_discord_id = ?
    ORDER BY submitted_at DESC
  `).all(interaction.user.id);

  if (agents.length === 0) {
    return interaction.reply({
      content: 'You haven\'t submitted any agents yet. Use `/agent submit` to get started.',
      ephemeral: true,
    });
  }

  const lines = agents.map(a => {
    const statusEmoji = { pending: '🟡', reviewing: '🔵', sandbox: '🟣', live: '🟢', paused: '🔴' };
    return `${statusEmoji[a.status] || '⚪'} **${a.name}** — ${a.status}`;
  });

  const embed = new EmbedBuilder()
    .setTitle(`Your Agents (${agents.length})`)
    .setColor(0x3182ce)
    .setDescription(lines.join('\n'))
    .setFooter({ text: 'Each live agent earns Tier 3 (2x) contribution scores for you.' });

  return interaction.reply({ embeds: [embed] });
}
