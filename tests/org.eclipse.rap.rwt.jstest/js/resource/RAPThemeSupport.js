qx.Theme.define("org.eclipse.swt.theme.DefaultColors",{title:"RAP Default Theme",colors:{}});qx.Theme.define("org.eclipse.swt.theme.DefaultBorders",{title:"RAP Default Theme",extend:org.eclipse.swt.theme.BordersBase,borders:{}});qx.Theme.define("org.eclipse.swt.theme.DefaultFonts",{title:"RAP Default Theme",fonts:{}});qx.Theme.define("org.eclipse.swt.theme.DefaultIcons",{title:"RAP Default Theme",icons:{uri:"rwt-resources/themes/Default/widgets"}});qx.Theme.define("org.eclipse.swt.theme.DefaultWidgets",{title:"RAP Default Theme",widgets:{uri:"rwt-resources/themes/Default/widgets"}});qx.Theme.define("org.eclipse.swt.theme.DefaultAppearances",{title:"RAP Default Theme",extend:org.eclipse.swt.theme.AppearancesBase,appearances:{
"hyperlink":{style:function(states){var tv=new org.eclipse.swt.theme.ThemeValues(states);return{font: tv.getCssFont("*","font"),cursor:"pointer",spacing:4,width:"auto",height:"auto",horizontalChildrenAlign:"left",verticalChildrenAlign:"middle"}}},
"formtext":{style:function(states){var tv=new org.eclipse.swt.theme.ThemeValues(states);return{textColor:tv.getCssColor("FormText","color"),backgroundColor:tv.getCssColor("FormText","background-color"),font:tv.getCssFont("FormText","font"),border:tv.getCssBorder("FormText","border") }}},"formtext-text":{style:function(states){var tv=new org.eclipse.swt.theme.ThemeValues(states);return{cursor:qx.constant.Style.CURSOR_DEFAULT}}},"formtext-image":{style:function(states){var tv=new org.eclipse.swt.theme.ThemeValues(states);return{}}},"formtext-bullet":{style:function(states){var tv=new org.eclipse.swt.theme.ThemeValues(states);return{}}},"formtext-hyperlink":{style:function(states){var tv=new org.eclipse.swt.theme.ThemeValues(states);return{cursor:qx.constant.Style.CURSOR_HAND}}}}});qx.Theme.define("org.eclipse.swt.theme.Default",{title:"RAP Default Theme",meta:{"color":org.eclipse.swt.theme.DefaultColors,"border":org.eclipse.swt.theme.DefaultBorders,"font":org.eclipse.swt.theme.DefaultFonts,"icon":org.eclipse.swt.theme.DefaultIcons,"widget":org.eclipse.swt.theme.DefaultWidgets,"appearance":org.eclipse.swt.theme.DefaultAppearances}});ts=org.eclipse.swt.theme.ThemeStore.getInstance();ts.defineValues({"dimensions":{"0": 0,"5e": 2,"34e": 18,"bc": 4,"3db": 21,"2c1": 15},"boxdims":{"1204d3a5": [4,5,4,5],"1203f6c4": [0,3,0,4],"12043ca2": [1,10,1,10],"120462f3": [2,3,2,3],"12042a9a": [1,2,1,2],"1205a000": [8,0,0,0],"1203f482": [0,2,0,2],"12050bfe": [5,6,5,6],"12045c31": [2,0,2,1],"1205a4b2": [8,2,2,2],"1203f000": [0,0,0,0],"1203f018": [0,0,1,0],"12042859": [1,1,1,1],"1204cef5": [4,3,2,5],"1204969c": [3,2,1,4],"12049b4c": [3,4,3,4]},"images":{"a38b22a1": ["a38b22a1",1,24],"df7ccd2b": ["df7ccd2b",16,5],"1538b132": ["1538b132",10,10],"79831ead": ["79831ead",14,14],"812027ac": ["812027ac",14,14],"bf9cb6": ["bf9cb6",13,13],"ffffffff": null,"343b3df0": ["343b3df0",32,32],"e37249d4": ["e37249d4",32,32],"6344dd7c": ["6344dd7c",13,13],"3698cce2": ["3698cce2",16,15],"8ad6c431": ["8ad6c431",16,7],"9ae0f28": ["9ae0f28",13,13],"1ff103ea": ["1ff103ea",5,8],"6b14472a": ["6b14472a",14,14],"2d0addd8": ["2d0addd8",5,8],"148ab7bc": ["148ab7bc",1,24],"59ba7737": ["59ba7737",5,3],"ce0bfe16": ["ce0bfe16",14,14],"528d932a": ["528d932a",16,15],"4a0314a6": ["4a0314a6",13,13],"cc9c8d43": ["cc9c8d43",14,14],"c3558a6c": ["c3558a6c",14,14],"2d562700": ["2d562700",16,16],"b17f67f9": ["b17f67f9",13,13],"8cbf9f2f": ["8cbf9f2f",14,14],"f5110f98": ["f5110f98",14,14],"5858bdc1": ["5858bdc1",14,14],"e29766ac": ["e29766ac",7,4],"4cc5335": ["4cc5335",14,14],"7e94854d": ["7e94854d",13,13],"51c7107f": ["51c7107f",16,16],"d1917230": ["d1917230",5,3],"4fb4e47": ["4fb4e47",13,13],"9b3a140b": ["9b3a140b",14,14],"bd09f79": ["bd09f79",10,10],"47c215f1": ["47c215f1",7,4],"5e445f86": ["5e445f86",16,16],"6e4972e7": ["6e4972e7",16,15],"41c42459": ["41c42459",16,16],"6da39160": ["6da39160",13,13],"77a394c9": ["77a394c9",14,14],"383538e6": ["383538e6",8,5],"7cfb3c1e": ["7cfb3c1e",5,3],"2e30c177": ["2e30c177",14,14],"730f342e": ["730f342e",14,14],"fcf99fc5": ["fcf99fc5",7,4],"8cc3d9c2": ["8cc3d9c2",14,14],"e19b70c9": ["e19b70c9",5,3],"38054a38": ["38054a38",32,32],"81f5b807": ["81f5b807",13,13],"37dc5d28": ["37dc5d28",32,32],"6356c615": ["6356c615",13,13],"5efe183f": ["5efe183f",16,15],"2b1b5ef8": ["2b1b5ef8",8,5],"42f14f4f": ["42f14f4f",13,13],"8f565f00": ["8f565f00",14,14]},"gradients":{"a38b22a1": null,"df7ccd2b": null,"1538b132": null,"79831ead": null,"812027ac": null,"bf9cb6": null,"ffffffff": null,"343b3df0": null,"e37249d4": null,"6344dd7c": null,"3698cce2": null,"8ad6c431": null,"9ae0f28": null,"1ff103ea": null,"6b14472a": null,"2d0addd8": null,"148ab7bc": null,"59ba7737": null,"ce0bfe16": null,"528d932a": null,"4a0314a6": null,"cc9c8d43": null,"c3558a6c": null,"2d562700": null,"b17f67f9": null,"8cbf9f2f": null,"f5110f98": null,"5858bdc1": null,"e29766ac": null,"4cc5335": null,"7e94854d": null,"51c7107f": null,"d1917230": null,"4fb4e47": null,"9b3a140b": null,"bd09f79": null,"47c215f1": null,"5e445f86": null,"6e4972e7": null,"41c42459": null,"6da39160": null,"77a394c9": null,"383538e6": null,"7cfb3c1e": null,"2e30c177": null,"730f342e": null,"fcf99fc5": null,"8cc3d9c2": null,"e19b70c9": null,"38054a38": null,"81f5b807": null,"37dc5d28": null,"6356c615": null,"5efe183f": null,"2b1b5ef8": null,"42f14f4f": null,"8f565f00": null},"colors":{"0": "#000000","e1ffff": "#ffffe1","3cc8fe": "#fec83c","808080": "#808080","fff1f1": "#f1f1ff","ffffffff": "undefined","e4dfdc": "#dcdfe4","c8d0d4": "#d4d0c8","fbf7f7": "#f7f7fb","99a8ac": "#aca899","f8f0f0": "#f0f0f8","21dfff": "#ffdf21","7f0000": "#00007f","c0c0c0": "#c0c0c0","fff8f8": "#f8f8ff","aaa6a7": "#a7a6aa","2020cb": "#cb2020","e6e1e1": "#e1e1e6","dddddd": "#dddddd","8c8785": "#85878c","fefbfb": "#fbfbfe","d0d0d0": "#d0d0d0","c56a31": "#316ac5","a59679": "#7996a5","c08000": "#0080c0","ffffff": "#ffffff","f3e3d9": "#d9e3f3"},"fonts":{"c2bbbd19":{"family": ["Segoe UI","Corbel","Calibri","Tahoma","Lucida Sans Unicode","sans-serif"],"size": 11,"bold": true,"italic": false},"e7de1195":{"family": ["Segoe UI","Corbel","Calibri","Tahoma","Lucida Sans Unicode","sans-serif"],"size": 11,"bold": false,"italic": false}},"borders":{"dc902e9c":{"width": 1,"style": "solid","color": "#a7a6aa"},"c411a436":{"width": 1,"style": "outset","color": null},"defc3b4a":{"width": 1,"style": "solid","color": "#aca899"},"c411a45c":{"width": 2,"style": "outset","color": null},"8879b0d1":{"width": 1,"style": "solid","color": "#000000"},"36a":{"width": 0,"style": null,"color": null},"5fbe325":{"width": 2,"style": "inset","color": null},"df980d98":{"width": 1,"style": "solid","color": "#c0c0c0"},"5fbe2ff":{"width": 1,"style": "inset","color": null}}});ts.setThemeCssValues("org.eclipse.swt.theme.Default",{"DateTime-DownButton":{"background-image": [[[],"e19b70c9"]],"background-color": [[[],"fff8f8"]],"border": [[[":pressed"],"5fbe325"],[[],"c411a45c"]],"border-radius": [],"width": [[[],"2c1"]]},"Spinner-DownButton":{"background-image": [[[],"59ba7737"]],"background-color": [[[],"fff8f8"]],"border": [[[":pressed"],"5fbe325"],[[],"c411a45c"]],"border-radius": [],"width": [[[],"2c1"]]},"DateTime-DropDownButton":{"background-image": [[[],"47c215f1"]],"background-color": [[[],"fff8f8"]],"border": [[[],"c411a436"]],"border-radius": [],"width": [[[],"2c1"]]},"Link-Hyperlink":{"color": [[[":disabled"],"aaa6a7"],[[],"7f0000"]]},"MenuItem-CascadeIcon":{"background-image": [[[],"4fb4e47"]]},"Spinner":{"color": [[[":disabled"],"aaa6a7"],[[],"0"]],"background-color": [[[],"ffffff"]],"font": [[[],"e7de1195"]],"border": [[["[BORDER"],"5fbe2ff"],[[],"36a"]],"border-radius": [],"padding": [[[],"120462f3"]]},"ToolItem":{"color": [[[":disabled"],"aaa6a7"],[[],"ffffffff"]],"background-color": [[[":hover"],"ffffff"],[[],"ffffffff"]],"background-image": [[[],"ffffffff"]],"border": [[[":selected"],"5fbe2ff"],[[":pressed"],"5fbe2ff"],[[":hover"],"c411a436"],[["[FLAT"],"36a"],[[],"c411a436"]],"spacing": [[[],"bc"]],"padding": [[[":selected"],"1204969c"],[[":pressed"],"1204969c"],[[":hover"],"120462f3"],[["[FLAT"],"12049b4c"],[[],"120462f3"]]},"Tree-Checkbox":{"background-image": [[[":checked",":grayed",":hover"],"bf9cb6"],[[":checked",":grayed"],"81f5b807"],[[":checked",":hover"],"42f14f4f"],[[":checked"],"6da39160"],[[":hover"],"9ae0f28"],[[],"b17f67f9"]]},"CTabFolder":{"border-color": [[[],"c0c0c0"]]},"TreeColumn":{"background-color": [[[":hover"],"fff8f8"],[[],"fff8f8"]],"background-image": [[[],"ffffffff"]]},"CoolBar":{"background-image": [[[],"ffffffff"]]},"ExpandItem-Button":{"background-image": [[[":expanded",":hover"],"2d562700"],[[":expanded"],"51c7107f"],[[":hover"],"41c42459"],[[],"5e445f86"]]},"Group":{"background-color": [[[],"fff8f8"]],"color": [[[":disabled"],"aaa6a7"],[[],"0"]],"font": [[[],"e7de1195"]],"border": [[["[BORDER"],"5fbe325"],[[],"36a"]]},"Spinner-UpButton":{"background-image": [[[],"7cfb3c1e"]],"background-color": [[[],"fff8f8"]],"border": [[[":pressed"],"5fbe325"],[[],"c411a45c"]],"border-radius": [],"width": [[[],"2c1"]]},"Menu":{"color": [[[":disabled"],"aaa6a7"],[[],"0"]],"background-color": [[[],"fff8f8"]],"font": [[[],"e7de1195"]],"border": [[[],"c411a45c"]],"padding": [[[],"12042859"]]},"TabFolder":{},"Button":{"color": [[[":disabled"],"aaa6a7"],[[],"0"]],"background-color": [[["[TOGGLE","[FLAT",":selected"],"e6e1e1"],[["[TOGGLE","[FLAT",":pressed"],"e6e1e1"],[["[PUSH","[FLAT",":pressed"],"e6e1e1"],[["[TOGGLE",":hover"],"fefbfb"],[["[PUSH",":hover"],"fefbfb"],[["[TOGGLE"],"fbf7f7"],[["[PUSH"],"fbf7f7"],[[],"fff8f8"]],"background-image": [[[],"ffffffff"]],"border": [[["[TOGGLE","[BORDER",":pressed"],"5fbe325"],[["[PUSH","[BORDER",":pressed"],"5fbe325"],[["[TOGGLE",":selected"],"5fbe2ff"],[["[TOGGLE",":pressed"],"5fbe2ff"],[["[PUSH",":pressed"],"5fbe2ff"],[["[TOGGLE","[BORDER"],"c411a45c"],[["[PUSH","[BORDER"],"c411a45c"],[["[TOGGLE","[FLAT"],"8879b0d1"],[["[PUSH","[FLAT"],"8879b0d1"],[["[TOGGLE"],"c411a436"],[["[PUSH"],"c411a436"],[["[BORDER"],"5fbe325"],[[],"36a"]],"border-radius": [],"padding": [[["[TOGGLE","[FLAT",":selected"],"12050bfe"],[["[TOGGLE","[FLAT",":pressed"],"12050bfe"],[["[PUSH","[FLAT",":pressed"],"12050bfe"],[["[TOGGLE",":selected"],"1204cef5"],[["[TOGGLE",":pressed"],"1204cef5"],[["[PUSH",":pressed"],"1204cef5"],[["[TOGGLE","[FLAT"],"12050bfe"],[["[PUSH","[FLAT"],"12050bfe"],[["[TOGGLE"],"12050bfe"],[["[PUSH"],"12050bfe"],[[],"1204d3a5"]],"spacing": [[["[RADIO"],"bc"],[["[CHECK"],"bc"],[[],"5e"]],"font": [[["[TOGGLE"],"e7de1195"],[["[PUSH"],"e7de1195"],[[],"e7de1195"]]},"Slider-UpButton":{"background-color": [[[],"fff8f8"]],"border": [[[],"c411a436"]],"background-image": [[[":vertical"],"2b1b5ef8"],[[":horizontal"],"1ff103ea"],[[],"ffffffff"]]},"DateTime":{"color": [[[":disabled"],"aaa6a7"],[[],"0"]],"background-color": [[[],"ffffff"]],"font": [[[],"e7de1195"]],"border": [[["[BORDER"],"5fbe2ff"],[[],"36a"]],"border-radius": [],"padding": [[[],"120462f3"]]},"MenuItem-CheckIcon":{"background-image": [[[],"8ad6c431"]]},"Slider-DownButton":{"background-color": [[[],"fff8f8"]],"border": [[[],"c411a436"]],"background-image": [[[":vertical"],"383538e6"],[[":horizontal"],"2d0addd8"],[[],"ffffffff"]]},"CCombo-Button":{"background-image": [[[],"e29766ac"]],"background-color": [[[],"fff8f8"]],"border": [[["[FLAT",":hover"],"c411a436"],[["[FLAT"],"36a"],[[],"c411a436"]],"border-radius": [],"width": [[[],"2c1"]]},"Shell":{"border": [[[":maximized"],"36a"],[["[BORDER"],"c411a45c"],[["[TITLE"],"c411a45c"],[["[BORDER"],"5fbe325"],[[],"8879b0d1"]],"border-radius": [],"background-image": [[[],"ffffffff"]],"padding": [[[],"1203f000"]],"background-color": [[[],"fff8f8"]]},"ExpandItem-Header":{"background-color": [[[],"c8d0d4"]]},"Scale":{"background-color": [[[],"fff8f8"]],"border": [[["[BORDER"],"5fbe325"],[[],"36a"]],"border-radius": []},"Combo":{"color": [[[":disabled"],"aaa6a7"],[[],"0"]],"background-color": [[[],"ffffff"]],"font": [[[],"e7de1195"]],"border": [[[],"5fbe325"]],"border-radius": []},"ToolItem-DropDownIcon":{"background-image": [[[],"fcf99fc5"]],"border": [[[":hover"],"5fbe2ff"],[[],"36a"]]},"Combo-Button":{"background-image": [[[],"e29766ac"]],"background-color": [[[],"fff8f8"]],"border": [[[],"c411a436"]],"border-radius": [],"width": [[[],"2c1"]]},"ToolTip":{"color": [[[],"0"]],"background-color": [[[],"e1ffff"]]},"Slider-Thumb":{"background-color": [[[],"fff8f8"]],"border": [[[],"c411a436"]]},"CCombo-List":{"border": [[[],"dc902e9c"]],"border-radius": []},"DateTime-Calendar-Day":{"color": [[[":selected",":hover"],"ffffff"],[[":otherMonth"],"808080"],[[":selected"],"ffffff"],[[],"0"]],"background-color": [[[":selected",":hover"],"c56a31"],[[":hover"],"f3e3d9"],[[":otherMonth"],"ffffffff"],[[":selected"],"c56a31"],[[],"fff8f8"]]},"ExpandBar":{"color": [[[],"0"]],"font": [[[],"e7de1195"]]},"Display":{"rwt-shadow-color": [[[],"aaa6a7"]],"rwt-highlight-color": [[[],"ffffff"]],"rwt-darkshadow-color": [[[],"8c8785"]],"rwt-lightshadow-color": [[[],"e4dfdc"]],"rwt-thinborder-color": [[[],"99a8ac"]],"rwt-selectionmarker-color": [[[],"3cc8fe"]],"rwt-error-image": [[[],"e37249d4"]],"rwt-information-image": [[[],"38054a38"]],"rwt-working-image": [],"rwt-question-image": [[[],"343b3df0"]],"rwt-warning-image": [[[],"37dc5d28"]]},"TableItem":{"color": [[[":selected"],"ffffff"],[[":disabled"],"aaa6a7"],[[],"ffffffff"]],"background-color": [[[":selected",":unfocused"],"c0c0c0"],[[":selected"],"c56a31"],[[],"ffffffff"]]},"ToolBar":{"color": [[[":disabled"],"aaa6a7"],[[],"0"]],"background-color": [[[],"fff8f8"]],"background-image": [[[],"ffffffff"]],"padding": [[[],"1203f000"]],"spacing": [[[],"0"]]},"*":{"color": [[[":disabled"],"aaa6a7"],[[],"0"]],"background-color": [[[],"fff8f8"]],"background-image": [[[],"ffffffff"]],"font": [[[],"e7de1195"]],"border": [[["[BORDER"],"5fbe325"],[[],"36a"]]},"Button-RadioIcon":{"background-image": [[[":selected",":hover"],"6344dd7c"],[[":selected"],"7e94854d"],[[":hover"],"6356c615"],[[],"4a0314a6"]]},"Sash":{},"DateTime-DropDownCalendar":{"border": [[[],"dc902e9c"]]},"DateTime-Calendar-NextYearButton":{"background-image": [[[],"5efe183f"]]},"DateTime-Field":{"color": [[[":selected"],"ffffff"],[[],"0"]],"background-color": [[[":selected"],"c56a31"],[[],"fff8f8"]]},"TabItem":{"background-color": [[[":hover"],"fff8f8"],[[":selected"],"fff8f8"],[[],"fff8f8"]],"background-image": [[[],"ffffffff"]],"border-top-color": [[[":selected"],"3cc8fe"],[[],"99a8ac"]],"border-bottom-color": [[[":selected"],"3cc8fe"],[[],"99a8ac"]]},"DateTime-Calendar-NextMonthButton":{"background-image": [[[],"528d932a"]]},"FormText":{"color": [[[],"0"]],"background-color": [[[],"ffffff"]],"font": [[[],"e7de1195"]],"border": [[["[BORDER"],"5fbe325"],[[],"36a"]]},"ToolItem-Separator":{"width": [[[],"bc"]]},"CCombo":{"color": [[[":disabled"],"aaa6a7"],[[],"0"]],"background-color": [[[],"ffffff"]],"font": [[[],"e7de1195"]],"border": [[["[BORDER"],"5fbe2ff"],[[],"36a"]],"border-radius": []},"TableColumn-SortIndicator":{"background-image": [[[":down"],"bd09f79"],[[":up"],"1538b132"],[[],"ffffffff"]]},"TreeColumn-SortIndicator":{"background-image": [[[":down"],"bd09f79"],[[":up"],"1538b132"],[[],"ffffffff"]]},"Group-Frame":{"border": [[[],"defc3b4a"]],"border-radius": [],"margin": [[[],"1205a000"]],"padding": [[[],"1205a4b2"]]},"ProgressBar":{"background-color": [[[],"fff8f8"]],"background-image": [[[],"ffffffff"]],"border": [[[],"df980d98"]]},"Shell-MinButton":{"margin": [[[],"12045c31"]],"background-image": [[[":inactive",":hover"],"77a394c9"],[[":inactive"],"8cbf9f2f"],[[":hover"],"f5110f98"],[[],"8f565f00"]]},"TableColumn":{"background-color": [[[],"fff8f8"]],"background-image": [[[],"ffffffff"]]},"MenuItem-RadioIcon":{"background-image": [[[],"df7ccd2b"]]},"Group-Label":{"padding": [[[],"1203f6c4"]],"margin": [[[],"12043ca2"]],"background-color": [[[],"ffffffff"]],"color": [[[],"ffffffff"]]},"Table-Checkbox":{"width": [[[],"3db"]],"background-image": [[[":checked",":grayed",":hover"],"bf9cb6"],[[":checked",":grayed"],"81f5b807"],[[":checked",":hover"],"42f14f4f"],[[":checked"],"6da39160"],[[":hover"],"9ae0f28"],[[],"b17f67f9"]]},"CTabItem":{"color": [[[":selected"],"0"],[[":disabled"],"aaa6a7"],[[],"0"]],"background-color": [[[":selected"],"f3e3d9"],[[],"fff8f8"]],"background-image": [[[],"ffffffff"]]},"Combo-Field":{"padding": []},"Table":{"color": [[[":disabled"],"aaa6a7"],[[],"0"]],"background-color": [[[],"ffffff"]]},"TreeItem":{"color": [[[":selected",":unfocused"],"ffffff"],[[":selected"],"ffffff"],[[":disabled"],"aaa6a7"],[[],"0"]],"background-color": [[[":selected",":unfocused"],"c0c0c0"],[[":selected"],"c56a31"],[[],"ffffff"]]},"Slider":{"background-color": [[[],"f8f0f0"]]},"DateTime-Calendar-Navbar":{"color": [[[],"ffffff"]],"background-color": [[[],"c08000"]]},"CoolItem-Handle":{"border": [[[],"c411a436"]],"width": [[[],"bc"]]},"Tree":{"color": [[[":disabled"],"aaa6a7"],[[],"0"]],"background-color": [[[],"ffffff"]]},"DateTime-UpButton":{"background-image": [[[],"d1917230"]],"background-color": [[[],"fff8f8"]],"border": [[[":pressed"],"5fbe325"],[[],"c411a45c"]],"border-radius": [],"width": [[[],"2c1"]]},"DateTime-Calendar-PreviousYearButton":{"background-image": [[[],"3698cce2"]]},"List":{"font": [[[],"e7de1195"]],"color": [[[":disabled"],"aaa6a7"],[[],"0"]],"background-color": [[[],"ffffff"]],"border": [[["[BORDER"],"5fbe2ff"],[[],"36a"]]},"List-Item":{"color": [[[":selected"],"ffffff"],[[":disabled"],"aaa6a7"],[[],"0"]],"background-color": [[[":selected",":unfocused"],"c0c0c0"],[[":selected"],"c56a31"],[[],"ffffffff"]]},"Sash-Handle":{"background-image": [[[":vertical"],"ffffffff"],[[":horizontal"],"ffffffff"],[[],"ffffffff"]]},"DateTime-Calendar-PreviousMonthButton":{"background-image": [[[],"6e4972e7"]]},"Scale-Thumb":{"background-color": [[[],"fff1f1"]]},"Table-Cell":{"padding": [[[],"1203f482"]],"spacing": [[[],"5e"]]},"Text":{"color": [[[":disabled"],"aaa6a7"],[[],"0"]],"background-color": [[[],"ffffff"]],"font": [[[],"e7de1195"]],"border": [[["[BORDER"],"5fbe2ff"],[[],"36a"]],"border-radius": [],"padding": [[[],"120462f3"]]},"MenuItem":{"color": [[[":hover"],"ffffff"],[[":disabled"],"aaa6a7"],[[],"0"]],"background-color": [[[":hover"],"c56a31"],[[],"ffffffff"]]},"Link":{"font": [[[],"e7de1195"]],"border": [[["[BORDER"],"5fbe325"],[[],"36a"]]},"Button-CheckIcon":{"background-image": [[[":selected",":grayed",":hover"],"bf9cb6"],[[":selected",":grayed"],"81f5b807"],[[":selected",":hover"],"42f14f4f"],[[":selected"],"6da39160"],[[":hover"],"9ae0f28"],[[],"b17f67f9"]]},"Table-GridLine":{"color": [[[],"d0d0d0"]]},"Shell-CloseButton":{"margin": [[[],"12045c31"]],"background-image": [[[":inactive",":hover"],"4cc5335"],[[":inactive"],"cc9c8d43"],[[":hover"],"812027ac"],[[],"c3558a6c"]]},"ProgressBar-Indicator":{"background-color": [[[":error"],"2020cb"],[[":paused"],"21dfff"],[[],"c08000"]],"background-image": [[[],"ffffffff"]]},"Label":{"color": [[[":hover"],"0"],[[":disabled"],"aaa6a7"],[[],"0"]],"background-color": [[[":hover"],"fff8f8"],[[],"fff8f8"]],"font": [[[],"e7de1195"]],"border": [[["[BORDER"],"5fbe2ff"],[[],"36a"]],"border-radius": [],"background-image": [[[],"ffffffff"]],"text-decoration": [[[],"none"]]},"Shell-Titlebar":{"color": [[[":inactive"],"dddddd"],[[],"ffffff"]],"background-color": [[[":inactive"],"a59679"],[[],"c08000"]],"background-gradient-color": [[[":inactive"],"a59679"],[[],"c08000"]],"background-image": [[[":inactive"],"a38b22a1"],[[],"148ab7bc"]],"font": [[[],"c2bbbd19"]],"margin": [[[],"1203f018"]],"padding": [[[],"12042a9a"]],"height": [[[],"34e"]],"border": [[[],"36a"]],"border-radius": []},"CCombo-Field":{"padding": []},"Shell-MaxButton":{"margin": [[[],"12045c31"]],"background-image": [[[":maximized",":inactive",":hover"],"9b3a140b"],[[":maximized",":inactive"],"79831ead"],[[":maximized",":hover"],"ce0bfe16"],[[":inactive",":hover"],"2e30c177"],[[":maximized"],"8cc3d9c2"],[[":inactive"],"5858bdc1"],[[":hover"],"6b14472a"],[[],"730f342e"]]},"Combo-List":{"border": [[[],"dc902e9c"]],"border-radius": []}},true);delete ts;
qx.io.Alias.getInstance().add( "static", "../org.eclipse.rap.rwt.q07/js/resource/static" );
qx.io.Alias.getInstance().add( "org.eclipse.swt", "../org.eclipse.rap.rwt.q07/js/resource" );
