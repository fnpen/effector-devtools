const tokenTypes = [
  { regex: /^\s+/, tokenType: "WHITESPACE" },
  { regex: /^[{}]/, tokenType: "BRACE" },
  { regex: /^[[\]]/, tokenType: "BRACKET" },
  { regex: /^:/, tokenType: "COLON" },
  { regex: /^,/, tokenType: "COMMA" },
  { regex: /^-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/i, tokenType: "NUMBER_LITERAL" },
  { regex: /^"(?:\\.|[^"\\])*"(?=\s*:)/, tokenType: "STRING_KEY" },
  { regex: /^"(?:\\.|[^"\\])*"/, tokenType: "STRING_LITERAL" },
  { regex: /^true|^false/, tokenType: "BOOLEAN_LITERAL" },
  { regex: /^null/, tokenType: "NULL_LITERAL" },
];

const getTokens = (input: any) => {
  let tokens = [];
  let foundToken;

  do {
    foundToken = false;
    for (let i = 0; i < tokenTypes.length; i++) {
      const match = tokenTypes[i].regex.exec(input);
      if (match) {
        tokens.push({ type: tokenTypes[i].tokenType, value: match[0] });
        input = input.substring(match[0].length);
        foundToken = true;
        break;
      }
    }
  } while ((input || "").length > 0 && foundToken);

  return tokens;
};

const colors = {
  // BRACE: "#cccccc",
  // BRACKET: "#cccccc",
  COLON: "#333",
  // COMMA: "#cccccc",
  STRING_KEY: "#333",
  // STRING_KEY: "#69786d",
  // STRING_KEY: "#116329",
  STRING_LITERAL: "#0a3069",
  NUMBER_LITERAL: "#0550ae",
  BOOLEAN_LITERAL: "#0550ae",
  NULL_LITERAL: "#0550ae",
};

const colorFn = (type: keyof typeof colors, v: string): string =>
  colors[type] ? `<span style="color:${colors[type]}">${v}</span>` : v;

function colorize(tokens: any[]) {
  return tokens.reduce((acc, token) => {
    if (token.value.indexOf(`"<span`) === 0) {
      return acc + token.value.replace(/^\"+|\"+$/g, "");
    }

    if (token.type === "STRING_KEY") {
      token.value = " " + token.value.replace(/["]/g, "");
    }
    if (token.type === "COLON") {
      token.value = ": ";
    }
    if (token.type === "BRACKET") {
      token.value = " " + token.value + " ";
    }
    if (token.type === "BRACE") {
      token.value = " " + token.value + " ";
    }

    return acc + colorFn(token.type, token.value);
  }, "");
}

export const colorizeJsonString = (jsonString: string): string => {
  return (
    '<span style="color: #cccccc;">' +
    (jsonString.length < 10000 ? colorize(getTokens(jsonString)) : jsonString) +
    "</span>"
  );
};

export const colorizeJson = (jsonString: string): string => {
  let input = JSON.stringify(jsonString, (k, v) => {
    return v === undefined ? "__undefined__" : v;
  }).replaceAll('"__undefined__"', "undefined");

  return colorizeJsonString(input);
};
