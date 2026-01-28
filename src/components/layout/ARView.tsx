"use client";

import React, { useEffect, useState, useRef } from "react";
import { useLocale } from "next-intl";
import Loading from "@/components/layout/Loading";
import CustomButton from "../ui/Button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import AR from "@/assets/arpic.jpeg";

const AScene = (props: any) => React.createElement("a-scene", props);
const ACamera = (props: any) => React.createElement("a-camera", props);
const AEntity = (props: any) => React.createElement("a-entity", props);
const ACircle = (props: any) => React.createElement("a-circle", props);
const ARing = (props: any) => React.createElement("a-ring", props);
const ALight = (props: any) => React.createElement("a-light", props);

const subtitles1c = [
  {
    time: 4,
    text: "Benvinguts i benvingudes al mar del massís del Garraf.",
  },
  {
    time: 4,
    text: "Aquí, la costa és plena de penya-segats i camins estrets, i això fa que sigui un indret perfecte per veure-hi des de lluny.",
  },
  {
    time: 12,
    text: "Fa molts anys, durant la Guerra Civil, es temia que hi pogués haver un desembarcament de les tropes feixistes contra el règim republicà.",
  },
  {
    time: 21,
    text: "Per això, al llarg del litoral català es van organitzar punts de vigilància.",
  },
  {
    time: 26,
    text: "Entre Sitges i Vilanova i la Geltrú, el Garraf es va convertir en un espai estratègic: des de les zones més altes es podia controlar la costa, detectar moviments al mar i avisar de seguida les altres unitats de defensa.",
  },
  {
    time: 42,
    text: "Aquí no hi havia grans fortificacions com en altres punts, però el Garraf tenia una feina molt important: fer de punt d’alerta avançat i ajudar a connectar la vigilància dels diferents sectors del litoral del Penedès.",
  },
  {
    time: 55,
    text: "Ara heu d’ajudar-me!",
  },
  {
    time: 58,
    text: "Busqueu amb la realitat augmentada els artefactes amagats i desactiveu-los amb cura.",
  },
  {
    time: 63,
    text: "Quan ho aconseguiu, us faré una pregunta i, si l’encerteu, guanyareu un col·leccionable únic.",
  },
  {
    time: 70,
    text: "Que tingueu molta sort!",
  },
];

const subtitles2c = [
  {
    time: 0,
    text: "Benvinguts i benvingudes a la Platja de Balmins.",
  },
  {
    time: 4,
    text: "Aquí s’hi conserva un antic niu de metralladora, que podeu veure davant vostre, construït durant la Guerra Civil, per vigilar la costa davant d’un possible atac per mar de les tropes feixistes contra el règim republicà.",
  },
  {
    time: 17,
    text: "Aquest búnquer de formigó, amb una sola obertura frontal, servia per protegir les platges de Balmins i Sant Sebastià.",
  },
  {
    time: 25,
    text: "Tot i ser petit, era molt eficaç: permetia disparar de costat per frenar un desembarcament i estava tan ben camuflat que costava de distingir tant des del mar com des de l’aire.",
  },
  {
    time: 37,
    text: "A prop d’aquí també s’hi van instal·lar canons de defensa costanera per protegir el poble.",
  },
  {
    time: 43,
    text: "Tot plegat formava part del sistema defensiu de Sitges.",
  },
  {
    time: 47,
    text: "Ara heu d’ajudar-me!",
  },
  {
    time: 49,
    text: "Busqueu amb la realitat augmentada els artefactes explosius i desactiveu-los amb cura.",
  },
  {
    time: 55,
    text: "Quan ho aconseguiu, us faré una pregunta i, si l’encerteu, guanyareu un col·leccionable únic.",
  },
  {
    time: 62,
    text: "Que tingueu molta sort!",
  },
];

const subtitles3c = [
  {
    time: 0,
    text: "Benvinguts i benvingudes a l’edifici Miramar, un punt privilegiat per observar la costa.",
  },
  {
    time: 6,
    text: "Des d’aquí és fàcil entendre per què, durant la Guerra Civil, Sitges va reforçar la vigilància del mar.",
  },
  {
    time: 14,
    text: "Després del cop d’estat per part de les tropes feixistes el 18 de juliol de 1936, el país va quedar dividit i a la costa hi havia por d’un possible desembarcament.",
  },
  {
    time: 26,
    text: "Quan el creuer Canarias va bombardejar Roses el 30 d’octubre de 1936, l’alarma es va estendre per tot el litoral.",
  },
  {
    time: 35,
    text: "A Sitges, el Consell Municipal va organitzar la defensa i es va acordar que uns cent milicians vetllarien per la seguretat de la costa.",
  },
  {
    time: 45,
    text: "Al litoral sitgetà es van fer trinxeres i defenses amb sacs de sorra, i després es van construir nius de metralladora en punts clau com Balmins o les Anquines.",
  },
  {
    time: 57,
    text: "També s’hi van instal·lar canons de defensa costanera entre el cementiri i Aiguadolç.",
  },
  {
    time: 63,
    text: "Tot i que Sitges no va patir cap desembarcament, l’amenaça va ser present durant tota la guerra.",
  },
  {
    time: 69,
    text: "Ara heu d’ajudar-me!",
  },
  {
    time: 71,
    text: "Busqueu amb la realitat augmentada els artefactes explosius i desactiveu-los amb cura.",
  },
  {
    time: 78,
    text: "Quan ho aconseguiu, us faré una pregunta i, si l’encerteu, guanyareu un col·leccionable únic.",
  },
  {
    time: 84,
    text: "Que tingueu molta sort!",
  },
];

const subtitles4c = [
  {
    time: 0,
    text: "Benvinguts i benvingudes a la platja de la Barra, un altre punt clau dins la defensa de la costa de Sitges durant la Guerra Civil.",
  },
  {
    time: 10,
    text: "En aquella època es van construir quatre nius de metralladora repartits estratègicament: Balmins, el Baluard, la Barra i les Anquines. Aquest d’aquí ajudava a vigilar i protegir la franja de costa des d’Aiguadolç fins més enllà de les Anquines.",
  },
  {
    time: 31,
    text: "Com la resta de fortificacions del municipi, també servia per donar suport als canons situats entre el cementiri i Aiguadolç, i per reforçar la vigilància davant d’un possible desembarcament.",
  },
  {
    time: 46,
    text: "Ara heu d’ajudar-me! Busqueu amb la realitat augmentada els artefactes explosius i desactiveu-los amb cura.",
  },
  {
    time: 56,
    text: "Quan ho aconseguiu, us faré una pregunta i, si l’encerteu, guanyareu un col·leccionable únic.",
  },
  {
    time: 64,
    text: "Que tingueu molta sort!",
  },
];

const subtitles5c = [
  {
    time: 0,
    text: "Benvinguts i benvingudes a la Punta Mabrera, a Vilanova i la Geltrú.",
  },
  {
    time: 6,
    text: "Durant la Guerra Civil, els veïns i veïnes de la ciutat van construir diverses defenses entre gener i abril de 1937 per protegir el litoral davant el risc d’un atac per mar, mentre la vida quotidiana continuava amb dificultats a les cases i als carrers.",
  },
  {
    time: 28,
    text: "Aquest búnquer formava part d’una xarxa de protecció amb trinxeres, nius de metralladora i punts de vigilància.",
  },
  {
    time: 38,
    text: "A prop també hi havia una bateria d’obusos a la platja de Sant Gervasi, i fins i tot hi col·laboraven patrulles marítimes amb barques de pesca, com el Maricel i la Joven Rosita, per controlar el tram de costa entre Vallcarca i el Vendrell.",
  },
  {
    time: 58,
    text: "Tot i que Vilanova no va patir cap desembarcament, aquestes defenses recorden que la costa va viure amb la sensació de perill durant bona part del conflicte.",
  },
  {
    time: 71,
    text: "Ara heu d’ajudar-me! Busqueu amb la realitat augmentada els artefactes explosius i desactiveu-los amb cura.",
  },
  {
    time: 81,
    text: "Quan ho aconseguiu, us faré una pregunta i, si l’encerteu, guanyareu un col·leccionable únic.",
  },
  {
    time: 89,
    text: "Que tingueu molta sort!",
  },
];

const subtitles6c = [
  {
    time: 0,
    text: "Benvinguts i benvingudes al parc de Ribes Roges.",
  },
  {
    time: 5,
    text: "Durant la Guerra Civil, la gent de la costa vivia amb la por constant d’un atac per mar. El bombardeig de Roses pel creuer Canarias, l’octubre de 1936, va fer evident que calia reforçar la defensa del litoral.",
  },
  {
    time: 22,
    text: "A Vilanova i la Geltrú, entre el gener i l’abril de 1937, es van construir nius de metralladora per vigilar les platges.",
  },
  {
    time: 33,
    text: "Molts veïns hi van participar directament, convocats els diumenges o com a voluntaris, mentre dones, infants i persones grans assumien les tasques quotidianes.",
  },
  {
    time: 46,
    text: "La vigilància la feien carrabiners, milicians i, més endavant, l’Exèrcit Republicà. A Sant Gervasi s’hi va instal·lar una bateria d’obusos, i dos pesquers patrullaven la costa.",
  },
  {
    time: 61,
    text: "Tot i això, no hi va haver cap desembarcament, però l’amenaça va ser real i Vilanova va patir un bombardeig aeri l’agost de 1938.",
  },
  {
    time: 73,
    text: "Ara heu d’ajudar-me! Busqueu amb la realitat augmentada els artefactes explosius i desactiveu-los amb cura.",
  },
  {
    time: 83,
    text: "Quan ho aconseguiu, us faré una pregunta i, si l’encerteu, guanyareu un col·leccionable únic.",
  },
  {
    time: 91,
    text: "Que tingueu molta sort!",
  },
];

const subtitles7c = [
  {
    time: 0,
    text: "Benvinguts i benvingudes a la Primera Roca, un tram de litoral on, durant la Guerra Civil, es va reforçar la vigilància del mar.",
  },
  {
    time: 10,
    text: "L’any 1937, a Vilanova i la Geltrú es van construir nius de metralladora al llarg de la costa per prevenir possibles desembarcaments.",
  },
  {
    time: 22,
    text: "Aquest búnquer seguia el mateix model que la resta: una estructura pensada per vigilar un sector concret i coordinar-se amb les posicions properes.",
  },
  {
    time: 34,
    text: "Formava part d’una xarxa defensiva més àmplia, amb la bateria de Sant Gervasi, les patrulles marítimes i la vigilància de carrabiners i milicians, per mantenir sota control un litoral especialment exposat.",
  },
  {
    time: 52,
    text: "Ara heu d’ajudar-me! Busqueu amb la realitat augmentada els artefactes explosius i desactiveu-los amb cura.",
  },
  {
    time: 62,
    text: "Quan ho aconseguiu, us faré una pregunta i, si l’encerteu, guanyareu un col·leccionable únic.",
  },
  {
    time: 70,
    text: "Que tingueu molta sort!",
  },
];

const subtitles8c = [
  {
    time: 0,
    text: "Benvinguts i benvingudes a la desembocadura del riu Foix, a Cubelles.",
  },
  {
    time: 6,
    text: "Durant la Guerra Civil, la vigilància de la costa la feien sobretot efectius del Cos de Carrabiners. A mitjans de l’any 1937, Cubelles tenia una dotació fixa de quatre caporals i quatre carrabiners, coordinats des de la comandància amb seu a Sitges.",
  },
  {
    time: 28,
    text: "En aquest litoral es van construir defenses molt destacades, com el fortí de la Mota de Sant Pere i aquest niu de metralladores.",
  },
  {
    time: 40,
    text: "Era de formigó armat i, a diferència d’altres, no estava camuflat. Tenia dues metralladores, una per controlar cada sector de costa.",
  },
  {
    time: 52,
    text: "L’entrada era per la part del darrere i conduïa a un passadís cobert.",
  },
  {
    time: 58,
    text: "Al final, a banda i banda, hi havia les posicions de tir amb troneres laterals, pensades per fer tir de flanqueig, molt efectiu si s’intentava un desembarcament.",
  },
  {
    time: 72,
    text: "Ara heu d’ajudar-me! Busqueu amb la realitat augmentada els artefactes explosius i desactiveu-los amb cura.",
  },
  {
    time: 81,
    text: "Quan ho aconseguiu, us faré una pregunta i, si l’encerteu, guanyareu un col·leccionable únic.",
  },
  {
    time: 90,
    text: "Que tingueu molta sort!",
  },
];

const subtitles9c = [
  {
    time: 0,
    text: "Benvinguts i benvingudes a la Mota de Sant Pere, a Cubelles.",
  },
  {
    time: 5,
    text: "Durant la Guerra Civil es temia un possible desembarcament per mar, i per això es va organitzar un sistema de defensa de la costa catalana.",
  },
  {
    time: 16,
    text: "Cubelles, dins del sector de Barcelona, va aixecar dues defenses clau al litoral.",
  },
  {
    time: 24,
    text: "Aquest fortí es va construir dalt d’un petit turó, en un punt fàcil de defensar i proper a l’antiga caserna dels carrabiners.",
  },
  {
    time: 34,
    text: "Servia com a punt de suport i comptava amb un observatori, nius de metralladora, espais per a cures sanitàries i pous d’aigua.",
  },
  {
    time: 45,
    text: "El conjunt es completava amb una trinxera coberta que envoltava el turó, amb espitlleres per vigilar i defensar-se en diferents direccions.",
  },
  {
    time: 56,
    text: "Ara heu d’ajudar-me! Busqueu amb la realitat augmentada els artefactes explosius i desactiveu-los amb cura.",
  },
  {
    time: 66,
    text: "Quan ho aconseguiu, us faré una pregunta i, si l’encerteu, guanyareu un col·leccionable únic.",
  },
  {
    time: 73,
    text: "Que tingueu molta sort!",
  },
];

const subtitles10c = [
  {
    time: 0,
    text: "Benvinguts i benvingudes a Cunit.",
  },
  {
    time: 3,
    text: "L’any 1936 va començar la Guerra Civil i el perill d’un possible desembarcament es va fer ben real. Des de Mallorca, que era en mans dels feixistes, es van produir atacs aeris i marítims contra Catalunya.",
  },
  {
    time: 21,
    text: "Per fer-hi front, la Generalitat va impulsar la fortificació del litoral. Entre 1937 i 1938 es va construir una xarxa de fortins, búnquers i trinxeres per vigilar les platges.",
  },
  {
    time: 39,
    text: "En alguns punts s’hi va instal·lar artilleria, i en d’altres les posicions només s’activaven si hi havia senyals d’amenaça.",
  },
  {
    time: 49,
    text: "Un cop acabada la guerra, moltes d’aquestes defenses es van destruir o reaprofitar.",
  },
  {
    time: 56,
    text: "Les que encara es conserven ens ajuden avui a entendre l’esforç que es va fer per defensar la costa.",
  },
  {
    time: 64,
    text: "Ara heu d’ajudar-me! Busqueu amb la realitat augmentada els artefactes explosius i desactiveu-los amb cura.",
  },
  {
    time: 74,
    text: "Quan ho aconseguiu, us faré una pregunta i, si l’encerteu, guanyareu un col·leccionable únic.",
  },
  {
    time: 82,
    text: "Que tingueu molta sort!",
  },
];

const subtitles11c = [
  {
    time: 0,
    text: "Benvinguts i benvingudes al passeig marítim de Calafell.",
  },
  {
    time: 5,
    text: "Durant la Guerra Civil, aquest litoral es va preparar davant el risc d’un possible desembarcament, i després dels atacs de finals de 1936 es van organitzar defenses a tota la costa catalana.",
  },
  {
    time: 23,
    text: "Calafell formava part del sector tarragoní de defensa de costes, vigilat principalment pels carrabiners.",
  },
  {
    time: 32,
    text: "Tot i això, el perill més gran va arribar per l’aire: l’estiu de 1938 hi va haver bombardejos i es van enfonsar vaixells davant la costa.",
  },
  {
    time: 47,
    text: "A principis de 1937 s’hi va instal·lar una bateria de costa amb canons ja antics, situada a la zona de l’actual Bellamar, que amb el temps va acabar sent abandonada.",
  },
  {
    time: 63,
    text: "Ara heu d’ajudar-me! Busqueu amb la realitat augmentada els artefactes explosius i desactiveu-los amb cura.",
  },
  {
    time: 73,
    text: "Quan ho aconseguiu, us faré una pregunta i, si l’encerteu, guanyareu un col·leccionable únic.",
  },
  {
    time: 82,
    text: "Que tingueu molta sort!",
  },
];

const subtitles12c = [
  {
    time: 0,
    text: "Benvinguts i benvingudes a les Madrigueres, a la platja de Sant Salvador.",
  },
  {
    time: 5,
    text: "Aquest espai va ser primer un punt de defensa durant la Guerra Civil i, més tard, el refugi d’una família.",
  },
  {
    time: 15,
    text: "L’any 1937, la costa del Vendrell es va fortificar amb trinxeres i nius de metralladora per prevenir un possible desembarcament.",
  },
  {
    time: 26,
    text: "Carrabiners vigilaven les platges, i un punt d’observació alertava de l’arribada d’avions que sovint bombardejaven la zona de Sant Vicenç de Calders.",
  },
  {
    time: 38,
    text: "Aquest búnquer, de formigó i planta rectangular, tenia l’entrada posterior i tres espitlleres per controlar el litoral.",
  },
  {
    time: 48,
    text: "Acabada la guerra, alguns fortins abandonats es van convertir en habitatges. Aquí hi va viure la família Casas Perín a partir de 1949, i fins i tot un dels fills hi va néixer el 1950.",
  },
  {
    time: 66,
    text: "El 1953, després d’anys difícils, la família va marxar a una casa propera a la platja.",
  },
  {
    time: 75,
    text: "Ara heu d’ajudar-me! Busqueu amb la realitat augmentada els artefactes explosius i desactiveu-los amb cura.",
  },
  {
    time: 83,
    text: "Quan ho aconseguiu, us faré una pregunta i, si l’encerteu, guanyareu un col·leccionable únic.",
  },
  {
    time: 95,
    text: "Que tingueu molta sort!",
  },
];

const subtitles13c = [
  {
    time: 0,
    text: "Benvinguts i benvingudes al Francàs, un punt de la costa que durant la Guerra Civil es va preparar per fer front a possibles atacs i desembarcaments.",
  },
  {
    time: 12,
    text: "A mitjans de 1937 s’hi van construir trinxeres i nius de metralladora, vigilats per carrabiners i reforçats per unitats que podien intervenir ràpidament en cas de perill.",
  },
  {
    time: 28,
    text: "Aquest sistema defensiu formava part del control continu del litoral.",
  },
  {
    time: 34,
    text: "Aquest búnquer formava part d’aquesta línia defensiva, pensada per controlar l’accés per mar.",
  },
  {
    time: 42,
    text: "Alhora, la costa també es mantenia en alerta davant possibles atacs aeris provinents de Mallorca.",
  },
  {
    time: 51,
    text: "Ara heu d’ajudar-me! Busqueu amb la realitat augmentada els artefactes explosius i desactiveu-los amb cura.",
  },
  {
    time: 61,
    text: "Quan ho aconseguiu, us faré una pregunta i, si l’encerteu, guanyareu un col·leccionable únic.",
  },
  {
    time: 69,
    text: "Que tingueu molta sort!",
  },
];

const subtitles1e = [
  {
    time: 0,
    text: "Welcome to the sea of the Garraf Massif.",
  },
  {
    time: 4,
    text: "Here, the coastline is full of cliffs and narrow paths, making it an ideal place to see far into the distance.",
  },
  {
    time: 12,
    text: "Many years ago, during the Spanish Civil War, there was fear that fascist troops might carry out a landing against the Republican regime.",
  },
  {
    time: 21,
    text: "For this reason, observation points were organised along the Catalan coastline.",
  },
  {
    time: 26,
    text: "Between Sitges and Vilanova i la Geltrú, the Garraf became a strategic area: from the higher zones it was possible to control the coast, detect movements at sea and quickly warn other defence units.",
  },
  {
    time: 42,
    text: "There were no large fortifications here as in other places, but the Garraf played a very important role: acting as an advanced warning point and helping to connect surveillance across the different sectors of the Penedès coastline.",
  },
  {
    time: 55,
    text: "Now I need your help.",
  },
  {
    time: 58,
    text: "Use augmented reality to find the explosive devices and carefully deactivate them.",
  },
  {
    time: 63,
    text: "When you succeed, I will ask you a question and, if you answer correctly, you will win a unique collectible.",
  },
  {
    time: 70,
    text: "Good luck!",
  },
];

const subtitles2e = [
  {
    time: 0,
    text: "Welcome to Balmins Beach.",
  },
  {
    time: 4,
    text: "Here you can see an old machine-gun nest in front of you, built during the Spanish Civil War to monitor the coastline in case of a possible sea attack by fascist troops against the Republican regime.",
  },
  {
    time: 16,
    text: "This concrete bunker, with a single frontal opening, was used to protect Balmins and Sant Sebastià beaches.",
  },
  {
    time: 24,
    text: "Despite its small size, it was very effective: it allowed for lateral fire to stop a landing and was so well camouflaged that it was difficult to spot both from the sea and from the air.",
  },
  {
    time: 38,
    text: "Nearby, coastal defence cannons were also installed to protect the town.",
  },
  {
    time: 44,
    text: "All of this formed part of Sitges’ defensive system.",
  },
  {
    time: 48,
    text: "Now I need your help.",
  },
  {
    time: 50,
    text: "Use augmented reality to find the explosive devices and carefully deactivate them.",
  },
  {
    time: 57,
    text: "When you succeed, I will ask you a question and, if you answer correctly, you will win a unique collectible.",
  },
  {
    time: 64,
    text: "Good luck!",
  },
];

const subtitles3e = [
  {
    time: 0,
    text: "Welcome to the Miramar building, a privileged point from which to observe the coastline.",
  },
  {
    time: 5,
    text: "From here, it is easy to understand why, during the Spanish Civil War, Sitges strengthened its sea surveillance.",
  },
  {
    time: 12,
    text: "After the coup d’état carried out by fascist troops on 18 July 1936, the country was divided and there was fear along the coast of a possible landing.",
  },
  {
    time: 24,
    text: "When the cruiser Canarias bombarded Roses on 30 October 1936, the alarm spread along the entire coastline.",
  },
  {
    time: 33,
    text: "In Sitges, the Municipal Council organised the defence and it was agreed that around one hundred militiamen would watch over the security of the coast.",
  },
  {
    time: 43,
    text: "Along the Sitges coastline, trenches and defences made with sandbags were built, and later machine-gun nests were constructed at key points such as Balmins and Les Anquines.",
  },
  {
    time: 56,
    text: "Coastal defence cannons were also installed between the cemetery and Aiguadolç.",
  },
  {
    time: 62,
    text: "Although Sitges did not experience any landing, the threat remained throughout the war.",
  },
  {
    time: 67,
    text: "Now I need your help.",
  },
  {
    time: 69,
    text: "Use augmented reality to find the explosive devices and carefully deactivate them.",
  },
  {
    time: 75,
    text: "When you succeed, I will ask you a question and, if you answer correctly, you will win a unique collectible.",
  },
  {
    time: 83,
    text: "Good luck!",
  },
];

const subtitles4e = [
  {
    time: 0,
    text: "Welcome to La Barra Beach, another key point in the defence of the Sitges coastline during the Spanish Civil War.",
  },
  {
    time: 8,
    text: "At that time, four machine-gun nests were built and strategically distributed: Balmins, El Baluard, La Barra and Les Anquines. The one located here helped monitor and protect the stretch of coastline from Aiguadolç to beyond Les Anquines.",
  },
  {
    time: 28,
    text: "Like the rest of the municipality’s fortifications, it also supported the coastal defence cannons located between the cemetery and Aiguadolç, and reinforced surveillance in case of a possible landing.",
  },
  {
    time: 43,
    text: "Now I need your help. Use augmented reality to find the explosive devices and carefully deactivate them.",
  },
  {
    time: 51,
    text: "When you succeed, I will ask you a question and, if you answer correctly, you will win a unique collectible.",
  },
  {
    time: 58,
    text: "Good luck!",
  },
];

const subtitles5e = [
  {
    time: 0,
    text: "Welcome to Punta Mabrera, in Vilanova i la Geltrú.",
  },
  {
    time: 4,
    text: "During the Spanish Civil War, local residents built several defences between January and April 1937 to protect the coastline from the risk of a sea attack, while everyday life continued with great difficulty in homes and streets.",
  },
  {
    time: 22,
    text: "This bunker was part of a protective network that included trenches, machine-gun nests and observation points.",
  },
  {
    time: 30,
    text: "Nearby, there was also an artillery battery on Sant Gervasi Beach, and maritime patrols using fishing boats—such as the Maricel and the Joven Rosita—helped monitor the stretch of coast between Vallcarca and El Vendrell.",
  },
  {
    time: 47,
    text: "Although Vilanova did not experience any landing, these defences remind us that the coastline lived under a constant sense of danger for much of the conflict.",
  },
  {
    time: 59,
    text: "Now I need your help. Use augmented reality to find the explosive devices and carefully deactivate them.",
  },
  {
    time: 68,
    text: "When you succeed, I will ask you a question and, if you answer correctly, you will win a unique collectible.",
  },
  {
    time: 75,
    text: "Good luck!",
  },
];

const subtitles6e = [
  {
    time: 0,
    text: "Welcome to Ribes Roges Park.",
  },
  {
    time: 2,
    text: "During the Spanish Civil War, people living along the coast lived with the constant fear of a sea attack. The bombing of Roses by the cruiser Canarias in October 1936 made it clear that coastal defences needed to be reinforced.",
  },
  {
    time: 21,
    text: "In Vilanova i la Geltrú, between January and April 1937, machine-gun nests were built to monitor the beaches.",
  },
  {
    time: 31,
    text: "Many local residents took part directly, being called in on Sundays or volunteering, while women, children and elderly people took on everyday tasks.",
  },
  {
    time: 43,
    text: "Surveillance was carried out by carabineros, militiamen and later by the Republican Army. An artillery battery was installed in Sant Gervasi, and two fishing boats patrolled the coastline.",
  },
  {
    time: 57,
    text: "Despite this, no landing took place, although the threat was real and Vilanova suffered an air raid in August 1938.",
  },
  {
    time: 68,
    text: "Now I need your help. Use augmented reality to find the explosive devices and carefully deactivate them.",
  },
  {
    time: 78,
    text: "When you succeed, I will ask you a question and, if you answer correctly, you will win a unique collectible.",
  },
  {
    time: 86,
    text: "Good luck!",
  },
];

const subtitles7e = [
  {
    time: 0,
    text: "Welcome to Primera Roca, a stretch of coastline where sea surveillance was reinforced during the Spanish Civil War.",
  },
  {
    time: 8,
    text: "In 1937, machine-gun nests were built along the coast of Vilanova i la Geltrú to prevent possible landings.",
  },
  {
    time: 17,
    text: "This bunker followed the same design as the others: a structure intended to monitor a specific sector and coordinate with nearby positions.",
  },
  {
    time: 27,
    text: "It formed part of a wider defensive network, which included the Sant Gervasi battery, maritime patrols and surveillance by carabineros and militiamen, in order to keep a particularly exposed coastline under control.",
  },
  {
    time: 42,
    text: "Now I need your help. Use augmented reality to find the explosive devices and carefully deactivate them.",
  },
  {
    time: 50,
    text: "When you succeed, I will ask you a question and, if you answer correctly, you will win a unique collectible.",
  },
  {
    time: 58,
    text: "Good luck!",
  },
];

const subtitles8e = [
  {
    time: 0,
    text: "Welcome to the mouth of the Foix River, in Cubelles.",
  },
  {
    time: 3,
    text: "During the Spanish Civil War, coastal surveillance was mainly carried out by members of the Carabineros Corps. By mid-1937, Cubelles had a permanent force of four corporals and four carabineros, coordinated from the command headquarters based in Sitges.",
  },
  {
    time: 22,
    text: "Along this stretch of coastline, notable defences were built, such as the Mota de Sant Pere fort and this machine-gun nest.",
  },
  {
    time: 31,
    text: "It was made of reinforced concrete and, unlike others, it was not camouflaged. It had two machine guns, one to control each sector of the coast.",
  },
  {
    time: 42,
    text: "The entrance was located at the rear and led to a covered corridor.",
  },
  {
    time: 47,
    text: "At the end, on both sides, were the firing positions with lateral embrasures, designed for flanking fire, which was highly effective in the event of a landing attempt.",
  },
  {
    time: 58,
    text: "Now I need your help. Use augmented reality to find the explosive devices and carefully deactivate them.",
  },
  {
    time: 66,
    text: "When you succeed, I will ask you a question and, if you answer correctly, you will win a unique collectible.",
  },
  {
    time: 73,
    text: "Good luck!",
  },
];

const subtitles9e = [
  {
    time: 0,
    text: "Welcome to La Mota de Sant Pere, in Cubelles.",
  },
  {
    time: 3,
    text: "During the Spanish Civil War, a possible sea landing was feared, and for this reason a coastal defence system was organised along the Catalan coast.",
  },
  {
    time: 14,
    text: "Cubelles, within the Barcelona sector, built two key defensive structures along its shoreline.",
  },
  {
    time: 22,
    text: "This fort was built on top of a small hill, in a location that was easy to defend and close to the former Carabineros barracks.",
  },
  {
    time: 31,
    text: "It served as a support point and included an observation post, machine-gun nests, spaces for medical care and water wells.",
  },
  {
    time: 41,
    text: "The complex was completed by a covered trench that surrounded the hill, with loopholes designed to observe and defend in different directions.",
  },
  {
    time: 50,
    text: "Now I need your help. Use augmented reality to find the explosive devices and carefully deactivate them.",
  },
  {
    time: 59,
    text: "When you succeed, I will ask you a question and, if you answer correctly, you will win a unique collectible.",
  },
  {
    time: 66,
    text: "Good luck!",
  },
];

const subtitles10e = [
  {
    time: 0,
    text: "Welcome to Cunit.",
  },
  {
    time: 2,
    text: "In 1936, the Spanish Civil War began and the threat of a possible landing became very real. From Mallorca, which was under fascist control, aerial and naval attacks were launched against Catalonia.",
  },
  {
    time: 18,
    text: "To respond to this threat, the Generalitat promoted the fortification of the coastline. Between 1937 and 1938, a network of forts, bunkers and trenches was built to monitor the beaches.",
  },
  {
    time: 34,
    text: "In some locations, artillery was installed, while in others the positions were only activated when signs of danger appeared.",
  },
  {
    time: 43,
    text: "After the war ended, many of these defences were destroyed or reused.",
  },
  {
    time: 49,
    text: "Those that have been preserved help us today to understand the effort made to defend the coast.",
  },
  {
    time: 56,
    text: "Now I need your help. Use augmented reality to find the explosive devices and carefully deactivate them.",
  },
  {
    time: 65,
    text: "When you succeed, I will ask you a question and, if you answer correctly, you will win a unique collectible.",
  },
  {
    time: 74,
    text: "Good luck!",
  },
];

const subtitles11e = [
  {
    time: 0,
    text: "Welcome to the seafront promenade of Calafell.",
  },
  {
    time: 3,
    text: "During the Spanish Civil War, this stretch of coastline was prepared for the risk of a possible landing and, after the attacks of late 1936, defensive measures were organised along the entire Catalan coast.",
  },
  {
    time: 17,
    text: "Calafell was part of the Tarragona coastal defence sector, mainly monitored by the Carabineros Corps.",
  },
  {
    time: 25,
    text: "However, the greatest danger came from the air: in the summer of 1938, air raids took place and ships were sunk off the coast.",
  },
  {
    time: 34,
    text: "At the beginning of 1937, a coastal battery with already outdated cannons was installed in the area of what is now Bellamar, which over time was eventually abandoned.",
  },
  {
    time: 47,
    text: "Now I need your help. Use augmented reality to find the explosive devices and carefully deactivate them.",
  },
  {
    time: 55,
    text: "When you succeed, I will ask you a question and, if you answer correctly, you will win a unique collectible.",
  },
  {
    time: 63,
    text: "Good luck!",
  },
];

const subtitles12e = [
  {
    time: 0,
    text: "Welcome to Les Madrigueres, on Sant Salvador Beach.",
  },
  {
    time: 4,
    text: "This place was first a defensive position during the Spanish Civil War and later became the home of a family.",
  },
  {
    time: 12,
    text: "In 1937, the coastline of El Vendrell was fortified with trenches and machine-gun nests to prevent a possible landing.",
  },
  {
    time: 23,
    text: "Carabineros guarded the beaches, and an observation post warned of approaching aircraft that often bombed the Sant Vicenç de Calders area.",
  },
  {
    time: 34,
    text: "This bunker, built of concrete and with a rectangular layout, had its entrance at the rear and three loopholes to control the coastline.",
  },
  {
    time: 44,
    text: "After the war ended, some abandoned forts were converted into homes. The Casas Perín family lived here from 1949 onwards, and one of the children was even born here in 1950.",
  },
  {
    time: 61,
    text: "In 1953, after years of hardship, the family moved to a house closer to the beach.",
  },
  {
    time: 68,
    text: "Now I need your help. Use augmented reality to find the explosive devices and carefully deactivate them.",
  },
  {
    time: 78,
    text: "When you succeed, I will ask you a question and, if you answer correctly, you will win a unique collectible.",
  },
  {
    time: 86,
    text: "Good luck!",
  },
];

const subtitles13e = [
  {
    time: 0,
    text: "Welcome to El Francàs, a stretch of coastline that during the Spanish Civil War was prepared to face possible attacks and landings.",
  },
  {
    time: 10,
    text: "In mid-1937, trenches and machine-gun nests were built, guarded by the Carabineros Corps and reinforced by units that could intervene quickly in case of danger.",
  },
  {
    time: 23,
    text: "This defensive system was part of the continuous control of the coastline.",
  },
  {
    time: 28,
    text: "This bunker was part of that defensive line, designed to control access by sea.",
  },
  {
    time: 35,
    text: "At the same time, the coast remained on alert for possible air raids coming from Mallorca.",
  },
  {
    time: 41,
    text: "Now I need your help. Use augmented reality to find the explosive devices and carefully deactivate them.",
  },
  {
    time: 50,
    text: "When you succeed, I will ask you a question and, if you answer correctly, you will win a unique collectible.",
  },
  {
    time: 57,
    text: "Good luck!",
  },
];

const subtitles1f = [
  {
    time: 0,
    text: "Bienvenue sur le littoral du massif du Garraf.",
  },
  {
    time: 3,
    text: "Ici, la côte est composée de falaises et de chemins étroits, ce qui en fait un endroit idéal pour voir loin.",
  },
  {
    time: 11,
    text: "Il y a de nombreuses années, pendant la guerre civile espagnole, on craignait un débarquement des troupes fascistes contre le régime républicain.",
  },
  {
    time: 20,
    text: "C’est pourquoi des points de surveillance ont été mis en place le long du littoral catalan.",
  },
  {
    time: 26,
    text: "Entre Sitges et Vilanova i la Geltrú, le Garraf est devenu un espace stratégique: depuis les zones les plus élevées, il était possible de contrôler la côte, de détecter les mouvements en mer et d’alerter rapidement les autres unités de défense.",
  },
  {
    time: 42,
    text: "Il n’y avait pas ici de grandes fortifications comme ailleurs, mais le Garraf jouait un rôle très important: servir de point d’alerte avancé et contribuer à relier la surveillance des différents secteurs du littoral du Penedès.",
  },
  {
    time: 58,
    text: "Maintenant, j’ai besoin de votre aide.",
  },
  {
    time: 60,
    text: "Cherchez les engins explosifs en réalité augmentée et désactivez-les avec précaution.",
  },
  {
    time: 67,
    text: "Une fois la mission réussie, je vous poserai une question et, si vous répondez correctement, vous gagnerez un objet à collectionner unique.",
  },
  {
    time: 76,
    text: "Bonne chance!",
  },
];

const subtitles2f = [
  {
    time: 0,
    text: "Bienvenue à la plage de Balmins.",
  },
  {
    time: 2,
    text: "Ici se conserve un ancien nid de mitrailleuse, visible devant vous, construit pendant la guerre civile espagnole pour surveiller la côte face à un éventuel attaque maritime des troupes fascistes contre le régime républicain.",
  },
  {
    time: 16,
    text: "Ce bunker en béton, doté d’une seule ouverture frontale, servait à protéger les plages de Balmins et de Sant Sebastià.",
  },
  {
    time: 24,
    text: "Bien que de petite taille, il était très efficace: il permettait des tirs latéraux pour freiner un débarquement et était si bien camouflé qu’il était difficile à repérer depuis la mer comme depuis les airs.",
  },
  {
    time: 37,
    text: "À proximité, des canons de défense côtière ont également été installés pour protéger le village.",
  },
  {
    time: 43,
    text: "L’ensemble faisait partie du système défensif de Sitges.",
  },
  {
    time: 47,
    text: "Maintenant, j’ai besoin de votre aide.",
  },
  {
    time: 50,
    text: "Cherchez les engins explosifs en réalité augmentée et désactivez-les avec précaution.",
  },
  {
    time: 56,
    text: "Une fois la mission réussie, je vous poserai une question et, si vous répondez correctement, vous gagnerez un objet à collectionner unique.",
  },
  {
    time: 64,
    text: "Bonne chance!",
  },
];

const subtitles3f = [
  {
    time: 0,
    text: "Bienvenue au bâtiment Miramar, un point privilégié pour observer la côte.",
  },
  {
    time: 5,
    text: "Depuis ici, il est facile de comprendre pourquoi, pendant la guerre civile espagnole, Sitges a renforcé la surveillance maritime.",
  },
  {
    time: 14,
    text: "Après le coup d’État mené par les troupes fascistes le 18 juillet 1936, le pays s’est retrouvé divisé et la crainte d’un possible débarquement s’est installée sur la côte.",
  },
  {
    time: 27,
    text: "Lorsque le croiseur Canarias a bombardé Roses le 30 octobre 1936, l’alarme s’est propagée sur l’ensemble du littoral.",
  },
  {
    time: 37,
    text: "À Sitges, le Conseil municipal a organisé la défense et il a été décidé qu’environ cent miliciens assureraient la sécurité de la côte.",
  },
  {
    time: 47,
    text: "Sur le littoral de Sitges, des tranchées et des défenses avec des sacs de sable ont été construites, puis des nids de mitrailleuse ont été installés dans des points stratégiques comme Balmins ou Les Anquines.",
  },
  {
    time: 61,
    text: "Des canons de défense côtière ont également été placés entre le cimetière et Aiguadolç.",
  },
  {
    time: 67,
    text: "Bien que Sitges n’ait subi aucun débarquement, la menace est restée présente tout au long de la guerre.",
  },
  {
    time: 75,
    text: "Maintenant, j’ai besoin de votre aide.",
  },
  {
    time: 77,
    text: "Cherchez les engins explosifs en réalité augmentée et désactivez-les avec précaution.",
  },
  {
    time: 85,
    text: "Une fois la mission réussie, je vous poserai une question et, si vous répondez correctement, vous gagnerez un objet à collectionner unique.",
  },
  {
    time: 93,
    text: "Bonne chance!",
  },
];

const subtitles4f = [
  {
    time: 0,
    text: "Bienvenue à la plage de la Barra, un autre point clé dans la défense du littoral de Sitges pendant la guerre civile espagnole.",
  },
  {
    time: 7,
    text: "À cette époque, quatre nids de mitrailleuse ont été construits et répartis de manière stratégique: Balmins, le Baluard, la Barra et Les Anquines. Celui-ci permettait de surveiller et de protéger le tronçon de côte allant d’Aiguadolç jusqu’au-delà de Les Anquines.",
  },
  {
    time: 27,
    text: "Comme les autres fortifications de la commune, il servait également à appuyer les canons de défense côtière situés entre le cimetière et Aiguadolç, et à renforcer la surveillance face à un éventuel débarquement.",
  },
  {
    time: 41,
    text: "Maintenant, j’ai besoin de votre aide. Cherchez les engins explosifs en réalité augmentée et désactivez-les avec précaution.",
  },
  {
    time: 50,
    text: "Une fois la mission réussie, je vous poserai une question et, si vous répondez correctement, vous gagnerez un objet à collectionner unique.",
  },
  {
    time: 58,
    text: "Bonne chance!",
  },
];

const subtitles5f = [
  {
    time: 0,
    text: "Bienvenue à Punta Mabrera, à Vilanova i la Geltrú.",
  },
  {
    time: 5,
    text: "Pendant la guerre civile espagnole, les habitants de la ville ont construit plusieurs défenses entre janvier et avril 1937 afin de protéger le littoral face au risque d’un attaque par la mer, tandis que la vie quotidienne se poursuivait avec difficulté dans les maisons et les rues.",
  },
  {
    time: 25,
    text: "Ce bunker faisait partie d’un réseau de protection comprenant des tranchées, des nids de mitrailleuse et des points de surveillance.",
  },
  {
    time: 33,
    text: "À proximité se trouvait également une batterie d’obusiers sur la plage de Sant Gervasi, et des patrouilles maritimes utilisant des bateaux de pêche—comme le Maricel et la Joven Rosita—collaboraient pour contrôler le tronçon de côte entre Vallcarca et El Vendrell.",
  },
  {
    time: 53,
    text: "Bien que Vilanova n’ait subi aucun débarquement, ces défenses rappellent que la côte a vécu sous une sensation permanente de danger pendant une grande partie du conflit.",
  },
  {
    time: 65,
    text: "Maintenant, j’ai besoin de votre aide. Cherchez les engins explosifs en réalité augmentée et désactivez-les avec précaution.",
  },
  {
    time: 75,
    text: "Une fois la mission réussie, je vous poserai une question et, si vous répondez correctement, vous gagnerez un objet à collectionner unique.",
  },
  {
    time: 84,
    text: "Bonne chance!",
  },
];

const subtitles6f = [
  {
    time: 0,
    text: "Bienvenue au parc de Ribes Roges.",
  },
  {
    time: 3,
    text: "Pendant la guerre civile espagnole, la population du littoral vivait dans la crainte permanente d’un attaque par la mer. Le bombardement de Roses par le croiseur Canarias, en octobre 1936, a clairement montré qu’il était nécessaire de renforcer la défense du littoral.",
  },
  {
    time: 23,
    text: "À Vilanova i la Geltrú, entre janvier et avril 1937, des nids de mitrailleuse ont été construits pour surveiller les plages.",
  },
  {
    time: 33,
    text: "De nombreux habitants y ont participé directement, convoqués le dimanche ou comme volontaires, tandis que les femmes, les enfants et les personnes âgées assumaient les tâches quotidiennes.",
  },
  {
    time: 46,
    text: "La surveillance était assurée par les carabiniers, les miliciens puis, plus tard, par l’Armée républicaine. Une batterie d’obusiers a été installée à Sant Gervasi et deux bateaux de pêche patrouillaient la côte.",
  },
  {
    time: 60,
    text: "Malgré cela, aucun débarquement n’a eu lieu, mais la menace était réelle et Vilanova a subi un bombardement aérien en août 1938.",
  },
  {
    time: 71,
    text: "Maintenant, j’ai besoin de votre aide. Cherchez les engins explosifs en réalité augmentée et désactivez-les avec précaution.",
  },
  {
    time: 80,
    text: "Une fois la mission réussie, je vous poserai une question et, si vous répondez correctement, vous gagnerez un objet à collectionner unique.",
  },
  {
    time: 88,
    text: "Bonne chance!",
  },
];

const subtitles7f = [
  {
    time: 0,
    text: "Bienvenue à Primera Roca, un tronçon du littoral où, pendant la guerre civile espagnole, la surveillance maritime a été renforcée.",
  },
  {
    time: 10,
    text: "En 1937, des nids de mitrailleuse ont été construits le long de la côte de Vilanova i la Geltrú afin de prévenir d’éventuels débarquements.",
  },
  {
    time: 21,
    text: "Ce bunker suivait le même modèle que les autres: une structure conçue pour surveiller un secteur précis et se coordonner avec les positions voisines.",
  },
  {
    time: 31,
    text: "Il faisait partie d’un réseau défensif plus large, comprenant la batterie de Sant Gervasi, des patrouilles maritimes et la surveillance assurée par des carabiniers et des miliciens, afin de maintenir sous contrôle un littoral particulièrement exposé.",
  },
  {
    time: 47,
    text: "Maintenant, j’ai besoin de votre aide. Cherchez les engins explosifs en réalité augmentée et désactivez-les avec précaution.",
  },
  {
    time: 56,
    text: "Une fois la mission réussie, je vous poserai une question et, si vous répondez correctement, vous gagnerez un objet à collectionner unique.",
  },
  {
    time: 65,
    text: "Bonne chance!",
  },
];

const subtitles8f = [
  {
    time: 0,
    text: "Bienvenue à l’embouchure du fleuve Foix, à Cubelles.",
  },
  {
    time: 4,
    text: "Pendant la guerre civile espagnole, la surveillance de la côte était assurée principalement par des membres du Corps des carabiniers. À la mi-1937, Cubelles disposait d’un effectif fixe de quatre caporaux et de quatre carabiniers, coordonnés depuis la commandance basée à Sitges.",
  },
  {
    time: 25,
    text: "Sur ce littoral, des défenses particulièrement remarquables ont été construites, comme le fortin de la Mota de Sant Pere et ce nid de mitrailleuses.",
  },
  {
    time: 35,
    text: "Il était en béton armé et, contrairement à d’autres, n’était pas camouflé. Il disposait de deux mitrailleuses, une pour contrôler chaque secteur de la côte.",
  },
  {
    time: 46,
    text: "L’entrée se trouvait à l’arrière et menait à un couloir couvert.",
  },
  {
    time: 51,
    text: "Au bout, de chaque côté, se situaient les positions de tir avec des embrasures latérales, conçues pour effectuer des tirs de flanquement, très efficaces en cas de tentative de débarquement.",
  },
  {
    time: 63,
    text: "Maintenant, j’ai besoin de votre aide. Cherchez les engins explosifs en réalité augmentée et désactivez-les avec précaution.",
  },
  {
    time: 73,
    text: "Une fois la mission réussie, je vous poserai une question et, si vous répondez correctement, vous gagnerez un objet à collectionner unique.",
  },
  {
    time: 82,
    text: "Bonne chance!",
  },
];

const subtitles9f = [
  {
    time: 0,
    text: "Bienvenue à la Mota de Sant Pere, à Cubelles.",
  },
  {
    time: 3,
    text: "Pendant la guerre civile espagnole, on craignait un possible débarquement par la mer, ce qui a conduit à l’organisation d’un système de défense de la côte catalane.",
  },
  {
    time: 13,
    text: "Cubelles, intégrée au secteur de Barcelone, a construit deux défenses clés sur son littoral.",
  },
  {
    time: 20,
    text: "Ce fortin a été construit au sommet d’une petite colline, dans un endroit facile à défendre et proche de l’ancienne caserne des carabiniers.",
  },
  {
    time: 29,
    text: "Il servait de point d’appui et disposait d’un observatoire, de nids de mitrailleuse, d’espaces pour les soins sanitaires et de puits d’eau.",
  },
  {
    time: 39,
    text: "L’ensemble était complété par une tranchée couverte entourant la colline, dotée d’embrasures permettant de surveiller et de se défendre dans différentes directions.",
  },
  {
    time: 49,
    text: "Maintenant, j’ai besoin de votre aide. Cherchez les engins explosifs en réalité augmentée et désactivez-les avec précaution.",
  },
  {
    time: 58,
    text: "Une fois la mission réussie, je vous poserai une question et, si vous répondez correctement, vous gagnerez un objet à collectionner unique.",
  },
  {
    time: 66,
    text: "Bonne chance!",
  },
];

const subtitles10f = [
  {
    time: 0,
    text: "Bienvenue à Cunit.",
  },
  {
    time: 1,
    text: "En 1936, la guerre civile espagnole a commencé et la menace d’un possible débarquement est devenue bien réelle. Depuis Majorque, alors aux mains des fascistes, des attaques aériennes et maritimes ont été menées contre la Catalogne.",
  },
  {
    time: 18,
    text: "Pour faire face à cette menace, la Generalitat a encouragé la fortification du littoral. Entre 1937 et 1938, un réseau de fortins, de bunkers et de tranchées a été construit pour surveiller les plages.",
  },
  {
    time: 35,
    text: "Dans certains secteurs, de l’artillerie a été installée, tandis que dans d’autres, les positions n’étaient activées qu’en cas de signes de danger.",
  },
  {
    time: 44,
    text: "Après la fin de la guerre, nombre de ces défenses ont été détruites ou réutilisées.",
  },
  {
    time: 50,
    text: "Celles qui sont encore conservées nous aident aujourd’hui à comprendre l’effort réalisé pour défendre la côte.",
  },
  {
    time: 58,
    text: "Maintenant, j’ai besoin de votre aide. Cherchez les engins explosifs en réalité augmentée et désactivez-les avec précaution.",
  },
  {
    time: 67,
    text: "Une fois la mission réussie, je vous poserai une question et, si vous répondez correctement, vous gagnerez un objet à collectionner unique.",
  },
  {
    time: 75,
    text: "Bonne chance!",
  },
];

const subtitles11f = [
  {
    time: 0,
    text: "Bienvenue sur la promenade maritime de Calafell.",
  },
  {
    time: 3,
    text: "Pendant la guerre civile espagnole, ce littoral a été préparé face au risque d’un possible débarquement et, après les attaques de la fin de 1936, des défenses ont été organisées sur l’ensemble de la côte catalane.",
  },
  {
    time: 18,
    text: "Calafell faisait partie du secteur tarragonais de la défense des côtes, principalement surveillé par le Corps des carabiniers.",
  },
  {
    time: 27,
    text: "Cependant, le danger le plus important est venu du ciel: durant l’été 1938, des bombardements ont eu lieu et des navires ont été coulés au large de la côte.",
  },
  {
    time: 39,
    text: "Au début de 1937, une batterie côtière équipée de canons déjà anciens a été installée dans la zone de l’actuel Bellamar, mais elle a fini par être abandonnée avec le temps.",
  },
  {
    time: 52,
    text: "Maintenant, j’ai besoin de votre aide. Cherchez les engins explosifs en réalité augmentée et désactivez-les avec précaution.",
  },
  {
    time: 61,
    text: "Une fois la mission réussie, je vous poserai une question et, si vous répondez correctement, vous gagnerez un objet à collectionner unique.",
  },
  {
    time: 69,
    text: "Bonne chance!",
  },
];

const subtitles12f = [
  {
    time: 0,
    text: "Bienvenue aux Madrigueres, sur la plage de Sant Salvador.",
  },
  {
    time: 4,
    text: "Cet endroit a d’abord été un point de défense pendant la guerre civile espagnole, avant de devenir le refuge d’une famille.",
  },
  {
    time: 12,
    text: "En 1937, la côte d’El Vendrell a été fortifiée avec des tranchées et des nids de mitrailleuse afin de prévenir un éventuel débarquement.",
  },
  {
    time: 23,
    text: "Les carabiniers surveillaient les plages et un poste d’observation signalait l’arrivée des avions qui bombardaient souvent la zone de Sant Vicenç de Calders.",
  },
  {
    time: 33,
    text: "Ce bunker, en béton et de plan rectangulaire, possédait une entrée à l’arrière et trois embrasures permettant de contrôler le littoral.",
  },
  {
    time: 42,
    text: "Après la fin de la guerre, certains fortins abandonnés ont été transformés en habitations. La famille Casas Perín y a vécu à partir de 1949, et l’un des enfants y est même né en 1950.",
  },
  {
    time: 58,
    text: "En 1953, après des années difficiles, la famille a déménagé dans une maison plus proche de la plage.",
  },
  {
    time: 66,
    text: "Maintenant, j’ai besoin de votre aide. Cherchez les engins explosifs en réalité augmentée et désactivez-les avec précaution.",
  },
  {
    time: 75,
    text: "Une fois la mission réussie, je vous poserai une question et, si vous répondez correctement, vous gagnerez un objet à collectionner unique.",
  },
  {
    time: 85,
    text: "Bonne chance!",
  },
];

const subtitles13f = [
  {
    time: 0,
    text: "Bienvenue au Francàs, un point du littoral qui, pendant la guerre civile espagnole, a été préparé pour faire face à d’éventuelles attaques et débarquements.",
  },
  {
    time: 10,
    text: "À la mi-1937, des tranchées et des nids de mitrailleuse ont été construits, surveillés par le Corps des carabiniers et renforcés par des unités capables d’intervenir rapidement en cas de danger.",
  },
  {
    time: 24,
    text: "Ce système défensif faisait partie du contrôle continu du littoral.",
  },
  {
    time: 29,
    text: "Ce bunker faisait partie de cette ligne défensive, conçue pour contrôler l’accès par la mer.",
  },
  {
    time: 36,
    text: "Parallèlement, la côte restait en alerte face à d’éventuelles attaques aériennes en provenance de Majorque.",
  },
  {
    time: 43,
    text: "Maintenant, j’ai besoin de votre aide. Cherchez les engins explosifs en réalité augmentée et désactivez-les avec précaution.",
  },
  {
    time: 53,
    text: "Une fois la mission réussie, je vous poserai une question et, si vous répondez correctement, vous gagnerez un objet à collectionner unique.",
  },
  {
    time: 61,
    text: "Bonne chance!",
  },
];

const subtitles1s = [
  { time: 0, text: "Bienvenidos y bienvenidas al mar del macizo del Garraf." },
  {
    time: 4,
    text: "Aquí, la costa está llena de acantilados y caminos estrechos, lo que lo convierte en un lugar perfecto para ver a gran distancia.",
  },
  {
    time: 13,
    text: "Hace muchos años, durante la Guerra Civil, se temía que pudiera producirse un desembarco de las tropas fascistas contra el régimen republicano.",
  },
  {
    time: 23,
    text: "Por este motivo, a lo largo del litoral catalán se organizaron puntos de vigilancia.",
  },
  {
    time: 29,
    text: "Entre Sitges y Vilanova i la Geltrú, el Garraf se convirtió en un espacio estratégico: desde las zonas más altas se podía controlar la costa, detectar movimientos en el mar y avisar rápidamente a las demás unidades de defensa.",
  },
  {
    time: 45,
    text: "Aquí no había grandes fortificaciones como en otros puntos, pero el Garraf tenía una función muy importante: actuar como punto de alerta avanzada y ayudar a conectar la vigilancia de los distintos sectores del litoral del Penedès.",
  },
  { time: 60, text: "¡Ahora tenéis que ayudarme!" },
  {
    time: 62,
    text: "Buscad los artefactos explosivos con la realidad aumentada y desactivadlos con cuidado.",
  },
  {
    time: 68,
    text: "Cuando lo consigáis, os haré una pregunta y, si acertáis, ganaréis un coleccionable único.",
  },
  { time: 75, text: "¡Mucha suerte!" },
];

const subtitles2s = [
  { time: 0, text: "Bienvenidos y bienvenidas a la Playa de Balmins." },
  {
    time: 3,
    text: "Aquí se conserva un antiguo nido de ametralladora, que podéis ver frente a vosotros, construido durante la Guerra Civil para vigilar la costa ante un posible ataque por mar de las tropas fascistas contra el régimen republicano.",
  },
  {
    time: 19,
    text: "Este búnker de hormigón, con una sola abertura frontal, servía para proteger las playas de Balmins y Sant Sebastià.",
  },
  {
    time: 28,
    text: "A pesar de su pequeño tamaño, era muy eficaz: permitía disparar de forma lateral para frenar un desembarco y estaba tan bien camuflado que resultaba difícil de distinguir tanto desde el mar como desde el aire.",
  },
  {
    time: 42,
    text: "Cerca de aquí también se instalaron cañones de defensa costera para proteger el pueblo.",
  },
  {
    time: 48,
    text: "Todo ello formaba parte del sistema defensivo de Sitges.",
  },
  { time: 52, text: "¡Ahora tenéis que ayudarme!" },
  {
    time: 54,
    text: "Buscad los artefactos explosivos con la realidad aumentada y desactivadlos con cuidado.",
  },
  {
    time: 61,
    text: "Cuando lo consigáis, os haré una pregunta y, si acertáis, ganaréis un coleccionable único.",
  },
  { time: 62, text: "¡Mucha suerte!" },
];

const subtitles3s = [
  {
    time: 0,
    text: "Bienvenidos y bienvenidas al edificio Miramar, un punto privilegiado para observar la costa.",
  },
  {
    time: 7,
    text: "Desde aquí es fácil entender por qué, durante la Guerra Civil, Sitges reforzó la vigilancia del mar.",
  },
  {
    time: 14,
    text: "Tras el golpe de Estado llevado a cabo por las tropas fascistas el 18 de julio de 1936, el país quedó dividido y en la costa existía el temor a un posible desembarco.",
  },
  {
    time: 28,
    text: "Cuando el crucero Canarias bombardeó Roses el 30 de octubre de 1936, la alarma se extendió por todo el litoral.",
  },
  {
    time: 39,
    text: "En Sitges, el Consejo Municipal organizó la defensa y se acordó que unos cien milicianos velarían por la seguridad de la costa.",
  },
  {
    time: 49,
    text: "En el litoral de Sitges se construyeron trincheras y defensas con sacos de arena, y posteriormente se levantaron nidos de ametralladora en puntos clave como Balmins o Les Anquines.",
  },
  {
    time: 63,
    text: "También se instalaron cañones de defensa costera entre el cementerio y Aiguadolç.",
  },
  {
    time: 69,
    text: "Aunque Sitges no sufrió ningún desembarco, la amenaza estuvo presente durante toda la guerra.",
  },
  { time: 76, text: "¡Ahora tenéis que ayudarme!" },
  {
    time: 78,
    text: "Buscad los artefactos explosivos con la realidad aumentada y desactivadlos con cuidado.",
  },
  {
    time: 85,
    text: "Cuando lo consigáis, os haré una pregunta y, si acertáis, ganaréis un coleccionable único.",
  },
  { time: 91, text: "¡Mucha suerte!" },
];

const subtitles4s = [
  {
    time: 0,
    text: "Bienvenidos y bienvenidas a la playa de la Barra, otro punto clave dentro de la defensa de la costa de Sitges durante la Guerra Civil.",
  },
  {
    time: 8,
    text: "En aquella época se construyeron cuatro nidos de ametralladora distribuidos estratégicamente: Balmins, el Baluard, la Barra y Les Anquines. El que se encuentra aquí ayudaba a vigilar y proteger el tramo de costa desde Aiguadolç hasta más allá de Les Anquines.",
  },
  {
    time: 27,
    text: "Al igual que el resto de fortificaciones del municipio, también servía para apoyar a los cañones situados entre el cementerio y Aiguadolç, y para reforzar la vigilancia ante un posible desembarco.",
  },
  {
    time: 41,
    text: "¡Ahora tenéis que ayudarme! Buscad los artefactos explosivos con la realidad aumentada y desactivadlos con cuidado.",
  },
  {
    time: 49,
    text: "Cuando lo consigáis, os haré una pregunta y, si acertáis, ganaréis un coleccionable único.",
  },
  { time: 56, text: "¡Mucha suerte!" },
];

const subtitles5s = [
  {
    time: 0,
    text: "Bienvenidos y bienvenidas a Punta Mabrera, en Vilanova i la Geltrú.",
  },
  {
    time: 5,
    text: "Durante la Guerra Civil, los vecinos y vecinas de la ciudad construyeron diversas defensas entre enero y abril de 1937 para proteger el litoral ante el riesgo de un ataque por mar, mientras la vida cotidiana continuaba con dificultades en las casas y en las calles.",
  },
  {
    time: 25,
    text: "Este búnker formaba parte de una red de protección compuesta por trincheras, nidos de ametralladora y puntos de vigilancia.",
  },
  {
    time: 34,
    text: "Cerca de aquí también había una batería de obuses en la playa de Sant Gervasi, e incluso colaboraban patrullas marítimas con barcas de pesca, como el Maricel y la Joven Rosita, para controlar el tramo de costa entre Vallcarca y El Vendrell.",
  },
  {
    time: 50,
    text: "Aunque Vilanova no sufrió ningún desembarco, estas defensas recuerdan que la costa vivió con una constante sensación de peligro durante buena parte del conflicto.",
  },
  {
    time: 61,
    text: "¡Ahora tenéis que ayudarme! Buscad los artefactos explosivos con la realidad aumentada y desactivadlos con cuidado.",
  },
  {
    time: 70,
    text: "Cuando lo consigáis, os haré una pregunta y, si acertáis, ganaréis un coleccionable único.",
  },
  { time: 77, text: "¡Mucha suerte!" },
];

const subtitles6s = [
  { time: 0, text: "Bienvenidos y bienvenidas al parque de Ribes Roges." },
  {
    time: 5,
    text: "Durante la Guerra Civil, la población de la costa vivía con el miedo constante a un ataque por mar. El bombardeo de Roses por el crucero Canarias, en octubre de 1936, dejó claro que era necesario reforzar la defensa del litoral.",
  },
  {
    time: 24,
    text: "En Vilanova i la Geltrú, entre enero y abril de 1937, se construyeron nidos de ametralladora para vigilar las playas.",
  },
  {
    time: 34,
    text: "Muchos vecinos participaron directamente, convocados los domingos o como voluntarios, mientras mujeres, niños y personas mayores asumían las tareas cotidianas.",
  },
  {
    time: 47,
    text: "La vigilancia estaba a cargo de carabineros, milicianos y, más adelante, del Ejército Republicano. En Sant Gervasi se instaló una batería de obuses y dos barcos pesqueros patrullaban la costa.",
  },
  {
    time: 63,
    text: "A pesar de ello, no se produjo ningún desembarco, aunque la amenaza fue real y Vilanova sufrió un bombardeo aéreo en agosto de 1938.",
  },
  {
    time: 76,
    text: "¡Ahora tenéis que ayudarme! Buscad los artefactos explosivos con la realidad aumentada y desactivadlos con cuidado.",
  },
  {
    time: 84,
    text: "Cuando lo consigáis, os haré una pregunta y, si acertáis, ganaréis un coleccionable único.",
  },
  { time: 90, text: "¡Mucha suerte!" },
];

const subtitles7s = [
  {
    time: 0,
    text: "Bienvenidos y bienvenidas a Primera Roca, un tramo del litoral donde, durante la Guerra Civil, se reforzó la vigilancia del mar.",
  },
  {
    time: 10,
    text: "En 1937, en Vilanova i la Geltrú se construyeron nidos de ametralladora a lo largo de la costa para prevenir posibles desembarcos.",
  },
  {
    time: 21,
    text: "Este búnker seguía el mismo modelo que los demás: una estructura pensada para vigilar un sector concreto y coordinarse con las posiciones cercanas.",
  },
  {
    time: 32,
    text: "Formaba parte de una red defensiva más amplia, que incluía la batería de Sant Gervasi, las patrullas marítimas y la vigilancia de carabineros y milicianos, con el objetivo de mantener bajo control un litoral especialmente expuesto.",
  },
  {
    time: 48,
    text: "¡Ahora tenéis que ayudarme! Buscad los artefactos explosivos con la realidad aumentada y desactivadlos con cuidado.",
  },
  {
    time: 57,
    text: "Cuando lo consigáis, os haré una pregunta y, si acertáis, ganaréis un coleccionable único.",
  },
  { time: 64, text: "¡Mucha suerte!" },
];

const subtitles8s = [
  {
    time: 0,
    text: "Bienvenidos y bienvenidas a la desembocadura del río Foix, en Cubelles.",
  },
  {
    time: 6,
    text: "Durante la Guerra Civil, la vigilancia de la costa estuvo a cargo principalmente de efectivos del Cuerpo de Carabineros. A mediados de 1937, Cubelles contaba con una dotación fija de cuatro cabos y cuatro carabineros, coordinados desde la comandancia con sede en Sitges.",
  },
  {
    time: 27,
    text: "En este litoral se construyeron defensas muy destacadas, como el fortín de la Mota de Sant Pere y este nido de ametralladoras.",
  },
  {
    time: 35,
    text: "Estaba hecho de hormigón armado y, a diferencia de otros, no estaba camuflado. Contaba con dos ametralladoras, una para controlar cada sector de la costa.",
  },
  {
    time: 47,
    text: "La entrada se encontraba en la parte posterior y conducía a un pasillo cubierto.",
  },
  {
    time: 53,
    text: "Al final, a ambos lados, se situaban las posiciones de tiro con troneras laterales, pensadas para realizar fuego de flanqueo, muy eficaz en caso de un intento de desembarco.",
  },
  {
    time: 65,
    text: "¡Ahora tenéis que ayudarme! Buscad los artefactos explosivos con la realidad aumentada y desactivadlos con cuidado.",
  },
  {
    time: 73,
    text: "Cuando lo consigáis, os haré una pregunta y, si acertáis, ganaréis un coleccionable único.",
  },
  { time: 80, text: "¡Mucha suerte!" },
];

const subtitles9s = [
  {
    time: 0,
    text: "Bienvenidos y bienvenidas a la Mota de Sant Pere, en Cubelles.",
  },
  {
    time: 5,
    text: "Durante la Guerra Civil se temía un posible desembarco por mar, por lo que se organizó un sistema de defensa de la costa catalana.",
  },
  {
    time: 13,
    text: "Cubelles, dentro del sector de Barcelona, levantó dos defensas clave en su litoral.",
  },
  {
    time: 20,
    text: "Este fortín se construyó en lo alto de una pequeña colina, en un punto fácil de defender y cercano al antiguo cuartel de los carabineros.",
  },
  {
    time: 29,
    text: "Funcionaba como punto de apoyo y contaba con un observatorio, nidos de ametralladora, espacios para curas sanitarias y pozos de agua.",
  },
  {
    time: 39,
    text: "El conjunto se completaba con una trinchera cubierta que rodeaba la colina, con aspilleras para vigilar y defenderse en diferentes direcciones.",
  },
  {
    time: 48,
    text: "¡Ahora tenéis que ayudarme! Buscad los artefactos explosivos con la realidad aumentada y desactivadlos con cuidado.",
  },
  {
    time: 56,
    text: "Cuando lo consigáis, os haré una pregunta y, si acertáis, ganaréis un coleccionable único.",
  },
  { time: 63, text: "¡Mucha suerte!" },
];

const subtitles10s = [
  { time: 0, text: "Bienvenidos y bienvenidas a Cunit." },
  {
    time: 3,
    text: "En 1936 comenzó la Guerra Civil y el peligro de un posible desembarco se hizo muy real. Desde Mallorca, que estaba en manos de los fascistas, se produjeron ataques aéreos y marítimos contra Cataluña.",
  },
  {
    time: 19,
    text: "Para hacer frente a esta amenaza, la Generalitat impulsó la fortificación del litoral. Entre 1937 y 1938 se construyó una red de fortines, búnkeres y trincheras para vigilar las playas.",
  },
  {
    time: 36,
    text: "En algunos puntos se instaló artillería y, en otros, las posiciones solo se activaban cuando había señales de amenaza.",
  },
  {
    time: 45,
    text: "Una vez terminada la guerra, muchas de estas defensas fueron destruidas o reaprovechadas.",
  },
  {
    time: 52,
    text: "Las que todavía se conservan nos ayudan hoy a entender el esfuerzo que se realizó para defender la costa.",
  },
  {
    time: 59,
    text: "¡Ahora tenéis que ayudarme! Buscad los artefactos explosivos con la realidad aumentada y desactivadlos con cuidado.",
  },
  {
    time: 68,
    text: "Cuando lo consigáis, os haré una pregunta y, si acertáis, ganaréis un coleccionable único.",
  },
  { time: 76, text: "¡Mucha suerte!" },
];

const subtitles11s = [
  { time: 0, text: "Bienvenidos y bienvenidas al paseo marítimo de Calafell." },
  {
    time: 4,
    text: "Durante la Guerra Civil, este litoral se preparó ante el riesgo de un posible desembarco y, tras los ataques de finales de 1936, se organizaron defensas a lo largo de toda la costa catalana.",
  },
  {
    time: 18,
    text: "Calafell formaba parte del sector tarraconense de defensa de costas, vigilado principalmente por el Cuerpo de Carabineros.",
  },
  {
    time: 27,
    text: "Sin embargo, el mayor peligro llegó por el aire: en el verano de 1938 se produjeron bombardeos y se hundieron barcos frente a la costa.",
  },
  {
    time: 39,
    text: "A principios de 1937 se instaló una batería de costa con cañones ya antiguos, situada en la zona de la actual Bellamar, que con el paso del tiempo acabó siendo abandonada.",
  },
  {
    time: 52,
    text: "¡Ahora tenéis que ayudarme! Buscad los artefactos explosivos con la realidad aumentada y desactivadlos con cuidado.",
  },
  {
    time: 61,
    text: "Cuando lo consigáis, os haré una pregunta y, si acertáis, ganaréis un coleccionable único.",
  },
  { time: 68, text: "¡Mucha suerte!" },
];

const subtitles12s = [
  {
    time: 0,
    text: "Bienvenidos y bienvenidas a Les Madrigueres, en la playa de Sant Salvador.",
  },
  {
    time: 5,
    text: "Este espacio fue primero un punto de defensa durante la Guerra Civil y, más tarde, el refugio de una familia.",
  },
  {
    time: 14,
    text: "En 1937, la costa de El Vendrell se fortificó con trincheras y nidos de ametralladora para prevenir un posible desembarco.",
  },
  {
    time: 25,
    text: "Los carabineros vigilaban las playas y un punto de observación alertaba de la llegada de aviones que a menudo bombardeaban la zona de Sant Vicenç de Calders.",
  },
  {
    time: 36,
    text: "Este búnker, de hormigón y planta rectangular, tenía la entrada en la parte posterior y tres aspilleras para controlar el litoral.",
  },
  {
    time: 46,
    text: "Tras el final de la guerra, algunos fortines abandonados se transformaron en viviendas. Aquí vivió la familia Casas Perín a partir de 1949, y uno de los hijos incluso nació en este lugar en 1950.",
  },
  {
    time: 64,
    text: "En 1953, después de años difíciles, la familia se trasladó a una casa cercana a la playa.",
  },
  {
    time: 72,
    text: "¡Ahora tenéis que ayudarme! Buscad los artefactos explosivos con la realidad aumentada y desactivadlos con cuidado.",
  },
  {
    time: 81,
    text: "Cuando lo consigáis, os haré una pregunta y, si acertáis, ganaréis un coleccionable único.",
  },
  { time: 88, text: "¡Mucha suerte!" },
];

const subtitles13s = [
  {
    time: 0,
    text: "Bienvenidos y bienvenidas a El Francàs, un punto de la costa que durante la Guerra Civil se preparó para hacer frente a posibles ataques y desembarcos.",
  },
  {
    time: 11,
    text: "A mediados de 1937 se construyeron trincheras y nidos de ametralladora, vigilados por el Cuerpo de Carabineros y reforzados por unidades que podían intervenir rápidamente en caso de peligro.",
  },
  {
    time: 26,
    text: "Este sistema defensivo formaba parte del control continuo del litoral.",
  },
  {
    time: 31,
    text: "Este búnker formaba parte de esa línea defensiva, concebida para controlar el acceso por mar.",
  },
  {
    time: 38,
    text: "Al mismo tiempo, la costa permanecía en alerta ante posibles ataques aéreos procedentes de Mallorca.",
  },
  {
    time: 46,
    text: "¡Ahora tenéis que ayudarme! Buscad los artefactos explosivos con la realidad aumentada y desactivadlos con cuidado.",
  },
  {
    time: 52,
    text: "Cuando lo consigáis, os haré una pregunta y, si acertáis, ganaréis un coleccionable único.",
  },
  { time: 69, text: "¡Mucha suerte!" },
];

const Marker = React.forwardRef((_, ref: any) => (
  <AEntity ref={ref} position="0 -0.9 -2">
    <ARing
      radius-inner="0.3"
      radius-outer="0.4"
      color="#4F46E5"
      opacity="0.8"
      rotation="-90 0 0"
      material="shader: flat; metalness: 0; roughness: 1;"
    />
    <ACircle
      radius="0.3"
      color="#10B981"
      opacity="0.5"
      rotation="-90 0 0"
      material="shader: flat; metalness: 0; roughness: 1;"
    />
    {/* <ACircle radius="0.3" color="#10B981" opacity="0.5" rotation="-90 0 0" /> */}
  </AEntity>
));
Marker.displayName = "Marker";

interface AvatarProps {
  position: { x: number; y: number; z: number };
  isPlaying: boolean;
  userRotationY?: number;
  userScale?: number;
}

const Avatar = React.forwardRef((props: AvatarProps, forwardedRef: any) => {
  const localRef = useRef<any>(null);
  const avatarRef = forwardedRef || localRef;
  const { position, isPlaying, userRotationY = 0, userScale = 1.2 } = props;

  useEffect(() => {
    if (avatarRef.current) {
      const entity = avatarRef.current;
      const mesh = entity.getObject3D("mesh");

      const setupMaterials = (m: any) => {
        m.traverse((obj: any) => {
          obj.frustumCulled = false;

          if (obj.isMesh && obj.material) {
            const materials = Array.isArray(obj.material)
              ? obj.material
              : [obj.material];
            materials.forEach((mat: any) => {
              if (mat) {
                if (mat.isMeshBasicMaterial) {
                  const THREE = (window as any).THREE;
                  if (THREE) {
                    const newMat = new THREE.MeshStandardMaterial();
                    newMat.map = mat.map;
                    newMat.color = mat.color;
                    obj.material = newMat;
                  }
                }
                if (mat.isMeshStandardMaterial || mat.isMeshPhysicalMaterial) {
                  mat.envMapIntensity = 2.0;
                  mat.needsUpdate = true;
                }
              }
            });
          }
        });
      };

      if (mesh) {
        setupMaterials(mesh);
      } else {
        entity.addEventListener("model-loaded", (evt: any) => {
          setupMaterials(evt.detail.model);
        });
      }
    }
  }, [avatarRef]);

  return (
    <AEntity
      ref={avatarRef}
      position={`${position.x} ${position.y} ${position.z}`}
      rotation={`-10 ${userRotationY} 0`}
      scale={`${userScale} ${userScale} ${userScale}`}
    >
      <AEntity
        gltf-model="url(/models/MUSSOL_ANIMACION.glb)"
        animation-mixer={
          isPlaying
            ? "clip: *; loop: repeat; timeScale: 1"
            : "clip: *; loop: repeat; timeScale: 0"
        }
      />
    </AEntity>
  );
});
Avatar.displayName = "Avatar";

const Page = ({
  setShowARView,
  handleClose,
  audioUrl,
  linkLoad,
  from,
}: any) => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const t = useTranslations("gameText");
  const t2 = useTranslations("Caminslogin");

  const [avatarPos, setAvatarPos] = useState<{
    x: number;
    y: number;
    z: number;
  } | null>(null);
  const [isPlayingState, setIsPlayingState] = useState(false);
  const [showAudioPopup, setShowAudioPopup] = useState(false);
  const [deviceOrientation, setDeviceOrientation] = useState({
    alpha: 0,
    beta: 0,
    gamma: 0,
  });
  const [userRotationY, setUserRotationY] = useState(0);
  const [userScale, setUserScale] = useState(1.2);
  // Show subtitles by default
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [activeSubtitle, setActiveSubtitle] = useState<{ text: string } | null>(
    null,
  );
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);
  const subtitleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const subtitleTimeouts = useRef<NodeJS.Timeout[]>([]);
  const [showSubtitleButton, setShowSubtitleButton] = useState(false);
  const [showMovementInstructions, setShowMovementInstructions] =
    useState(false);

  const isPlayingRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const markerRef = useRef<any>(null);
  const avatarRef = useRef<any>(null);
  const gestureState = useRef<any>({});
  const orientationHandlerRef = useRef<any>(null);
  const dracoInitializedRef = useRef(false);

  useEffect(() => {
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        stream.getTracks().forEach((track) => track.stop());
        setPermissionGranted(true);

        if (
          typeof DeviceOrientationEvent !== "undefined" &&
          // @ts-ignore
          typeof DeviceOrientationEvent.requestPermission === "function"
        ) {
          try {
            // @ts-ignore
            const permission = await DeviceOrientationEvent.requestPermission();
            if (permission === "granted") startOrientationTracking();
          } catch {
            /* ignore */
          }
        } else {
          startOrientationTracking();
        }
      } catch {
        setPermissionGranted(false);
      }
    })();

    return () => {
      if (orientationHandlerRef.current)
        window.removeEventListener(
          "deviceorientation",
          orientationHandlerRef.current,
        );
    };
  }, []);

  const startOrientationTracking = () => {
    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      setDeviceOrientation({
        alpha: event.alpha || 0,
        beta: event.beta || 0,
        gamma: event.gamma || 0,
      });
    };
    orientationHandlerRef.current = handleDeviceOrientation;
    window.addEventListener("deviceorientation", handleDeviceOrientation);
  };

  const isIOS = () =>
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !(window as any).MSStream;

  const updateSubtitle = (currentTime: number, subtitles: any[]) => {
    if (!subtitles || subtitles.length === 0) return;

    // Find the current subtitle based on time
    let newIndex = 0;
    for (let i = 0; i < subtitles.length; i++) {
      if (currentTime >= subtitles[i].time) {
        newIndex = i;
      } else {
        break;
      }
    }

    // Ensure the first subtitle is shown if currentTime is very small
    if (currentTime < subtitles[0].time) {
      newIndex = 0;
    }

    if (currentSubtitleIndex !== newIndex) {
      setCurrentSubtitleIndex(newIndex);
      setActiveSubtitle(subtitles[newIndex]);
      setShowSubtitleButton(true);
    }
  };

  const toggleSubtitles = () => {
    const newShowSubtitles = !showSubtitles;
    setShowSubtitles(newShowSubtitles);

    if (newShowSubtitles && audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      setActiveSubtitle(null);
      subtitleTimeoutRef.current && clearTimeout(subtitleTimeoutRef.current);

      const currentSubtitleIndex = getCurrentSubtitles().findIndex(
        (item, index) =>
          currentTime >= item.time &&
          (index === getCurrentSubtitles().length - 1 ||
            currentTime < getCurrentSubtitles()[index + 1].time),
      );

      if (currentSubtitleIndex !== -1) {
        setActiveSubtitle(getCurrentSubtitles()[currentSubtitleIndex]);
      }

      getCurrentSubtitles().forEach((item) => {
        if (item.time > currentTime) {
          const timeout = setTimeout(
            () => {
              setActiveSubtitle(item);
            },
            (item.time - currentTime) * 1000,
          );
          subtitleTimeouts.current.push(timeout);
        }
      });
    } else {
      setActiveSubtitle(null);
      subtitleTimeoutRef.current && clearTimeout(subtitleTimeoutRef.current);
    }
  };

  const locale = useLocale();

  const getCurrentSubtitles = () => {
    // Define a mapping from locale to the appropriate subtitles
    const localeMap = {
      ca: [
        subtitles1c,
        subtitles2c,
        subtitles3c,
        subtitles4c,
        subtitles5c,
        subtitles6c,
        subtitles7c,
        subtitles8c,
        subtitles9c,
        subtitles10c,
        subtitles11c,
        subtitles12c,
        subtitles13c,
      ],
      es: [
        subtitles1s,
        subtitles2s,
        subtitles3s,
        subtitles4s,
        subtitles5s,
        subtitles6s,
        subtitles7s,
        subtitles8s,
        subtitles9s,
        subtitles10s,
        subtitles11s,
        subtitles12s,
        subtitles13s,
      ],
      fr: [
        subtitles1f,
        subtitles2f,
        subtitles3f,
        subtitles4f,
        subtitles5f,
        subtitles6f,
        subtitles7f,
        subtitles8f,
        subtitles9f,
        subtitles10f,
        subtitles11f,
        subtitles12f,
        subtitles13f,
      ],
      en: [
        subtitles1e,
        subtitles2e,
        subtitles3e,
        subtitles4e,
        subtitles5e,
        subtitles6e,
        subtitles7e,
        subtitles8e,
        subtitles9e,
        subtitles10e,
        subtitles11e,
        subtitles12e,
        subtitles13e,
      ],
    };

    // Default to English if locale is not found
    const localeKey =
      locale in localeMap ? (locale as keyof typeof localeMap) : "en";
    const subtitlesArray = localeMap[localeKey] || [];

    // Return the appropriate subtitles array based on the current POI (from prop)
    // from is 1-based, so we subtract 1 to get the correct index
    return from >= 1 && from <= subtitlesArray.length
      ? subtitlesArray[from - 1]
      : [];

    //   switch (from) {
    //     case 1:
    //       return subtitles1;
    //     case 2:
    //       return subtitles2;
    //     case 3:
    //       return subtitles3;
    //     case 4:
    //       return subtitles4;
    //     case 5:
    //       return subtitles5;
    //     case 6:
    //       return subtitles6;
    //     case 7:
    //       return subtitles7;
    //     case 8:
    //       return subtitles8;
    //     case 9:
    //       return subtitles9;
    //     case 10:
    //       return subtitles10;
    //     case 11:
    //       return subtitles11;
    //     case 12:
    //       return subtitles12;
    //     case 13:
    //       return subtitles13;
    //     default:
    //       return [];
    //   }
  };

  const startAnimationAndAudio = async () => {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio(audioUrl);
        audioRef.current.preload = "auto";
        audioRef.current.volume = 1.0;
        setShowSubtitleButton(true);
        setShowSubtitles(true); // Ensure subtitles are shown when audio starts

        // Set the first subtitle explicitly when audio starts
        const currentSubtitles = getCurrentSubtitles();
        if (currentSubtitles.length > 0) {
          setActiveSubtitle(currentSubtitles[0]);
          setCurrentSubtitleIndex(0);
        }

        // Set up timeupdate event for subtitles
        audioRef.current.ontimeupdate = () => {
          if (audioRef.current) {
            const currentTime = audioRef.current.currentTime;
            // Get the correct subtitle array based on the current POI
            const currentSubtitles = getCurrentSubtitles();
            updateSubtitle(currentTime, currentSubtitles);
          }
        };

        audioRef.current.onended = () => {
          setActiveSubtitle(null);
          setCurrentSubtitleIndex(0);
          stopAnimationAndAudio();
          setTimeout(() => handleBackFromAR(), 100);
        };
      }
      await audioRef.current.play();
      isPlayingRef.current = true;
      setIsPlayingState(true);
    } catch {
      setShowAudioPopup(true);
    }
  };

  // const bgMusicRef = useRef<HTMLAudioElement | null>(null);

  const stopAnimationAndAudio = () => {
    cleanupResources();
  };

  const handleBackFromAR = () => {
    cleanupResources();
    setShowARView(false);
    handleClose();
  };

  const handleAllowAudio = () => {
    setShowAudioPopup(false);
    startAnimationAndAudio();
  };

  const placeAvatar = () => {
    if (markerRef.current) {
      const worldPos = new (window as any).THREE.Vector3();
      markerRef.current.object3D.getWorldPosition(worldPos);
      setAvatarPos({ x: worldPos.x, y: worldPos.y + 0.3, z: worldPos.z });
      startAnimationAndAudio();

      // Show movement instructions
      setShowMovementInstructions(true);
      // Hide after 8 seconds
      // setTimeout(() => {
      //   setShowMovementInstructions(false);
      // }, 8000);

      // if (bgMusicRef.current) {
      //   bgMusicRef.current.pause();
      //   bgMusicRef.current = null;
      // }

      // Create and play new background music
      // bgMusicRef.current = new Audio("/button-sounds/2.mp3");
      // bgMusicRef.current.loop = true;
      // bgMusicRef.current.volume = 0.5;
      // bgMusicRef.current.play().catch((error) => {
      // console.error("Error playing background music:", error);
      // }
      // );
    }
  };

  const getTouchDistance = (t0: any, t1: any) => {
    const dx = t0.clientX - t1.clientX;
    const dy = t0.clientY - t1.clientY;
    return Math.hypot(dx, dy);
  };

  const getTouchMidpoint = (t0: any, t1: any) => ({
    x: (t0.clientX + t1.clientX) / 2,
    y: (t0.clientY + t1.clientY) / 2,
  });

  const onTouchStart = (e: React.TouchEvent) => {
    if (!avatarPos) return;
    e.stopPropagation();

    if (showMovementInstructions) {
      setShowMovementInstructions(false);
    }

    const touches = e.touches;
    gestureState.current.start = true;
    if (touches.length === 1) {
      gestureState.current.mode = "rotate";
      gestureState.current.startX = touches[0].clientX;
      gestureState.current.startRotationY = userRotationY;
    } else if (touches.length === 2) {
      gestureState.current.mode = "pinch";
      gestureState.current.startDist = getTouchDistance(touches[0], touches[1]);
      gestureState.current.startScale = userScale;
      gestureState.current.startMid = getTouchMidpoint(touches[0], touches[1]);
      gestureState.current.startPos = { ...avatarPos };
    }
    // Hide the movement instructions when any touch starts on the avatar
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!gestureState.current.start) return;
    e.preventDefault();
    const touches = e.touches;
    if (gestureState.current.mode === "rotate" && touches.length === 1) {
      const dx = touches[0].clientX - gestureState.current.startX;
      const deltaY = dx * 0.2;
      setUserRotationY(gestureState.current.startRotationY + deltaY);
    } else if (touches.length === 2) {
      const dist = getTouchDistance(touches[0], touches[1]);
      const scaleFactor = dist / gestureState.current.startDist;
      const newScale = Math.min(
        Math.max(gestureState.current.startScale * scaleFactor, 0.2),
        2,
      );
      setUserScale(newScale);

      const mid = getTouchMidpoint(touches[0], touches[1]);
      const dy = mid.y - gestureState.current.startMid.y;
      const dx = mid.x - gestureState.current.startMid.x;
      const panFactor = 0.0025 * (1 / Math.max(newScale, 0.2));

      setAvatarPos((p) =>
        p
          ? {
              x: gestureState.current.startPos.x - dx * panFactor,
              y: gestureState.current.startPos.y - dy * panFactor,
              z: gestureState.current.startPos.z,
            }
          : p,
      );
    }
  };

  const onTouchEnd = () => {
    gestureState.current.start = false;
    gestureState.current.mode = null;
  };

  // Cleanup function to properly reset state and clean up resources
  const cleanupResources = () => {
    // Clear all timeouts
    if (subtitleTimeoutRef.current) {
      clearTimeout(subtitleTimeoutRef.current);
      subtitleTimeoutRef.current = null;
    }

    // Clear all subtitle timeouts
    subtitleTimeouts.current.forEach((timeout) => clearTimeout(timeout));
    subtitleTimeouts.current = [];

    // Pause and clean up audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    // Reset animation state
    isPlayingRef.current = false;
    setIsPlayingState(false);
    setActiveSubtitle(null);
    setCurrentSubtitleIndex(0);
    setShowSubtitleButton(false);
  };

  useEffect(() => {
    // Clean up resources when component unmounts
    return () => {
      cleanupResources();
    };
  }, []);

  useEffect(() => {
    if (!permissionGranted) return;
    if (!linkLoad) {
      setScriptsLoaded(true);
      return;
    }

    const scriptClass = "poi-page-script";

    const loadScript = (src: string) =>
      new Promise<void>((resolve, reject) => {
        if ((window as any)._loadedScripts?.[src]) return resolve();
        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing) return resolve();

        const s = document.createElement("script");
        s.src = src;
        s.async = false;
        s.classList.add(scriptClass);
        s.dataset.pageScript = scriptClass;
        s.onload = () => {
          (window as any)._loadedScripts = {
            ...(window as any)._loadedScripts,
            [src]: true,
          };
          resolve();
        };
        s.onerror = () => reject();
        document.head.appendChild(s);
      });

    const setupDracoLoader = () => {
      if (
        !(window as any).AFRAME ||
        !(window as any).THREE ||
        dracoInitializedRef.current
      )
        return;
      const AFRAME = (window as any).AFRAME;
      const THREE = (window as any).THREE;
      try {
        const dracoLoader = new THREE.DRACOLoader();
        dracoLoader.setDecoderPath(
          "https://www.gstatic.com/draco/versioned/decoders/1.5.6/",
        );
        dracoLoader.preload();
        if (AFRAME.components["gltf-model"]) {
          const originalUpdate =
            AFRAME.components["gltf-model"].Component.prototype.update;
          AFRAME.components["gltf-model"].Component.prototype.update =
            function (oldData: any) {
              if (!this.loader) this.loader = new THREE.GLTFLoader();
              if (!this.loader.dracoLoader)
                this.loader.setDRACOLoader(dracoLoader);
              if (originalUpdate) return originalUpdate.call(this, oldData);
            };
        }
        dracoInitializedRef.current = true;
      } catch {
        /* ignore */
      }
    };

    const loadAll = async () => {
      try {
        if (!(window as any).AFRAME) {
          await loadScript("https://aframe.io/releases/1.3.0/aframe.min.js");
        }
        await new Promise<void>((resolve) => {
          const check = (): void => {
            if ((window as any).AFRAME) {
              resolve();
            } else {
              setTimeout(check, 50);
            }
          };
          check();
        });

        if (isIOS()) {
          await loadScript(
            "https://cdn.jsdelivr.net/gh/AR-js-org/AR.js@3.4.5/aframe/build/aframe-ar.js",
          );
        } else {
          await loadScript(
            "https://cdn.jsdelivr.net/gh/AR-js-org/AR.js@3.4.5/aframe/build/aframe-ar-nft.min.js",
          );
        }

        await loadScript(
          "https://cdn.jsdelivr.net/npm/aframe-extras@7.6.0/dist/aframe-extras.min.js",
        );
        if (!(window as any).THREE) {
          await loadScript(
            "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js",
          );
        }
        await loadScript(
          "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/DRACOLoader.js",
        );
        setupDracoLoader();
        setScriptsLoaded(true);
      } catch {
        setScriptsLoaded(false);
      }
    };

    loadAll();
  }, [permissionGranted, linkLoad]);

  useEffect(() => {
    if (!scriptsLoaded || !(window as any).AFRAME || !(window as any).THREE)
      return;

    const scene = document.querySelector("a-scene");
    if (!scene) return;

    const setupEnvironment = () => {
      const sceneEl = scene as any;
      const THREE = (window as any).THREE;

      if (sceneEl.hasLoaded && sceneEl.renderer && sceneEl.object3D) {
        const renderer = sceneEl.renderer;
        const scene3D = sceneEl.object3D;

        renderer.toneMapping = THREE.LinearToneMapping;
        renderer.toneMappingExposure = 1.0;

        if (sceneEl.components && sceneEl.components.environment) {
          try {
            sceneEl.setAttribute(
              "environment",
              "preset: venice-sunset; " +
                "toneMapping: linear; " +
                "exposure: 0; " +
                "punctualLights: true; " +
                "ambientIntensity: 0; " +
                "ambientColor: #ffffff; " +
                "directIntensity: 2.5; " +
                "directColor: #ffffff",
            );
          } catch {
            try {
              sceneEl.setAttribute("environment", {
                preset: "venice-sunset",
                toneMapping: "linear",
                exposure: 0,
                punctualLights: true,
                ambientIntensity: 0,
                ambientColor: "#ffffff",
                directIntensity: 2.5,
                directColor: "#ffffff",
              });
            } catch {
              // Environment component update failed, using lights only
            }
          }
        }

        const updateMaterials = () => {
          scene3D.traverse((object: any) => {
            if (object.isMesh && object.material) {
              const materials = Array.isArray(object.material)
                ? object.material
                : [object.material];
              materials.forEach((material: any) => {
                if (
                  material &&
                  (material.isMeshStandardMaterial ||
                    material.isMeshPhysicalMaterial)
                ) {
                  if (scene3D.environment) {
                    material.envMap = scene3D.environment;
                    material.envMapIntensity = 1.0;
                  }
                  material.needsUpdate = true;
                }
              });
            }
          });
        };

        updateMaterials();
        setTimeout(updateMaterials, 500);
        setTimeout(updateMaterials, 1500);
        setTimeout(updateMaterials, 3000);
      } else {
        sceneEl.addEventListener("loaded", setupEnvironment, { once: true });
      }
    };

    const timer = setTimeout(setupEnvironment, 500);

    return () => clearTimeout(timer);
  }, [scriptsLoaded]);

  if (!permissionGranted) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-white w-full">
        <p>⚠️ {t("cameraPermission")}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded transition-all duration-400 ease-in-out hover:brightness-150 active:brightness-150 active:-translate-y-[5px]"
        >
          {t("try_again")}
        </button>
      </div>
    );
  }

  if (!scriptsLoaded || !(window as any).AFRAME) return <Loading />;

  return (
    <div className="w-full h-screen relative">
      <AScene
        vr-mode-ui="enabled: false"
        embedded
        arjs="sourceType: webcam; videoTexture: true; facingMode: environment; debugUIEnabled: false"
        renderer="alpha: true; logarithmicDepthBuffer: true; precision: mediump; colorManagement: true; toneMapping: Linear;"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <ACamera position="0 0 0" look-controls="touchEnabled: false">
          {!avatarPos && <Marker ref={markerRef} />}
        </ACamera>

        <ALight
          type="directional"
          intensity={2.5}
          color="#ffffff"
          position="0 0 5"
        />
        {/* <ALight
          type="ambient"
          intensity={0.5}
          color="#ffffff"
        /> */}

        {avatarPos && (
          <Avatar
            ref={avatarRef}
            position={avatarPos}
            isPlaying={isPlayingState}
            userRotationY={userRotationY}
            userScale={userScale}
          />
        )}

        <AEntity environment="preset: venice-sunset; toneMapping: linear; exposure: 0; punctualLights: true; ambientIntensity: 0; ambientColor: #ffffff; directIntensity: 2; directColor: #ffffff;" />
      </AScene>

      {avatarPos && (
        <div
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onTouchCancel={onTouchEnd}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2147483648,
            touchAction: "none",
            background: "transparent",
          }}
        />
      )}

      {!avatarPos && (
        <div
          className={`fixed bottom-10 w-full flex justify-center mx-auto px-5 ${
            from === "intro" ? "left-0" : ""
          }`}
          style={{ zIndex: 2147483646 }}
        >
          <CustomButton onClick={placeAvatar} className="w-[200px] text-white">
            {t("place")}
          </CustomButton>
        </div>
      )}

      {showAudioPopup && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70"
          style={{ zIndex: 2147483647 }}
        >
          <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col items-center gap-4">
            <p className="text-lg font-semibold text-center">
              🔊 {t("audioPermission")}
            </p>
            <CustomButton
              onClick={handleAllowAudio}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {t("audioAllow")}
            </CustomButton>
            <CustomButton
              onClick={() => setShowAudioPopup(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded"
            >
              {t("Cancel")}
            </CustomButton>
          </div>
        </div>
      )}
      {showSubtitleButton && (
        <div className="fixed top-6 right-4 z-[2147483647]">
          <button
            onClick={toggleSubtitles}
            className="px-3 py-2 text-[11px] bg-black/70 text-white rounded-lg transition-all duration-400 ease-in-out hover:brightness-150 active:brightness-150 active:-translate-y-[5px]"
          >
            {/* {showSubtitles ? "Amagar subtítols" : "Mostrar subtítols"} */}
            {t2(showSubtitles ? "sub1" : "sub2")}
          </button>
        </div>
      )}

      {activeSubtitle && showSubtitles && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%]">
          <div className="bg-black/70 text-white text-center px-4 py-5 rounded-lg text-[13px] leading-relaxed shadow-lg">
            {activeSubtitle.text}
          </div>
        </div>
      )}

      {showMovementInstructions && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2147483647] w-[90%] max-w-md">
          <div className="bg-black/80 text-white text-center px-6 py-4 rounded-xl shadow-2xl border border-white/20">
            <p className="text-base font-medium mb-2">💡 {t2("info1")}</p>
            <p className="text-sm opacity-90">
              {t2("info2")} <br></br> {t2("info3")}
            </p>
          </div>
        </div>
        // <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2147483647]">
        //           <div className="flex justify-center">
        //             <Image src={AR} alt="AR"/>
        //           </div>
        //         </div>
      )}
    </div>
  );
};

export default Page;
