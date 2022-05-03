/* Parse unit-tagged values. Examples:
 * - 5.3x10^5 kg m / s^2
 * - 5 mmHg
 * - (3 * 10) (kg m) / s^2
 */

%lex

/*
00b5 - micro
212b - angstrom
00b0 - degree
2103 - degree celcius
2109 - degree fahrenheit
*/

%%
"/"                                               return 'DIV';
"("                                               return '(';
")"                                               return ')';

/*
The "x 10^" part of scientific notation. Accept this as one token to
disambiguate "x", "10", and "^", rather than parse them as confusing tokens
which could mean different things depending on context.

To be safe we accept the following:
  - *
  - x
  - interpunct (00b7)
  - bullet (2219)
  - dot (22c5)
  - multiplication sign (00d7)
 */
("*"|"x"|"\u00d7"|"\u2219"|"\u22c5"|"\u00b7")\s*"10"\s*"^" return 'POW';

/*
At this point we can safely tokenize these things since they can no longer
appear as part of "x 10^".
 */
"^"                                               return '^';
"*"                                               return 'MUL';
[0-9]+"."[0-9]+                                   return 'FLOAT';
[0-9]+                                            return 'NAT';
"-"                                               return 'NEG';

/*
Atom, meaning a single unit without exponent.

Symbols:
  - 00b0 - degree sign
  - 2103 - degree celcius
  - 2109 - degree fahrenheit
  - 212b - angstrom
  - 00b5 - micro
 */
"\u00b0"(" "?)[cCfF]                              return 'ATOM';
"fl""."?" oz""."?                                 return 'ATOM';
[\u00b5]?([A-Za-z-]+|[\u2103\u2109\u212b])        return 'ATOM';

\s+                                               /* skip whitespace */
<<EOF>>                                           return 'EOF';

/lex

%start unitvalue

%%

unitvalue
    : magnitude unit EOF
        %{
            return {
                type: "unitMagnitude",
                magnitude: $1,
                unit: $2,
            };
        }%
    | unit EOF
        %{
            return {
                type: "unitStandalone",
                unit: $1,
            }
        }%
    ;

magnitude
    : float POW int
        %{
            $$ = $1 + "e" + $3;
        }%
    | float
        { $$ = $1; }
    ;

unit
    : multatoms DIV multatoms
        %{
            $$ = {
                num: $1,
                denom: $3,
            };
        }%
    | multatoms
        %{
            $$ = {
                num: $1,
                denom: null,
            };
        }%
    ;

multatoms
    : expatom MUL multatoms
        { $$ = [$1].concat($3); }
    | expatom multatoms
        { $$ = [$1].concat($2); }
    | expatom
        { $$ = [$1]; }
    ;

expatom
    : atom '^' nat
        %{
            $$ = {
                name: $1,
                pow: $3,
            };
        }%
    | atom
        %{
            $$ = {
                name: $1,
                pow: 1,
            };
        }%
    ;

atom
    : ATOM
    { $$ = yytext; }
    ;

float
    : FLOAT
        { $$ = $1; }
    | nat
        { $$ = $1; }
    ;

nat : NAT
        { $$ = $1; }
    ;

int
    : NEG NAT
        { $$ = "-" + $2; }
    | NAT
        { $$ = $1; }
    ;
