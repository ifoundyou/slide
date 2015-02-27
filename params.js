var magazine = {};

magazine.orientation = 'portrait';

magazine.effects = [
    {
        name: 'AddAudio',
        options: {
            container: '',
            sources:[
                {
                    src: './Pharrell_Williams.mp3',
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
        preview: './img/previews/1.png',
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
                        url: './img/1.jpg'
                    }
                }
            },{
                name: 'AddAudio',
                options: {
                    container: '',
                    sources:[
                        {
                            src: './Mind_Vortex.mp3',
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
        preview: './img/previews/2.png',
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
                        url: './img/2.jpg'
                    }
                }
            },{
                name: 'AddAudio',
                options: {
                    container: '',
                    sources:[
                        {
                            src: './Linkin_Park.mp3',
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
        preview: './img/previews/3.png',
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
                        url: './img/3.jpg'
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
        preview: './img/previews/4.png',
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
                        url: './img/4.jpg'
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
        preview: './img/previews/5.png',
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
                        url: './img/5.jpg'
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
        preview: './img/previews/6.png',
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
                        url: './img/6.jpg'
                    }
                }
            }
        ]
    },
    {
        name: 'seventh',
        className: '.seventh_slide',
        preview: './img/previews/7.png',
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
                        url: './img/7.jpg'
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
        preview: './img/previews/8.png',
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
                        url: './img/8.jpg'
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
        preview: './img/previews/9.png',
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
                        url: './img/9.jpg'
                    }
                }
            }
        ]
    },
    {
        name: 'tenth',
        className: '.tenth_slide',
        preview: './img/previews/10.png',
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
                        url: './img/11.jpg'
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
        preview: './img/previews/11.png',
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
                        url: './img/12.jpg'
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
        preview: './img/previews/12.png',
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
                        url: './img/13.jpg'
                    }
               }
            }
        ]
    },
    {
        name: '13',
        className: '.13_slide',
        preview: './img/previews/13.png',
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
                        url: './img/13.jpg'
                    }
                }
            },
            {
                name: 'PhotoAlbum',
                options: {
                    images : [
                        'img/previews/1.jpg',
                        'img/previews/2.jpg',
                        'img/previews/3.jpg',
                        'img/previews/4.jpg',
                        'img/previews/5.jpg',
                        'img/previews/6.jpg',
                        'img/previews/7.jpg',
                        'img/previews/8.jpg'
                    ]
               }  
            }
        ]
    },
    {
        name: '14',
        className: '.14_slide',
        preview: './img/previews/14.png',
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
                        url: './img/14.jpg'
                    }
                }
            },
            {
                name: 'TurnAroundEffect',
                options: {
                    elem: '.imgbox',
                    url_data : [
                        'img/previews/1.jpg',
                        'img/previews/2.jpg',
                        'img/previews/3.jpg',
                        'img/previews/4.jpg',
                        'img/previews/5.jpg',
                        'img/previews/6.jpg',
                        'img/previews/7.jpg',
                        'img/previews/8.jpg'
                    ]
               }  
            }
        ]
    },
    {
        name: '15',
        className: '.15_slide',
        preview: './img/previews/15.png',
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
                        url: './img/15.jpg'
                    }
                }
            }
            // ,
            // {
            //     name:'AddVideo',
            //     options:{
            //         elemName: 'new-video',                 //name of element with your text
            //         sources: [
            //             {
            //                 src: "http://wegazine.head.rhino.nixsolutions.com/video/Vanquish_in_Motion.mp4",
            //                 type: "video/mp4"
            //             },{
            //                 src: "http://wegazine.head.rhino.nixsolutions.com/video/Vanquish_in_Motion.flv",
            //                 type: "video/flv"
            //             },{
            //                 src: "http://wegazine.head.rhino.nixsolutions.com/video/Vanquish_in_Motion.webm",
            //                 type: "video/webm"
            //             }
            //         ],
            //         videoAttr: {
            //             width: Math.round(window.innerWidth),
            //             height:  Math.round(window.innerHeight/2),
            //             controls: 'controls',
            //             poster: './img/video_thumb.png',
            //             style: 'width:'+Math.round(window.innerWidth)+'px;' +
            //                     'height:'+ Math.round(window.innerHeight/2)+'px;'
            //         },
            //         style: {                            //css style of your container
            //             position: 'absolute',
            //             background: '#000000',
            //             width: Math.round(window.innerWidth)+'px',
            //             height: Math.round(window.innerHeight/2)+'px',

            //             top: '55px',
            //             left: 0

            //         }
            //     }
            // }
        ]
    },
    {
        name: '16',
        className: '.16_slide',
        preview: './img/previews/16.png',
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
                        url: './img/16.jpg'
                    }
                }
            }
            // ,
            // {
            //     name:'Enlarge',
            //     options:{
            //         elem:'.16_slide .m-img',
            //         duration: 0.5,                        //  seconds
            //         effect: 'linear',
            //         imgScale: 2,
            //         innerHTML: "Let's be together"
            //     }
            // }
        ]
    },
    {
        name: '17',
        className: '.17_slide',
        preview: './img/previews/17.png',
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
                        url: './img/17.jpg'
                    }
                }
            }
        ]
    },
    {
        name: '18',
        className: '.18_slide',
        preview: './img/previews/18.png',
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
                        url: './img/18.jpg'
                    }
                }
            }
        ]
    },
    {
        name: '19',
        className: '.19_slide',
        preview: './img/previews/19.png',
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
                        url: './img/19.jpg'
                    }
                }
            }
        ]
    },
    {
        name: '20',
        className: '.20_slide',
        preview: './img/previews/20.png',
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
                        url: './img/20.jpg'
                    }
                }
            }
        ]
    },
    {
        name: '21',
        className: '.21_slide',
        preview: './img/previews/21.png',
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
                        url: './img/21.jpg'
                    }
                }
            }
        ]
    },
    {
        name: '22',
        className: '.22_slide',
        preview: './img/previews/22.png',
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
                        url: './img/22.jpg'
                    }
                }
            }
        ]
    },
    {
        name: '23',
        className: '.23_slide',
        preview: './img/previews/23.png',
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
                        url: './img/23.jpg'
                    }
                }
            }
        ]
    },
    {
        name: '24',
        className: '.24_slide',
        preview: './img/previews/24.png',
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
                        url: './img/24.jpg'
                    }
                }
            }
        ]
    },
    {
        name: '25',
        className: '.25_slide',
        preview: './img/previews/25.png',
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
                        url: './img/25.jpg'
                    }
                }
            }
        ]
    },
    {
        name: '26',
        className: '.26_slide',
        preview: './img/previews/26.png',
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
                        url: './img/26.jpg'
                    }
                }
            }
        ]
    },
    {
        name: '27',
        className: '.27_slide',
        preview: './img/previews/27.png',
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
                        url: './img/27.jpg'
                    }
                }
            }
        ]
    },
    {
        name: '28',
        className: '.28_slide',
        preview: './img/previews/28.png',
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
                        url: './img/28.jpg'
                    }
                }
            }
        ]
    },
    {
        name: '29',
        className: '.29_slide',
        preview: './img/previews/29.png',
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
                        url: './img/29.jpg'
                    }
                }
            }
        ]
    },
    {
        name: '30',
        className: '.30_slide',
        preview: './img/previews/30.png',
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
                        url: './img/30.jpg'
                    }
                }
            }
        ]
    },
    {
        name: '31',
        className: '.31_slide',
        preview: './img/previews/31.png',
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
                        url: './img/31.jpg'
                    }
                }
            }
        ]
    },
    {
        name: '32',
        className: '.32_slide',
        preview: './img/previews/32.png',
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
                        url: './img/32.jpg'
                    }
                }
            }
        ]
    },
    {
        name: '33',
        className: '.33_slide',
        preview: './img/previews/33.png',
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
                        url: './img/33.jpg'
                    }
                }
            }
        ]
    },
    {
        name: '34',
        className: '.34_slide',
        preview: './img/previews/34.png',
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
                        url: './img/34.jpg'
                    }
                }
            }
        ]
    },
    {
        name: '35',
        className: '.35_slide',
        preview: './img/previews/35.png',
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
                        url: './img/35.jpg'
                    }
                }
            }
        ]
    },
    {
        name: '36',
        className: '.36_slide',
        preview: './img/previews/36.png',
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
                        url: './img/36.jpg'
                    }
                }
            }
        ]
    },
    {
        name: '37',
        className: '.37_slide',
        preview: './img/previews/37.png',
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
                        url: './img/37.jpg'
                    }
                }
            }
        ]
    },
    {
        name: '38',
        className: '.38_slide',
        preview: './img/previews/38.png',
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
                        url: './img/38.jpg'
                    }
                }
            }
        ]
    },
    {
        name: '39',
        className: '.39_slide',
        preview: './img/previews/39.png',
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
                        url: './img/39.jpg'
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
