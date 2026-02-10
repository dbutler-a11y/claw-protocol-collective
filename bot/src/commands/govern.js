const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('govern')
    .setDescription('Governance commands')
    .addSubcommand(sub =>
      sub.setName('info')
        .setDescription('View governance structure and your voting power')),

  async execute(interaction) {
    const sub = interaction.options.getSubcommand();

    if (sub === 'info') return handleInfo(interaction);
  },
};

async function handleInfo(interaction) {
  const embed = new EmbedBuilder()
    .setTitle('Governance — The Claw Protocol Collective')
    .setColor(0x1a365d)
    .setDescription('Decisions are made by contributors, weighted by contribution quality and tier.')
    .addFields({
      name: 'Ownership Hierarchy',
      value: [
        '**Tier 1** — Infrastructure Investors (5x weight)',
        '**Tier 2** — Compute Contributors (3x weight)',
        '**Tier 3** — Agent & Code Builders (2x weight)',
        '**Tier 4** — Research & Knowledge (1.5x weight)',
        '**Tier 5** — Community & Governance (1x weight)',
        '',
        'Higher tier = more voting power on governance proposals.',
      ].join('\n'),
    })
    .addFields({
      name: 'Anti-Capture Safeguards',
      value: [
        '**5% ceiling** — No single member holds >5% governance weight',
        '**Quadratic scaling** — Influence scales sub-linearly',
        '**Mandatory rotation** — Leadership rotates every 6-12 months',
        '**Fork rights** — Community can fork if governance is captured',
      ].join('\n'),
    })
    .addFields({
      name: 'Decision Thresholds',
      value: [
        '**Operational** (bug fixes, minor changes): Simple majority',
        '**Strategic** (new initiatives, partnerships): 60% supermajority',
        '**Constitutional** (mission, scoring, governance changes): 75% supermajority',
      ].join('\n'),
    })
    .setFooter({ text: 'Full governance charter: docs/governance.md' });

  return interaction.reply({ embeds: [embed] });
}
