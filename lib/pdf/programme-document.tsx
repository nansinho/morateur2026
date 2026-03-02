import React from 'react'
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from '@react-pdf/renderer'

/* ─── Colors ─── */
const colors = {
  primary: '#0a1628',
  teal: '#0e6478',
  tealDeep: '#0a2e3d',
  lime: '#50b87a',
  limeBg: '#3d9e66',
  white: '#ffffff',
  whiteAlpha70: 'rgba(255,255,255,0.7)',
  whiteAlpha40: 'rgba(255,255,255,0.4)',
  whiteAlpha15: 'rgba(255,255,255,0.15)',
  olive: '#4a6741',
  steel: '#1a3a5c',
}

/* ─── Pillar style configs ─── */
const pillarStyles = [
  { bg: colors.lime, titleColor: colors.primary, textColor: '#1a3a2a', numColor: 'rgba(0,0,0,0.08)' },
  { bg: colors.teal, titleColor: colors.white, textColor: colors.whiteAlpha70, numColor: colors.whiteAlpha15 },
  { bg: colors.olive, titleColor: colors.white, textColor: colors.whiteAlpha70, numColor: colors.whiteAlpha15 },
  { bg: colors.tealDeep, titleColor: colors.white, textColor: colors.whiteAlpha70, numColor: colors.whiteAlpha15 },
  { bg: colors.steel, titleColor: colors.white, textColor: colors.whiteAlpha70, numColor: colors.whiteAlpha15 },
]

/* ─── Types ─── */
export interface PillarData {
  title: string
  intro: string
  measures: { title: string; detail: string }[]
}

/* ─── Styles ─── */
const s = StyleSheet.create({
  page: {
    backgroundColor: colors.primary,
    paddingHorizontal: 28,
    paddingVertical: 24,
    fontFamily: 'Helvetica',
  },
  /* Header */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.lime,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 800,
    color: colors.white,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  headerLime: {
    color: colors.lime,
  },
  headerSubtitle: {
    fontSize: 9,
    color: colors.whiteAlpha40,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  /* Page title */
  pageTitle: {
    fontSize: 16,
    fontWeight: 800,
    color: colors.white,
    textTransform: 'uppercase',
    letterSpacing: 3,
    textAlign: 'center',
    marginBottom: 14,
  },
  pageTitleLime: {
    color: colors.lime,
  },
  /* Pillar block */
  pillarBlock: {
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
  },
  pillarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  pillarNumber: {
    fontSize: 32,
    fontWeight: 800,
    marginRight: 10,
    lineHeight: 1,
  },
  pillarTitleWrap: {
    flex: 1,
  },
  pillarTitle: {
    fontSize: 12,
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  pillarIntro: {
    fontSize: 7.5,
    marginTop: 2,
    lineHeight: 1.4,
  },
  /* Measures */
  measuresRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: 6,
  },
  measureChip: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 7,
    flexBasis: '48%',
    flexGrow: 1,
  },
  measureTitle: {
    fontSize: 7,
    fontWeight: 700,
    marginBottom: 2,
  },
  measureDetail: {
    fontSize: 6,
    lineHeight: 1.35,
  },
  /* Footer */
  footer: {
    position: 'absolute',
    bottom: 16,
    left: 28,
    right: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.whiteAlpha15,
  },
  footerText: {
    fontSize: 7,
    color: colors.whiteAlpha40,
  },
  footerLime: {
    color: colors.lime,
    fontWeight: 700,
  },
  /* CTA block on page 2 */
  ctaBlock: {
    backgroundColor: colors.lime,
    borderRadius: 12,
    padding: 20,
    marginTop: 12,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: 800,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 6,
  },
  ctaText: {
    fontSize: 9,
    color: '#1a3a2a',
    textAlign: 'center',
    lineHeight: 1.5,
    maxWidth: 400,
  },
  ctaUrl: {
    fontSize: 11,
    fontWeight: 800,
    color: colors.primary,
    marginTop: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  ctaSocial: {
    fontSize: 8,
    color: '#1a3a2a',
    marginTop: 4,
  },
})

/* ─── Components ─── */

function Header() {
  return (
    <View style={s.header}>
      <Text style={s.headerTitle}>
        MORATEUR <Text style={s.headerLime}>2026</Text>
      </Text>
      <Text style={s.headerSubtitle}>Bouc-Bel-Air a de l&apos;avenir</Text>
    </View>
  )
}

function PillarBlock({ pillar, index }: { pillar: PillarData; index: number }) {
  const style = pillarStyles[index % pillarStyles.length]
  const num = String(index + 1).padStart(2, '0')

  return (
    <View style={[s.pillarBlock, { backgroundColor: style.bg }]} wrap={false}>
      <View style={s.pillarHeader}>
        <Text style={[s.pillarNumber, { color: style.numColor }]}>{num}</Text>
        <View style={s.pillarTitleWrap}>
          <Text style={[s.pillarTitle, { color: style.titleColor }]}>{pillar.title}</Text>
          <Text style={[s.pillarIntro, { color: style.textColor }]}>{pillar.intro}</Text>
        </View>
      </View>
      <View style={s.measuresRow}>
        {pillar.measures.map((m, j) => (
          <View key={j} style={s.measureChip}>
            <Text style={[s.measureTitle, { color: style.titleColor }]}>{m.title}</Text>
            <Text style={[s.measureDetail, { color: style.textColor }]}>{m.detail}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

function FooterBar({ page }: { page: number }) {
  return (
    <View style={s.footer} fixed>
      <Text style={s.footerText}>
        <Text style={s.footerLime}>morateur2026.fr</Text> — Programme municipal 2026
      </Text>
      <Text style={s.footerText}>{page}/2</Text>
    </View>
  )
}

/* ─── Main Document ─── */

export function ProgrammeDocument({ pillars }: { pillars: PillarData[] }) {
  const page1Pillars = pillars.slice(0, 3)
  const page2Pillars = pillars.slice(3)

  return (
    <Document
      title="Programme Morateur 2026 — Bouc-Bel-Air"
      author="Morateur 2026"
      subject="Programme municipal — Élections 2026 Bouc-Bel-Air"
      keywords="Morateur 2026, programme, Bouc-Bel-Air, municipales"
    >
      {/* ─── PAGE 1 (recto) ─── */}
      <Page size="A4" style={s.page}>
        <Header />
        <Text style={s.pageTitle}>
          LE <Text style={s.pageTitleLime}>PROGRAMME</Text>
        </Text>
        {page1Pillars.map((p, i) => (
          <PillarBlock key={i} pillar={p} index={i} />
        ))}
        <FooterBar page={1} />
      </Page>

      {/* ─── PAGE 2 (verso) ─── */}
      <Page size="A4" style={s.page}>
        <Header />
        {page2Pillars.map((p, i) => (
          <PillarBlock key={i} pillar={p} index={i + 3} />
        ))}

        {/* CTA */}
        <View style={s.ctaBlock}>
          <Text style={s.ctaTitle}>Rejoignez-nous !</Text>
          <Text style={s.ctaText}>
            Participez à construire l&apos;avenir de Bouc-Bel-Air. Chaque voix compte pour redonner à notre commune le cadre de vie qu&apos;elle mérite.
          </Text>
          <Text style={s.ctaUrl}>morateur2026.fr</Text>
          <Text style={s.ctaSocial}>
            Instagram @morateur2026 — Facebook Morateur 2026
          </Text>
        </View>
        <FooterBar page={2} />
      </Page>
    </Document>
  )
}
