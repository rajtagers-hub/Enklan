export const INITIAL_CONTENT = {
  settings: {
    phone: "+355 69 452 2606",
    email: "info@enklan.al",
    address: "Rr. 5 Maji, Tiranë",
    secretPhrase: "tatsumi",
    socials: {
      instagram: "https://instagram.com/enklan_sh.p.k",
      facebook: "https://facebook.com/enklan.shpk",
      linkedin: "https://linkedin.com/company/enklan",
      whatsapp: "https://wa.me/355694522606"
    }
  },
  hero: {
    title: "Mirësevini në",
    brand: "ENKLAN Sh.p.k",
    subtitle: "së bashku ndërtojmë të ardhmen",
    experienceLabel: "Përvojë Korporative Ultra HD"
  },
  about: {
    title: "Ekselencë që nga Viti 2025",
    description: "Enklan Sh.p.k nuk është thjesht një kompani inxhinierike; është një vizion për të ardhmen e infrastrukturës në Shqipëri. Me një përqasje të bazuar te inovacioni, inxhinieria e detajuar dhe siguria absolute, ne ndërtojmë sisteme inteligjente dhe elektrike që i rezistojnë kohës. Çdo projekt i yni është një dëshmi e standardeve europiane dhe përkushtimit tonë ndaj cilësisë.",
    image: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80&w=800",
    stats: [
      { label: "Siguri Teknike", value: "100%" },
      { label: "Mbështetje Teknike", value: "24/7" }
    ]
  },
  services: [
    {
      slug: "projektim-elektrik",
      title: "Projektim Elektrik",
      icon: "Code",
      desc: "Shërbime profesionale elektrike në sektorin civil dhe industrial, projektim dhe mirëmbajtje parandaluese.",
      details: "Enklan Sh.p.k ofron shërbime profesionale në sektorin civil dhe atë industrial. Ekspertiza jonë mbulon mirëmbajtjen e pajisjeve të prodhimit, motorëve elektrikë, inverterëve (VFD), sistemeve PLC dhe atyre të kontrollit. Përmes mirëmbajtjes parandaluese dhe ndërhyrjeve në kohë reale, ne garantojmë funksionim të pandërprerë, minimizojmë humbjet në prodhim dhe rrisim jetëgjatësinë e pajisjeve, duke u pozicionuar si partneri juaj i besueshëm inxhinierik.",
      subsections: [
        {
          id: "hartim-projekti",
          title: "Projektim elektrik",
          desc: "Hartim profesional i projekteve elektrike sipas nevojave dhe standardeve teknike.",
          fullDesc: "Ekipi ynë inxhinierik ofron hartim të detajuar të skemave dhe projekteve elektrike, duke u bazuar plotësisht në rregulloret dhe standardet teknike më të fundit.",
          image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=800"
        },
        {
          id: "zbatim-instalim",
          title: "Zbatim (Instalim)",
          desc: "Realizim i instalimeve elektrike me cilësi të lartë dhe korrektësi teknike.",
          fullDesc: "Ne bëjmë të mundur realizimin në terren të projekteve tuaja, duke përdorur materiale të cilësisë së lartë dhe mjete të avancuara pune për një rezultat optimal dhe jetëgjatë.",
          image: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80&w=800"
        },
        {
          id: "mirembajtje",
          title: "Mirëmbajtje",
          desc: "Kontroll dhe riparim i sistemeve elektrike për funksionim të qëndrueshëm dhe të sigurt.",
          fullDesc: "Shërbimi ynë i mirëmbajtjes parandaluese dhe reaktive mbulon diagnoza të thella dhe riparime të shpejta, duke reduktuar në minimum kohën e ndërprerjes (downtime).",
          image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=800"
        },
        {
          id: "motore-elektrike",
          title: "Motorë Elektrikë",
          desc: "Mirëmbajtje dhe diagnostikim për motorët elektrikë industrialë.",
          fullDesc: "Ne ofrojmë inspektime të plota, matje të rezistencës së izolimit dhe shërbime të specializuara të mirëmbajtjes për të garantuar funksionimin optimal të motorëve elektrikë në makineritë e prodhimit.",
          image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=800"
        },
        {
          id: "invertera-vfd",
          title: "Invertera (VFD)",
          desc: "Konfigurim dhe servis për Inverterat me Frekuencë të Ndryshueshme (VFD).",
          fullDesc: "Programimi, instalimi dhe riparimi i VFD-ve nga markat më të njohura. Zgjidhjet tona maksimizojnë efikasitetin energjetik dhe mbrojnë pajisjet tuaja nga mbingarkesat.",
          image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800"
        },
        {
          id: "projektim-plc",
          title: "Projektim PLC",
          desc: "Programim dhe automatizim industrial nëpërmjet sistemeve PLC.",
          fullDesc: "Krijimi i logjikave të kontrollit për proceset e automatizuara të prodhimit. Ne zhvillojmë arkitektura PLC që minimizojnë gabimin njerëzor dhe rrisin ndjeshëm kapacitetet prodhuese.",
          image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800"
        }
      ]
    },
    {
      slug: "panele-diellore",
      title: "Panele Diellore",
      icon: "Sun",
      desc: "Sisteme fotovoltaike të teknologjisë së fundit për kursim maksimal.",
      details: "Sistemet tona janë të projektuara për të përballuar kushtet klimatike të rajonit dhe për të maksimizuar prodhimin e energjisë. Investoni në të ardhmen me panelet tona.",
      subsections: []
    },
    {
      slug: "smart-home",
      title: "Smart Home",
      icon: "HomeIcon",
      desc: "Mjedise jetese të automatizuara të kontrolluara nga teknologjia inteligjente.",
      details: "Teknologjia jonë lejon integrimin e të gjitha pajisjeve në një platformë të vetme, duke sjellë kontrollin total të ambientit tuaj në majë të gishtave.",
      subsections: []
    }
  ],
  portfolio: [
    {
      id: 1,
      title: "Residenca Solaris",
      category: "Panele Diellore",
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800",
      description: "Instalimi i 150 paneleve diellore..."
    }
  ]
};
