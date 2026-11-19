/**
 * Applicant geography.
 *
 * Two independent signals, deliberately kept apart because they answer
 * different questions:
 *
 * - Phone-derived: where the NUMBER was issued. Cheap and always available,
 *   but North American numbers are portable, so someone who moved from Ohio to
 *   Texas keeps an Ohio area code forever. Treat it as a hint, not a fact.
 * - Request-derived: where the applicant actually WAS when they applied, from
 *   the edge geo headers. More accurate for country/region, absent in local
 *   development, and defeated by a VPN.
 *
 * County is deliberately not derived. A North American area code spans many
 * counties, so any county value would be invented rather than known.
 */

// area code -> [state or province, country]. Built from the public
// Area-Code-Geolocation-Database, collapsed to the dominant region per code.
const NANP_AREA_CODES: Record<string, [string, string]> = {
  "201": ["New Jersey", "US"],
  "202": ["District of Columbia", "US"],
  "203": ["Connecticut", "US"],
  "204": ["Manitoba", "CA"],
  "205": ["Alabama", "US"],
  "206": ["Washington", "US"],
  "207": ["Maine", "US"],
  "208": ["Idaho", "US"],
  "209": ["California", "US"],
  "210": ["Texas", "US"],
  "212": ["New York", "US"],
  "213": ["California", "US"],
  "214": ["Texas", "US"],
  "215": ["Pennsylvania", "US"],
  "216": ["Ohio", "US"],
  "217": ["Illinois", "US"],
  "218": ["Minnesota", "US"],
  "219": ["Indiana", "US"],
  "220": ["Ohio", "US"],
  "224": ["Illinois", "US"],
  "225": ["Louisiana", "US"],
  "226": ["Ontario", "CA"],
  "228": ["Mississippi", "US"],
  "229": ["Georgia", "US"],
  "231": ["Michigan", "US"],
  "234": ["Ohio", "US"],
  "236": ["British Columbia", "CA"],
  "239": ["Florida", "US"],
  "240": ["Maryland", "US"],
  "248": ["Michigan", "US"],
  "249": ["Ontario", "CA"],
  "250": ["British Columbia", "CA"],
  "251": ["Alabama", "US"],
  "252": ["North Carolina", "US"],
  "253": ["Washington", "US"],
  "254": ["Texas", "US"],
  "256": ["Alabama", "US"],
  "260": ["Indiana", "US"],
  "262": ["Wisconsin", "US"],
  "267": ["Pennsylvania", "US"],
  "269": ["Michigan", "US"],
  "270": ["Kentucky", "US"],
  "272": ["Pennsylvania", "US"],
  "276": ["Virginia", "US"],
  "281": ["Texas", "US"],
  "289": ["Ontario", "CA"],
  "301": ["Maryland", "US"],
  "302": ["Delaware", "US"],
  "303": ["Colorado", "US"],
  "304": ["West Virginia", "US"],
  "305": ["Florida", "US"],
  "306": ["Saskatchewan", "CA"],
  "307": ["Wyoming", "US"],
  "308": ["Nebraska", "US"],
  "309": ["Illinois", "US"],
  "310": ["California", "US"],
  "312": ["Illinois", "US"],
  "313": ["Michigan", "US"],
  "314": ["Missouri", "US"],
  "315": ["New York", "US"],
  "316": ["Kansas", "US"],
  "317": ["Indiana", "US"],
  "318": ["Louisiana", "US"],
  "319": ["Iowa", "US"],
  "320": ["Minnesota", "US"],
  "321": ["Florida", "US"],
  "323": ["California", "US"],
  "325": ["Texas", "US"],
  "330": ["Ohio", "US"],
  "331": ["Illinois", "US"],
  "334": ["Alabama", "US"],
  "336": ["North Carolina", "US"],
  "337": ["Louisiana", "US"],
  "339": ["Massachusetts", "US"],
  "343": ["Ontario", "CA"],
  "346": ["Texas", "US"],
  "347": ["New York", "US"],
  "351": ["Massachusetts", "US"],
  "352": ["Florida", "US"],
  "360": ["Washington", "US"],
  "361": ["Texas", "US"],
  "364": ["Kentucky", "US"],
  "365": ["Ontario", "CA"],
  "385": ["Utah", "US"],
  "386": ["Florida", "US"],
  "401": ["Rhode Island", "US"],
  "402": ["Nebraska", "US"],
  "403": ["Alberta", "CA"],
  "404": ["Georgia", "US"],
  "405": ["Oklahoma", "US"],
  "406": ["Montana", "US"],
  "407": ["Florida", "US"],
  "408": ["California", "US"],
  "409": ["Texas", "US"],
  "410": ["Maryland", "US"],
  "412": ["Pennsylvania", "US"],
  "413": ["Massachusetts", "US"],
  "414": ["Wisconsin", "US"],
  "415": ["California", "US"],
  "416": ["Ontario", "CA"],
  "417": ["Missouri", "US"],
  "418": ["Québec", "CA"],
  "419": ["Ohio", "US"],
  "423": ["Tennessee", "US"],
  "424": ["California", "US"],
  "425": ["Washington", "US"],
  "431": ["Manitoba", "CA"],
  "432": ["Texas", "US"],
  "434": ["Virginia", "US"],
  "435": ["Utah", "US"],
  "437": ["Ontario", "CA"],
  "438": ["Québec", "CA"],
  "440": ["Ohio", "US"],
  "442": ["California", "US"],
  "443": ["Maryland", "US"],
  "450": ["Québec", "CA"],
  "458": ["Oregon", "US"],
  "469": ["Texas", "US"],
  "478": ["Georgia", "US"],
  "479": ["Arkansas", "US"],
  "480": ["Arizona", "US"],
  "484": ["Pennsylvania", "US"],
  "501": ["Arkansas", "US"],
  "502": ["Kentucky", "US"],
  "503": ["Oregon", "US"],
  "504": ["Louisiana", "US"],
  "505": ["New Mexico", "US"],
  "506": ["New Brunswick", "CA"],
  "507": ["Minnesota", "US"],
  "508": ["Massachusetts", "US"],
  "509": ["Washington", "US"],
  "510": ["California", "US"],
  "512": ["Texas", "US"],
  "513": ["Ohio", "US"],
  "514": ["Québec", "CA"],
  "515": ["Iowa", "US"],
  "516": ["New York", "US"],
  "517": ["Michigan", "US"],
  "518": ["New York", "US"],
  "519": ["Ontario", "CA"],
  "520": ["Arizona", "US"],
  "530": ["California", "US"],
  "531": ["Nebraska", "US"],
  "539": ["Oklahoma", "US"],
  "540": ["Virginia", "US"],
  "541": ["Oregon", "US"],
  "551": ["New Jersey", "US"],
  "559": ["California", "US"],
  "561": ["Florida", "US"],
  "562": ["California", "US"],
  "563": ["Iowa", "US"],
  "567": ["Ohio", "US"],
  "570": ["Pennsylvania", "US"],
  "571": ["Virginia", "US"],
  "573": ["Missouri", "US"],
  "574": ["Indiana", "US"],
  "575": ["New Mexico", "US"],
  "579": ["Québec", "CA"],
  "580": ["Oklahoma", "US"],
  "581": ["Québec", "CA"],
  "585": ["New York", "US"],
  "586": ["Michigan", "US"],
  "587": ["Alberta", "CA"],
  "601": ["Mississippi", "US"],
  "602": ["Arizona", "US"],
  "603": ["New Hampshire", "US"],
  "604": ["British Columbia", "CA"],
  "605": ["South Dakota", "US"],
  "606": ["Kentucky", "US"],
  "607": ["New York", "US"],
  "608": ["Wisconsin", "US"],
  "609": ["New Jersey", "US"],
  "610": ["Pennsylvania", "US"],
  "612": ["Minnesota", "US"],
  "613": ["Ontario", "CA"],
  "614": ["Ohio", "US"],
  "615": ["Tennessee", "US"],
  "616": ["Michigan", "US"],
  "617": ["Massachusetts", "US"],
  "618": ["Illinois", "US"],
  "619": ["California", "US"],
  "620": ["Kansas", "US"],
  "623": ["Arizona", "US"],
  "626": ["California", "US"],
  "628": ["California", "US"],
  "629": ["Tennessee", "US"],
  "630": ["Illinois", "US"],
  "631": ["New York", "US"],
  "636": ["Missouri", "US"],
  "639": ["Saskatchewan", "CA"],
  "641": ["Iowa", "US"],
  "646": ["New York", "US"],
  "647": ["Ontario", "CA"],
  "650": ["California", "US"],
  "651": ["Minnesota", "US"],
  "657": ["California", "US"],
  "660": ["Missouri", "US"],
  "661": ["California", "US"],
  "662": ["Mississippi", "US"],
  "667": ["Maryland", "US"],
  "669": ["California", "US"],
  "678": ["Georgia", "US"],
  "681": ["West Virginia", "US"],
  "682": ["Texas", "US"],
  "701": ["North Dakota", "US"],
  "702": ["Nevada", "US"],
  "703": ["Virginia", "US"],
  "704": ["North Carolina", "US"],
  "705": ["Ontario", "CA"],
  "706": ["Georgia", "US"],
  "707": ["California", "US"],
  "708": ["Illinois", "US"],
  "709": ["Newfoundland and Labrador", "CA"],
  "712": ["Iowa", "US"],
  "713": ["Texas", "US"],
  "714": ["California", "US"],
  "715": ["Wisconsin", "US"],
  "716": ["New York", "US"],
  "717": ["Pennsylvania", "US"],
  "718": ["New York", "US"],
  "719": ["Colorado", "US"],
  "720": ["Colorado", "US"],
  "724": ["Pennsylvania", "US"],
  "725": ["Nevada", "US"],
  "727": ["Florida", "US"],
  "731": ["Tennessee", "US"],
  "732": ["New Jersey", "US"],
  "734": ["Michigan", "US"],
  "737": ["Texas", "US"],
  "740": ["Ohio", "US"],
  "743": ["North Carolina", "US"],
  "747": ["California", "US"],
  "754": ["Florida", "US"],
  "757": ["Virginia", "US"],
  "760": ["California", "US"],
  "762": ["Georgia", "US"],
  "763": ["Minnesota", "US"],
  "765": ["Indiana", "US"],
  "769": ["Mississippi", "US"],
  "770": ["Georgia", "US"],
  "772": ["Florida", "US"],
  "773": ["Illinois", "US"],
  "774": ["Massachusetts", "US"],
  "775": ["Nevada", "US"],
  "778": ["British Columbia", "CA"],
  "779": ["Illinois", "US"],
  "780": ["Alberta", "CA"],
  "781": ["Massachusetts", "US"],
  "782": ["Nova Scotia", "CA"],
  "785": ["Kansas", "US"],
  "786": ["Florida", "US"],
  "801": ["Utah", "US"],
  "802": ["Vermont", "US"],
  "803": ["South Carolina", "US"],
  "804": ["Virginia", "US"],
  "805": ["California", "US"],
  "806": ["Texas", "US"],
  "807": ["Ontario", "CA"],
  "808": ["Hawaii", "US"],
  "810": ["Michigan", "US"],
  "812": ["Indiana", "US"],
  "813": ["Florida", "US"],
  "814": ["Pennsylvania", "US"],
  "815": ["Illinois", "US"],
  "816": ["Missouri", "US"],
  "817": ["Texas", "US"],
  "818": ["California", "US"],
  "819": ["Québec", "CA"],
  "825": ["Alberta", "CA"],
  "828": ["North Carolina", "US"],
  "830": ["Texas", "US"],
  "831": ["California", "US"],
  "832": ["Texas", "US"],
  "843": ["South Carolina", "US"],
  "845": ["New York", "US"],
  "847": ["Illinois", "US"],
  "848": ["New Jersey", "US"],
  "850": ["Florida", "US"],
  "854": ["South Carolina", "US"],
  "856": ["New Jersey", "US"],
  "857": ["Massachusetts", "US"],
  "858": ["California", "US"],
  "859": ["Kentucky", "US"],
  "860": ["Connecticut", "US"],
  "862": ["New Jersey", "US"],
  "863": ["Florida", "US"],
  "864": ["South Carolina", "US"],
  "865": ["Tennessee", "US"],
  "867": ["Northwest Territories", "CA"],
  "870": ["Arkansas", "US"],
  "873": ["Québec", "CA"],
  "878": ["Pennsylvania", "US"],
  "901": ["Tennessee", "US"],
  "902": ["Nova Scotia", "CA"],
  "903": ["Texas", "US"],
  "904": ["Florida", "US"],
  "905": ["Ontario", "CA"],
  "907": ["Alaska", "US"],
  "908": ["New Jersey", "US"],
  "909": ["California", "US"],
  "910": ["North Carolina", "US"],
  "912": ["Georgia", "US"],
  "913": ["Kansas", "US"],
  "914": ["New York", "US"],
  "915": ["Texas", "US"],
  "916": ["California", "US"],
  "917": ["New York", "US"],
  "918": ["Oklahoma", "US"],
  "919": ["North Carolina", "US"],
  "920": ["Wisconsin", "US"],
  "925": ["California", "US"],
  "928": ["Arizona", "US"],
  "929": ["New York", "US"],
  "930": ["Indiana", "US"],
  "931": ["Tennessee", "US"],
  "936": ["Texas", "US"],
  "937": ["Ohio", "US"],
  "940": ["Texas", "US"],
  "941": ["Florida", "US"],
  "947": ["Michigan", "US"],
  "949": ["California", "US"],
  "951": ["California", "US"],
  "952": ["Minnesota", "US"],
  "954": ["Florida", "US"],
  "956": ["Texas", "US"],
  "959": ["Connecticut", "US"],
  "970": ["Colorado", "US"],
  "971": ["Oregon", "US"],
  "972": ["Texas", "US"],
  "973": ["New Jersey", "US"],
  "978": ["Massachusetts", "US"],
  "979": ["Texas", "US"],
  "980": ["North Carolina", "US"],
  "984": ["North Carolina", "US"],
  "985": ["Louisiana", "US"],
  "989": ["Michigan", "US"],
};

export interface AppliedFrom {
  phoneCountry: string | null;
  phoneRegion: string | null;
  ipCountry: string | null;
  ipRegion: string | null;
  ipCity: string | null;
}

// Country calling codes we can name. Anything else is reported as the raw
// prefix rather than guessed at.
const CALLING_CODES: Record<string, string> = {
  "1": "US/CA", "20": "EG", "27": "ZA", "30": "GR", "31": "NL", "32": "BE",
  "33": "FR", "34": "ES", "39": "IT", "40": "RO", "41": "CH", "43": "AT",
  "44": "GB", "45": "DK", "46": "SE", "47": "NO", "48": "PL", "49": "DE",
  "51": "PE", "52": "MX", "53": "CU", "54": "AR", "55": "BR", "56": "CL",
  "57": "CO", "58": "VE", "60": "MY", "61": "AU", "62": "ID", "63": "PH",
  "64": "NZ", "65": "SG", "66": "TH", "81": "JP", "82": "KR", "84": "VN",
  "86": "CN", "90": "TR", "91": "IN", "92": "PK", "93": "AF", "94": "LK",
  "98": "IR", "212": "MA", "234": "NG", "254": "KE", "351": "PT", "352": "LU",
  "353": "IE", "354": "IS", "358": "FI", "359": "BG", "370": "LT", "371": "LV",
  "372": "EE", "380": "UA", "385": "HR", "386": "SI", "420": "CZ", "421": "SK",
  "506": "CR", "507": "PA", "593": "EC", "595": "PY", "598": "UY", "971": "AE",
  "972": "IL", "966": "SA", "852": "HK", "886": "TW",
};

// Representative metro/area labels for phone area codes observed in the
// scholarship funnel. These describe where a number was issued, not the
// applicant's current residence. Add codes only when the label is unambiguous
// enough to be useful without implying street-level precision.
const NANP_CITY_HINTS: Record<string, string> = {
  "210": "San Antonio area",
  "305": "Miami area",
  "323": "Los Angeles area",
  "413": "Western Massachusetts",
  "571": "Northern Virginia",
  "609": "Trenton area",
  "631": "Long Island",
  "901": "Memphis area",
  "949": "Orange County",
};

/**
 * Derive country and region from a phone number as typed. Accepts E.164
 * ("+393514941112"), bare North American ("9014131905", "(631) 374-3422") and
 * 1-prefixed forms. Returns nulls rather than guesses when it cannot tell.
 */
export function geoFromPhone(raw: string | null | undefined): {
  country: string | null;
  region: string | null;
  city: string | null;
} {
  if (!raw) return { country: null, region: null, city: null };
  const trimmed = String(raw).trim();
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length < 7) return { country: null, region: null, city: null };

  const explicitlyInternational = trimmed.startsWith("+") || trimmed.startsWith("00");

  // Non-NANP international number.
  if (explicitlyInternational && !digits.replace(/^00/, "").startsWith("1")) {
    const d = digits.replace(/^00/, "");
    for (const len of [3, 2, 1]) {
      const prefix = d.slice(0, len);
      if (CALLING_CODES[prefix] && prefix !== "1") {
        return { country: CALLING_CODES[prefix], region: null, city: null };
      }
    }
    return { country: `+${d.slice(0, 3)}`, region: null, city: null };
  }

  // North American: strip the country code if present, then read the area code.
  let national = digits.replace(/^00/, "");
  if (national.length === 11 && national.startsWith("1")) national = national.slice(1);
  if (national.length !== 10) return { country: null, region: null, city: null };

  const areaCode = national.slice(0, 3);
  const entry = NANP_AREA_CODES[areaCode];
  if (!entry) return { country: "US/CA", region: null, city: null };
  return { country: entry[1], region: entry[0], city: NANP_CITY_HINTS[areaCode] || null };
}

/**
 * Where the applicant actually was, from edge geo headers. Vercel sets these
 * on every request; they are absent locally, which is why every field is
 * nullable.
 */
export function geoFromRequestHeaders(headers: Headers): {
  country: string | null;
  region: string | null;
  city: string | null;
} {
  const read = (name: string) => {
    const v = headers.get(name);
    return v && v.trim() ? decodeURIComponent(v.trim()) : null;
  };
  return {
    country: read("x-vercel-ip-country"),
    region: read("x-vercel-ip-country-region"),
    city: read("x-vercel-ip-city"),
  };
}

/** Both signals together, for storage alongside an application. */
export function appliedFrom(phone: string | null | undefined, headers: Headers): AppliedFrom {
  const p = geoFromPhone(phone);
  const i = geoFromRequestHeaders(headers);
  return {
    phoneCountry: p.country,
    phoneRegion: p.region,
    ipCountry: i.country,
    ipRegion: i.region,
    ipCity: i.city,
  };
}
