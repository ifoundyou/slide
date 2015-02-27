var magazine = {};

magazine.orientation = 'portrait';

magazine.effects = [
    {
        name: 'AddAudio',
        options: {
            container: '',
            sources:[
                {
                    src: 'http://wegazine.head.rhino.nixsolutions.com/Pharrell_Williams.mp3',
                    type: "audio/mpeg"
                }
            ]
        }
    }
];

magazine.pages = [
    {
        name: 'first',
        className: '.first_slide',
        preview: './img/previews/1.jpg',
        effects: [
            {
                name: 'Cut',
                options: {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                    original_image:{
                        id: '',
                        url: ''
                    },
                    cropped_image: {
                        id: '',
                        url: './img/52f5d96cc123716266_1.jpg'
                    }
                }
            },{
                name: 'AddAudio',
                options: {
                    container: '',
                    sources:[
                        {
                            src: 'http://wegazine.head.rhino.nixsolutions.com/Mind_Vortex.mp3',
                            type: "audio/mpeg"
                        }
                    ]
                }
            }
        ]
    },
    {
        name: 'second',
        className: '.second_slide',
        preview: './img/previews/2.jpg',
        effects: [
            {
                name: 'Cut',
                options: {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                    original_image:{
                        id: '',
                        url: ''
                    },
                    cropped_image: {
                        id: '',
                        url: './img/52e269713e84b16267_2.jpg'
                    }
                }
            },{
                name: 'AddAudio',
                options: {
                    container: '',
                    sources:[
                        {
                            src: 'http://wegazine.head.rhino.nixsolutions.com/Linkin_Park.mp3',
                            type: "audio/mpeg"
                        }
                    ]
                }
            },
            {
                name: 'Smudge',
                options: {
                    container: '.second_slide',
                    smudge_material_src: './img/transparent_cover_bg_03@2x.png',       // URL of your image
                    duration: 1000,                                         // duration of disappearing
                    lineWidth: 30,                                          // width of smudge line
                    field_area: 0.5                                         // area have left to disappear
                }
            }
        ]
    },
    {
        name: 'third',
        className: '.third_slide',
        preview: './img/previews/3.jpg',
        effects: [
            {
                name: 'Cut',
                options: {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                    original_image:{
                        id: '',
                        url: ''
                    },
                    cropped_image: {
                        id: '',
                        url: './img/52e244ddcb15816268_3.jpg'
                    }
                }
            },

            {
                name: 'AddHyperLink',
                options: {
                    container: '.third_slide',
                    linkAttributes: {
                        href: 'http://www.5.cn',
                        target: '_blank'
                    },
                    linkTitle: 'Magazine',
                    linkWrapperClassName: 'link-for-magazine',
                    top: 500,
                    left: 150
                }
            }
        ]
    },
    {
        name: 'forth',
        className: '.forth_slide',
        preview: './img/previews/4.jpg',
        effects: [
            {
                name: 'Cut',
                options: {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                    original_image:{
                        id: '',
                        url: ''
                    },
                    cropped_image: {
                        id: '',
                        url: './img/52e2698aa149516269_4.jpg'
                    }
                }
            },

            {
                name: 'AddHyperLink',
                options: {
                    container: '.forth_slide',
                    linkAttributes: {
                        href: 'http://www.5.cn',
                        target: '_blank'
                    },
                    linkTitle: 'Magazine',
                    linkWrapperClassName: 'link-for-magazine',
                    top: 500,
                    left: 150
                }
            }
        ]
    },
    {
        name: 'fifth',
        className: '.fifth_slide',
        preview: './img/previews/5.jpg',
        effects: [
            {
                name: 'Cut',
                options: {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                    original_image:{
                        id: '',
                        url: ''
                    },
                    cropped_image: {
                        id: '',
                        url: './img/52e24756ecc0716270_5.jpg'
                    }
                }
            },
            {
                name: 'AddText',
                options: {
                    container: '.fifth_slide',
                    elemName: 'unique',
                    setVector: 'right',

                    headingTagName: 'p',
                    driftCourse: 'up',              // up, down
                    heading: 'Heading',
                    headingClassName: 'left',

                    rows: 1,
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
                    style: {
                        position: 'absolute',
                        margin: '10px',
                        bottom: '80px',
                        right: '80px'
                    },
                    textWidth: 300,

                    buttonStyle : {
                        right : '20px'
                    }
                }
            },
            {
                name: 'AddText',
                options: {
                    container: '.fifth_slide',
                    elemName: 'unique',                 //name of element with your text
                    setVector: 'left',                  //appearing vector ( left, right )
                    headingTagName: 'p',                //name of element with your text
                    driftCourse: 'down',                // drift vector of hidden text ( up, down )
                    heading: 'Very long heading',                 // your heading text
                    headingClassName: 'right',
                    rows: 1,
                    text: 'lorem ipsum dolor sit apmet lorem ipsum dolor sit apmet lorem ipsum dolor sit apmet lorem ipsum dolor sit apmet lorem ipsum dolor sit apmet lorem ipsum dolor sit apmet lorem ipsum dolor sit apmet lorem ipsum dolor sit apmet lorem ipsum dolor sit apmet lorem ipsum dolor sit apmet lorem ipsum dolor sit apmet ',
                    style: {
                        position: 'absolute',
//                        width: '400px',
                        margin: '10px',
                        top: '50px',
                        left: '50px'
                    },
                    textWidth: 300,
                    buttonStyle : {                     //css style of your switch button
                        left : '20px'

                    }
                }
            }
        ]
    },
    {
        name: 'sixth',
        className: '.sixth_slide',
        preview: './img/previews/6.jpg',
        effects: [
            {
                name: 'Cut',
                options: {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                    original_image:{
                        id: '',
                        url: ''
                    },
                    cropped_image: {
                        id: '',
                        url: './img/52e269713e84b16267_6.jpg'
                    }
                }
            }
        ]
    },
    {
        name: 'seventh',
        className: '.seventh_slide',
        preview: './img/previews/7.jpg',
        effects: [
            {
                name: 'Cut',
                options: {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                    original_image:{
                        id: '',
                        url: ''
                    },
                    cropped_image: {
                        id: '',
                        url: './img/52e244ddcb15816268_7.jpg'
                    }
                }
            },

            {
                name: 'AddText',
                options: {
                    container: '.seventh_slide',
                    elemName: 'unique',                 //name of element with your text
                    setVector: 'left',                  //appearing vector ( left, right )
                    headingTagName: 'p',                //name of element with your text
                    driftCourse: 'up',                // drift vector of hidden text ( up, down )
                    heading: 'Heading',                 // your heading text
                    headingClassName: 'right',
                    rows: 1,
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
                    style: {
                        position: 'absolute',
//                        width: '400px',
                        margin: '10px',
                        bottom: '80px',
                        right: '80px'
                    },
                    textWidth: 310,
                    buttonStyle : {                     //css style of your switch button
                        left : '20px'

                    }
                }
            },
            {
                name: 'AddText',
                options: {
                    container: '.seventh_slide',
                    elemName: 'unique',
                    setVector: 'right',

                    headingTagName: 'p',
                    driftCourse: 'down',              // up, down
                    heading: 'Head',
                    headingClassName: 'left',
                    rows: 1,
                    text: 'lorem ipsum dolor sit apmet lorem ipsum dolor sit apmet lorem ipsum dolor sit apmet lorem ipsum dolor sit apmet lorem ipsum dolor sit apmet lorem ipsum dolor sit apmet lorem ipsum dolor sit apmet lorem ipsum dolor sit apmet lorem ipsum dolor sit apmet lorem ipsum dolor sit apmet lorem ipsum dolor sit apmet ',
                    style: {
                        position: 'absolute',
//                        width: '400px',
                        margin: '10px',
                        top: '50px',
                        left: '50px'
                    },
                    textWidth: 290,

                    buttonStyle : {
                        right : '20px'
                    }
                }
            }
        ]
    },
    {
        name: 'eighth',
        className: '.eighth_slide',
        preview: './img/previews/8.jpg',
        effects: [
            {
                name: 'Cut',
                options: {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                    original_image:{
                        id: '',
                        url: ''
                    },
                    cropped_image: {
                        id: '',
                        url: './img/podium_bg_8.jpg'
                    }
                }
            },

            {
                name: 'AddText',
                options: {
                    container: '.eighth_slide',
                    elemName: 'unique',                 //name of element with your text
                    setVector: 'left',                  //appearing vector ( left, right )
                    headingTagName: 'p',                //name of element with your text
                    driftCourse: 'down',                // drift vector of hidden text ( up, down )
                    heading: 'Heading',                 // your heading text
                    headingClassName: 'right',
                    rows: 1,
                    text: 'lorem ipsum dolor sit apmet lorem ipsum dolor sit apmet lorem ipsum dolor sit apmet lorem ipsum dolor sit apmet lorem ipsum dolor sit apmet lorem ipsum dolor sit apmet lorem ipsum dolor sit apmet lorem ipsum dolor sit apmet lorem ipsum dolor sit apmet lorem ipsum dolor sit apmet lorem ipsum dolor sit apmet ',
                    style: {
                        position: 'absolute',
//                        width: '400px',
                        margin: '10px',
                        top: '50px',
                        left: '50px'
                    },
                    textWidth: 270,
                    buttonStyle : {                     //css style of your switch button
                        left : '20px'

                    }
                }
            },
            {
                name: 'AddHyperLink',
                options: {
                    container: '.eighth_slide',
                    linkAttributes: {
                        href: 'http://www.5.cn',
                        target: '_blank'
                    },
                    linkTitle: 'Magazine',
                    linkWrapperClassName: 'link-for-magazine',
                    top: 500,
                    left: 150
                }
            }
        ]
    },
    {
        name: 'ninth',
        className: '.ninth_slide',
        preview: './img/previews/9.jpg',
        effects: [
            {
                name: 'Cut',
                options: {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                    original_image:{
                        id: '',
                        url: ''
                    },
                    cropped_image: {
                        id: '',
                        url: './img/appBg1_9.jpg'
                    }
                }
            }
        ]
    },
    {
        name: 'tenth',
        className: '.tenth_slide',
        preview: './img/previews/10.jpg',
        effects: [
            {
                name: 'Cut',
                options: {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                    original_image:{
                        id: '',
                        url: ''
                    },
                    cropped_image: {
                        id: '',
                        url: './img/bg01_page_10.gif'
                    }
                }
            },{
                name: 'AddText',
                options: {
                    container: '.eleventh_slide',
                    elemName: 'unique',
                    setVector: 'right',

                    headingTagName: 'p',
                    driftCourse: 'down',              // up, down
                    heading: 'Heading',
                    headingClassName: 'left',
                    rows: 1,
                    text: 'lorem ipsum dolor sit apmet lorem ipsum dolor sit apmet lorem ipsum dolor sit apmet lorem ipsum dolor sit apmet lorem ipsum dolor sit apmet lorem ipsum dolor sit apmet lorem ipsum dolor sit apmet lorem ipsum dolor sit apmet lorem ipsum dolor sit apmet lorem ipsum dolor sit apmet lorem ipsum dolor sit apmet ',
                    style: {
                        position: 'absolute',
                        margin: '10px',
                        top: '50px',
                        left: '50px',
                        background: 'rgba(0,0,0,0.7)',
                        color: '#fff'
                    },
                    textWidth: 300,

                    buttonStyle : {
                        right : '20px'
                    }
                }
            }
        ]
    },
    {
        name: 'eleventh',
        className: '.eleventh_slide',
        preview: './img/previews/11.jpg',
        effects: [
            {
                name: 'Cut',
                options: {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                    original_image:{
                        id: '',
                        url: ''
                    },
                    cropped_image: {
                        id: '',
                        url: './img/52e2698aa149516269_11.jpg'
                    }
                }
            },
            {
                name: 'AddHyperLink',
                options: {
                    container: '.eleventh_slide',
                    linkAttributes: {
                        href: 'http://www.5.cn',
                        target: '_blank'
                    },
                    linkTitle: 'Magazine',
                    linkWrapperClassName: 'link-for-magazine',
                    top: 500,
                    left: 150
                }
            }
        ]
    },
    {
        name: 'twelfth',
        className: '.twelfth_slide',
        preview: './img/previews/12.jpg',
        effects: [
            {
                name: 'Smudge',
                options: {
                    container: '.twelfth_slide',
                    smudge_material_src: './img/transparent.png',       // URL of your image
                    duration: 1000,                                         // duration of disappearing
                    lineWidth: 30,                                          // width of smudge line
                    field_area: 0.5                                         // area have left to disappear
                }
            },
            {
                name: 'Cut',
                options: {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                    original_image:{
                        id: '',
                        url: ''
                    },
                    cropped_image: {
                        id: '',
                        url: './img/52e24756ecc0716270_12.jpg'
                    }
               }
            }
        ]
    }
];

magazine.menu = [
    {
        innerHTML: '<a href=\"http://www.5.cn\" >5.cn</a>'
    },
    {
        innerHTML: 'menu item 2'
    },
    {
        innerHTML: 'menu item 3'
    },
    {
        innerHTML: 'menu item 4'
    },
    {
        innerHTML: 'menu item 5'
    },
    {
        innerHTML: 'menu item 6'
    },
    {
        innerHTML: 'menu item 7'
    },
    {
        innerHTML: 'menu item 8'
    },
    {
        innerHTML: 'menu item 9'
    },
    {
        innerHTML: 'menu item 10'
    },
    {
        innerHTML: 'menu item 11'
    },
    {
        innerHTML: 'menu item 12'
    },
    {
        innerHTML: 'menu item 13'
    },
    {
        innerHTML: 'menu item 14'
    },
    {
        innerHTML: 'menu item 15'
    }

];
