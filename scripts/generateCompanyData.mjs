import fs from "fs";
import path from "path";

const categories = [
  { id: "public-sector-banks", title: "Public Sector Banks" },
  { id: "private-sector-banks", title: "Private Sector Banks" },
  { id: "small-finance-payments-banks", title: "Small Finance & Payments Banks" },
  { id: "nbfc-financial-services", title: "Financial Services (NBFCs)" },
  { id: "life-insurance", title: "Life Insurance" },
  { id: "general-insurance", title: "General Insurance" },
  { id: "asset-management", title: "Mutual Funds & Asset Management" },
  { id: "housing-finance", title: "Housing Finance Companies (HFCs)" }
];

const rawData = {
  "public-sector-banks": [
    { name: "State Bank of India (SBI)", logo: "sbi.png", website: "https://sbi.co.in" },
    { name: "Bank of Baroda (BoB)", logo: "BankOfBaroda.png", website: "https://www.bankofbaroda.in" },
    { name: "Punjab National Bank (PNB)", logo: "pnb.png", website: "https://www.pnbindia.in" },
    { name: "Canara Bank", logo: "canara.png", website: "https://canarabank.com" },
    { name: "Union Bank of India", logo: "UnionBank.png", website: "https://www.unionbankofindia.co.in" },
    { name: "Indian Bank", logo: "Indianbank.png", website: "https://indianbank.in" },
    { name: "Bank of India", logo: "bankofIndia.jpg", website: "https://bankofindia.co.in" },
    { name: "UCO Bank", logo: "UCOBank.jpg", website: "https://www.ucobank.com" },
    { name: "Bank of Maharashtra", logo: "Bank_of_Maharashtra.png", website: "https://bankofmaharashtra.in" },
    { name: "Central Bank of India", logo: "central_bank.png", website: "https://www.centralbankofindia.co.in" }
  ],
  "private-sector-banks": [
    { name: "HDFC Bank", logo: "hdfc_bank.png", website: "https://www.hdfcbank.com" },
    { name: "ICICI Bank", logo: "ICICI.png", website: "https://www.icicibank.com" },
    { name: "Axis Bank", logo: "Axis.png", website: "https://www.axisbank.com" },
    { name: "Kotak Mahindra Bank", logo: "Kotak.png", website: "https://www.kotak.com" },
    { name: "IndusInd Bank", logo: "indusIndBankCom.png", website: "https://www.indusind.com" },
    { name: "Yes Bank", logo: "Yes_Bank.png", website: "https://www.yesbank.in" },
    { name: "RBL Bank", logo: "RBL.png", website: "https://www.rblbank.com" },
    { name: "Bandhan Bank", logo: "bandhan.png", website: "https://www.bandhanbank.com" }
  ],
  "small-finance-payments-banks": [
    { name: "Equitas Small Finance Bank", logo: "equitas_sfb.png", website: "https://www.equitasbank.com" },
    { name: "Ujjivan Small Finance Bank", logo: "Ujjivan.png", website: "https://www.ujjivansfb.in" },
    { name: "India Post Payments Bank (IPPB)", logo: "india-post.png", website: "https://www.ippbonline.com" },
    { name: "Airtel Payments Bank", logo: "airtel_pb.png", website: "https://www.airtel.in/bank" }
  ],
  "nbfc-financial-services": [
    { name: "Bajaj Finance", logo: "Bajaj_Finserve.jpeg", website: "https://www.bajajfinserv.in" },
    { name: "HDB Financial Services", logo: "HDB.png", website: "https://www.hdbfs.com" },
    { name: "Muthoot Finance", logo: "Muthoot_Finance.png", website: "https://www.muthootfinance.com" },
    { name: "L&T Finance", logo: "Landt Finance.png", website: "https://www.ltfs.com" },
    { name: "Tata Capital", logo: "TATA capital.png", website: "https://www.tatacapital.com" },
    { name: "Shriram Finance", logo: "shriram.png", website: "https://www.shriramfinance.in" },
    { name: "Piramal Finance", logo: "piramal.png", website: "https://www.piramalfinance.com" },
    { name: "Cholamandalam Investment and Finance Company", logo: "Chola.png", website: "https://www.cholamandalam.com" },
    { name: "Mahindra & Mahindra Financial Services", logo: "mahindra_finance.png", website: "https://www.mahindrafinance.com" }
  ],
  "life-insurance": [
    { name: "Life Insurance Corporation of India (LIC)", logo: "LIC_insurance.png", website: "https://licindia.in" },
    { name: "HDFC Life Insurance", logo: "hdfc_life.png", website: "https://www.hdfclife.com" },
    { name: "ICICI Prudential Life Insurance", logo: "ICICI_prudential.png", website: "https://www.iciciprulife.com" },
    { name: "SBI Life Insurance", logo: "SBI_life.png", website: "https://www.sbilife.co.in" },
    { name: "Max Life Insurance", logo: "Max_Life_Insurance.png", website: "https://www.maxlifeinsurance.com" },
    { name: "Tata AIA Life Insurance", logo: "TATA_AIA.png", website: "https://www.tataaia.com" },
    { name: "Kotak Life Insurance", logo: "Kotak_Life.png", website: "https://www.kotaklife.com" }
  ],
  "general-insurance": [
    { name: "HDFC ERGO General Insurance", logo: null, website: "https://www.hdfcergo.com" },
    { name: "ICICI Lombard General Insurance", logo: null, website: "https://www.icicilombard.com" },
    { name: "SBI General Insurance", logo: null, website: "https://www.sbigeneral.in" },
    { name: "Go Digit General Insurance", logo: null, website: "https://www.godigit.com" },
    { name: "Bajaj Allianz General Insurance", logo: "Bajaj_Finserve.jpeg", website: "https://www.bajajallianz.com" },
    { name: "United India Insurance", logo: null, website: "https://uiic.co.in" },
    { name: "The New India Assurance", logo: null, website: "https://www.newindia.co.in" }
  ],
  "asset-management": [
    { name: "HDFC Asset Management Company", logo: "hdfc_bank.png", website: "https://www.hdfcfund.com" },
    { name: "ICICI Prudential Asset Management Company", logo: "ICICI.png", website: "https://www.icicipruamc.com" },
    { name: "SBI Funds Management (SBI Mutual Fund)", logo: "sbi.png", website: "https://www.sbimf.com" },
    { name: "Nippon India Mutual Fund", logo: null, website: "https://www.nipponindiamf.com" },
    { name: "Aditya Birla Sun Life AMC", logo: "Aditya.png", website: "https://mutualfund.adityabirlacapital.com" },
    { name: "Kotak Mahindra Asset Management Company", logo: "Kotak.png", website: "https://www.kotakmf.com" },
    { name: "UTI Asset Management Company", logo: null, website: "https://www.utimf.com" },
    { name: "Axis Asset Management Company", logo: "Axis.png", website: "https://www.axismf.com" }
  ],
  "housing-finance": [
    { name: "Aadhar Housing Finance Ltd", logo: null, website: "https://www.aadharhousing.com" },
    { name: "Aavas Financiers Ltd", logo: "AAVAS.png", website: "https://www.aavas.in" },
    { name: "Aditya Birla Housing Finance Ltd", logo: "Aditya.png", website: "https://www.adityabirlacapital.com/housing-finance" },
    { name: "Bajaj Housing Finance Ltd", logo: "bajaj_hfc.png", website: "https://www.bajajhousingfinance.in" },
    { name: "Can Fin Homes Ltd", logo: null, website: "https://www.canfinhomes.com" },
    { name: "Cholamandalam Housing Finance", logo: "Chola.png", website: "https://www.cholamandalam.com" },
    { name: "Five-Star Business Finance Ltd", logo: null, website: "https://fivestargroup.in" },
    { name: "GIC Housing Finance Ltd", logo: null, website: "https://www.gichfindia.com" },
    { name: "HDFC Bank (formerly HDFC Housing Finance)", logo: "hdfc_bank.png", website: "https://www.hdfc.com" },
    { name: "Hero Housing Finance Ltd", logo: "hero-fincorp.png", website: "https://www.herohousingfinance.com" },
    { name: "ICICI Home Finance Co. Ltd", logo: "ICICI.png", website: "https://www.icicihfc.com" },
    { name: "IIFL Home Finance Ltd", logo: "IIFL.png", website: "https://www.iifl.com/home-loans" },
    { name: "India Home Loan Ltd", logo: null, website: "https://indiahomeloan.co.in" },
    { name: "LIC Housing Finance Ltd", logo: "LICHFL.png", website: "https://www.lichousing.com" },
    { name: "L&T Housing Finance Ltd", logo: "Landt Finance.png", website: "https://www.ltfs.com" },
    { name: "PNB Housing Finance Ltd", logo: "pnb.png", website: "https://www.pnbhousing.com" },
    { name: "Repco Home Finance", logo: null, website: "https://www.repcohome.com" },
    { name: "Sammaan Capital (formerly Indiabulls Housing Finance)", logo: "samman.png", website: "https://www.sammaancapital.com" },
    { name: "Shriram Housing Finance Ltd", logo: "shriram.png", website: "https://www.shriramhousing.in" },
    { name: "SMFG India Home Finance Company Ltd", logo: "smfg.png", website: "https://www.smfgcsv.com" },
    { name: "Sundaram Home Finance", logo: null, website: "https://www.sundaramhome.in" },
    { name: "Tata Capital Housing Finance Ltd", logo: "TATA capital.png", website: "https://www.tatacapitalhousingfinance.com" },
    { name: "Ummeed Housing Finance Private Limited", logo: null, website: "https://www.ummeedhfc.com" }
  ]
};

const defaultSummary = (name, categoryTitle) => {
  return `${name} operates within India's ${categoryTitle.toLowerCase()} segment. Detailed profile and history will be published soon.`;
};

const slugify = (value) => {
  return value
    .toLowerCase()
    .replace(/\([^)]*\)/g, " ")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

const baseDir = path.resolve("src/pages/banks/data");
fs.mkdirSync(baseDir, { recursive: true });

const companies = [];

for (const category of categories) {
  const entries = rawData[category.id] || [];
  for (const entry of entries) {
    const name = entry.name.trim();
    const slug = entry.slug ? entry.slug : slugify(name);
    const summary = entry.summary ? entry.summary : defaultSummary(name, category.title);
    const logo = entry.logo ? `/images/banks/${entry.logo}` : null;
    const website = entry.website || null;

    companies.push({
      name,
      slug,
      category: category.id,
      logo,
      website,
      summary
    });
  }
}

companies.sort((a, b) => a.name.localeCompare(b.name));

const fileContent = `export const categories = ${JSON.stringify(categories, null, 2)};\n\nexport const companies = ${JSON.stringify(companies, null, 2)};\n`;

fs.writeFileSync(path.join(baseDir, "companyData.js"), fileContent, "utf8");
