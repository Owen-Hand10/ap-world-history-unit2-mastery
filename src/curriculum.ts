export type CurriculumTerm = {
  term: string
  definition: string
  significance: string
  region: string
  whyItMatters: string
  apExample: string
}

export type TimelineEvent = {
  year: number
  date: string
  title: string
  summary: string
  significance: string
  apConnection: string
}

export type Unit = {
  id: number
  title: string
  period: string
  overview: string
  theme: string
  developments: string[]
  concepts: string[]
  terms: CurriculumTerm[]
  timeline: TimelineEvent[]
}

type RawTerm = [term: string, definition: string, significance: string, region: string]
type RawUnit = Omit<Unit, 'terms' | 'timeline'> & { rawTerms: RawTerm[]; timeline: TimelineEvent[] }

const rawUnits: RawUnit[] = [
  {
    id: 1, title: 'The Global Tapestry', period: '1200–1450',
    overview: 'Explore how states and societies developed in different regions before expanding interregional connections reshaped the world.',
    theme: 'Governance and regional societies',
    developments: ['Song China combined a sophisticated bureaucracy with commercial growth and new agricultural production.', 'Islamic states and networks connected communities across Afro-Eurasia even as political authority became decentralized.', 'South and Southeast Asian rulers supported diverse Hindu, Buddhist, and Islamic traditions.', 'Japanese and European political systems relied on layered landholding and warrior elites.', 'African states grew through regional trade, agriculture, and control of valuable resources.'],
    concepts: ['State-building drew on bureaucracy, military power, and elite relationships.', 'Belief systems helped rulers legitimize authority and shape social life.', 'Trade enriched some states and linked local economies to regional markets.', 'Geography and agricultural innovation influenced population growth and urbanization.'],
    rawTerms: [
      ['Song Dynasty', 'Chinese dynasty (960–1279) known for a centralized civil bureaucracy, technological innovation, and commercial expansion.', 'A powerful example of a prosperous, bureaucratic state in East Asia.', 'China and East Asia'],
      ['Neo-Confucianism', 'A revival and reinterpretation of Confucian philosophy that incorporated metaphysical ideas and shaped education and government.', 'Shaped elite education, social hierarchy, and political culture in China and neighboring states.', 'China and East Asia'],
      ['Dar al-Islam', 'The regions and communities connected by Islamic faith, institutions, law, and scholarship.', 'Shows how a shared religion and scholarly culture could link politically diverse societies.', 'North Africa, Southwest Asia, and beyond'],
      ['Abbasid Caliphate', 'A major Islamic caliphate centered in Baghdad, whose political authority fragmented while Islamic cultural influence endured.', 'Illustrates the distinction between political fragmentation and continued cultural connectivity.', 'Baghdad and Southwest Asia'],
      ['Grand Canal', 'A large Chinese waterway system connecting northern political centers with southern agricultural regions.', 'Supported internal trade, food transport, and the integration of Chinese imperial territory.', 'China'],
      ['Champa Rice', 'A fast-maturing, drought-resistant rice variety introduced to China from Champa in Southeast Asia.', 'Increased agricultural output and population growth in Song China.', 'Southern China and Southeast Asia'],
      ['Scholar-Gentry', 'The educated Chinese elite whose status rested on classical learning, official service, and landholding.', 'Connected education and bureaucratic government to social status and local influence.', 'China'],
      ['Civil Service Examination', 'A competitive examination system based primarily on mastery of Confucian texts used to recruit government officials.', 'Helped create a literate administrative elite and provided an avenue for social mobility.', 'China and East Asia'],
      ['Feudalism', 'A decentralized political and military arrangement based on reciprocal obligations among rulers, landholders, and warriors.', 'A useful comparative framework for examining decentralized authority, though not identical across societies.', 'Europe and Japan'],
      ['Samurai', 'The hereditary warrior class that served Japanese lords and followed evolving martial and social codes.', 'Demonstrates the importance of military elites in Japan’s decentralized political order.', 'Japan'],
      ['Heian Japan', 'A classical Japanese court era whose aristocratic culture influenced later Japanese political and cultural traditions.', 'Provides context for the distinct development of Japanese court culture and elite society.', 'Japan'],
      ['Khmer Empire', 'A Southeast Asian state centered at Angkor that used irrigation, agriculture, and monumental architecture to project power.', 'Shows how water management and religious authority supported state power.', 'Mainland Southeast Asia'],
      ['Srivijaya', 'A maritime Southeast Asian kingdom that prospered by controlling strategic ports and trade routes.', 'Demonstrates how states could gain wealth and influence by controlling maritime exchange.', 'Strait of Malacca and Southeast Asia'],
      ['Great Zimbabwe', 'A powerful southern African trading state known for monumental stone architecture and regional commerce.', 'Connects African state formation to internal production and Indian Ocean trade.', 'Southern Africa'],
      ['Swahili Coast', 'A chain of East African city-states shaped by African, Arab, and Persian commercial and cultural connections.', 'Illustrates coastal urbanization and cultural exchange in Indian Ocean networks.', 'East Africa'],
    ],
    timeline: [
      { year: 1206, date: '1206', title: 'Temujin becomes Genghis Khan', summary: 'Mongol leaders unite under Temujin.', significance: 'Creates a new force that will transform Eurasian politics and exchange.', apConnection: 'Contextualize the expansion of interregional networks after 1200.' },
      { year: 1227, date: '1227', title: 'Death of Genghis Khan', summary: 'Mongol expansion continues under his successors.', significance: 'Successor khanates reshape power across Eurasia.', apConnection: 'Compare state-building strategies across regions.' },
      { year: 1258, date: '1258', title: 'Baghdad captured by the Mongols', summary: 'Hulagu’s forces sack Baghdad and end Abbasid political rule there.', significance: 'Political disruption did not erase the wider Islamic cultural world.', apConnection: 'Distinguish political change from cultural continuity.' },
      { year: 1271, date: '1271', title: 'Yuan Dynasty established', summary: 'Kublai Khan proclaims a Mongol dynasty in China.', significance: 'Mongol rule incorporates China while retaining distinct imperial practices.', apConnection: 'Use as evidence for empire-building and cultural interaction.' },
      { year: 1279, date: '1279', title: 'Song resistance ends', summary: 'The Yuan complete the conquest of Song China.', significance: 'A long-standing Chinese dynasty gives way to Mongol rule.', apConnection: 'Compare bureaucratic states and conquest empires.' },
      { year: 1299, date: 'c. 1299', title: 'Ottoman polity emerges', summary: 'Turkic frontier leaders establish a small Anatolian state.', significance: 'One of several new regional powers that will grow after 1200.', apConnection: 'Trace state-building over time.' },
      { year: 1324, date: '1324', title: 'Mansa Musa’s pilgrimage', summary: 'The Mali ruler travels to Mecca through North Africa.', significance: 'Displays West African wealth and the reach of Islamic networks.', apConnection: 'Connect trade, belief, and state authority.' },
      { year: 1405, date: '1405', title: 'First Ming treasure voyage', summary: 'Zheng He’s fleet sails into the Indian Ocean.', significance: 'Demonstrates the scale of Chinese maritime capacity.', apConnection: 'Compare state-sponsored and merchant-led exchange.' },
    ],
  },
  {
    id: 2, title: 'Networks of Exchange', period: '1200–1450',
    overview: 'Trace how merchants, empires, and travelers connected Afro-Eurasia through land and sea routes—and how goods, ideas, and disease moved with them.',
    theme: 'Trade and cultural exchange',
    developments: ['Silk Roads trade grew through caravanserai, credit, and merchant partnerships.', 'Indian Ocean commerce relied on monsoon knowledge, ship technology, and diasporic communities.', 'Trans-Saharan trade expanded with camel transport and the growth of West African states.', 'Mongol rule created a period of greater security and communication across much of Eurasia.', 'Trade networks spread religions, technologies, and epidemic disease alongside commodities.'],
    concepts: ['Environmental knowledge and technology made long-distance exchange possible.', 'States protected, taxed, or competed to control trade routes.', 'Merchant communities transmitted culture and connected distant markets.', 'Connectivity brought both prosperity and vulnerability, including pandemic disease.'],
    rawTerms: [
      ['Silk Roads', 'Overland routes linking East Asia, Central Asia, Southwest Asia, and the Mediterranean through relay trade.', 'Moved high-value goods and technologies and supported religious and cultural diffusion.', 'Eurasia'],
      ['Caravanserai', 'Roadside facilities where merchants and pack animals rested, resupplied, and exchanged information.', 'Infrastructure lowered the costs and risks of overland trade.', 'Central and Southwest Asia'],
      ['Relay Trade', 'A system in which goods passed through multiple merchants and intermediaries along a route.', 'Allowed extensive exchange without requiring one merchant to travel its entire distance.', 'Eurasian trade routes'],
      ['Diasporic Communities', 'Groups of merchants living outside their place of origin while maintaining cultural and commercial ties.', 'Helped sustain trade and spread practices between port cities and inland markets.', 'Indian Ocean ports'],
      ['Pax Mongolica', 'A period of relative security across Mongol-ruled Eurasia that facilitated travel, trade, and communication.', 'Shows how imperial consolidation could intensify exchange across regions.', 'Mongol Eurasia'],
      ['Genghis Khan', 'The title of Temujin, who united Mongol tribes and initiated major Eurasian conquests.', 'His conquests created the political conditions for later Eurasian integration under Mongol rule.', 'Central Asia and Eurasia'],
      ['Yuan Dynasty', 'The Mongol-led dynasty founded by Kublai Khan that ruled China from 1271 to 1368.', 'An example of conquest dynasties adapting to rule a large, established society.', 'China'],
      ['Monsoon Winds', 'Seasonal wind patterns that reverse direction and made Indian Ocean sailing more predictable.', 'Environmental knowledge supported regular, long-distance maritime trade.', 'Indian Ocean'],
      ['Dhows', 'Western Indian Ocean sailing vessels commonly using lateen sails for trade and travel.', 'Helped merchants transport goods among East Africa, Arabia, and South Asia.', 'Western Indian Ocean'],
      ['Junks', 'Large East Asian ships, often with multiple masts and bulkheads, used for trade and travel.', 'Ship design supported the growth of Asian maritime exchange.', 'East and Southeast Asia'],
      ['Lateen Sail', 'A triangular sail that improved sailing into changing winds and maneuverability.', 'Shows how navigational technology increased the reach of maritime trade.', 'Indian Ocean and Mediterranean'],
      ['Trans-Saharan Trade', 'Commercial exchange across the Sahara linking North African markets with West African states.', 'Enabled states such as Mali to tax valuable trade and connect with Islamic networks.', 'Sahara and West Africa'],
      ['Camel Saddle', 'A specialized saddle that enabled camels to carry heavier loads across desert routes.', 'Helped make regular trans-Saharan caravan trade more practical.', 'Sahara'],
      ['Mali', 'A West African empire that grew wealthy by controlling gold-producing regions and trans-Saharan commerce.', 'Demonstrates the political importance of trade and resource control in Africa.', 'West Africa'],
      ['Timbuktu', 'A major West African commercial and scholarly city connected to trans-Saharan networks.', 'Shows how trade supported urban growth and centers of Islamic learning.', 'Mali and West Africa'],
      ['Black Death', 'A devastating fourteenth-century plague pandemic that spread across Afro-Eurasia through connected routes.', 'Reveals the harmful consequences of intensified exchange and demographic shocks.', 'Afro-Eurasia'],
      ['Zheng He', 'A Ming admiral who led state-sponsored voyages through the Indian Ocean in the early fifteenth century.', 'Illustrates Chinese maritime power and diplomatic exchange before 1450.', 'Indian Ocean'],
      ['Syncretism', 'The blending of cultural or religious traditions through sustained contact.', 'Shows that cultural diffusion often produced adaptation rather than simple replacement.', 'Connected trade cities'],
    ],
    timeline: [
      { year: 1206, date: '1206', title: 'Mongol unification', summary: 'Temujin is proclaimed Genghis Khan.', significance: 'Begins an era of conquest and Eurasian political integration.', apConnection: 'Explain how empires can reshape exchange networks.' },
      { year: 1235, date: '1235', title: 'Mali consolidates power', summary: 'Sundiata’s successors strengthen a West African state.', significance: 'Mali grows in a region linked by gold, salt, and trans-Saharan trade.', apConnection: 'Connect trade wealth to state formation.' },
      { year: 1271, date: '1271', title: 'Yuan Dynasty founded', summary: 'Kublai Khan establishes Mongol dynastic rule in China.', significance: 'China becomes part of an empire spanning multiple trade corridors.', apConnection: 'Use as evidence for the scale of Mongol rule.' },
      { year: 1279, date: '1279', title: 'Mongol conquest of Song China completed', summary: 'Yuan forces defeat the last Song resistance.', significance: 'Political unity increases movement across East Asia and beyond.', apConnection: 'Relate political consolidation to increased exchange.' },
      { year: 1324, date: '1324', title: 'Mansa Musa travels to Mecca', summary: 'Mali’s ruler makes a famous pilgrimage through North Africa.', significance: 'Highlights West African wealth and connections to Islamic networks.', apConnection: 'Use as evidence of trans-Saharan connectivity.' },
      { year: 1347, date: '1347', title: 'Plague reaches Mediterranean ports', summary: 'Plague arrives in the Mediterranean world amid dense commercial connections.', significance: 'Trade routes transmit pathogens as well as goods.', apConnection: 'Explain an unintended consequence of connectivity.' },
      { year: 1368, date: '1368', title: 'Ming dynasty replaces Yuan', summary: 'Mongol rule in China ends and the Ming dynasty is established.', significance: 'Shows the limits and legacies of Mongol political authority.', apConnection: 'Compare continuity and change under new dynasties.' },
      { year: 1405, date: '1405', title: 'Zheng He’s voyages begin', summary: 'Ming fleets begin expeditions across the Indian Ocean.', significance: 'State-sponsored voyages project power and build diplomatic ties.', apConnection: 'Compare maritime trade and state-sponsored exploration.' },
    ],
  },
  {
    id: 3, title: 'Land-Based Empires', period: '1450–1750',
    overview: 'Examine how expanding gunpowder empires built power, governed diverse populations, and used religion and art to legitimize rule.',
    theme: 'Empire and state-building',
    developments: ['Ottoman, Safavid, and Mughal rulers used gunpowder weapons and centralized administration.', 'Empires used bureaucracies, military elites, and taxation to govern large territories.', 'Rulers supported monumental architecture and court culture to legitimize power.', 'Religious policies varied, shaping imperial stability and conflict.', 'The Ottoman-Safavid rivalry reflected both political competition and Sunni-Shia division.'],
    concepts: ['Military technology helped rulers expand but did not alone sustain empire.', 'Imperial administration balanced central authority with regional elites.', 'Rulers used religious legitimacy, art, and architecture to strengthen authority.', 'Policies toward religious diversity shaped relationships between rulers and subjects.'],
    rawTerms: [
      ['Gunpowder Empires', 'Large early modern land empires that used firearms and artillery in conquest and state-building.', 'Highlights the interaction of military technology and centralized imperial power.', 'Eurasia'],
      ['Ottoman Empire', 'A Muslim empire centered in Anatolia that expanded into southeastern Europe, Southwest Asia, and North Africa.', 'A major example of centralized imperial administration and military expansion.', 'Anatolia, Balkans, and Southwest Asia'],
      ['Safavid Empire', 'A Persian empire that made Twelver Shiism the state religion and competed with the Ottomans.', 'Shows how religious identity could support state formation and geopolitical rivalry.', 'Persia'],
      ['Mughal Empire', 'A powerful Muslim-ruled empire that governed much of South Asia through military expansion and regional alliances.', 'Demonstrates the challenges and strategies of governing religiously diverse populations.', 'South Asia'],
      ['Janissaries', 'Elite Ottoman infantry recruited through the devshirme system and trained for service to the sultan.', 'Illustrates how rulers created military forces directly loyal to the central state.', 'Ottoman Empire'],
      ['Devshirme', 'An Ottoman levy that recruited Christian boys for conversion, education, and state or military service.', 'Shows one way empires incorporated subjects into central institutions.', 'Ottoman territories'],
      ['Suleiman', 'The Ottoman sultan known as “the Magnificent” who expanded and consolidated the empire in the sixteenth century.', 'Associated with Ottoman imperial strength, legal administration, and cultural patronage.', 'Ottoman Empire'],
      ['Akbar', 'A Mughal emperor who expanded the empire and pursued policies of accommodation toward many non-Muslim subjects.', 'Provides evidence for strategies used to govern religious diversity.', 'Mughal South Asia'],
      ['Shah Abbas', 'A Safavid ruler who strengthened central authority and developed Isfahan as an imperial capital.', 'Shows how rulers used military reform, trade, and urban patronage to consolidate power.', 'Safavid Persia'],
      ['Mansabdars', 'Mughal officials ranked by a system that tied status and military obligations to imperial service.', 'Connected local elites and military organization to Mughal central authority.', 'Mughal South Asia'],
      ['Religious Toleration', 'A ruler’s policy of permitting multiple religious communities to practice, often for political stability.', 'Allows comparison of imperial approaches to diversity and subject loyalty.', 'Mughal and other empires'],
      ['Sunni', 'The largest branch of Islam, historically associated with the Ottoman Empire in its rivalry with Safavid Persia.', 'Religious identity shaped political alliances and imperial competition.', 'Ottoman and broader Islamic world'],
      ['Shia', 'A branch of Islam that recognizes Ali and his descendants as rightful leaders; Twelver Shiism became Safavid state doctrine.', 'Helped distinguish Safavid identity and legitimize its rulers.', 'Safavid Persia'],
    ],
    timeline: [
      { year: 1453, date: '1453', title: 'Ottomans capture Constantinople', summary: 'Mehmed II takes the Byzantine capital.', significance: 'The Ottomans consolidate a strategic imperial center.', apConnection: 'Contextualize the rise of land-based empires.' },
      { year: 1501, date: '1501', title: 'Safavid dynasty established', summary: 'Ismail I establishes Safavid rule in Persia.', significance: 'Twelver Shiism becomes central to Persian state identity.', apConnection: 'Connect religious identity with state-building.' },
      { year: 1526, date: '1526', title: 'Mughal Empire founded', summary: 'Babur defeats the Delhi Sultanate at Panipat.', significance: 'A new empire begins expanding across South Asia.', apConnection: 'Compare military conquest and imperial formation.' },
      { year: 1529, date: '1529', title: 'Siege of Vienna', summary: 'Ottoman forces campaign into central Europe.', significance: 'Demonstrates Ottoman military reach and European resistance.', apConnection: 'Analyze imperial expansion and limits.' },
      { year: 1556, date: '1556', title: 'Akbar becomes Mughal emperor', summary: 'Akbar begins a long reign of expansion and consolidation.', significance: 'Administrative and accommodation policies help stabilize rule.', apConnection: 'Use as evidence for governing diversity.' },
      { year: 1556, date: '1556', title: 'Suleiman dies', summary: 'Ottoman rule passes from a major era of expansion and legal reform.', significance: 'The empire maintains institutions beyond a single ruler.', apConnection: 'Discuss continuity in imperial administration.' },
      { year: 1588, date: '1588', title: 'Shah Abbas I takes power', summary: 'Safavid authority is revitalized through military and administrative reform.', significance: 'Persia consolidates as a rival imperial center.', apConnection: 'Compare strategies of centralization.' },
      { year: 1632, date: '1632', title: 'Taj Mahal construction begins', summary: 'Shah Jahan commissions a monumental Mughal mausoleum.', significance: 'Imperial architecture projects wealth, authority, and cultural synthesis.', apConnection: 'Use visual culture as evidence of imperial power.' },
    ],
  },
  {
    id: 4, title: 'Transoceanic Interconnections', period: '1450–1750',
    overview: 'Study how oceanic voyages connected hemispheres, created new empires, and transformed populations, environments, and economies.',
    theme: 'Oceanic exploration and exchange',
    developments: ['Maritime technology and state competition drove European oceanic voyages.', 'The Columbian Exchange transferred plants, animals, people, and diseases between hemispheres.', 'European empires used coercive labor systems and settler colonialism in the Americas.', 'The Atlantic slave trade forcibly displaced millions of Africans.', 'Joint-stock finance and mercantilist policies linked state power to global commerce.'],
    concepts: ['State sponsorship and maritime technology enabled transoceanic expansion.', 'Biological exchange reshaped environments and populations unevenly.', 'Coercive labor underpinned plantation and mining economies.', 'Commercial competition strengthened links between states, merchants, and colonies.'],
    rawTerms: [
      ['Christopher Columbus', 'A Genoese mariner sailing for Spain whose 1492 voyage initiated sustained contact between Europe and the Americas.', 'A turning point in transatlantic encounters and imperial expansion.', 'Atlantic and Caribbean'],
      ['Columbian Exchange', 'The transfer of plants, animals, diseases, people, and ideas between the Americas and Afro-Eurasia.', 'Reshaped global diets, populations, ecosystems, and economies.', 'Atlantic world'],
      ['Encomienda', 'A Spanish colonial labor grant that compelled Indigenous people to provide labor and tribute to colonists.', 'Shows how colonial extraction relied on coerced Indigenous labor.', 'Spanish America'],
      ['Atlantic Slave Trade', 'The forced transportation of enslaved Africans across the Atlantic to labor in the Americas.', 'A central component of plantation economies and a profound demographic and social rupture.', 'Atlantic world'],
      ['Joint Stock Company', 'A business whose investors pooled capital and shared risk and profit through ownership shares.', 'Enabled expensive overseas ventures and connected private finance to imperial expansion.', 'Europe and overseas empires'],
      ['Mercantilism', 'An economic policy in which states sought wealth and power through controlled trade and colonial extraction.', 'Explains why empires regulated colonial commerce and competed for resources.', 'European empires and colonies'],
      ['Triangular Trade', 'A simplified model of Atlantic exchange linking Europe, Africa, and the Americas through goods and enslaved labor.', 'Highlights the interconnected and exploitative character of Atlantic commerce.', 'Atlantic world'],
      ['Treaty of Tordesillas', 'A 1494 agreement dividing claims to newly encountered lands between Spain and Portugal.', 'Shows how European states asserted competing imperial claims overseas.', 'Atlantic and South America'],
      ['Prince Henry', 'A Portuguese royal patron associated with support for Atlantic navigation and voyages along Africa.', 'Represents state and elite patronage behind early Portuguese exploration.', 'Portugal and West Africa'],
      ['Portuguese Empire', 'A maritime empire built around fortified ports, trade routes, and commercial outposts across oceans.', 'Shows how a relatively small state projected power through strategic maritime networks.', 'Atlantic, Africa, and Indian Ocean'],
      ['Spanish Empire', 'A transoceanic empire that conquered territories in the Americas and extracted labor and resources.', 'Provides evidence for colonial rule, resource extraction, and cultural transformation.', 'Americas and Pacific'],
    ],
    timeline: [
      { year: 1450, date: 'c. 1450', title: 'Atlantic voyaging expands', summary: 'European states and merchants invest in navigation and oceanic exploration.', significance: 'Begins the expansion of sustained maritime connections.', apConnection: 'Contextualize the causes of oceanic exploration.' },
      { year: 1488, date: '1488', title: 'Dias rounds the Cape of Good Hope', summary: 'Portuguese sailors reach the southern tip of Africa.', significance: 'Opens the possibility of a sea route into the Indian Ocean.', apConnection: 'Explain how technology and state sponsorship enabled voyages.' },
      { year: 1492, date: '1492', title: 'Columbus reaches the Caribbean', summary: 'A Spanish expedition reaches the Americas.', significance: 'Initiates sustained transatlantic contact and conquest.', apConnection: 'Use as a turning point in global interconnection.' },
      { year: 1494, date: '1494', title: 'Treaty of Tordesillas', summary: 'Spain and Portugal divide overseas claims along an agreed line.', significance: 'European monarchies attempt to regulate imperial competition.', apConnection: 'Analyze state power and imperial claims.' },
      { year: 1519, date: '1519', title: 'Cortés enters the Aztec Empire', summary: 'Spanish forces and Indigenous allies advance into central Mexico.', significance: 'Conquest combines disease, alliances, and military conflict.', apConnection: 'Explain multiple causes of conquest.' },
      { year: 1532, date: '1532', title: 'Spanish capture of Atahualpa', summary: 'Pizarro’s forces seize the Inca ruler.', significance: 'Spanish rule expands into Andean territories.', apConnection: 'Compare colonial strategies and Indigenous responses.' },
      { year: 1545, date: '1545', title: 'Silver mining at Potosí expands', summary: 'The Spanish develop large-scale extraction in the Andes.', significance: 'American silver enters global trade and finances empires.', apConnection: 'Connect coerced labor to global economic change.' },
      { year: 1619, date: '1619', title: 'Enslaved Africans arrive in Virginia', summary: 'The forced migration of Africans to English North America is recorded.', significance: 'Part of the growing Atlantic system of racialized slavery.', apConnection: 'Trace the development of Atlantic labor systems.' },
    ],
  },
  {
    id: 5, title: 'Revolutions', period: '1750–1900',
    overview: 'Investigate how Enlightenment ideas, social tensions, and economic change inspired revolutions and new political identities.',
    theme: 'Political and social transformation',
    developments: ['Enlightenment thinkers questioned inherited authority and articulated rights and sovereignty.', 'Revolutions in the Americas and France challenged monarchies and imperial rule.', 'The Haitian Revolution ended slavery and created an independent state.', 'Nationalism and liberalism challenged old empires and political hierarchies.', 'The Industrial Revolution transformed production and intensified social change.'],
    concepts: ['Revolutions drew on both intellectual ideas and material grievances.', 'Political change was uneven and often excluded women, enslaved people, and the poor.', 'Nationalism could unify populations and challenge multinational empires.', 'Reform and reaction accompanied revolutionary change.'],
    rawTerms: [
      ['Enlightenment', 'An intellectual movement emphasizing reason, natural rights, and critiques of inherited political authority.', 'Supplied arguments used to challenge absolutism and colonial rule.', 'Europe and Atlantic world'],
      ['John Locke', 'An English philosopher who argued that government rests on consent and should protect natural rights.', 'Influenced revolutionary arguments about rights and legitimate government.', 'England and Atlantic world'],
      ['Voltaire', 'A French Enlightenment writer who criticized religious intolerance and arbitrary authority.', 'Represents Enlightenment critiques of established institutions.', 'France'],
      ['Rousseau', 'A political thinker who argued that legitimate authority derives from the general will of the people.', 'Helped shape debates over popular sovereignty and citizenship.', 'France and Europe'],
      ['French Revolution', 'A revolution beginning in 1789 that dismantled the French monarchy and transformed political authority.', 'Spread debates over citizenship, rights, and popular sovereignty across Europe.', 'France'],
      ['American Revolution', 'A rebellion by British colonies in North America that resulted in an independent republic.', 'Applied Enlightenment claims while leaving major exclusions and inequalities in place.', 'North America'],
      ['Haitian Revolution', 'A successful revolution by enslaved and free people of color that established Haiti as an independent state in 1804.', 'The only successful large-scale slave revolt to create an independent state, challenging slavery and racial hierarchy.', 'Haiti and the Caribbean'],
      ['Napoleon', 'A French military leader who seized power and spread legal and administrative reforms through conquest.', 'Shows how revolutionary reforms could spread alongside authoritarian rule and empire.', 'France and Europe'],
      ['Nationalism', 'A belief that people sharing a national identity should have political unity or self-determination.', 'Inspired unification movements and resistance to multinational empires.', 'Europe and the Americas'],
      ['Liberalism', 'A political ideology emphasizing individual rights, constitutional government, and legal equality.', 'Challenged absolutism and influenced reform movements, though often with limited suffrage.', 'Europe and Atlantic world'],
      ['Conservatism', 'An ideology favoring social order, tradition, and gradual change after revolutionary upheaval.', 'Helped shape efforts to restore or preserve established political authority.', 'Europe'],
      ['Industrial Revolution', 'The shift to mechanized, factory-based production that began in Britain in the eighteenth century.', 'Transformed labor, urban life, production, and global economic relationships.', 'Britain and Europe'],
    ],
    timeline: [
      { year: 1756, date: '1756–1763', title: 'Seven Years’ War', summary: 'A global conflict weakens imperial finances and intensifies competition.', significance: 'Its costs contribute to political tensions in the Atlantic world.', apConnection: 'Contextualize the causes of Atlantic revolutions.' },
      { year: 1776, date: '1776', title: 'American Declaration of Independence', summary: 'Colonists declare independence from Britain.', significance: 'Popular sovereignty and rights language gains political force.', apConnection: 'Compare revolutionary ideologies and outcomes.' },
      { year: 1789, date: '1789', title: 'French Revolution begins', summary: 'The Estates-General crisis leads to revolutionary upheaval.', significance: 'Challenges monarchy and redefines citizenship and sovereignty.', apConnection: 'Explain causes and consequences of revolution.' },
      { year: 1791, date: '1791', title: 'Haitian Revolution begins', summary: 'Enslaved people in Saint-Domingue rise against French rule.', significance: 'Abolition and racial equality become central revolutionary issues.', apConnection: 'Compare inclusion and exclusion across revolutions.' },
      { year: 1804, date: '1804', title: 'Haiti declares independence', summary: 'Haiti becomes an independent republic after revolution.', significance: 'The revolution overturns slavery and colonial rule.', apConnection: 'Use as evidence to evaluate revolutionary change.' },
      { year: 1815, date: '1815', title: 'Congress of Vienna', summary: 'European powers seek to restore a balance after Napoleon.', significance: 'Conservative restoration coexists with persistent nationalist and liberal ideas.', apConnection: 'Analyze continuity and reaction after revolution.' },
      { year: 1848, date: '1848', title: 'Revolutions across Europe', summary: 'Revolts challenge monarchies and demand political reforms.', significance: 'Demonstrates the spread and limits of liberal and nationalist movements.', apConnection: 'Compare causes and outcomes across regions.' },
      { year: 1868, date: '1868', title: 'Meiji Restoration', summary: 'Japan’s imperial restoration accelerates political and industrial reform.', significance: 'A non-Western state adopts reforms to respond to global power shifts.', apConnection: 'Connect revolutions and reform to state-building.' },
    ],
  },
  {
    id: 6, title: 'Consequences of Industrialization', period: '1750–1900',
    overview: 'Analyze the social, economic, and environmental effects of industrial growth, including capitalism, new ideologies, and imperialism.',
    theme: 'Industrial economies and global power',
    developments: ['Industrialization spread beyond Britain and accelerated through new energy and technologies.', 'Capitalist and socialist thinkers debated wealth, labor, ownership, and inequality.', 'Industrial states sought raw materials and markets through imperial expansion.', 'New social classes, labor movements, and urban conditions emerged.', 'Racial ideologies were used to justify imperial domination and unequal global power.'],
    concepts: ['Industrial production changed labor systems and social hierarchies.', 'Economic ideologies offered competing explanations of wealth and inequality.', 'Industrial capacity expanded the military and economic power of imperial states.', 'Resistance and reform challenged exploitative working and colonial conditions.'],
    rawTerms: [
      ['Industrialization', 'The growth of machine-based manufacturing, factory production, and new energy use.', 'Transformed economies, societies, and global power relationships.', 'Britain and expanding industrial regions'],
      ['Capitalism', 'An economic system based on private ownership, investment, wage labor, and markets.', 'Helped organize industrial production and debate over wealth and inequality.', 'Industrial economies'],
      ['Communism', 'A political and economic ideology advocating collective ownership and a classless society.', 'Became a critique of capitalist inequality and a foundation for later political movements.', 'Europe and global movements'],
      ['Karl Marx', 'A nineteenth-century critic of capitalism who argued that class conflict would drive historical change.', 'Influenced socialist and communist movements and revolutionary politics.', 'Europe'],
      ['Adam Smith', 'An economist who defended specialization, markets, and limited restrictions on trade in his writings.', 'A foundational voice in classical economic arguments about markets and production.', 'Britain'],
      ['Second Industrial Revolution', 'A late nineteenth-century phase marked by steel, chemicals, electricity, and expanded industrial production.', 'Increased industrial productivity and widened disparities in global power.', 'Europe, United States, and Japan'],
      ['Social Darwinism', 'A misuse of evolutionary ideas to portray social and racial hierarchies as natural or inevitable.', 'Was used to rationalize inequality and imperial domination.', 'Europe and imperial societies'],
      ['Imperialism', 'The extension of a state’s power over other territories through political, economic, or military control.', 'Reshaped societies and economies and often intensified resistance.', 'Africa and Asia'],
      ['White Man’s Burden', 'A phrase popularized to present imperial domination as a supposed civilizing mission.', 'Exposes ideological justifications for racial hierarchy and imperialism.', 'European empires'],
      ['Berlin Conference', 'The 1884–1885 meeting at which European powers established rules for claiming African territory.', 'Accelerated the partition of Africa without African representation.', 'Africa and Europe'],
      ['Labor Unions', 'Organizations formed by workers to bargain collectively for better wages, hours, and conditions.', 'Show how industrial workers organized to challenge employer power and seek reform.', 'Industrial cities'],
    ],
    timeline: [
      { year: 1760, date: 'c. 1760', title: 'Industrialization accelerates in Britain', summary: 'Mechanized production expands in textiles and other industries.', significance: 'Begins a major transformation in labor and production.', apConnection: 'Explain the causes of industrialization.' },
      { year: 1776, date: '1776', title: 'Smith publishes The Wealth of Nations', summary: 'Adam Smith argues for specialization and market exchange.', significance: 'Influences debates about economic policy and capitalism.', apConnection: 'Compare economic ideologies.' },
      { year: 1848, date: '1848', title: 'Marx and Engels publish The Communist Manifesto', summary: 'They critique capitalism and describe class struggle.', significance: 'Industrial inequalities inspire organized ideological opposition.', apConnection: 'Use as evidence for responses to industrial capitalism.' },
      { year: 1850, date: 'mid-19th century', title: 'Industrialization spreads', summary: 'Factories and railways expand across Europe and North America.', significance: 'Industrial power increasingly shapes global competition.', apConnection: 'Trace the diffusion and effects of industrialization.' },
      { year: 1869, date: '1869', title: 'Suez Canal opens', summary: 'A canal connects the Mediterranean and Red seas.', significance: 'Shortens routes linking Europe and Asia and heightens strategic competition.', apConnection: 'Connect technology and imperial interests.' },
      { year: 1870, date: 'c. 1870', title: 'Second Industrial Revolution', summary: 'Steel, electricity, and chemical industries expand.', significance: 'Strengthens industrial economies and military capacity.', apConnection: 'Compare phases of industrial growth.' },
      { year: 1884, date: '1884–1885', title: 'Berlin Conference', summary: 'European powers establish procedures for claiming African territory.', significance: 'Intensifies imperial partition without African consent.', apConnection: 'Explain causes and consequences of imperialism.' },
      { year: 1899, date: '1899', title: 'Second Boer War begins', summary: 'Britain and Boer republics fight over southern African territory and resources.', significance: 'Shows imperial rivalry and resource interests in Africa.', apConnection: 'Analyze resistance and competition in imperial settings.' },
    ],
  },
  {
    id: 7, title: 'Global Conflict', period: '1900–present',
    overview: 'Examine how industrial warfare, nationalism, ideological conflict, and mass violence transformed societies during the world wars and beyond.',
    theme: 'War and global conflict',
    developments: ['Industrialized warfare and alliances turned regional crises into world wars.', 'World War I weakened empires and contributed to revolution and political instability.', 'Fascist regimes used nationalism, mass politics, and repression to consolidate power.', 'World War II involved total war, genocide, and the use of nuclear weapons.', 'International institutions emerged in an effort to prevent renewed global conflict.'],
    concepts: ['Industrial technology increased the scale and lethality of warfare.', 'Nationalism and alliances shaped the causes and spread of conflict.', 'War transformed states, economies, populations, and political ideologies.', 'Mass violence and genocide expose the consequences of extreme state power.'],
    rawTerms: [
      ['Militarism', 'The glorification and expansion of military power and preparedness.', 'Intensified international tensions before World War I.', 'Europe before 1914'],
      ['Alliances', 'Agreements among states for mutual support that shaped diplomatic calculations and wartime coalitions.', 'Helped transform a regional crisis into a wider conflict.', 'Europe and global wars'],
      ['World War I', 'A global conflict from 1914 to 1918 involving industrialized warfare and the collapse of several empires.', 'Redrew borders and destabilized societies and political systems.', 'Europe and global fronts'],
      ['Treaty of Versailles', 'The 1919 treaty that formally ended the war between Germany and the Allied powers and imposed conditions on Germany.', 'Its terms contributed to postwar grievances and political tensions.', 'Europe'],
      ['League of Nations', 'An international organization established after World War I to promote collective security and cooperation.', 'An early but limited attempt to prevent future wars.', 'Geneva and international diplomacy'],
      ['Russian Revolution', 'The 1917 revolutions that ended tsarist rule and led to a communist state.', 'Created a new ideological power and influenced global political movements.', 'Russia'],
      ['Lenin', 'A Bolshevik leader who helped establish the first durable communist state after the Russian Revolution.', 'Associated with revolutionary socialism and one-party rule.', 'Russia and Soviet Union'],
      ['Stalin', 'The Soviet leader who consolidated power and pursued forced collectivization and rapid industrialization.', 'Shows how authoritarian state policies reshaped society at immense human cost.', 'Soviet Union'],
      ['Fascism', 'An authoritarian ultranationalist ideology that rejected liberal democracy and glorified the state and military.', 'Fueled expansionism, repression, and political violence in the interwar period.', 'Italy and Europe'],
      ['Hitler', 'The Nazi leader of Germany who established a dictatorship and pursued expansion and racial persecution.', 'Central to the outbreak of World War II in Europe and the Holocaust.', 'Germany and Europe'],
      ['Holocaust', 'The genocide in which Nazi Germany and collaborators murdered six million Jews and millions of other victims.', 'Demonstrates the devastating consequences of racist ideology and state-organized persecution.', 'Europe'],
      ['World War II', 'A global war from 1939 to 1945 involving the Allied and Axis powers and unprecedented destruction.', 'Reshaped world power and led to the United Nations and a new global order.', 'Europe, Asia, and Pacific'],
    ],
    timeline: [
      { year: 1914, date: '1914', title: 'World War I begins', summary: 'An assassination crisis escalates among alliance systems.', significance: 'Industrial war expands across Europe and global empires.', apConnection: 'Explain causes through nationalism, militarism, and alliances.' },
      { year: 1917, date: '1917', title: 'Russian Revolution', summary: 'Revolution ends tsarist rule and brings Bolsheviks to power.', significance: 'Creates a communist state and alters the balance of global ideologies.', apConnection: 'Connect war to political revolution.' },
      { year: 1918, date: '1918', title: 'Armistice ends fighting', summary: 'The major combatants agree to stop fighting in World War I.', significance: 'Sets the stage for contested postwar settlements.', apConnection: 'Assess the consequences of global conflict.' },
      { year: 1919, date: '1919', title: 'Treaty of Versailles signed', summary: 'The Allies establish postwar terms with Germany.', significance: 'Creates grievances and a fragile international settlement.', apConnection: 'Trace causes of later conflict.' },
      { year: 1929, date: '1929', title: 'Great Depression begins', summary: 'A financial crisis triggers a global economic downturn.', significance: 'Weakens political stability and strengthens extremist movements in some countries.', apConnection: 'Contextualize the rise of authoritarianism.' },
      { year: 1939, date: '1939', title: 'World War II begins in Europe', summary: 'Germany invades Poland, leading to declarations of war.', significance: 'A second global war follows unresolved interwar tensions and aggression.', apConnection: 'Explain continuities from the post-World War I order.' },
      { year: 1941, date: '1941', title: 'War expands in the Pacific', summary: 'Japan attacks Pearl Harbor and the United States enters the war.', significance: 'The conflict becomes fully global.', apConnection: 'Analyze the global scope of World War II.' },
      { year: 1945, date: '1945', title: 'United Nations founded', summary: 'States establish a new international organization after World War II.', significance: 'Reflects an effort to improve collective security and cooperation.', apConnection: 'Compare international responses after the world wars.' },
    ],
  },
  {
    id: 8, title: 'Cold War and Decolonization', period: '1900–present',
    overview: 'Follow the ideological rivalry between superpowers and the independence movements that transformed Asia, Africa, and the Caribbean.',
    theme: 'Cold War and independence',
    developments: ['The United States and Soviet Union competed through alliances, aid, technology, and proxy wars.', 'Decolonization accelerated after World War II as nationalist movements challenged European empires.', 'Leaders and movements used different strategies, from mass civil disobedience to armed struggle.', 'Newly independent states sought economic development and political autonomy.', 'Nonalignment offered an alternative to formal alignment with either superpower.'],
    concepts: ['Superpower competition shaped conflicts and political choices beyond Europe.', 'Anti-colonial nationalism drew on local grievances and global principles of self-determination.', 'Independence did not automatically resolve economic inequality or internal divisions.', 'New states negotiated autonomy within an unequal global order.'],
    rawTerms: [
      ['Cold War', 'A prolonged geopolitical and ideological rivalry between the United States and Soviet Union after World War II.', 'Shaped alliances, interventions, and conflicts without a direct full-scale war between the superpowers.', 'Europe and the global arena'],
      ['Containment', 'A United States strategy intended to limit the spread of communism.', 'Helped justify aid, alliances, and military intervention during the Cold War.', 'Europe, Asia, and beyond'],
      ['Marshall Plan', 'A United States program providing economic assistance to rebuild Western Europe after World War II.', 'Supported recovery and strengthened ties with the United States.', 'Western Europe'],
      ['NATO', 'A military alliance founded in 1949 among the United States, Canada, and Western European states.', 'Institutionalized a Western collective defense bloc.', 'North Atlantic'],
      ['Warsaw Pact', 'A Soviet-led military alliance formed in 1955 with Eastern European communist states.', 'Consolidated the Soviet bloc in response to Western alliances.', 'Eastern Europe'],
      ['Mao Zedong', 'A communist revolutionary who led the Chinese Communist Party to power in 1949.', 'Created a major communist state outside the Soviet sphere and reshaped Chinese society.', 'China'],
      ['Decolonization', 'The process through which colonies gained independence from imperial powers.', 'Redrew political maps and created many new states after World War II.', 'Asia, Africa, and the Caribbean'],
      ['Gandhi', 'An Indian independence leader who promoted mass nonviolent resistance to British rule.', 'Demonstrates the use of civil disobedience and nonviolent mobilization in anticolonial struggle.', 'India'],
      ['Nonalignment', 'A policy by which states avoided formal alignment with either Cold War superpower bloc.', 'Expressed newly independent states’ desire for autonomy in global affairs.', 'Asia, Africa, and Latin America'],
      ['Proxy Wars', 'Conflicts in which major powers support opposing sides rather than fight each other directly.', 'Shows how the Cold War became violent in regions outside Europe.', 'Korea, Vietnam, Afghanistan, and elsewhere'],
      ['United Nations', 'An international organization founded in 1945 to promote peace, security, and cooperation.', 'Provided a forum for diplomacy and a platform for newly independent states.', 'Global'],
    ],
    timeline: [
      { year: 1945, date: '1945', title: 'World War II ends', summary: 'The war leaves European empires weakened and the United States and USSR powerful.', significance: 'Creates conditions for Cold War rivalry and rapid decolonization.', apConnection: 'Contextualize postwar global transformations.' },
      { year: 1947, date: '1947', title: 'India and Pakistan become independent', summary: 'British India is partitioned as the two states gain independence.', significance: 'Marks a major turning point in decolonization and mass migration.', apConnection: 'Compare paths and consequences of independence.' },
      { year: 1949, date: '1949', title: 'NATO founded; People’s Republic of China established', summary: 'Western states form an alliance as Chinese communists take power.', significance: 'The Cold War expands across Europe and Asia.', apConnection: 'Trace the spread of ideological rivalry.' },
      { year: 1950, date: '1950–1953', title: 'Korean War', summary: 'North and South Korea fight with major external support.', significance: 'An early proxy conflict militarizes Cold War competition in Asia.', apConnection: 'Explain how superpower rivalry shaped regional wars.' },
      { year: 1955, date: '1955', title: 'Bandung Conference', summary: 'Asian and African leaders meet to discuss solidarity and cooperation.', significance: 'Builds momentum for nonalignment and postcolonial collaboration.', apConnection: 'Connect decolonization to new global movements.' },
      { year: 1955, date: '1955', title: 'Warsaw Pact formed', summary: 'The Soviet Union and its allies establish a military alliance.', significance: 'Formalizes the division of Europe into rival blocs.', apConnection: 'Compare Cold War alliances.' },
      { year: 1960, date: '1960', title: 'Year of Africa', summary: 'Seventeen African countries gain independence.', significance: 'Accelerates the transformation of the international system.', apConnection: 'Trace decolonization across regions.' },
      { year: 1991, date: '1991', title: 'Soviet Union dissolves', summary: 'The Soviet Union breaks apart into independent republics.', significance: 'Ends the Cold War’s bipolar superpower structure.', apConnection: 'Assess continuity and change in global power.' },
    ],
  },
  {
    id: 9, title: 'Globalization', period: '1900–present',
    overview: 'Explore growing global interdependence through trade, technology, migration, culture, environmental change, and international institutions.',
    theme: 'Global interdependence',
    developments: ['Digital and transportation technologies accelerate communication and exchange.', 'Trade institutions and multinational corporations connect production across borders.', 'The Green Revolution increases agricultural yields but produces uneven social and environmental effects.', 'Cultural diffusion increases even as communities debate identity and homogenization.', 'Climate change, pandemics, and human rights concerns require transnational responses.'],
    concepts: ['Technology compresses time and distance but does not erase inequality.', 'Global production links consumers, workers, firms, and states across borders.', 'Cultural exchange can create hybrid forms as well as resistance.', 'Global challenges cross national boundaries and require cooperation.'],
    rawTerms: [
      ['Globalization', 'The increasing integration and interdependence of economies, societies, cultures, and political systems.', 'Frames analysis of late twentieth- and twenty-first-century connections and inequalities.', 'Worldwide'],
      ['Green Revolution', 'The spread of high-yield crops, fertilizers, irrigation, and farming technologies in the mid-twentieth century.', 'Raised food production while contributing to uneven benefits and environmental pressures.', 'South Asia and other regions'],
      ['Internet', 'A global system of interconnected digital networks that enables rapid communication and information exchange.', 'Accelerates economic, cultural, and political connections across distance.', 'Worldwide'],
      ['European Union', 'A regional political and economic union that coordinates trade and policy among European member states.', 'Illustrates regional integration and shared governance in a globalizing era.', 'Europe'],
      ['Climate Change', 'Long-term shifts in climate patterns, increasingly driven by human greenhouse-gas emissions.', 'Demonstrates how industrial development creates transnational environmental consequences.', 'Worldwide'],
      ['World Trade Organization', 'An international body established in 1995 to set rules and negotiate aspects of global trade.', 'Shows the growth of institutions governing an integrated world economy.', 'Worldwide'],
      ['Outsourcing', 'The contracting of business tasks or production to external providers, often in other countries.', 'Connects global labor markets and reorganizes production across borders.', 'Global production networks'],
      ['Multinational Corporations', 'Companies that own or manage production and business operations in multiple countries.', 'Are major actors in global investment, production, and labor relationships.', 'Worldwide'],
      ['Cultural Diffusion', 'The spread and adaptation of cultural practices, ideas, and products through contact.', 'Helps explain cultural exchange, hybridization, and debates about local identity.', 'Worldwide'],
      ['Pandemics', 'Epidemics that spread across multiple countries or continents through connected populations.', 'Reveal how mobility and global interdependence can transmit health risks.', 'Worldwide'],
      ['Human Rights', 'Rights understood to belong to all people, regardless of nationality or other status.', 'Provides a framework for evaluating global institutions, activism, and state practices.', 'International institutions and societies'],
    ],
    timeline: [
      { year: 1944, date: '1944', title: 'Bretton Woods agreements', summary: 'Delegates plan postwar financial institutions and monetary cooperation.', significance: 'Builds the institutional foundations of the postwar global economy.', apConnection: 'Explain how international institutions shape economic integration.' },
      { year: 1945, date: '1945', title: 'United Nations founded', summary: 'States establish a new global organization after World War II.', significance: 'Creates a forum for diplomacy and human rights initiatives.', apConnection: 'Connect global governance to international cooperation.' },
      { year: 1960, date: '1960s', title: 'Green Revolution expands', summary: 'High-yield seeds and agricultural inputs spread across regions.', significance: 'Raises yields but changes rural livelihoods and environmental conditions.', apConnection: 'Evaluate both benefits and costs of technological change.' },
      { year: 1989, date: '1989', title: 'World Wide Web proposed', summary: 'Tim Berners-Lee proposes a system for sharing information over the internet.', significance: 'Digital networks later accelerate communication and commerce.', apConnection: 'Analyze the impact of communication technologies.' },
      { year: 1991, date: '1991', title: 'World Wide Web made publicly available', summary: 'The web becomes available for wider public use.', significance: 'Contributes to rapid expansion of global digital connections.', apConnection: 'Connect technology to cultural and economic globalization.' },
      { year: 1995, date: '1995', title: 'World Trade Organization established', summary: 'The WTO begins administering global trade agreements.', significance: 'Formalizes rules for a more integrated international economy.', apConnection: 'Assess the role of global institutions.' },
      { year: 2001, date: '2001', title: 'China joins the WTO', summary: 'China enters the World Trade Organization.', significance: 'Accelerates changes in global manufacturing and trade.', apConnection: 'Explain shifts in global economic interdependence.' },
      { year: 2015, date: '2015', title: 'Paris climate agreement adopted', summary: 'Countries commit to address climate change through national plans.', significance: 'Shows both the scale of shared environmental challenges and the difficulty of cooperation.', apConnection: 'Evaluate responses to global challenges.' },
    ],
  },
]

export const units: Unit[] = rawUnits.map(({ rawTerms, ...unit }) => ({
  ...unit,
  terms: rawTerms.map(([term, definition, significance, region]) => ({
    term,
    definition,
    significance,
    region,
    whyItMatters: `College Board values ${term} as evidence for explaining ${unit.theme.toLowerCase()}, including the broader pattern of ${significance.charAt(0).toLowerCase()}${significance.slice(1)}`,
    apExample: `Use ${term} as specific evidence to support an argument about ${unit.title.toLowerCase()}: ${significance}`,
  })),
}))

export type MCQType = 'Stimulus' | 'Map analysis' | 'Image analysis' | 'Historical interpretation' | 'Comparison' | 'Continuity and change' | 'Causation'
export type CurriculumQuestion = {
  id: string
  unitId: number
  type: MCQType
  topic: string
  prompt: string
  stimulus: string
  choices: string[]
  answer: string
  explanation: string
}

const questionPatterns: { type: MCQType; build: (term: CurriculumTerm, variation: number) => { prompt: string; stimulus: string } }[] = [
  { type: 'Stimulus', build: term => ({ prompt: 'Which historical development is best supported by this evidence?', stimulus: `Historical evidence describes ${term.definition}` }) },
  { type: 'Map analysis', build: term => ({ prompt: `A map highlights ${term.region}. Which development is most closely associated with this regional pattern?`, stimulus: `MAP EVIDENCE · ${term.region}` }) },
  { type: 'Image analysis', build: term => ({ prompt: 'Which concept would best help a historian contextualize this visual source?', stimulus: `VISUAL SOURCE DESCRIPTION · An illustration represents a practice or institution connected to ${term.term}: ${term.definition}` }) },
  { type: 'Historical interpretation', build: term => ({ prompt: 'Which development most directly supports the interpretation in the stimulus?', stimulus: `HISTORIAN'S CLAIM · ${term.significance}` }) },
  { type: 'Comparison', build: (term, variation) => ({ prompt: `Which concept is most directly connected to this evidence${variation % 2 ? ' when comparing developments across regions' : ' in a comparison of historical societies'}?`, stimulus: `COMPARATIVE EVIDENCE · ${term.definition}` }) },
  { type: 'Continuity and change', build: term => ({ prompt: 'Which concept best helps explain the historical pattern described?', stimulus: `CHANGE OVER TIME · ${term.significance}` }) },
  { type: 'Causation', build: term => ({ prompt: 'Which development is most closely associated with the cause-and-effect relationship described?', stimulus: `CAUSAL EVIDENCE · ${term.significance}` }) },
  { type: 'Stimulus', build: (term, variation) => ({ prompt: variation % 2 ? 'Which term best identifies the process discussed by the source?' : 'Which historical concept is most directly illustrated by this source?', stimulus: `SOURCE SUMMARY · ${term.definition}` }) },
  { type: 'Map analysis', build: term => ({ prompt: 'Which development would most likely appear in a map focused on this place and period?', stimulus: `GEOGRAPHIC CONTEXT · ${term.region}; ${term.significance}` }) },
  { type: 'Historical interpretation', build: term => ({ prompt: 'Which term would provide the strongest evidence for this historical argument?', stimulus: `ARGUMENT · ${term.apExample}` }) },
]

// Keep one question per key term in each practice set so the same answer is not
// repeated through near-identical prompt variations.
export const mcqBank: CurriculumQuestion[] = units.flatMap(unit => unit.terms.map((term, termIndex) => {
    const variation = termIndex % questionPatterns.length
    const pattern = questionPatterns[variation]
    const { prompt, stimulus } = pattern.build(term, variation)
    const distractors = Array.from({ length: 3 }, (_, offset) => unit.terms[(termIndex + 1 + variation + offset * 3) % unit.terms.length].term)
      .filter((value, index, values) => value !== term.term && values.indexOf(value) === index)
    while (distractors.length < 3) distractors.push(units[(unit.id + distractors.length) % units.length].terms[0].term)
    const insertAt = (termIndex + variation) % 4
    const choices = [...distractors.slice(0, 3)]
    choices.splice(insertAt, 0, term.term)
    return {
      id: `u${unit.id}-mcq-${termIndex}-${variation}`,
      unitId: unit.id,
      type: pattern.type,
      topic: term.term,
      prompt,
      stimulus,
      choices,
      answer: term.term,
      explanation: `${term.significance} ${term.whyItMatters}.`,
    }
  }),
))

export type SAQPrompt = { id: string; unitId: number; prompt: string; answerKey: string[] }
export const saqBank: SAQPrompt[] = units.flatMap(unit => Array.from({ length: 25 }, (_, index) => {
  const term = unit.terms[index % unit.terms.length]
  const partner = unit.terms[(index + 1) % unit.terms.length]
  const asks = [
    `Identify one historical development connected to ${term.term} and explain one reason it emerged.`,
    `Explain one effect of ${term.term} on political, economic, or social relationships in ${term.region}.`,
    `Explain one similarity or difference between ${term.term} and ${partner.term}.`,
    `Explain one way ${term.term} illustrates a broader change during ${unit.period}.`,
    `Explain one historical consequence of the development described here: ${term.definition}`,
  ]
  return {
    id: `u${unit.id}-saq-${index + 1}`,
    unitId: unit.id,
    prompt: asks[index % asks.length],
    answerKey: [`A defensible response may identify ${term.term}: ${term.definition}`, term.significance, `Relevant evidence may also include ${partner.term}.`],
  }
}))

export type LEQPrompt = { id: string; unitId: number; prompt: string; thesis: string; contextualization: string; evidence: string[] }
export const leqBank: LEQPrompt[] = units.flatMap(unit => Array.from({ length: 15 }, (_, index) => {
  const term = unit.terms[index % unit.terms.length]
  const second = unit.terms[(index + 1) % unit.terms.length]
  const skill = ['causes', 'consequences', 'similarities and differences', 'continuities and changes over time', 'the relative importance of'][index % 5]
  return {
    id: `u${unit.id}-leq-${index + 1}`,
    unitId: unit.id,
    prompt: `Evaluate the ${skill} of ${term.term} and related developments in ${unit.period}.`,
    thesis: `${term.term} was significant because ${term.significance.charAt(0).toLowerCase()}${term.significance.slice(1)} Although ${second.term} also shaped ${unit.theme.toLowerCase()}, the changes associated with ${term.term} had a distinct impact.`,
    contextualization: `Before and during ${unit.period}, societies in ${term.region} experienced wider changes in ${unit.theme.toLowerCase()}. These regional conditions shaped the development of ${term.term}.`,
    evidence: [`${term.term}: ${term.definition}`, `${second.term}: ${second.significance}`, ...unit.developments.slice(index % unit.developments.length, index % unit.developments.length + 1)],
  }
}))

export type DBQ = { id: string; title: string; prompt: string; context: string; documents: { attribution: string; summary: string; sourcing: string }[]; rubric: string[] }
export const dbqBank: DBQ[] = [
  { id: 'dbq-1', title: 'Trade and cultural exchange', prompt: 'Evaluate the extent to which trade networks transformed societies in Afro-Eurasia from c. 1200 to 1450.', context: 'The growth of Mongol rule, merchant infrastructure, and maritime navigation increased contact across Afro-Eurasia.', documents: [{ attribution: 'Practice document A · merchant account, c. 1300 (summary)', summary: 'A merchant describes caravan stops, long-distance exchange, and the passage of goods through several hands.', sourcing: 'Consider how a merchant’s commercial purpose may emphasize benefits and practical risks.' }, { attribution: 'Practice document B · port-city record, c. 1400 (summary)', summary: 'A port record notes foreign merchants, seasonal sailing, and religious communities living near the harbor.', sourcing: 'Consider how an administrative record reflects the priorities of port authorities.' }, { attribution: 'Practice document C · later chronicle (summary)', summary: 'A chronicler links epidemic disease to movement along heavily traveled routes.', sourcing: 'Consider how writing after a crisis shapes the author’s explanation of its cause.' }], rubric: ['Thesis: make a historically defensible claim that establishes a line of reasoning.', 'Contextualization: explain a broader development relevant to the prompt.', 'Evidence: use at least two documents and one specific piece of outside evidence.', 'Analysis: explain how sourcing or point of view affects the interpretation of at least two documents.', 'Complexity: qualify the argument or explain meaningful variation.'] },
  { id: 'dbq-2', title: 'Land-based empires and authority', prompt: 'Evaluate the methods rulers used to consolidate land-based empires from 1450 to 1750.', context: 'Gunpowder weapons, administrative systems, religious legitimacy, and expanding territorial states shaped early modern imperial competition.', documents: [{ attribution: 'Practice document A · imperial decree (summary)', summary: 'A ruler describes the appointment of officials and the obligations of military service.', sourcing: 'Consider the decree’s purpose in defining loyalty and state authority.' }, { attribution: 'Practice document B · court visitor’s account (summary)', summary: 'A traveler describes a capital, an imperial ceremony, and its diverse subjects.', sourcing: 'Consider how an outsider’s perspective may shape descriptions of cultural difference.' }, { attribution: 'Practice document C · religious community petition (summary)', summary: 'Community leaders request protection for local worship and institutions.', sourcing: 'Consider the petitioners’ audience and their need to persuade the ruler.' }], rubric: ['Thesis and reasoning: identify multiple methods of consolidation.', 'Context: situate imperial expansion in early modern state-building.', 'Evidence: accurately use two documents and specific outside evidence.', 'Sourcing: explain the value or limitation of at least two sources.', 'Complexity: compare imperial strategies or explain variation over time.'] },
  { id: 'dbq-3', title: 'Oceanic exchange and labor', prompt: 'Evaluate the effects of transoceanic connections on labor systems in the period 1450–1750.', context: 'European maritime expansion linked the Americas to Africa and Afro-Eurasia, creating new imperial economies and coercive labor demands.', documents: [{ attribution: 'Practice document A · colonial official’s report (summary)', summary: 'An official describes the organization of labor in a colonial mining district.', sourcing: 'Consider how an official’s administrative role shapes the account.' }, { attribution: 'Practice document B · abolitionist petition (summary)', summary: 'A petitioner recounts the violence and family separation caused by enslavement.', sourcing: 'Consider the author’s reform goal and intended audience.' }, { attribution: 'Practice document C · plantation inventory (summary)', summary: 'An account records crops, equipment, and enslaved laborers as property.', sourcing: 'Consider how an economic record represents people and production.' }], rubric: ['Defensible thesis addressing the effects on labor.', 'Contextualization of oceanic exploration and colonial expansion.', 'Evidence from documents and outside evidence such as the Atlantic slave trade.', 'Sourcing analysis for at least two documents.', 'Complexity through comparison of labor systems or regional outcomes.'] },
  { id: 'dbq-4', title: 'Revolutionary ideas and change', prompt: 'Evaluate the extent to which revolutions transformed political and social hierarchies from 1750 to 1900.', context: 'Enlightenment thought, imperial tensions, and social inequalities contributed to revolutionary movements across the Atlantic world.', documents: [{ attribution: 'Practice document A · revolutionary declaration (summary)', summary: 'A declaration claims that political authority should rest on the people and natural rights.', sourcing: 'Consider how a declaration seeks legitimacy during a political break.' }, { attribution: 'Practice document B · formerly enslaved revolutionary’s testimony (summary)', summary: 'A speaker describes how emancipation changed political expectations but did not end inequality.', sourcing: 'Consider how personal experience and audience affect the testimony.' }, { attribution: 'Practice document C · conservative observer’s letter (summary)', summary: 'An observer warns that rapid political change threatens social order.', sourcing: 'Consider the observer’s social position and political goals.' }], rubric: ['Thesis that evaluates degree of transformation.', 'Contextualize Enlightenment and imperial conditions.', 'Use evidence from documents and specific revolutionary examples.', 'Explain sourcing for at least two documents.', 'Address both change and limits or continuity.'] },
  { id: 'dbq-5', title: 'Industrialization and society', prompt: 'Evaluate the effects of industrialization on social and economic relationships from 1750 to 1900.', context: 'Mechanized production first expanded in Britain and later spread, creating new labor patterns, markets, and social classes.', documents: [{ attribution: 'Practice document A · factory inspection report (summary)', summary: 'An inspector describes working hours, machinery, and conditions in a manufacturing town.', sourcing: 'Consider the report’s reform purpose and the inspector’s access to workplaces.' }, { attribution: 'Practice document B · industrialist’s statement (summary)', summary: 'A business owner argues that investment and markets increase production and prosperity.', sourcing: 'Consider how the author’s economic interests shape the argument.' }, { attribution: 'Practice document C · worker organization petition (summary)', summary: 'Workers demand limits on hours and safer conditions through collective action.', sourcing: 'Consider the group’s goals and intended political audience.' }], rubric: ['Defensible thesis on social and economic effects.', 'Contextualize technological and economic change.', 'Use document and outside evidence such as labor unions or capitalism.', 'Analyze sourcing for two documents.', 'Explain uneven effects or competing perspectives.'] },
  { id: 'dbq-6', title: 'Imperialism and resistance', prompt: 'Evaluate the causes and effects of imperial expansion in the period 1750–1900.', context: 'Industrial economies increased demand for resources and markets while national competition and racial ideologies shaped imperial policy.', documents: [{ attribution: 'Practice document A · imperial policy speech (summary)', summary: 'A politician defends overseas expansion as a duty and a source of national strength.', sourcing: 'Consider the intended audience and ideological purpose of the speech.' }, { attribution: 'Practice document B · African ruler’s correspondence (summary)', summary: 'A ruler describes negotiations and attempts to preserve sovereignty amid European pressure.', sourcing: 'Consider the writer’s political aims and unequal diplomatic context.' }, { attribution: 'Practice document C · commercial report (summary)', summary: 'A company report identifies resources and routes valuable to investors.', sourcing: 'Consider how commercial motives influence what the report emphasizes.' }], rubric: ['Thesis evaluating causes or effects.', 'Contextualize industrial and state competition.', 'Use documents and outside evidence such as the Berlin Conference.', 'Source analysis of at least two documents.', 'Complexity through resistance and local variation.'] },
  { id: 'dbq-7', title: 'War and political transformation', prompt: 'Evaluate the extent to which global conflict transformed political systems from 1900 to 1945.', context: 'Nationalism, alliances, industrialized weapons, and imperial rivalries contributed to two global wars and revolutionary change.', documents: [{ attribution: 'Practice document A · wartime poster (summary)', summary: 'A government poster calls for sacrifice and portrays the conflict as a defense of the nation.', sourcing: 'Consider the poster’s persuasive purpose and mass audience.' }, { attribution: 'Practice document B · postwar treaty summary (practice source)', summary: 'A peace settlement assigns responsibility and imposes territorial and economic conditions.', sourcing: 'Consider the power relationships among the negotiators.' }, { attribution: 'Practice document C · survivor testimony (summary)', summary: 'A survivor describes state persecution and the destruction of a community.', sourcing: 'Consider the testimony’s personal perspective and historical significance.' }], rubric: ['Thesis with a clear line of reasoning.', 'Contextualize the causes and scale of global war.', 'Use documents and outside evidence, including political revolutions.', 'Analyze sourcing for two documents.', 'Address both political transformation and continuity.'] },
  { id: 'dbq-8', title: 'Decolonization and the Cold War', prompt: 'Evaluate how Cold War rivalries affected decolonization and newly independent states after 1945.', context: 'World War II weakened European empires while the United States and Soviet Union competed for allies and influence.', documents: [{ attribution: 'Practice document A · independence movement platform (summary)', summary: 'A movement demands self-rule and describes colonial political and economic inequalities.', sourcing: 'Consider how the movement’s audience and goals shape its demands.' }, { attribution: 'Practice document B · superpower aid proposal (summary)', summary: 'A government offers development assistance while warning against alignment with its rival.', sourcing: 'Consider strategic motives behind economic aid.' }, { attribution: 'Practice document C · nonaligned conference statement (summary)', summary: 'Leaders call for cooperation and independence from both superpower blocs.', sourcing: 'Consider how recently independent states seek to influence global diplomacy.' }], rubric: ['Thesis evaluating Cold War influence.', 'Contextualization of postwar imperial decline.', 'Document and outside evidence such as nonalignment or proxy wars.', 'Sourcing analysis for two documents.', 'Complexity through local agency and superpower pressures.'] },
  { id: 'dbq-9', title: 'Global economic integration', prompt: 'Evaluate the effects of economic globalization on societies since 1945.', context: 'Postwar institutions, new technologies, and multinational production increased economic ties across national borders.', documents: [{ attribution: 'Practice document A · trade institution report (summary)', summary: 'A report argues that trade rules and market access promote growth.', sourcing: 'Consider the institution’s mandate and the measures it uses to assess success.' }, { attribution: 'Practice document B · factory worker interview (summary)', summary: 'A worker describes new employment opportunities and insecurity tied to international production.', sourcing: 'Consider how the interviewee’s position shapes the account.' }, { attribution: 'Practice document C · local business association statement (summary)', summary: 'A group describes competition from imported goods and changes in local identity.', sourcing: 'Consider the group’s economic interests and intended audience.' }], rubric: ['Thesis evaluates effects, not just describes them.', 'Contextualize postwar global institutions and technology.', 'Use document and outside evidence such as outsourcing or multinational corporations.', 'Analyze sourcing for two documents.', 'Explain uneven impacts across groups or regions.'] },
  { id: 'dbq-10', title: 'Technology and global connections', prompt: 'Evaluate the extent to which technology transformed global connections from 1900 to the present.', context: 'Industrial transport, mass communication, digital networks, and medical technology altered the pace and reach of global interactions.', documents: [{ attribution: 'Practice document A · early twentieth-century transport advertisement (summary)', summary: 'An advertisement presents new transport as a way to shorten distance and expand commerce.', sourcing: 'Consider the commercial purpose and intended consumers.' }, { attribution: 'Practice document B · digital communication access survey (practice source)', summary: 'A survey records uneven internet access across income groups and regions.', sourcing: 'Consider the survey’s methodology and what its measures omit.' }, { attribution: 'Practice document C · public health notice (summary)', summary: 'A health authority describes disease monitoring across international travel networks.', sourcing: 'Consider the authority’s responsibility and the context of a public health emergency.' }], rubric: ['Defensible thesis on the extent of change.', 'Contextualize earlier communication and transportation networks.', 'Use documents and outside evidence such as the internet or pandemics.', 'Source analysis for two documents.', 'Complexity through benefits, risks, and unequal access.'] },
]

export const examSkills = [
  { title: 'Cause and Effect', description: 'Explain why a development occurred and what changed as a result. Build a chain of reasoning instead of listing events.', example: 'Mongol political consolidation increased security along parts of the Silk Roads; safer movement encouraged more trade and cultural exchange.' },
  { title: 'Comparison', description: 'Use a shared basis of comparison to explain meaningful similarities and differences across societies or periods.', example: 'Both Mali and Srivijaya gained influence from trade, but Mali controlled trans-Saharan routes while Srivijaya leveraged maritime chokepoints.' },
  { title: 'Continuity and Change over Time (CCOT)', description: 'Identify what changed, what persisted, and why across a defined period.', example: 'Oceanic exchange expanded after 1450, while older regional trade networks continued to shape the movement of goods and ideas.' },
  { title: 'Contextualization', description: 'Describe broader historical developments that help explain the setting for the prompt.', example: 'Before Atlantic voyages, Afro-Eurasian trade connected distant markets; maritime technology and state competition later expanded those connections across oceans.' },
  { title: 'Sourcing', description: 'Explain how a source’s point of view, purpose, historical situation, or audience matters to an argument.', example: 'A merchant’s account may emphasize the safety and profitability of a route because the author depended on trade for a living.' },
  { title: 'Argumentation', description: 'Make a defensible claim, organize evidence, and explain how that evidence supports your reasoning.', example: 'Although political aims differed, trade networks reshaped societies by encouraging urban growth and spreading beliefs across regions.' },
]

