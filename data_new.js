// Data fra Excel-analysene - FAKTISKE TALL
const DATA = {
    // Timer-detaljer fra Excel
    timerDetaljer: {
        tilbudVunnet: 4222.0,
        tilbudTapt: 5525.0,
        tilbudDirekte: 628.5,
    },

    // 2025 tilbudsstatistikk
    tilbud2025: {
        totalt: 701,
        vunnet: { antall: 312, verdi: 343.4, timer: 4222.0 },
        tapt: { antall: 181, verdi: 379.7, timer: 5525.0 },
        direkte: { antall: 208, verdi: 51.8, timer: 628.5 },
        tilslagAntall: 63.3,
        tilslagVerdi: 47.5,
        totaleTilbudTimer: 10375.5,
        tilbudskostMNOK: 47.21,
        tilbudskostProsent: 13.75
    },

    // Timer per tilbud
    timerPerTilbud: {
        vunnet: 13.5,
        tapt: 30.5,
        direkte: 3.0
    },

    // Tilbudsstørrelser basert på kontraktsverdi
    storrelser: [
        { label: "Under 100k", vunnet: 92, tapt: 6, direkte: 106, tilslag: 94, timerVunnet: 100, timerTapt: 20, verdiVunnet: 4.3, tilbudskostProsent: 12.7 },
        { label: "100k-500k", vunnet: 123, tapt: 61, direkte: 72, tilslag: 67, timerVunnet: 998, timerTapt: 879, verdiVunnet: 29.4, tilbudskostProsent: 29.1 },
        { label: "500k-1M", vunnet: 35, tapt: 42, direkte: 16, tilslag: 45, timerVunnet: 790, timerTapt: 1228, verdiVunnet: 23.4, tilbudskostProsent: 39.2 },
        { label: "1-3M", vunnet: 41, tapt: 41, direkte: 11, tilslag: 50, timerVunnet: 1331, timerTapt: 1625, verdiVunnet: 60.3, tilbudskostProsent: 22.3 },
        { label: "3-10M", vunnet: 17, tapt: 19, direkte: 3, tilslag: 47, timerVunnet: 854, timerTapt: 1208, verdiVunnet: 87.1, tilbudskostProsent: 10.8 },
        { label: "Over 10M", vunnet: 4, tapt: 12, direkte: 0, tilslag: 25, timerVunnet: 151, timerTapt: 566, verdiVunnet: 139.0, tilbudskostProsent: 2.3 }
    ],

    // Alle forretningsområder - fra Excel
    foAlleOmrader: [
        { navn: "Kulturminner", tilslag: 100, vunnet: 3, tapt: 0, direkte: 1, timer: 56, verdiVunnet: 7.3, tilbudskost: 3.5 },
        { navn: "Nybygg - Helsebygg", tilslag: 100, vunnet: 3, tapt: 0, direkte: 1, timer: 0, verdiVunnet: 0.8, tilbudskost: 0.0 },
        { navn: "Stedsutvikling", tilslag: 86, vunnet: 6, tapt: 1, direkte: 1, timer: 135, verdiVunnet: 2.6, tilbudskost: 23.5 },
        { navn: "Trafikk- og transportanalyser", tilslag: 85, vunnet: 35, tapt: 6, direkte: 18, timer: 342, verdiVunnet: 6.7, tilbudskost: 23.2 },
        { navn: "Friluftsliv og naturmiljø", tilslag: 78, vunnet: 31, tapt: 9, direkte: 20, timer: 548, verdiVunnet: 18.2, tilbudskost: 13.7 },
        { navn: "Universell Utforming", tilslag: 75, vunnet: 3, tapt: 1, direkte: 1, timer: 72, verdiVunnet: 1.1, tilbudskost: 30.3 },
        { navn: "Mulighetsstudie", tilslag: 75, vunnet: 6, tapt: 2, direkte: 1, timer: 152, verdiVunnet: 2.1, tilbudskost: 32.4 },
        { navn: "Nybygg - Undervisningsbygg", tilslag: 75, vunnet: 3, tapt: 1, direkte: 0, timer: 37, verdiVunnet: 3.0, tilbudskost: 5.6 },
        { navn: "Geografiske analyser", tilslag: 73, vunnet: 8, tapt: 3, direkte: 3, timer: 279, verdiVunnet: 2.9, tilbudskost: 43.4 },
        { navn: "Byutvikling (storby)", tilslag: 71, vunnet: 10, tapt: 4, direkte: 0, timer: 299, verdiVunnet: 7.9, tilbudskost: 17.2 },
        { navn: "Parker og Byrom", tilslag: 71, vunnet: 17, tapt: 7, direkte: 12, timer: 484, verdiVunnet: 8.8, tilbudskost: 24.9 },
        { navn: "Elektro", tilslag: 71, vunnet: 12, tapt: 5, direkte: 5, timer: 371, verdiVunnet: 1.0, tilbudskost: 161.1 },
        { navn: "Leke- og aktivitetsområder", tilslag: 70, vunnet: 7, tapt: 3, direkte: 5, timer: 133, verdiVunnet: 0.8, tilbudskost: 72.4 },
        { navn: "VA-anlegg, byggeteknikk", tilslag: 67, vunnet: 2, tapt: 1, direkte: 0, timer: 9, verdiVunnet: 0.5, tilbudskost: 7.6 },
        { navn: "Store landskapsinngrep", tilslag: 67, vunnet: 2, tapt: 1, direkte: 1, timer: 147, verdiVunnet: 1.3, tilbudskost: 53.3 },
        { navn: "TRO - Andre offentlige bygg", tilslag: 67, vunnet: 2, tapt: 1, direkte: 1, timer: 122, verdiVunnet: 56.8, tilbudskost: 1.0 },
        { navn: "Energi", tilslag: 67, vunnet: 2, tapt: 1, direkte: 2, timer: 22, verdiVunnet: 0.5, tilbudskost: 19.8 },
        { navn: "Kirkegårder", tilslag: 63, vunnet: 5, tapt: 3, direkte: 6, timer: 95, verdiVunnet: 1.1, tilbudskost: 40.7 },
        { navn: "Konsept og mulighetsstudier", tilslag: 60, vunnet: 6, tapt: 4, direkte: 2, timer: 92, verdiVunnet: 1.8, tilbudskost: 23.4 },
        { navn: "Konsekvensutredninger", tilslag: 59, vunnet: 10, tapt: 7, direkte: 3, timer: 275, verdiVunnet: 36.8, tilbudskost: 3.4 },
        { navn: "Nybygg - Bolig", tilslag: 59, vunnet: 10, tapt: 7, direkte: 4, timer: 167, verdiVunnet: 4.3, tilbudskost: 17.7 },
        { navn: "Reguleringsplan", tilslag: 56, vunnet: 60, tapt: 48, direkte: 69, timer: 2814, verdiVunnet: 68.3, tilbudskost: 18.7 },
        { navn: "Kommunal- og regional planlegging", tilslag: 55, vunnet: 34, tapt: 28, direkte: 21, timer: 1467, verdiVunnet: 43.6, tilbudskost: 15.3 },
        { navn: "Kollektivtrafikk/planlegging", tilslag: 44, vunnet: 8, tapt: 10, direkte: 0, timer: 386, verdiVunnet: 8.1, tilbudskost: 21.6 },
        { navn: "Byggeplan veg", tilslag: 44, vunnet: 4, tapt: 5, direkte: 5, timer: 720, verdiVunnet: 6.6, tilbudskost: 49.3 },
        { navn: "Samordnet areal og transportplanlegging", tilslag: 33, vunnet: 2, tapt: 4, direkte: 4, timer: 263, verdiVunnet: 0.2, tilbudskost: 653.9 },
        { navn: "Geoinformatikk", tilslag: 25, vunnet: 1, tapt: 3, direkte: 0, timer: 132, verdiVunnet: 2.0, tilbudskost: 30.0 }
    ],

    // Regioner fra Excel
    regioner: [
        { navn: "øst", tilslag: 63, vunnet: 112, tapt: 66, direkte: 54, timer: 4324, verdiVunnet: 123.6, tilbudskost: 15.9 },
        { navn: "vest", tilslag: 65, vunnet: 62, tapt: 34, direkte: 11, timer: 1488, verdiVunnet: 46.8, tilbudskost: 14.5 },
        { navn: "sør", tilslag: 70, vunnet: 94, tapt: 41, direkte: 112, timer: 2444, verdiVunnet: 57.4, tilbudskost: 19.4 },
        { navn: "nord/midt", tilslag: 62, vunnet: 43, tapt: 26, direkte: 31, timer: 1553, verdiVunnet: 59.7, tilbudskost: 11.8 },
        { navn: "divisjonsledelse", tilslag: 7, vunnet: 1, tapt: 14, direkte: 0, timer: 568, verdiVunnet: 56.0, tilbudskost: 4.6 }
    ],

    // Kontorer fra Excel
    kontorer: [
        { navn: "Sandvika", tilslag: 57, vunnet: 63, tapt: 48, direkte: 44, timer: 3063, snittTimer: 19.8, verdiVunnet: 81.3, tilbudskost: 17.1 },
        { navn: "Bergen", tilslag: 63, vunnet: 39, tapt: 23, direkte: 3, timer: 1239, snittTimer: 19.1, verdiVunnet: 30.7, tilbudskost: 18.4 },
        { navn: "Trondheim", tilslag: 63, vunnet: 27, tapt: 16, direkte: 26, timer: 1026, snittTimer: 14.9, verdiVunnet: 42.3, tilbudskost: 11.0 },
        { navn: "Arendal", tilslag: 69, vunnet: 25, tapt: 11, direkte: 11, timer: 1101, snittTimer: 23.4, verdiVunnet: 11.6, tilbudskost: 43.2 },
        { navn: "Kristiansand", tilslag: 67, vunnet: 22, tapt: 11, direkte: 17, timer: 307, snittTimer: 6.1, verdiVunnet: 21.8, tilbudskost: 6.4 },
        { navn: "Stavanger", tilslag: 66, vunnet: 21, tapt: 11, direkte: 8, timer: 196, snittTimer: 4.9, verdiVunnet: 9.1, tilbudskost: 9.9 },
        { navn: "Oslo", tilslag: 59, vunnet: 19, tapt: 13, direkte: 1, timer: 960, snittTimer: 29.1, verdiVunnet: 17.1, tilbudskost: 25.5 },
        { navn: "Tønsberg", tilslag: 68, vunnet: 21, tapt: 10, direkte: 13, timer: 525, snittTimer: 11.9, verdiVunnet: 12.0, tilbudskost: 19.9 },
        { navn: "Hamar", tilslag: 67, vunnet: 14, tapt: 7, direkte: 7, timer: 372, snittTimer: 13.3, verdiVunnet: 16.8, tilbudskost: 10.1 },
        { navn: "Skien", tilslag: 65, vunnet: 13, tapt: 7, direkte: 30, timer: 380, snittTimer: 7.6, verdiVunnet: 7.2, tilbudskost: 24.0 },
        { navn: "Ås", tilslag: 73, vunnet: 11, tapt: 4, direkte: 0, timer: 310, snittTimer: 20.6, verdiVunnet: 60.0, tilbudskost: 2.3 },
        { navn: "Drammen", tilslag: 50, vunnet: 6, tapt: 6, direkte: 1, timer: 153, snittTimer: 11.7, verdiVunnet: 4.3, tilbudskost: 16.0 },
        { navn: "Tromsø", tilslag: 64, vunnet: 7, tapt: 4, direkte: 2, timer: 188, snittTimer: 14.5, verdiVunnet: 15.0, tilbudskost: 5.7 },
        { navn: "Kongsberg", tilslag: 71, vunnet: 5, tapt: 2, direkte: 14, timer: 109, snittTimer: 5.2, verdiVunnet: 0.9, tilbudskost: 53.5 },
        { navn: "Molde", tilslag: 83, vunnet: 5, tapt: 1, direkte: 1, timer: 60, snittTimer: 8.5, verdiVunnet: 0.9, tilbudskost: 31.4 },
        { navn: "Mo i Rana", tilslag: 40, vunnet: 2, tapt: 3, direkte: 1, timer: 130, snittTimer: 21.6, verdiVunnet: 0.6, tilbudskost: 95.0 },
        { navn: "Bø", tilslag: 80, vunnet: 4, tapt: 1, direkte: 2, timer: 23, snittTimer: 3.2, verdiVunnet: 1.4, tilbudskost: 7.1 }
    ],

    // Top kunder fra Excel
    topKunder: [
        { navn: "Akershus fylkeskommune", antall: 10, vunnet: 2, tapt: 4, direkte: 4, tilslag: 33, timer: 619, verdiVunnet: 6.6, tilbudskost: 42.4 },
        { navn: "Bærum kommune", antall: 9, vunnet: 3, tapt: 2, direkte: 4, tilslag: 60, timer: 207, verdiVunnet: 1.8, tilbudskost: 52.3 },
        { navn: "Oslo kommune v/ Bymiljøetaten", antall: 9, vunnet: 2, tapt: 3, direkte: 4, tilslag: 40, timer: 663, verdiVunnet: 13.0, tilbudskost: 23.2 },
        { navn: "Lillestrøm Kommune", antall: 9, vunnet: 6, tapt: 3, direkte: 0, tilslag: 67, timer: 432, verdiVunnet: 11.3, tilbudskost: 17.4 },
        { navn: "Bergen kommune - Etat for boligforvaltning", antall: 8, vunnet: 4, tapt: 4, direkte: 0, tilslag: 50, timer: 99, verdiVunnet: 1.9, tilbudskost: 23.4 },
        { navn: "Færder kommune", antall: 8, vunnet: 7, tapt: 0, direkte: 1, tilslag: 100, timer: 20, verdiVunnet: 4.8, tilbudskost: 1.8 },
        { navn: "Vestland fylkeskommune", antall: 8, vunnet: 3, tapt: 4, direkte: 1, tilslag: 43, timer: 147, verdiVunnet: 2.6, tilbudskost: 25.6 },
        { navn: "Statens vegvesen", antall: 8, vunnet: 4, tapt: 1, direkte: 3, tilslag: 80, timer: 174, verdiVunnet: 5.5, tilbudskost: 14.2 },
        { navn: "Miljødirektoratet", antall: 7, vunnet: 5, tapt: 2, direkte: 0, tilslag: 71, timer: 357, verdiVunnet: 2.9, tilbudskost: 56.9 },
        { navn: "Larvik kommune", antall: 7, vunnet: 5, tapt: 2, direkte: 0, tilslag: 71, timer: 219, verdiVunnet: 3.4, tilbudskost: 29.2 },
        { navn: "Rogaland fylkeskommune", antall: 7, vunnet: 4, tapt: 1, direkte: 2, tilslag: 80, timer: 37, verdiVunnet: 1.8, tilbudskost: 9.4 },
        { navn: "Ruter As", antall: 6, vunnet: 3, tapt: 3, direkte: 0, tilslag: 50, timer: 201, verdiVunnet: 2.6, tilbudskost: 35.5 },
        { navn: "SIGDAL KOMMUNE", antall: 6, vunnet: 3, tapt: 2, direkte: 1, tilslag: 60, timer: 147, verdiVunnet: 2.6, tilbudskost: 25.6 },
        { navn: "Trondheim kommune", antall: 6, vunnet: 1, tapt: 2, direkte: 3, tilslag: 33, timer: 149, verdiVunnet: 0.3, tilbudskost: 260.8 },
        { navn: "Artsdatabanken", antall: 5, vunnet: 3, tapt: 0, direkte: 2, tilslag: 100, timer: 22, verdiVunnet: 1.4, tilbudskost: 6.8 },
        { navn: "Løten Kommune", antall: 5, vunnet: 1, tapt: 0, direkte: 4, tilslag: 100, timer: 29, verdiVunnet: 6.0, tilbudskost: 2.2 },
        { navn: "Oslo kommune - Plan- og bygningsetaten", antall: 5, vunnet: 2, tapt: 3, direkte: 0, tilslag: 40, timer: 102, verdiVunnet: 0.4, tilbudskost: 130.7 },
        { navn: "Tromsø Kommune", antall: 5, vunnet: 2, tapt: 1, direkte: 2, tilslag: 67, timer: 37, verdiVunnet: 0.2, tilbudskost: 84.2 },
        { navn: "Vestfold fylkeskommune", antall: 5, vunnet: 4, tapt: 1, direkte: 0, tilslag: 80, timer: 105, verdiVunnet: 1.6, tilbudskost: 29.5 },
        { navn: "Skien kommune", antall: 5, vunnet: 2, tapt: 2, direkte: 1, tilslag: 50, timer: 116, verdiVunnet: 0.9, tilbudskost: 58.6 },
        { navn: "Gjerstad kommune", antall: 4, vunnet: 2, tapt: 1, direkte: 1, tilslag: 67, timer: 13, verdiVunnet: 0.3, tilbudskost: 19.7 },
        { navn: "Porsgrunn kommune", antall: 4, vunnet: 2, tapt: 1, direkte: 1, tilslag: 67, timer: 86, verdiVunnet: 1.9, tilbudskost: 20.1 },
        { navn: "Oslobygg Kf", antall: 4, vunnet: 1, tapt: 2, direkte: 1, tilslag: 33, timer: 152, verdiVunnet: 56.0, tilbudskost: 1.2 },
        { navn: "Bergen Byfortetting AS", antall: 4, vunnet: 4, tapt: 0, direkte: 0, tilslag: 100, timer: 14, verdiVunnet: 0.3, tilbudskost: 23.2 },
        { navn: "Gjerdrum Kommune", antall: 4, vunnet: 3, tapt: 0, direkte: 1, tilslag: 100, timer: 15, verdiVunnet: 0.5, tilbudskost: 14.6 },
        { navn: "OBOS Fornebu AS", antall: 4, vunnet: 2, tapt: 1, direkte: 1, tilslag: 67, timer: 95, verdiVunnet: 1.6, tilbudskost: 26.5 },
        { navn: "OBOS Block Watne AS", antall: 4, vunnet: 2, tapt: 2, direkte: 0, tilslag: 50, timer: 124, verdiVunnet: 0.6, tilbudskost: 92.9 },
        { navn: "KS  (Kommunesektorens organisasjon)", antall: 4, vunnet: 1, tapt: 1, direkte: 2, tilslag: 50, timer: 22, verdiVunnet: 1.2, tilbudskost: 8.3 },
        { navn: "Veidekke Entreprenør AS", antall: 4, vunnet: 2, tapt: 0, direkte: 2, tilslag: 100, timer: 3, verdiVunnet: 0.3, tilbudskost: 3.3 },
        { navn: "Nordland fylkeskommune", antall: 3, vunnet: 2, tapt: 1, direkte: 0, tilslag: 67, timer: 36, verdiVunnet: 2.0, tilbudskost: 8.0 }
    ],

    // Største tapte tilbud fra Excel
    storsteTapte: [
        { verdi: 40.0, kunde: "Forsvarsbygg", emne: "Rådgivningstjenester i naturmangfold, restaurering.. Tilbud", timer: 108, tilbudskost: 0.49, smerteScore: 432.0 },
        { verdi: 20.0, kunde: "Abakus AS", emne: "Rammeavtale EL-24-19 Rådg.- og prosj.tjenester innen Tilbud", timer: 2, tilbudskost: 0.01, smerteScore: 4.0 },
        { verdi: 15.0, kunde: "Stord kommune", emne: "Rammeavtale planfaglege tenester Stord kommune Tilbud", timer: 23.5, tilbudskost: 0.11, smerteScore: 35.3 },
        { verdi: 15.0, kunde: "Bergen kommune - Etat for boligforvaltning", emne: "Rammeavtale prosjektering og konsulenttjenester - i.. Tilbud", timer: 45.5, tilbudskost: 0.21, smerteScore: 68.3 },
        { verdi: 15.0, kunde: "Vestfold fylkeskommune", emne: "Planleggings- og prosjekteringstjenester Tilbud", timer: 55, tilbudskost: 0.25, smerteScore: 82.5 },
        { verdi: 10.0, kunde: "Øvre Romerike Innkjøpssamarbeid (ØRIK)", emne: "Rammeavtale Ingeniørtjenester areal- og samfunnspla.. Tilbud", timer: 60, tilbudskost: 0.27, smerteScore: 60.0 },
        { verdi: 10.0, kunde: "Oslobygg Kf", emne: "Rammeavtale Oslobygg KF - Landskapsarkitekttjenester Tilbud", timer: 72, tilbudskost: 0.33, smerteScore: 72.0 },
        { verdi: 10.0, kunde: "Haugaland Kraft AS", emne: "Rammeavtale Fagne AS - Nettutbyggingsprosjekter Tilbud", timer: 22, tilbudskost: 0.10, smerteScore: 22.0 },
        { verdi: 10.0, kunde: "Statkraft AS", emne: "Vågfjellet vindkraftverk Tilbud", timer: 68.5, tilbudskost: 0.31, smerteScore: 68.5 },
        { verdi: 10.0, kunde: "Akershus fylkeskommune", emne: "Planlegging og prosjektering av ny Fossum bru Tilbud", timer: 108, tilbudskost: 0.49, smerteScore: 108.0 },
        { verdi: 10.0, kunde: "Vestland fylkeskommune", emne: "Planfaglege rådgjevartenester Tilbud", timer: 0, tilbudskost: 0.00, smerteScore: 0.0 },
        { verdi: 10.0, kunde: "Bergen kommune - Etat for boligforvaltning", emne: "Kommunedelplan Bergen Vest Tilbud", timer: 1, tilbudskost: 0.00, smerteScore: 1.0 },
        { verdi: 9.0, kunde: "Akershus fylkeskommune", emne: "Kunnskapsløft om restaurerbar natur Tilbud", timer: 155, tilbudskost: 0.71, smerteScore: 139.5 },
        { verdi: 8.5, kunde: "Miljødirektoratet", emne: "Kartproduksjon lavlandsnatur 2025 Tilbud", timer: 82.5, tilbudskost: 0.38, smerteScore: 70.1 },
        { verdi: 7.0, kunde: "Austevoll kommune", emne: "Bistand kommuneplan Tilbud", timer: 9, tilbudskost: 0.04, smerteScore: 6.3 },
        { verdi: 7.0, kunde: "Sandnes kommune", emne: "Rammeavtale for landskapsarkitekturtjenester Tilbud", timer: 0, tilbudskost: 0.00, smerteScore: 0.0 },
        { verdi: 6.5, kunde: "Oslo kommune v/ Bymiljøetaten", emne: "MK Forprosjekt Kirkegata Tilbud", timer: 129, tilbudskost: 0.59, smerteScore: 83.8 },
        { verdi: 6.0, kunde: "Oslobygg Kf", emne: "Rådgivertjenester for detaljregulering av Kjølbergg.. Tilbud", timer: 79.5, tilbudskost: 0.36, smerteScore: 47.7 },
        { verdi: 6.0, kunde: "Karmøy Kommune", emne: "Rammeavtale planarbeid Karmøy kommune Tilbud", timer: 0, tilbudskost: 0.00, smerteScore: 0.0 },
        { verdi: 5.8, kunde: "Oslo kommune v/ Bymiljøetaten", emne: "37 Holbergs plass forprosjekt med regulering Tilbud", timer: 141.5, tilbudskost: 0.64, smerteScore: 82.1 }
    ],

    // Største tapte etter timer-innsats
    storsteTapteTimer: [
        { verdi: 9.0, kunde: "Akershus fylkeskommune", emne: "Kunnskapsløft om restaurerbar natur Tilbud", timer: 155, tilbudskost: 0.71 },
        { verdi: 4.5, kunde: "GKI Grenlandskommunenes Innkjøpsenhet", emne: "Forprosjekt Grenland RA – regulering avløpsledninger Tilbud", timer: 147.5, tilbudskost: 0.67 },
        { verdi: 5.8, kunde: "Oslo kommune v/ Bymiljøetaten", emne: "37 Holbergs plass forprosjekt med regulering Tilbud", timer: 141.5, tilbudskost: 0.64 },
        { verdi: 5.5, kunde: "Oslo kommune v/ Bymiljøetaten", emne: "MK41 Forprosjekt reguleringsplan, Maridalsveien Tilbud", timer: 139, tilbudskost: 0.63 },
        { verdi: 2.0, kunde: "Volda kommune", emne: "Områderegulering Volda sentrum Tilbud", timer: 134.5, tilbudskost: 0.61 },
        { verdi: 6.5, kunde: "Oslo kommune v/ Bymiljøetaten", emne: "MK Forprosjekt Kirkegata Tilbud", timer: 129, tilbudskost: 0.59 },
        { verdi: 1.5, kunde: "GKI Grenlandskommunenes Innkjøpsenhet", emne: "Kommuneplanens arealdel for Bamble kommune Tilbud", timer: 109, tilbudskost: 0.50 },
        { verdi: 40.0, kunde: "Forsvarsbygg", emne: "Rådgivningstjenester i naturmangfold, restaurering.. Tilbud", timer: 108, tilbudskost: 0.49 },
        { verdi: 10.0, kunde: "Akershus fylkeskommune", emne: "Planlegging og prosjektering av ny Fossum bru Tilbud", timer: 108, tilbudskost: 0.49 },
        { verdi: 4.0, kunde: "Trondheim kommune", emne: "Johan Tillers vei del 2 og Industriveien regulering.. Tilbud", timer: 93.5, tilbudskost: 0.43 },
        { verdi: 0.9, kunde: "AVINOR AS", emne: "Detaljreguleringsplan OSL Syd", timer: 88.5, tilbudskost: 0.40 },
        { verdi: 1.5, kunde: "OBOS Block Watne AS", emne: "Reguleringsplan Grasveien Tilbud", timer: 87.5, tilbudskost: 0.40 },
        { verdi: 8.5, kunde: "Miljødirektoratet", emne: "Kartproduksjon lavlandsnatur 2025 Tilbud", timer: 82.5, tilbudskost: 0.38 },
        { verdi: 6.0, kunde: "Oslobygg Kf", emne: "Rådgivertjenester for detaljregulering av Kjølbergg.. Tilbud", timer: 79.5, tilbudskost: 0.36 },
        { verdi: 1.4, kunde: "Porsgrunn kommune", emne: "Reguleringsplan for tursti på nedlagt spor Porsgrun.. Tilbud", timer: 78.5, tilbudskost: 0.36 },
        { verdi: 2.0, kunde: "Lillestrøm Kommune", emne: "Sørumsand sentrum - bistand til områderegulering Tilbud", timer: 78.5, tilbudskost: 0.36 },
        { verdi: 1.5, kunde: "Skien kommune", emne: "Gang- og sykkelvennlige gater på Bakken og nedre Fa.. Tilbud", timer: 78.5, tilbudskost: 0.36 },
        { verdi: 1.5, kunde: "Vanylven Kommune", emne: "Vanylven kommuneplan sin arealde Tilbud", timer: 77.5, tilbudskost: 0.35 },
        { verdi: 0.5, kunde: "Statens fagskole for gartnere og blomsterdekoratører", emne: "Vea Bekkeåpning Tilbud", timer: 77, tilbudskost: 0.35 },
        { verdi: 0.4, kunde: "Kristiansund kommune", emne: "Prosjektering av gatetun i Fredrik Selmers gate Tilbud", timer: 77, tilbudskost: 0.35 }
    ]
};
