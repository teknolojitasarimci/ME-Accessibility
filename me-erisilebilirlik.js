(function() {
    'use strict';

    const CONFIG = {
        prefix: 'osman-access',
        storageKey: 'osman_access_settings_v22_nodelay',
        defaultFontSize: 100,
        announceDelay: 150,
        announceClearDelay: 3000
    };

    const DEFAULT_SETTINGS = {
        fontSize: 100,
        contrast: 'normal',
        saturation: 'normal',
        letterSpacing: false,
        lineHeight: false,
        wordSpacing: false,
        textColor: null,
        titleColor: null,
        bgColor: null,
        readingGuide: false,
        readingMask: false,
        highlightLinks: false,
        dyslexiaFont: false,
        readableFont: false,
        cursor: 'default',
        hideImages: false,
        speechRate: 1,
        textAlign: 'default',
        bigMode: false,
        shortcuts: false,
        cursorSize: 32,
        interactiveImages: false
    };

    let settings = { ...DEFAULT_SETTINGS };
    let isReading = false;
    let speechUtterance = null;
    let announceTimeout = null;
    let availableVoices = [];

    const COLOR_NAMES = {
        '#0066cc': 'Mavi', '#7c3aed': 'Mor', '#dc2626': 'Kırmızı', '#ea580c': 'Turuncu',
        '#facc15': 'Sarı', '#0891b2': 'Turkuaz', '#65a30d': 'Yeşil', '#ffffff': 'Beyaz', '#000000': 'Siyah'
    };

    const MAIN_ICON_SVG = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img"><g transform="translate(0,1000) scale(0.1,-0.1)" fill="#0696b0"><path d="M4715 9949 c-88 -5 -220 -15 -293 -24 -149 -17 -499 -78 -580 -101 -28 -8 -103 -28 -165 -44 -191 -50 -413 -127 -657 -230 -95 -40 -393 -189 -474 -237 -188 -112 -420 -265 -526 -346 -261 -200 -587 -506 -745 -698 -331 -403 -522 -697 -708 -1087 -116 -244 -198 -462 -297 -787 -35 -112 -99 -410 -120 -555 -77 -535 -78 -989 -5 -1515 38 -272 126 -619 229 -905 149 -415 397 -892 631 -1215 173 -240 293 -383 475 -569 400 -409 829 -721 1340 -973 420 -208 891 -360 1327 -428 87 -13 187 -29 223 -35 317 -50 904 -50 1264 0 596 84 1049 221 1546 469 441 220 763 438 1115 752 824 736 1402 1806 1565 2900 48 323 54 411 54 759 0 317 -9 466 -39 649 -7 47 -23 146 -35 219 -64 403 -227 896 -427 1297 -172 343 -350 619 -611 945 -135 169 -468 503 -619 622 -270 213 -277 218 -463 342 -517 343 -1144 597 -1751 710 -74 14 -157 30 -185 35 -148 29 -611 62 -814 59 -52 0 -167 -5 -255 -9z m506 -1022 c203 -66 382 -199 485 -358 60 -92 80 -140 110 -256 71 -281 -9 -583 -210 -787 -82 -83 -181 -146 -305 -192 -105 -40 -186 -54 -306 -54 -388 1 -743 292 -810 666 -21 114 -16 304 10 399 51 183 179 357 350 475 60 42 191 97 270 116 80 18 341 12 406 -9z m-2900 -1821 c134 -14 312 -30 394 -36 83 -6 164 -13 181 -15 16 -2 115 -11 220 -20 302 -24 511 -45 624 -61 204 -28 948 -93 1145 -100 205 -6 456 4 725 31 80 8 242 23 360 35 118 11 262 27 320 35 92 12 528 54 740 71 41 3 86 7 100 9 14 2 108 11 210 20 240 20 456 42 534 55 161 25 348 -88 400 -243 18 -54 21 -173 6 -229 -30 -105 -151 -222 -264 -252 -62 -16 -256 -46 -556 -86 -124 -16 -247 -34 -275 -40 -27 -6 -151 -28 -275 -50 -124 -21 -261 -45 -305 -54 -44 -8 -132 -22 -195 -31 -151 -21 -439 -74 -468 -86 -13 -5 -33 -29 -45 -57 -22 -47 -22 -47 -22 -762 l0 -715 56 -150 c31 -82 76 -202 99 -265 23 -63 65 -176 92 -250 27 -74 58 -160 68 -190 10 -30 44 -122 75 -205 31 -82 72 -193 90 -245 19 -52 55 -151 80 -220 25 -69 59 -161 75 -205 16 -44 52 -141 80 -215 28 -74 62 -164 75 -200 13 -36 46 -126 75 -200 116 -304 128 -351 110 -451 -23 -124 -95 -218 -210 -273 -57 -27 -75 -31 -150 -31 -118 1 -185 28 -266 109 -54 55 -66 75 -123 211 -109 259 -152 359 -166 390 -19 41 -80 184 -120 280 -18 44 -57 134 -85 200 -28 66 -63 147 -77 180 -14 33 -33 78 -43 101 -11 22 -29 65 -40 95 -12 30 -35 82 -51 117 -16 35 -29 66 -29 69 0 4 -13 36 -30 72 -34 76 -310 726 -361 849 -34 85 -61 112 -107 112 -26 0 -69 -35 -78 -63 -4 -12 -47 -116 -95 -230 -49 -114 -89 -210 -89 -212 0 -3 -11 -28 -24 -57 -13 -29 -35 -80 -49 -113 -14 -33 -46 -109 -72 -170 -26 -60 -64 -153 -85 -205 -21 -52 -45 -108 -53 -125 -8 -16 -38 -86 -67 -155 -29 -69 -70 -164 -91 -213 -21 -48 -39 -90 -39 -94 0 -3 -13 -36 -30 -72 -47 -104 -159 -368 -196 -461 -18 -47 -38 -93 -44 -103 -6 -10 -24 -51 -40 -90 -95 -240 -110 -267 -181 -331 -96 -87 -233 -116 -353 -76 -129 43 -218 131 -253 249 -19 68 -13 197 12 256 10 22 38 94 63 160 24 66 62 166 83 223 54 142 112 297 161 427 57 154 109 292 157 420 97 255 180 482 286 780 41 116 95 266 120 335 101 271 89 156 93 929 3 721 1 768 -42 817 -24 28 -82 40 -506 104 -113 17 -250 40 -305 52 -160 33 -410 75 -700 118 -683 101 -686 101 -779 194 -75 76 -99 132 -104 241 -3 75 0 100 18 148 30 79 111 166 188 200 53 24 157 48 173 40 4 -1 116 -14 250 -27z"/></g></svg>`;

    const injectStyles = () => {
        const p = CONFIG.prefix;
        const css = `
            :root { 
                --${p}-font: Arial, Helvetica, sans-serif; 
                --${p}-bg: rgba(255, 255, 255, 0.75); 
                --${p}-border: rgba(255, 255, 255, 0.3); 
                --${p}-text: #1d1d1f; 
                --${p}-title-color: inherit; 
                --${p}-text-color: inherit; 
                --${p}-bg-color: transparent;
                --${p}-accent: #0696b0; 
            }
            #${p}-widget { font-family: var(--${p}-font); font-size: 16px !important; line-height: 1.5 !important; z-index: 2147483647; position: relative; -webkit-font-smoothing: antialiased; cursor: default !important; }
            #${p}-widget * { box-sizing: border-box; text-decoration: none; color: var(--${p}-text); font-size: 16px; font-weight: 400; }
            @media (prefers-reduced-motion: reduce) { #${p}-widget * { transition: none !important; animation: none !important; } }
            @media (forced-colors: active) { 
                .${p}-btn, .${p}-color-box, #${p}-trigger, .${p}-header-close { border: 2px solid ButtonText !important; } 
                .${p}-header { border-bottom: 1px solid CanvasText !important; } 
                #${p}-panel { background: Canvas !important; backdrop-filter: none !important; }
            }
            @media (max-width: 360px) { #${p}-panel { width: calc(100vw - 20px) !important; right: 10px !important; bottom: 85px !important; } }
            
            #${p}-trigger { 
                position: fixed !important; right: 20px !important; bottom: 20px !important; width: 60px !important; height: 60px !important; 
                cursor: pointer !important; background: transparent !important; border: none !important; border-radius: 50% !important;
                padding: 0 !important; transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1); 
                z-index: 2147483647 !important; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.25)) !important;
                display: block !important; visibility: visible !important; opacity: 1 !important;
            }
            #${p}-trigger:hover { transform: scale(1.1); }
            #${p}-trigger svg { width: 100% !important; height: 100% !important; }
            #${p}-trigger svg g { fill: #0696b0 !important; }
            #${p}-trigger:focus:not(:focus-visible) { outline: none; }
            #${p}-trigger:focus-visible { outline: 3px solid #0696b0; outline-offset: 4px; }

            #${p}-panel { 
                position: fixed; right: 20px !important; bottom: 85px !important; width: 340px; 
                max-height: calc(95vh - 110px); background: var(--${p}-bg) !important; 
                backdrop-filter: blur(25px) saturate(190%) !important; -webkit-backdrop-filter: blur(25px) saturate(190%) !important;
                border: 1px solid var(--${p}-border) !important; box-shadow: 0 20px 50px rgba(0,0,0,0.15) !important; 
                border-radius: 24px; display: none; flex-direction: column; overflow: hidden; z-index: 2147483647;
                animation: ${p}-slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            }
            @keyframes ${p}-slideIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
            #${p}-panel.active { display: flex; }

            .${p}-content { 
                flex: 1; overflow-y: auto; padding: 0 8px; min-height: 0;
                scroll-behavior: smooth;
            }
            .${p}-content::-webkit-scrollbar { width: 10px; }
            .${p}-content::-webkit-scrollbar-track { background: rgba(0,0,0,0.02); border-radius: 10px; }
            .${p}-content::-webkit-scrollbar-thumb { 
                background: var(--${p}-accent) !important; 
                border-radius: 20px; 
                border: 3px solid #fff;
                box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                transition: background 0.3s;
            }
            .${p}-content::-webkit-scrollbar-thumb:hover { background: #057a8f !important; }

            .${p}-header { 
                display: flex; align-items: center; justify-content: space-between; padding: 0 20px; 
                background: rgba(5, 122, 143, 0.95) !important; backdrop-filter: blur(10px);
                flex-shrink: 0; height: 56px; border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            }
            .${p}-header-left { display: flex; align-items: center; gap: 12px; }
            .${p}-header-icon { width: 28px; height: 28px; flex-shrink: 0; }
            .${p}-header-icon svg g { fill: #fff !important; }
            .${p}-header h2 { font-weight: 900 !important; font-size: 1.5rem !important; color: #fff !important; margin: 0; letter-spacing: -0.2px; }
            
            .${p}-header-close { 
                width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; 
                background: rgba(255,255,255,0.15) !important; border: none !important; border-radius: 50%; 
                cursor: pointer; transition: all 0.2s; color: #fff !important; 
            }
            .${p}-header-close:hover { background: rgba(255,255,255,0.3) !important; transform: rotate(90deg); }
            .${p}-header-close svg { width: 18px; height: 18px; stroke: #fff !important; stroke-width: 2.5; }

            .${p}-footer { padding: 0; background: #fff; border-top: 1px solid #f0f0f0; border-radius: 0 0 24px 24px; flex-shrink: 0; height: 50px; overflow: hidden; }
            
            .${p}-section { padding: 8px 12px; border-bottom: 1px solid rgba(0,0,0,0.05); }
            .${p}-section:last-of-type { border-bottom: none; }
            .${p}-section h3 { 
                margin: 0 0 6px 0; font-size: 1rem; font-weight: 900; color: #1d1d1f !important; 
                text-transform: uppercase; letter-spacing: 0.5px; text-align: left !important; 
                display: block; width: 100%;
            }
            
            .${p}-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
            .${p}-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; }
            
            .${p}-font-control { 
                display: flex; align-items: center; justify-content: space-between; 
                background: rgba(0,0,0,0.04); border-radius: 14px; padding: 6px; 
            }
            .${p}-font-btn { 
                width: 70px; height: 44px; border: 2px solid rgba(0, 0, 0, 0.1) !important; 
                background: #fff !important; border-radius: 14px; cursor: pointer; 
                font-size: 30px !important; font-weight: 900 !important; color: var(--${p}-accent) !important; 
                display: flex; align-items: center; justify-content: center; transition: all 0.2s;
                box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            }
            .${p}-font-btn:hover { transform: scale(1.08); border-color: var(--${p}-accent) !important; background: var(--${p}-accent) !important; color: #fff !important; }
            .${p}-font-val { font-size: 1.35rem !important; font-weight: 900 !important; color: #1d1d1f; min-width: 80px; text-align: center; display: block; }

            .${p}-btn { 
                background: rgba(255, 255, 255, 0.8) !important; border: 1.5px solid rgba(0, 0, 0, 0.1) !important; 
                border-radius: 18px; padding: 10px 4px; display: flex; flex-direction: column; align-items: center; 
                justify-content: center; gap: 4px; cursor: pointer; color: #1d1d1f !important; 
                text-align: center; min-height: 64px; transition: all 0.2s ease;
                box-shadow: 0 2px 8px rgba(0,0,0,0.04);
                font-weight: 900 !important;
            }
            .${p}-btn span { font-size: 13px !important; font-weight: 900 !important; line-height: 1.1 !important; display: block; color: inherit !important; pointer-events: none; }
            .${p}-btn:hover { background: #fff !important; transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,0.08); border-color: var(--${p}-accent) !important; }
            .${p}-btn.active { background: var(--${p}-accent) !important; color: #fff !important; border-color: var(--${p}-accent) !important; box-shadow: 0 6px 18px rgba(5, 122, 143, 0.4); }
            .${p}-btn.active * { color: #fff !important; }
            .${p}-btn i { font-size: 22px; display: flex; align-items: center; justify-content: center; height: 24px; transition: transform 0.3s; margin-bottom: 2px; color: inherit; pointer-events: none; }
            .${p}-btn svg { width: 22px; height: 22px; color: inherit; display: block; }
            .${p}-btn:active { transform: scale(0.95); }

            .${p}-colors-wrapper { display: flex; gap: 6px; flex-wrap: wrap; flex: 1; }
            .${p}-color-box { 
                width: 38px !important; height: 38px !important; border: 2px solid #fff !important; cursor: pointer !important; 
                transition: all 0.2s !important; border-radius: 50% !important; padding: 0 !important; flex-shrink: 0 !important;
                box-shadow: 0 2px 6px rgba(0,0,0,0.1) !important;
                display: block !important;
            }
            .${p}-color-box:hover { transform: scale(1.15); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
            .${p}-color-box.active { transform: scale(1.1); border: 3px solid var(--${p}-accent); outline: 2px solid #fff; }
            
            .${p}-color-label { text-align: left !important; font-size: 1rem; margin: 8px 0 4px; color: #1d1d1f !important; font-weight: 900 !important; width: 100%; display: block; }
            .${p}-color-row-container { display: flex; align-items: center; gap: 8px; width: 100%; margin-bottom: 8px; }
            
            .${p}-row-reset { 
                width: 38px; height: 38px; background: rgba(0,0,0,0.05); border: none; border-radius: 50%; 
                cursor: pointer; display: flex; align-items: center; justify-content: center; 
                color: #8e8e93; transition: all 0.2s;
            }
            .${p}-row-reset:hover { background: rgba(0,0,0,0.1); color: #1d1d1f; transform: rotate(-45deg); }

            .${p}-slider-row { display: flex; align-items: center; gap: 12px; margin-top: 6px; background: rgba(0,0,0,0.04); padding: 10px; border-radius: 16px; }
            .${p}-slider-row label { font-weight: 900 !important; color: #1d1d1f; min-width: 50px; font-size: 17px !important; }
            .${p}-slider { 
                flex: 1; cursor: pointer; height: 12px; border-radius: 12px; background: #e5e5ea;
                appearance: none; -webkit-appearance: none; outline: none; position: relative;
            }
            .${p}-slider::-webkit-slider-runnable-track { background: var(--${p}-accent); height: 12px; border-radius: 12px; border: 2.5px solid #fff; box-shadow: inset 0 1px 3px rgba(0,0,0,0.1); }
            .${p}-slider::-webkit-slider-thumb { 
                -webkit-appearance: none; width: 30px; height: 30px; background: #fff; 
                border-radius: 50%; border: 4px solid var(--${p}-accent); box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                margin-top: -11px; transition: all 0.2s;
            }
            .${p}-slider::-webkit-slider-thumb:hover { transform: scale(1.15); box-shadow: 0 6px 16px rgba(0,0,0,0.4); }
            
            #${p}-filter-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 2147483640; display: none; }
            #${p}-filter-overlay.mode-gray { backdrop-filter: grayscale(100%); display: block; }
            #${p}-filter-overlay.mode-low-sat { backdrop-filter: saturate(50%); display: block; }
            #${p}-filter-overlay.mode-high-sat { backdrop-filter: saturate(200%); display: block; }

            #${p}-guide { position: fixed; left: 0; width: 100%; height: 4px; background: #facc15; box-shadow: 0 0 10px rgba(250, 204, 21, 0.5); z-index: 2147483645; pointer-events: none; display: none; border: none; }
            #${p}-mask { position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background: rgba(0,0,0,0.85); z-index: 2147483644; pointer-events: none; display: none; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 45%, 100% 45%, 100% 55%, 0% 55%); transition: clip-path 0.1s; }
            
            #${p}-shortcuts-info { margin: 8px 0 4px; padding: 12px; background: rgba(0,0,0,0.03); border: 1px dashed rgba(0,0,0,0.1); border-radius: 16px; font-size: 0.8rem; }
            #${p}-shortcuts-info b { color: var(--${p}-accent); font-weight: 700; width: 75px; display: inline-block; }
            #${p}-sc-row { display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid rgba(0,0,0,0.03); }
            #${p}-sc-row:last-child { border-bottom: none; }

            body.${p}-contrast-high :not(#${p}-widget):not(#${p}-widget *) { background-color: #000 !important; color: #fff !important; }
            body.${p}-contrast-high { background-color: #000 !important; }
            body.${p}-dyslexia *:not(#${p}-widget *):not(#${p}-widget) { font-family: 'Comic Sans MS', 'Chalkboard SE', sans-serif !important; }
            body.${p}-readable *:not(#${p}-widget *):not(#${p}-widget) { font-family: 'Verdana', sans-serif !important; letter-spacing: 0.5px !important; font-weight: 900 !important; }
            
            body.${p}-cursor-white, body.${p}-cursor-white *:not(#${p}-widget *) { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Cpath fill='white' stroke='black' stroke-width='1.5' d='M5.5 3.21V20.8l5.5-5.5h8.79L5.5 3.21z'/%3E%3C/svg%3E") 0 0, auto !important; }
            body.${p}-cursor-black, body.${p}-cursor-black *:not(#${p}-widget *) { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Cpath fill='black' stroke='white' stroke-width='1.5' d='M5.5 3.21V20.8l5.5-5.5h8.79L5.5 3.21z'/%3E%3C/svg%3E") 0 0, auto !important; }
            
            body.${p}-hide-images img:not(#${p}-widget *) { opacity: 0 !important; visibility: hidden !important; transition: opacity 0.3s; }
            body.${p}-highlight-links a:not(#${p}-widget *), 
            body.${p}-highlight-links button:not(#${p}-widget *) { 
                background-color: #ff0 !important; 
                color: #000 !important; 
                outline: 3px dashed #f00 !important; 
                outline-offset: 2px !important;
                text-decoration: underline !important; 
                border-radius: 4px !important; 
            }
            /* İmleç Çakışması Çözümü: Ne olursa olsun görsel üzerinde büyüteç göster */
            html body.${p}-interactive-images img,
            html body.${p}-interactive-images.${p}-cursor-white img,
            html body.${p}-interactive-images.${p}-cursor-black img { 
                cursor: zoom-in !important; 
                cursor: -webkit-zoom-in !important; 
                cursor: -moz-zoom-in !important;
                transition: transform 0.2s; 
            }
            body.${p}-interactive-images img:not(#${p}-widget *):hover { transform: scale(1.02); z-index: 10; position: relative; box-shadow: 0 0 10px rgba(0,0,0,0.2); outline: 3px solid #0696b0; }
            
            body.${p}-spacing-letter *:not(#${p}-widget *):not(#${p}-widget) { letter-spacing: 2px !important; }
            body.${p}-spacing-line *:not(#${p}-widget *):not(#${p}-widget) { line-height: 2 !important; }
            body.${p}-spacing-word *:not(#${p}-widget *):not(#${p}-widget) { word-spacing: 6px !important; }

            body.${p}-interactive-images img:not(#${p}-widget *) { cursor: zoom-in !important; transition: transform 0.2s; outline: 3px solid transparent; }
            body.${p}-interactive-images img:not(#${p}-widget *):hover { transform: scale(1.02); outline: 3px solid var(--${p}-accent); }
            
            body.${p}-align-left *:not(#${p}-widget *):not(body) { text-align: left !important; justify-content: flex-start !important; }
            body.${p}-align-center *:not(#${p}-widget *):not(body) { text-align: center !important; justify-content: center !important; }
            body.${p}-align-right *:not(#${p}-widget *):not(body) { text-align: right !important; justify-content: flex-end !important; }
            
            /* Header ve Flex Elemanlar İçin Akıllı Hizalama (Butonları Koru) */
            body.${p}-align-center .header, body.${p}-align-center header { position: relative !important; display: flex !important; justify-content: center !important; width: 100% !important; }
            body.${p}-align-center .baslik-sol { width: 100% !important; display: flex !important; justify-content: center !important; margin: 0 !important; }
            body.${p}-align-center .baslik-sol *, body.${p}-align-center header h1 { text-align: center !important; }
            body.${p}-align-center .header-sag { position: absolute !important; right: 20px !important; top: 50% !important; transform: translateY(-50%) !important; display: flex !important; z-index: 100 !important; }

            body.${p}-align-right .header, body.${p}-align-right header { position: relative !important; display: flex !important; justify-content: flex-end !important; }
            body.${p}-align-right .baslik-sol { margin-left: auto !important; margin-right: 180px !important; text-align: right !important; }
            body.${p}-align-right .baslik-sol *, body.${p}-align-right header h1 { text-align: right !important; }
            body.${p}-align-right .header-sag { position: absolute !important; right: 20px !important; top: 50% !important; transform: translateY(-50%) !important; display: flex !important; z-index: 100 !important; }

            body.${p}-align-left .header, body.${p}-align-left header { position: relative !important; display: flex !important; justify-content: flex-start !important; }
            body.${p}-align-left .baslik-sol { margin-left: 0 !important; margin-right: auto !important; text-align: left !important; }
            body.${p}-align-left .baslik-sol *, body.${p}-align-left header h1 { text-align: left !important; }
            body.${p}-align-left .header-sag { display: flex !important; margin-left: auto !important; }

            #${p}-toast {
                position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
                background: rgba(0, 0, 0, 0.85); color: #fff; padding: 12px 24px;
                border-radius: 50px; font-size: 14px; font-weight: 500; z-index: 2147483647;
                display: none; box-shadow: 0 4px 12px rgba(0,0,0,0.2); animation: ${p}-fadeIn 0.3s;
            }
            @keyframes ${p}-fadeIn { from { opacity:0; transform:translate(-50%, -10px); } to { opacity:1; transform:translate(-50%, 0); } }
            
            /* RENK SİSTEMİ (CERRAHİ İZOLASYON) */
            body.${p}-has-text-color *:not(#${p}-widget *):not(#${p}-widget):not(i):not(svg):not(path) { color: var(--${p}-text-color) !important; }
            body.${p}-has-bg-color .mebi-etkinlik, 
            body.${p}-has-bg-color .bilgi-karti, 
            body.${p}-has-bg-color .modal-content,
            body.${p}-has-bg-color .instruction-bar,
            body.${p}-has-bg-color *:not(#${p}-widget *):not(#${p}-widget):not(.header-sag *):not(.baslik-sol *) { background-color: var(--${p}-bg-color) !important; }
            body.${p}-has-title-color h1:not(#${p}-widget *), 
            body.${p}-has-title-color h2:not(#${p}-widget *), 
            body.${p}-has-title-color h3:not(#${p}-widget *), 
            body.${p}-has-title-color h4:not(#${p}-widget *), 
            body.${p}-has-title-color h5:not(#${p}-widget *), 
            body.${p}-has-title-color h6:not(#${p}-widget *) { color: var(--${p}-title-color) !important; }

            /* ZIRHLI MOD: Sabit yükseklik prangalarını ve satır sınırlamalarını (line-clamp) kır */
            /* ÖNEMLİ: Yapısal alanları (header, footer, nav vb.) bu kuraldan muaf tut ki düzen bozulmasın */
            body.${p}-force-layout *:not(#${p}-widget):not(#${p}-widget *):not(script):not(style):not(noscript):not(header):not(footer):not(nav):not(.header):not(.baslik-sol):not(.instruction-bar):not(.mebi-etkinlik):not(.bilgi-karti):not(.modal-overlay):not(.modal-content) { 
                height: auto !important; 
                max-height: none !important; 
                min-height: 0 !important; 
                -webkit-line-clamp: none !important;
                line-clamp: none !important;
            }

            /* Sadece metin sınırlaması kullanılan yerlerde display: block ile prangaları kır */
            body.${p}-force-layout p,
            body.${p}-force-layout [class*="aciklama"],
            body.${p}-force-layout [class*="soru"],
            body.${p}-force-layout span:not(#${p}-widget *):not(.header-btn *):not(.mebi-btn *):not(.yonerge-metin *),
            body.${p}-force-layout .yonerge-baslik:not(.yonerge-metin *) {
                display: block !important;
            }

            /* Yönerge içeriğinin her zaman flex kalmasını garanti et */
            body.${p}-force-layout .yonerge-icerik {
                display: flex !important;
            }
            
            /* Metin taşmasını yönet ama KÖŞE YUVARLAKLIĞINI KORU */
            /* Border-radius olan veya ana konteynır olan elemanların overflow: hidden kuralına dokunma! */
            body.${p}-force-layout *:not(#${p}-widget *):not(.mebi-etkinlik):not(.bilgi-karti):not(.modal-content):not([style*="border-radius"]):not([class*="rounded"]):not([class*="pill"]) { 
                overflow: visible !important; 
            }

            /* Ana konteynırların taşma kontrolünü ve ARKA PLANINI koru */
            body.${p}-force-layout .mebi-etkinlik, 
            body.${p}-force-layout .bilgi-karti,
            body.${p}-force-layout .modal-content { 
                overflow: hidden !important; 
                isolation: isolate !important; 
                z-index: 1 !important;
                /* Arkaplanın kaybolmasını önle (Zırhlı Koruma) */
                background-clip: padding-box !important;
                transform: translateZ(0); /* Hardware acceleration */
            }

            body.${p}-force-layout [style*="border-radius"],
            body.${p}-force-layout [class*="rounded"],
            body.${p}-force-layout [class*="pill"] { 
                overflow: hidden !important; 
                clip-path: none !important;
            }
            
            body.${p}-big-mode #${p}-panel { width: 340px !important; }
            .${p}-sr-only { position: absolute !important; left: -10000px !important; width: 1px !important; height: 1px !important; overflow: hidden !important; }
        `;
        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    };

    const validateSettings = (parsed) => {
        const safe = {...DEFAULT_SETTINGS};
        if(!parsed) return safe;
        if (parsed.fontSize && typeof parsed.fontSize === 'number' && parsed.fontSize >= 50 && parsed.fontSize <= 300) safe.fontSize = parsed.fontSize;
        if (['normal', 'high'].includes(parsed.contrast)) safe.contrast = parsed.contrast;
        if (['normal', 'gray', 'low', 'high'].includes(parsed.saturation)) safe.saturation = parsed.saturation;
        if (typeof parsed.letterSpacing === 'boolean') safe.letterSpacing = parsed.letterSpacing;
        if (typeof parsed.lineHeight === 'boolean') safe.lineHeight = parsed.lineHeight;
        if (typeof parsed.wordSpacing === 'boolean') safe.wordSpacing = parsed.wordSpacing;
        if (typeof parsed.readingGuide === 'boolean') safe.readingGuide = parsed.readingGuide;
        if (typeof parsed.readingMask === 'boolean') safe.readingMask = parsed.readingMask;
        if (typeof parsed.magnifier === 'boolean') safe.magnifier = parsed.magnifier;
        if (typeof parsed.highlightLinks === 'boolean') safe.highlightLinks = parsed.highlightLinks;
        if (typeof parsed.dyslexiaFont === 'boolean') safe.dyslexiaFont = parsed.dyslexiaFont;
        if (typeof parsed.readableFont === 'boolean') safe.readableFont = parsed.readableFont;
        if (['default', 'white', 'black'].includes(parsed.cursor)) safe.cursor = parsed.cursor;
        if (typeof parsed.hideImages === 'boolean') safe.hideImages = parsed.hideImages;
        if (typeof parsed.interactiveImages === 'boolean') safe.interactiveImages = parsed.interactiveImages;
        if (parsed.speechRate && typeof parsed.speechRate === 'number' && parsed.speechRate >= 0.5 && parsed.speechRate <= 2) safe.speechRate = parsed.speechRate;
        if (['default', 'left', 'center', 'right'].includes(parsed.textAlign)) safe.textAlign = parsed.textAlign;
        if (typeof parsed.bigMode === 'boolean') safe.bigMode = parsed.bigMode;
        if (typeof parsed.shortcuts === 'boolean') safe.shortcuts = parsed.shortcuts;
        if (parsed.cursorSize && typeof parsed.cursorSize === 'number' && parsed.cursorSize >= 24 && parsed.cursorSize <= 128) safe.cursorSize = parsed.cursorSize;
        const isValidColor = (c) => /^#[0-9A-Fa-f]{6}$/.test(c);
        if (parsed.textColor && isValidColor(parsed.textColor)) safe.textColor = parsed.textColor;
        if (parsed.titleColor && isValidColor(parsed.titleColor)) safe.titleColor = parsed.titleColor;
        if (parsed.bgColor && isValidColor(parsed.bgColor)) safe.bgColor = parsed.bgColor;
        return safe;
    };

    const createUI = () => {
        const p = CONFIG.prefix;
        const widget = document.createElement('div'); widget.id = `${p}-widget`;
        const filterOverlay = document.createElement('div'); filterOverlay.id = `${p}-filter-overlay`; filterOverlay.setAttribute('aria-hidden', 'true');
        const guide = document.createElement('div'); guide.id = `${p}-guide`; guide.setAttribute('aria-hidden', 'true');
        const mask = document.createElement('div'); mask.id = `${p}-mask`; mask.setAttribute('aria-hidden', 'true');
        
        const trigger = document.createElement('button'); 
        trigger.id = `${p}-trigger`;
        trigger.innerHTML = MAIN_ICON_SVG; 
        trigger.setAttribute('aria-label', 'Erişilebilirlik panelini aç');
        trigger.setAttribute('aria-expanded', 'false');
        trigger.setAttribute('aria-controls', `${p}-panel`);
        
        const panel = document.createElement('div'); 
        panel.id = `${p}-panel`;
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-modal', 'true');
        panel.setAttribute('aria-labelledby', `${p}-title`);

        const announcer = document.createElement('div');
        announcer.id = `${p}-announcer`;
        announcer.setAttribute('role', 'status');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = `${p}-sr-only`;

        const announce = (msg) => {
            if (announceTimeout) clearTimeout(announceTimeout);
            announcer.textContent = '';
            setTimeout(() => {
                announcer.textContent = msg;
                announceTimeout = setTimeout(() => { announcer.textContent = ''; }, CONFIG.announceClearDelay);
            }, CONFIG.announceDelay);
        };
        
        const toast = document.createElement('div'); toast.id = `${p}-toast`; toast.setAttribute('role', 'alert');
        
        const showToast = (msg) => {
             toast.textContent = msg;
             toast.style.display = 'block';
             setTimeout(() => { toast.style.display = 'none'; }, 3000);
        };

        panel.innerHTML = `
            <div class="${p}-header" role="banner">
                <div class="${p}-header-left"><div class="${p}-header-icon" aria-hidden="true">${MAIN_ICON_SVG}</div><h2 id="${p}-title">Erişilebilirlik</h2></div>
                <button class="${p}-header-close" id="${p}-close-btn" aria-label="Paneli kapat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
            </div>
            <div class="${p}-content" role="main" aria-labelledby="${p}-title">
                <!-- Content truncated for brevity, assume strict replacement matches structure -->
                <!-- 1. Yazı Boyutu -->
                <section class="${p}-section" aria-labelledby="${p}-font-heading"><h3 id="${p}-font-heading">Yazı Boyutu</h3><div class="${p}-font-control" role="group" aria-label="Yazı boyutunu ayarla"><button class="${p}-font-btn" data-action="decFont" aria-label="Yazı boyutunu azalt">-</button><span class="${p}-font-val" id="font-display" aria-live="polite" aria-atomic="true">100%</span><button class="${p}-font-btn" data-action="incFont" aria-label="Yazı boyutunu artır">+</button></div></section>
                
                <!-- 2. Sesli Okuma -->
                <section class="${p}-section" aria-labelledby="${p}-reader-heading"><h3 id="${p}-reader-heading">Sesli Okuma</h3><div class="${p}-grid-3"><button class="${p}-btn" data-action="speechPlay" aria-label="Sayfayı sesli oku"><i aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5z"/></svg></i><span>Oku</span></button><button class="${p}-btn" data-action="speechPause" aria-label="Okumayı duraklat"><i aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg></i><span>Duraklat</span></button><button class="${p}-btn" data-action="speechStop" aria-label="Okumayı baştan başlat"><i aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/></svg></i><span>Tekrar</span></button></div><div class="${p}-slider-row"><label for="speech-rate">Hız:</label><input type="range" class="${p}-slider" min="0.5" max="2" step="0.1" value="1" id="speech-rate" aria-label="Okuma hızı" aria-valuemin="0.5" aria-valuemax="2" aria-valuenow="1"></div></section>

                <!-- 3. Okuma Yardımı -->
                <section class="${p}-section" aria-labelledby="${p}-reading-heading"><h3 id="${p}-reading-heading">Okuma Yardımı</h3><div class="${p}-grid-2"><button class="${p}-btn" data-action="toggleGuide" id="btn-guide" aria-label="Okuma rehberi" aria-pressed="false"><i aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg></i><span>Rehber</span></button><button class="${p}-btn" data-action="toggleMask" id="btn-mask" aria-label="Okuma maskesi" aria-pressed="false"><i aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14v12c-3.31 0-6-2.69-6-6s2.69-6 6-6z"/></svg></i><span>Maske</span></button><button class="${p}-btn" data-action="toggleImages" id="btn-images" aria-label="Görselleri gizle" aria-pressed="false"><i aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zm-2 0H5V5h14v14z"/><path d="M8.5 13.5l2.5 3 3.5-4.5 4.5 6H6l2.5-4.5z"/></svg></i><span>Görsel Gizle</span></button><button class="${p}-btn" data-action="toggleInteractiveImages" id="btn-interactive-images" aria-label="Görsellere tıklayınca büyüt" aria-pressed="false"><i aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg></i><span>Görsel Büyüt</span></button></div></section>

                <!-- 4. Yazı Tipi -->
                <section class="${p}-section" aria-labelledby="${p}-font-type-heading"><h3 id="${p}-font-type-heading">Yazı Tipi</h3><div class="${p}-grid-3"><button class="${p}-btn" data-action="toggleDyslexia" id="btn-dyslexia" aria-label="Disleksi dostu font" aria-pressed="false"><i aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></i><span>Disleksi<br>Dostu</span></button><button class="${p}-btn" data-action="toggleReadable" id="btn-readable" aria-label="Okunaklı font" aria-pressed="false"><i aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 7V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3"/><path d="M9 22h6"/><path d="M12 22V5"/></svg></i><span>Okunaklı<br>Font</span></button><button class="${p}-btn" data-action="toggleLinks" id="btn-links" aria-label="Bağlantıları vurgula" aria-pressed="false"><i aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg></i><span>Bağlantı<br>Vurgusu</span></button></div></section>

                <!-- 5. Metin Aralıkları -->
                <section class="${p}-section" aria-labelledby="${p}-spacing-heading"><h3 id="${p}-spacing-heading">Metin Aralıkları</h3><div class="${p}-grid-3"><button class="${p}-btn" data-action="toggleLetter" id="btn-letter" aria-label="Harf boşluğu" aria-pressed="false"><i aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 12h18M3 7v10M21 7v10"/></svg></i><span>Harf</span></button><button class="${p}-btn" data-action="toggleLine" id="btn-line" aria-label="Satır aralığı" aria-pressed="false"><i aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 3v18M7 3h10M7 21h10"/></svg></i><span>Satır</span></button><button class="${p}-btn" data-action="toggleWord" id="btn-word" aria-label="Kelime boşluğu" aria-pressed="false"><i aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M2 12h20M2 7v10M22 7v10M12 7v10"/></svg></i><span>Kelime</span></button></div></section>

                <!-- 6. Metni Hizala -->
                <section class="${p}-section" aria-labelledby="${p}-align-heading"><h3 id="${p}-align-heading">Metni Hizala</h3><div class="${p}-grid-3"><button class="${p}-btn" data-action="alignLeft" id="btn-align-left" aria-label="Sola hizala" aria-pressed="false"><i aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"/></svg></i><span>Sola</span></button><button class="${p}-btn" data-action="alignCenter" id="btn-align-center" aria-label="Ortala" aria-pressed="false"><i aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 21h18v-2H3v2zm4-4h10v-2H7v2zm-4-4h18v-2H3v2zm4-4h10V7H7v2zM3 3v2h18V3H3z"/></svg></i><span>Ortala</span></button><button class="${p}-btn" data-action="alignRight" id="btn-align-right" aria-label="Sağa hizala" aria-pressed="false"><i aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z"/></svg></i><span>Sağa</span></button></div></section>

                <!-- 7. Görsel Ayarlar -->
                <section class="${p}-section" aria-labelledby="${p}-color-heading"><h3 id="${p}-color-heading">Görsel Ayarlar</h3><div class="${p}-grid-3"><button class="${p}-btn" data-action="toggleContrast" id="btn-contrast" aria-label="Yüksek kontrast" aria-pressed="false"><i aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14v12c-3.31 0-6-2.69-6-6s2.69-6 6-6z"/></svg></i><span>Kontrast</span></button><button class="${p}-btn" data-action="toggleGray" id="btn-gray" aria-label="Solgun renkler" aria-pressed="false"><i aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" opacity="0.3"/></svg></i><span>Solgun</span></button><button class="${p}-btn" data-action="lowSaturation" id="btn-lowsat" aria-label="Düşük doygunluk" aria-pressed="false"><i aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v20"/></svg></i><span>Düşük</span></button><button class="${p}-btn" data-action="highSaturation" id="btn-highsat" aria-label="Yüksek doygunluk" aria-pressed="false"><i aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg></i><span>Yüksek</span></button></div></section>

                <!-- 8. İmleç -->
                <section class="${p}-section" aria-labelledby="${p}-cursor-heading"><h3 id="${p}-cursor-heading">İmleç</h3>
                    <div class="${p}-grid-2" style="margin-bottom:8px;">
                        <button class="${p}-btn" data-action="cursorWhite" id="btn-cur-white" aria-label="Beyaz imleç" aria-pressed="false"><i aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="white" stroke="#374151" stroke-width="2"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/></svg></i><span>Beyaz</span></button>
                        <button class="${p}-btn" data-action="cursorBlack" id="btn-cur-black" aria-label="Siyah imleç" aria-pressed="false"><i aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="#374151" stroke="#374151" stroke-width="2"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/></svg></i><span>Siyah</span></button>
                    </div>
                    <div class="${p}-font-control" role="group" aria-label="İmleç boyutunu ayarla">
                        <button class="${p}-font-btn" data-action="decCursor" aria-label="İmleç boyutunu azalt">-</button>
                        <span class="${p}-font-val" id="cursor-size-display" aria-live="polite" aria-atomic="true">32px</span>
                        <button class="${p}-font-btn" data-action="incCursor" aria-label="İmleç boyutunu artır">+</button>
                    </div>
                </section>

                <!-- 9. Renk Kişiselleştirme -->
                <section class="${p}-section" aria-labelledby="${p}-colors-heading">
                    <h3 id="${p}-colors-heading">Renk Kişiselleştirme</h3>
                    <label class="${p}-color-label" id="text-color-label">Metin Rengi</label>
                    <div class="${p}-color-row-container" role="radiogroup" aria-labelledby="text-color-label"><div class="${p}-colors-wrapper" id="palette-text"></div><button class="${p}-row-reset" data-action="resetRow" data-type="text" aria-label="Metin rengini sıfırla"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg></button></div>
                    <label class="${p}-color-label" id="title-color-label">Başlık Rengi</label>
                    <div class="${p}-color-row-container" role="radiogroup" aria-labelledby="title-color-label"><div class="${p}-colors-wrapper" id="palette-title"></div><button class="${p}-row-reset" data-action="resetRow" data-type="title" aria-label="Başlık rengini sıfırla"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg></button></div>
                    <label class="${p}-color-label" id="bg-color-label">Arkaplan Rengi</label>
                    <div class="${p}-color-row-container" role="radiogroup" aria-labelledby="bg-color-label"><div class="${p}-colors-wrapper" id="palette-bg"></div><button class="${p}-row-reset" data-action="resetRow" data-type="bg" aria-label="Arkaplan rengini sıfırla"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg></button></div>
                </section>

                <!-- 10. Kısayollar (Sabit) -->
                <section class="${p}-section" style="border-bottom:none; padding-bottom:0;">
                    <div id="${p}-shortcuts-info" aria-label="Klavye kısayol listesi">
                        <div style="font-weight:900 !important; color:#0696b0; margin-bottom:10px; display:flex; align-items:center; gap:8px; font-size: 1rem !important; text-transform: uppercase; letter-spacing: 0.5px;">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M20 5H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zM4 7h16v10H4V7z"/></svg>Klavye Kısayol Listesi
                        </div>
                        <div id="${p}-sc-row"><b>ALT + A</b><span>Paneli Aç/Kapat</span></div>
                        <div id="${p}-sc-row"><b>ALT + R</b><span>Ayarları Sıfırla</span></div>
                        <div id="${p}-sc-row"><b>ALT + O</b><span>Sesli Oku</span></div>
                        <div id="${p}-sc-row"><b>ALT + K</b><span>Kontrast</span></div>
                    </div>
                </section>
            </div>
            <div class="${p}-footer">
                  <button class="${p}-btn" data-action="resetAll" aria-label="Tüm erişilebilirlik ayarlarını sıfırla ve sayfayı yenile" style="width:100%; height:52px; min-height:52px; background:#d32f2f !important; color:#ffffff !important; border:none !important; border-radius:0 0 24px 24px !important; flex-direction:row; gap:10px; font-weight:900 !important; font-size:1.35rem !important; margin:0; justify-content:center; align-items:center; padding: 0; display:flex;">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true" style="stroke:#fff !important; pointer-events:none;"><path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg><span style="color:#fff !important; pointer-events:none; font-weight: 900 !important; font-size:1.35rem !important;">Ayarları Sıfırla</span></button>
            </div>
        `;

        widget.append(filterOverlay, guide, mask, trigger, panel, announcer, toast);
        document.body.appendChild(widget);

        const colors = ['#0066cc', '#7c3aed', '#dc2626', '#ea580c', '#facc15', '#0891b2', '#65a30d', '#ffffff', '#000000'];
        const types = ['text', 'title', 'bg'];
        
        types.forEach(type => {
            const container = panel.querySelector(`#palette-${type}`);
            colors.forEach((color, index) => {
                const box = document.createElement('button');
                box.className = `${p}-color-box`;
                box.style.backgroundColor = color;
                box.dataset.type = type;
                box.dataset.color = color;
                box.setAttribute('role', 'radio');
                box.setAttribute('tabindex', index === 0 ? '0' : '-1');
                box.setAttribute('aria-checked', 'false');
                const typeName = type === 'text' ? 'Metin' : type === 'title' ? 'Başlık' : 'Arkaplan';
                box.setAttribute('aria-label', `${typeName} rengini ${COLOR_NAMES[color]} yap`);
                if(color === '#ffffff') box.style.border = '2px solid #767676';
                
                box.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); box.click(); }
                    
                    const boxes = Array.from(container.querySelectorAll('button'));
                    const currentIndex = boxes.indexOf(box);
                    let nextIndex = currentIndex;
                    
                    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); nextIndex = (currentIndex + 1) % boxes.length; } 
                    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); nextIndex = (currentIndex - 1 + boxes.length) % boxes.length; }
                    
                    if (nextIndex !== currentIndex) {
                        boxes[currentIndex].setAttribute('tabindex', '-1');
                        boxes[nextIndex].setAttribute('tabindex', '0');
                        boxes[nextIndex].focus();
                    }
                });
                container.appendChild(box);
            });
        });
        
        return { widget, trigger, panel, guide, mask, filterOverlay, announce, showToast };
    };

    const saveSettings = () => { try { localStorage.setItem(CONFIG.storageKey, JSON.stringify(settings)); } catch(e) { console.error('Erişilebilirlik ayarları kaydedilemedi:', e); } };
    const loadSettings = () => { 
        try { 
            const s = localStorage.getItem(CONFIG.storageKey); 
            if(s) { settings = validateSettings(JSON.parse(s)); }
        } catch(e) { console.error('Erişilebilirlik ayarları yüklenemedi:', e); localStorage.removeItem(CONFIG.storageKey); }
    };

    const updateTextSize = () => {
        const p = CONFIG.prefix;
        const scale = settings.fontSize / 100;
        const widget = document.getElementById(`${p}-widget`);
        const all = document.body.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a, span, li, div, label, input, button, textarea, td, th, blockquote, figcaption, b, i, strong, em, svg');
        const updates = [];
        
        all.forEach(el => {
            if (widget && (el === widget || widget.contains(el))) return;
            if (el.closest && el.closest(`#${p}-widget`)) return;
            if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(el.tagName)) return;

            if (el.tagName.toLowerCase() === 'svg' || el.tagName.toLowerCase() === 'i') {
                if (scale === 1) {
                    el.style.removeProperty('transform');
                    el.style.removeProperty('transform-origin');
                } else {
                    el.style.transform = `scale(${scale})`;
                    el.style.transformOrigin = 'center center';
                    if (window.getComputedStyle(el).display === 'inline') el.style.display = 'inline-block';
                }
                return;
            }

            if (!el.dataset.osmanOrigFs) {
                const s = window.getComputedStyle(el);
                if (s && s.fontSize) {
                    let fs = parseFloat(s.fontSize);
                    const currentActiveScale = settings.fontSize / 100;
                    if (currentActiveScale !== 1) fs = fs / currentActiveScale;
                    el.dataset.osmanOrigFs = fs + "px";
                }
            }

            if (el.dataset.osmanOrigFs) {
                const origVal = parseFloat(el.dataset.osmanOrigFs);
                if (!isNaN(origVal) && origVal > 0) {
                    if (scale === 1) updates.push({ el, remove: true });
                    else updates.push({ el, size: origVal * scale });
                }
            }
        });

        updates.forEach(({ el, size, remove }) => { 
            if (remove || scale === 1) el.style.removeProperty('font-size');
            else el.style.fontSize = `${size}px`; 
        });

        const needsForceLayout = settings.fontSize > 105 || settings.lineHeight || settings.wordSpacing || settings.letterSpacing;
        if (needsForceLayout) document.body.classList.add(`${p}-force-layout`);
        else document.body.classList.remove(`${p}-force-layout`);
    };

    const updateColors = () => {
        const p = CONFIG.prefix;
        const tc = settings.textColor, bg = settings.bgColor, ti = settings.titleColor;
        const b = document.body;

        if (tc) { b.classList.add(`${p}-has-text-color`); b.style.setProperty(`--${p}-text-color`, tc); } else { b.classList.remove(`${p}-has-text-color`); b.style.removeProperty(`--${p}-text-color`); }
        if (bg) { b.classList.add(`${p}-has-bg-color`); b.style.setProperty(`--${p}-bg-color`, bg); b.style.setProperty('background-color', bg, 'important'); } else { b.classList.remove(`${p}-has-bg-color`); b.style.removeProperty(`--${p}-bg-color`); b.style.removeProperty('background-color'); }
        if (ti) { b.classList.add(`${p}-has-title-color`); b.style.setProperty(`--${p}-title-color`, ti); } else { b.classList.remove(`${p}-has-title-color`); b.style.removeProperty(`--${p}-title-color`); }
    };

    const applySettings = (ui) => {
        const p = CONFIG.prefix, body = document.body, overlay = ui.filterOverlay;

        const updateButton = (id, isActive) => { 
            const el = document.getElementById(id); 
            if(el) {
                isActive ? el.classList.add('active') : el.classList.remove('active');
                el.setAttribute('aria-pressed', isActive ? 'true' : 'false');
            }
        };

        [...body.classList].forEach(c => { if(c.startsWith(p + '-')) body.classList.remove(c); });
        overlay.className = '';

        updateTextSize();
        updateColors();

        const display = document.getElementById('font-display');
        if(display) display.textContent = settings.fontSize + '%';

        if(settings.saturation === 'gray') overlay.classList.add('mode-gray');
        else if(settings.saturation === 'low') overlay.classList.add('mode-low-sat');
        else if(settings.saturation === 'high') overlay.classList.add('mode-high-sat');

        if(settings.contrast === 'high') body.classList.add(`${p}-contrast-high`);
        if(settings.letterSpacing) body.classList.add(`${p}-spacing-letter`);
        if(settings.lineHeight) body.classList.add(`${p}-spacing-line`);
        if(settings.wordSpacing) body.classList.add(`${p}-spacing-word`);
        if(settings.dyslexiaFont) body.classList.add(`${p}-dyslexia`);
        if(settings.readableFont) body.classList.add(`${p}-readable`);
        if(settings.cursor === 'white') {
             const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${settings.cursorSize}' height='${settings.cursorSize}' viewBox='0 0 32 32'><path fill='white' stroke='black' stroke-width='1.5' d='M5.5 3.21V20.8l5.5-5.5h8.79L5.5 3.21z'/></svg>`;
             body.classList.add(`${p}-cursor-white`);
             const url = "data:image/svg+xml;utf8," + encodeURIComponent(svg);
             const style = document.createElement('style');
             style.id = `${p}-cursor-style`;
             style.textContent = `
                body.${p}-cursor-white, body.${p}-cursor-white *:not(#${p}-widget *) { cursor: url("${url}") 0 0, auto !important; }
                /* Görsel Büyütme Açıksa İmleci Büyüteç Yap (Ezilmesini Önle) */
                body.${p}-interactive-images.${p}-cursor-white img { cursor: zoom-in !important; cursor: -webkit-zoom-in !important; }
             `;
             const oldStyle = document.getElementById(`${p}-cursor-style`);
             if(oldStyle) oldStyle.remove();
             document.head.appendChild(style);
        } else if(settings.cursor === 'black') {
             const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${settings.cursorSize}' height='${settings.cursorSize}' viewBox='0 0 32 32'><path fill='black' stroke='white' stroke-width='1.5' d='M5.5 3.21V20.8l5.5-5.5h8.79L5.5 3.21z'/></svg>`;
             body.classList.add(`${p}-cursor-black`);
              const url = "data:image/svg+xml;utf8," + encodeURIComponent(svg);
             const style = document.createElement('style');
             style.id = `${p}-cursor-style`;
             style.textContent = `
                body.${p}-cursor-black, body.${p}-cursor-black *:not(#${p}-widget *) { cursor: url("${url}") 0 0, auto !important; }
                /* Görsel Büyütme Açıksa İmleci Büyüteç Yap (Ezilmesini Önle) */
                body.${p}-interactive-images.${p}-cursor-black img { cursor: zoom-in !important; cursor: -webkit-zoom-in !important; }
             `;
             const oldStyle = document.getElementById(`${p}-cursor-style`);
             if(oldStyle) oldStyle.remove();
             document.head.appendChild(style);
        } else {
             const oldStyle = document.getElementById(`${p}-cursor-style`);
             if(oldStyle) oldStyle.remove();
        }

        const cursorDisplay = document.getElementById('cursor-size-display');
        if(cursorDisplay) cursorDisplay.textContent = settings.cursorSize + 'px';

        updateButton('btn-contrast', settings.contrast === 'high');
        updateButton('btn-gray', settings.saturation === 'gray');
        updateButton('btn-lowsat', settings.saturation === 'low');
        updateButton('btn-highsat', settings.saturation === 'high');
        updateButton('btn-letter', settings.letterSpacing);
        updateButton('btn-line', settings.lineHeight);
        updateButton('btn-word', settings.wordSpacing);
        updateButton('btn-guide', settings.readingGuide);
        updateButton('btn-mask', settings.readingMask);
        updateButton('btn-dyslexia', settings.dyslexiaFont);
        updateButton('btn-readable', settings.readableFont);
        updateButton('btn-cur-white', settings.cursor === 'white');
        updateButton('btn-cur-black', settings.cursor === 'black');
        updateButton('btn-links', settings.highlightLinks);
        updateButton('btn-images', settings.hideImages);
        updateButton('btn-align-left', settings.textAlign === 'left');
        updateButton('btn-align-center', settings.textAlign === 'center');
        updateButton('btn-align-right', settings.textAlign === 'right');
        updateButton('btn-big-mode', settings.bigMode);
        updateButton('btn-shortcuts', settings.shortcuts);
        if(settings.hideImages) body.classList.add(`${p}-hide-images`);
        if(settings.interactiveImages) body.classList.add(`${p}-interactive-images`);
        if(settings.highlightLinks) body.classList.add(`${p}-highlight-links`);
        if(settings.textAlign === 'left') body.classList.add(`${p}-align-left`);

        if(settings.textAlign === 'center') body.classList.add(`${p}-align-center`);
        if(settings.textAlign === 'right') body.classList.add(`${p}-align-right`);
        
        const needsForceLayout = settings.fontSize > 105 || settings.lineHeight || settings.wordSpacing || settings.letterSpacing;
        if (needsForceLayout) {
            body.classList.add(`${p}-force-layout`);
        } else {
            body.classList.remove(`${p}-force-layout`);
        }

        if(settings.bigMode) body.classList.add(`${p}-big-mode`);

        let mag = document.getElementById(`${p}-magnifier`);
        if(mag) mag.style.display = 'none';

        updateTextSize();
        updateColors();

        document.getElementById(`${p}-guide`).style.display = settings.readingGuide ? 'block' : 'none';
        document.getElementById(`${p}-mask`).style.display = settings.readingMask ? 'block' : 'none';
        
        updateButton('btn-magnifier', settings.magnifier);
        updateButton('btn-interactive-images', settings.interactiveImages);
        
        document.querySelectorAll(`.${p}-color-box`).forEach(box => {
            const t = box.dataset.type, c = box.dataset.color;
            let active = false;
            if(t === 'text') active = settings.textColor === c;
            else if(t === 'title') active = settings.titleColor === c;
            else if(t === 'bg') active = settings.bgColor === c;
            
            active ? box.classList.add('active') : box.classList.remove('active');
            box.setAttribute('aria-checked', active ? 'true' : 'false');
        });

        const rateInput = document.getElementById('speech-rate');
        if(rateInput) { rateInput.value = settings.speechRate; rateInput.setAttribute('aria-valuenow', settings.speechRate); }

        saveSettings();
    };

    const cleanupSpeech = () => {
        if (speechUtterance) { speechUtterance.onend = null; speechUtterance.onerror = null; speechUtterance = null; }
    };

    const speak = (action) => {
        const synth = window.speechSynthesis;
        if (action === 'pause') { synth.pause(); return; }

        if (action === 'stop' || action === 'play') {
            if (synth.paused) synth.resume();
            synth.cancel();
            cleanupSpeech();

            if (action === 'stop') { isReading = false; return; }

            let textToRead = "";
            const selection = window.getSelection().toString().trim();

            if (selection.length > 0) {
                textToRead = selection;
            } else {
                const parts = [];
                const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
                    acceptNode: (node) => {
                         if (node.parentElement && node.parentElement.closest && node.parentElement.closest(`#${CONFIG.prefix}-widget`)) return NodeFilter.FILTER_REJECT;
                         if (node.parentElement && ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(node.parentElement.tagName)) return NodeFilter.FILTER_REJECT;
                         if (node.parentElement && node.parentElement.getAttribute('aria-hidden') === 'true') return NodeFilter.FILTER_REJECT;
                         return NodeFilter.FILTER_ACCEPT;
                    }
                });

                while(walker.nextNode()) {
                    const txt = walker.currentNode.nodeValue.trim();
                    if (txt) parts.push(txt);
                }
                textToRead = parts.join(' ');
            }
            
            textToRead = textToRead.replace(/\s+/g, ' ').trim();
            if (!textToRead) return;

            const chunks = textToRead.match(/[^.!?]+[.!?]+|\S+/g) || [textToRead];
            let currentIdx = 0;

            const readNextChunk = () => {
                if (currentIdx >= chunks.length || !isReading) {
                    isReading = false;
                    cleanupSpeech();
                    return;
                }

                const u = new SpeechSynthesisUtterance(chunks[currentIdx].trim());
                u.lang = 'tr-TR';
                u.rate = settings.speechRate;

                let voices = synth.getVoices();
                let selectedVoice = voices.find(v => v.lang.startsWith('tr') && !v.name.includes('Google'));
                if (!selectedVoice) selectedVoice = voices.find(v => v.lang.startsWith('tr'));
                if (!selectedVoice) selectedVoice = voices.find(v => v.lang.includes('tr'));
                if (selectedVoice) u.voice = selectedVoice;

                u.onend = () => {
                    currentIdx++;
                    readNextChunk();
                };

                u.onerror = (e) => {
                    console.error('TTS Hatası:', e);
                    isReading = false;
                    cleanupSpeech();
                };

                speechUtterance = u;
                synth.speak(u);
            };

            isReading = true;
            readNextChunk();
        }
    };

    const togglePanel = (ui, show) => {
        const isActive = show ?? !ui.panel.classList.contains('active');
        if (isActive) {
            ui.panel.classList.add('active');
            ui.trigger.setAttribute('aria-expanded', 'true');
            ui.announce('Erişilebilirlik paneli açıldı');
            setTimeout(() => { const firstBtn = ui.panel.querySelector('button:not([disabled])'); if(firstBtn) firstBtn.focus(); }, 100);
        } else {
            ui.panel.classList.remove('active');
            ui.trigger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            ui.announce('Panel kapatıldı');
            ui.trigger.focus();
        }
    };

    const interactiveImageClickHandler = (e) => {
        if(!settings.interactiveImages) return;
        const p = CONFIG.prefix;
        if(e.target.closest(`#${p}-widget`)) return;

        const elements = document.elementsFromPoint(e.clientX, e.clientY);
        const img = elements.find(el => el.tagName === 'IMG');
        
        if(!img) return;

        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        const existingModal = document.getElementById(`${p}-img-modal`);
        if(existingModal) existingModal.remove();

        const modal = document.createElement('div');
        modal.id = `${p}-img-modal`;
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0,0,0,0.95); z-index: 2147483647;
            display: flex; align-items: center; justify-content: center;
            cursor: zoom-out; opacity: 0; transition: opacity 0.3s;
        `;
        
        const modalImg = document.createElement('img');
        modalImg.src = img.src || img.currentSrc;
        
        modalImg.style.cssText = `
            max-width: 85vw; max-height: 85vh;
            min-width: 250px; /* Çok küçük ikonları biraz büyüt ama abartma */
            width: auto; height: auto;
            object-fit: contain;
            background: transparent;
            transform: scale(0.9); transition: transform 0.3s;
        `;
        
        modal.appendChild(modalImg);
        document.body.appendChild(modal);

        requestAnimationFrame(() => {
            modal.style.opacity = '1';
            modalImg.style.transform = 'scale(1)';
        });
        
        const close = () => {
            modal.style.opacity = '0';
            modalImg.style.transform = 'scale(0.9)';
            setTimeout(() => modal.remove(), 300);
        };
        
        modal.onclick = close;
        const escHandler = (ev) => { if(ev.key === 'Escape') { close(); document.removeEventListener('keydown', escHandler); } };
        document.addEventListener('keydown', escHandler);
    };

    const setupObserver = (ui) => {
        let observerTimeout;
        const observer = new MutationObserver((mutations) => {
            let shouldRefresh = false;
            mutations.forEach(m => {
                if (m.addedNodes.length > 0) {
                    m.addedNodes.forEach(node => {
                        if (node.nodeType === 1 && !node.closest(`#${CONFIG.prefix}-widget`)) {
                            shouldRefresh = true;
                        }
                    });
                }
            });
            if (shouldRefresh) {
                clearTimeout(observerTimeout);
                observerTimeout = setTimeout(() => {
                    updateTextSize();
                    updateColors();
                }, 200);
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    };

    const setupRightClickControl = () => {
        document.addEventListener('contextmenu', (e) => {
            if (e.target.closest(`#${CONFIG.prefix}-widget`)) {
                e.preventDefault();
                e.stopImmediatePropagation();
                return false;
            }
        }, true);
    };

    const init = () => {
        if (!document.documentElement.lang) document.documentElement.setAttribute('lang', 'tr');
        
        window.speechSynthesis.getVoices();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
             window.speechSynthesis.onvoiceschanged = () => { window.speechSynthesis.getVoices(); };
        }

        try { injectStyles(); } catch(e) { console.error('Stil hatası:', e); }
        
        const ui = createUI(); 
        setupObserver(ui);
        setupRightClickControl();
        
        ui.trigger.addEventListener('click', () => togglePanel(ui));
        const closeBtn = document.getElementById(`${CONFIG.prefix}-close-btn`);
        if(closeBtn) closeBtn.addEventListener('click', () => togglePanel(ui, false));

        document.addEventListener('click', (e) => {
            if (ui.panel.classList.contains('active') && !ui.panel.contains(e.target) && !ui.trigger.contains(e.target)) {
                togglePanel(ui, false);
            }
        });

        document.removeEventListener('click', interactiveImageClickHandler, true);
        document.addEventListener('click', interactiveImageClickHandler, true);

        window.onbeforeunload = () => {
            if (window.speechSynthesis) window.speechSynthesis.cancel();
        };

        const focusableSelector = 'button:not([disabled]):not([tabindex="-1"]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]';
        ui.panel.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab') return;
            const focusables = Array.from(ui.panel.querySelectorAll(focusableSelector));
            const first = focusables[0]; const last = focusables[focusables.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        });
        
        ui.panel.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            const box = e.target.closest(`.${CONFIG.prefix}-color-box`);
            
            if(btn && !box) {
                const act = btn.dataset.action;
                if(act === 'closePanel') { togglePanel(ui, false); return; }
                if(act === 'incFont') { settings.fontSize = Math.min(settings.fontSize + 10, 200); ui.announce(`Yazı boyutu yüzde ${settings.fontSize}`); applySettings(ui); return; }
                if(act === 'decFont') { settings.fontSize = Math.max(settings.fontSize - 10, 70); ui.announce(`Yazı boyutu yüzde ${settings.fontSize}`); applySettings(ui); return; }
                if(act === 'incCursor') { settings.cursorSize = Math.min(settings.cursorSize + 8, 128); ui.announce(`İmleç boyutu ${settings.cursorSize} piksel`); applySettings(ui); return; }
                if(act === 'decCursor') { settings.cursorSize = Math.max(settings.cursorSize - 8, 24); ui.announce(`İmleç boyutu ${settings.cursorSize} piksel`); applySettings(ui); return; }
                if(act === 'toggleContrast') { settings.contrast = settings.contrast === 'high' ? 'normal' : 'high'; ui.announce(settings.contrast === 'high' ? 'Yüksek kontrast açıldı' : 'Kontrast sıfırlandı'); }
                if(act === 'toggleGray') { settings.saturation = settings.saturation === 'gray' ? 'normal' : 'gray'; ui.announce(settings.saturation === 'gray' ? 'Solgun renk modu açıldı' : 'Renkler sıfırlandı'); }
                if(act === 'lowSaturation') { settings.saturation = settings.saturation === 'low' ? 'normal' : 'low'; ui.announce(settings.saturation === 'low' ? 'Düşük doygunluk açıldı' : 'Renkler sıfırlandı'); }
                if(act === 'highSaturation') { settings.saturation = settings.saturation === 'high' ? 'normal' : 'high'; ui.announce(settings.saturation === 'high' ? 'Yüksek doygunluk açıldı' : 'Renkler sıfırlandı'); }
                if(act === 'toggleLetter') { settings.letterSpacing = !settings.letterSpacing; ui.announce(settings.letterSpacing ? 'Harf aralığı artırıldı' : 'Harf aralığı sıfırlandı'); }
                if(act === 'toggleLine') { settings.lineHeight = !settings.lineHeight; ui.announce(settings.lineHeight ? 'Satır aralığı artırıldı' : 'Satır aralığı sıfırlandı'); }
                if(act === 'toggleWord') { settings.wordSpacing = !settings.wordSpacing; ui.announce(settings.wordSpacing ? 'Kelime aralığı artırıldı' : 'Kelime aralığı sıfırlandı'); }
                if(act === 'toggleDyslexia') { settings.dyslexiaFont = !settings.dyslexiaFont; settings.readableFont = false; ui.announce(settings.dyslexiaFont ? 'Disleksi dostu font açıldı' : 'Yazı tipi sıfırlandı'); }
                if(act === 'toggleReadable') { settings.readableFont = !settings.readableFont; settings.dyslexiaFont = false; ui.announce(settings.readableFont ? 'Okunaklı font açıldı' : 'Yazı tipi sıfırlandı'); }
                if(act === 'cursorWhite') { settings.cursor = settings.cursor === 'white' ? 'default' : 'white'; ui.announce(settings.cursor === 'white' ? 'Beyaz imleç açıldı' : 'İmleç sıfırlandı'); }
                if(act === 'cursorBlack') { settings.cursor = settings.cursor === 'black' ? 'default' : 'black'; ui.announce(settings.cursor === 'black' ? 'Siyah imleç açıldı' : 'İmleç sıfırlandı'); }
                if(act === 'toggleLinks') { settings.highlightLinks = !settings.highlightLinks; ui.announce(settings.highlightLinks ? 'Bağlantılar vurgulandı' : 'Bağlantı vurgusu kaldırıldı'); }
                if(act === 'toggleImages') { settings.hideImages = !settings.hideImages; ui.announce(settings.hideImages ? 'Görseller gizlendi' : 'Görseller gösteriliyor'); }
                if(act === 'toggleInteractiveImages') { 
                    settings.interactiveImages = !settings.interactiveImages; 
                    ui.announce(settings.interactiveImages ? 'Görsel büyütme açıldı' : 'Görsel büyütme kapatıldı');
                    if(settings.interactiveImages) ui.showToast('Görsel Büyütme Açık: Bir resme tıklayın');
                    applySettings(ui); return; 
                }
                if(act === 'toggleGuide') { settings.readingGuide = !settings.readingGuide; if(settings.readingGuide) settings.readingMask = false; ui.announce(settings.readingGuide ? 'Okuma rehberi açıldı' : 'Okuma rehberi kapatıldı'); }
                if(act === 'toggleMask') { settings.readingMask = !settings.readingMask; if(settings.readingMask) settings.readingGuide = false; ui.announce(settings.readingMask ? 'Okuma maskesi açıldı' : 'Okuma maskesi kapatıldı'); }
                if(act === 'alignLeft') { settings.textAlign = settings.textAlign === 'left' ? 'default' : 'left'; ui.announce('Metin sola hizalandı'); }
                if(act === 'alignCenter') { settings.textAlign = settings.textAlign === 'center' ? 'default' : 'center'; ui.announce('Metin ortalandı'); }
                if(act === 'alignRight') { settings.textAlign = settings.textAlign === 'right' ? 'default' : 'right'; ui.announce('Metin sağa hizalandı'); }
                if(act === 'resetRow') {
                    const type = btn.dataset.type;
                    if(type === 'text') { settings.textColor = null; ui.announce('Metin rengi sıfırlandı'); }
                    if(type === 'title') { settings.titleColor = null; ui.announce('Başlık rengi sıfırlandı'); }
                    if(type === 'bg') { settings.bgColor = null; ui.announce('Arkaplan rengi sıfırlandı'); }
                }
                if(act === 'bigMode') { settings.bigMode = !settings.bigMode; ui.announce(settings.bigMode ? 'Büyük panel modu açıldı' : 'Normal panel moduna geçildi'); }
                if(act === 'toggleShortcuts') {
                    settings.shortcuts = !settings.shortcuts; ui.announce(settings.shortcuts ? 'Klavye kısayolları aktif' : 'Klavye kısayolları kapatıldı'); applySettings(ui);
                    if(settings.shortcuts) { setTimeout(() => { const scInfo = document.getElementById(`${CONFIG.prefix}-shortcuts-info`); const content = document.querySelector(`.${CONFIG.prefix}-content`); if(scInfo && content) { content.scrollTo({ top: content.scrollHeight, behavior: 'smooth' }); scInfo.focus(); } }, 100); }
                    return;
                }
                if(act === 'speechPlay') { if (window.speechSynthesis.paused) { window.speechSynthesis.resume(); ui.announce('Okuma devam ediyor'); } else { speak('play'); ui.announce('Sesli okuma başlatıldı'); } }
                if(act === 'speechPause') { speak('pause'); ui.announce('Sesli okuma duraklatıldı'); }
                if(act === 'speechStop') { speak('stop'); ui.announce('Sesli okuma durduruldu'); }
                if(act === 'resetAll') { 
                    ui.announce('Tüm ayarlar sıfırlanıyor');
                    const savedShortcuts = settings.shortcuts; 
                    setTimeout(() => { localStorage.removeItem(CONFIG.storageKey); settings = { ...DEFAULT_SETTINGS, shortcuts: savedShortcuts }; applySettings(ui); }, 200);
                    return; 
                }
                applySettings(ui);
            }
            if(box) {
                const t = box.dataset.type, c = box.dataset.color;
                const colorName = COLOR_NAMES[c] || c;
                if(t === 'text') { settings.textColor = settings.textColor === c ? null : c; ui.announce(settings.textColor ? `Metin rengi ${colorName} yapıldı` : 'Metin rengi sıfırlandı'); }
                if(t === 'title') { settings.titleColor = settings.titleColor === c ? null : c; ui.announce(settings.titleColor ? `Başlık rengi ${colorName} yapıldı` : 'Başlık rengi sıfırlandı'); }
                if(t === 'bg') { settings.bgColor = settings.bgColor === c ? null : c; ui.announce(settings.bgColor ? `Arkaplan rengi ${colorName} yapıldı` : 'Arkaplan rengi sıfırlandı'); }
                applySettings(ui);
            }
        });
        
        const sl = document.getElementById('speech-rate');
        if(sl) { sl.addEventListener('input', (e) => { settings.speechRate = parseFloat(e.target.value); sl.setAttribute('aria-valuenow', settings.speechRate); if(isReading) { speak('stop'); speak('play'); } }); }
        
        let mouseMoveThrottled = false;
        document.addEventListener('mousemove', (e) => {
            if(mouseMoveThrottled) return; mouseMoveThrottled = true; setTimeout(() => mouseMoveThrottled = false, 16);
            if(settings.readingGuide) ui.guide.style.top = (e.clientY - 2) + 'px';
            if(settings.readingMask) ui.mask.style.top = (e.clientY - 50) + 'px';
        });
        try {
            document.addEventListener('keydown', (e) => {
                if(e.key === 'Escape' && ui.panel.classList.contains('active')) { togglePanel(ui, false); return; }
                if(!e.altKey) return;
                const target = e.target.tagName.toLowerCase();
                if (['input', 'textarea', 'select'].includes(target) || e.target.isContentEditable) return;
                const k = e.key.toLowerCase();
                if(k === 'a') { e.preventDefault(); togglePanel(ui); }
                if(k === 'r') { e.preventDefault(); ui.announce('Tüm ayarlar sıfırlanıyor'); const savedShortcuts = settings.shortcuts; setTimeout(() => { localStorage.removeItem(CONFIG.storageKey); settings = { ...DEFAULT_SETTINGS, shortcuts: savedShortcuts }; applySettings(ui); }, 200); }
                if(k === '+' || k === '=') { e.preventDefault(); settings.fontSize = Math.min(settings.fontSize + 10, 200); ui.announce(`Yazı boyutu yüzde ${settings.fontSize}`); applySettings(ui); }
                if(k === '-' || k === '_') { e.preventDefault(); settings.fontSize = Math.max(settings.fontSize - 10, 70); ui.announce(`Yazı boyutu yüzde ${settings.fontSize}`); applySettings(ui); }
                if(k === 'k') { e.preventDefault(); settings.contrast = settings.contrast === 'high' ? 'normal' : 'high'; ui.announce(settings.contrast === 'high' ? 'Yüksek kontrast açıldı' : 'Kontrast sıfırlandı'); applySettings(ui); }
                if(k === 'o') { e.preventDefault(); speak('play'); ui.announce('Sesli okuma başlatıldı'); }
            });

            loadSettings(); 
            applySettings(ui);
        } catch (err) {
            console.error('MEBİ Access: Ayarlar yüklenirken hata oluştu.', err);
            ui.showToast('Ayarlar yüklenemedi. Konsolu kontrol edin.');
        }

        setTimeout(() => {
            const btn = document.querySelector(`#${CONFIG.prefix}-trigger`);
            const panel = document.querySelector(`#${CONFIG.prefix}-panel`);
            if (btn && panel) { console.log('%c [MEBİ Access] Hazır (TR OK) ', 'background: #0696b0; color: #fff'); }
        }, 500);
    };

    if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); }
})();
